<script setup>
import q from '@/queries/posts.gql'
const { data } = await useAsyncQuery(q)

const loading = ref(false);
const hasNextPage = ref(false);
const endCursor = ref(null);
const heroPost = ref({})
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

</script>

<template>
    <div>
        <PostHero v-if="heroPost" :post="heroPost" />
        <PostCard v-for="post in posts" :post="post" :key="post.id" />
        <div class="flex mt-6 justify-center" v-if="hasNextPage">
            <button class="btn btn-primary" :class="(loading) ? 'loading' : ''" @click="loadMore"
                v-text="(loading) ? 'Chargement en cours' : 'Afficher plus d\'articles'"></button>
        </div>
    </div>
</template>