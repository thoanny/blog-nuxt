<script setup>
import q from "@/queries/posts.gql";
const { data } = await useAsyncQuery(q);

const runtimeConfig = useRuntimeConfig();

const loading = ref(false);
const hasNextPage = ref(false);
const endCursor = ref(null);
const heroPost = ref({});
const posts = ref([]);

if (data.value.posts) {
  if (data.value.posts.nodes.length > 1) {
    heroPost.value = data.value.posts.nodes.slice(0, 1)[0];
    posts.value = data.value.posts.nodes.slice(1);
  } else {
    posts.value = data.value.posts.nodes;
  }

  hasNextPage.value = data.value.posts.pageInfo.hasNextPage;
  endCursor.value = data.value.posts.pageInfo.endCursor;
}

async function loadMore() {
  loading.value = true;

  const { data, pending } = await useAsyncQuery(q, { after: endCursor.value });
  posts.value = posts.value.concat(data.value.posts.nodes);
  hasNextPage.value = data.value.posts.pageInfo.hasNextPage;
  endCursor.value = data.value.posts.pageInfo.endCursor;

  if (!pending.value) {
    loading.value = false;
  }
}

const { data: patreonPosts } = await useFetch(
  runtimeConfig.public.patreon_posts
);
</script>

<template>
  <div>
    <div v-if="patreonPosts?.data">
      <div class="grid gric-cols-2 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
        <PatreonPostCard
          v-for="post in patreonPosts.data.slice(0, 4)"
          :post="post"
          :key="post.id"
        />
      </div>
      <div
        class="mb-8 text-center font-semibold text-gray-400 uppercase tracking-widest flex justify-center gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 shrink-0"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
          />
        </svg>
        Mes dernières publications sur Patreon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 shrink-0"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
          />
        </svg>
      </div>
    </div>
    <PostHero v-if="heroPost" :post="heroPost" />
    <PostCard v-for="post in posts" :post="post" :key="post.id" />
    <div class="flex mt-6 justify-center" v-if="hasNextPage">
      <button
        class="btn btn-primary"
        :class="loading ? 'loading' : ''"
        @click="loadMore"
        v-text="loading ? 'Chargement en cours' : 'Afficher plus d\'articles'"
      ></button>
    </div>
  </div>
</template>
