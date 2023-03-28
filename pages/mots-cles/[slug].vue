<script setup>
import q from '@/queries/tag.gql';

const route = useRoute();
const { data } = await useAsyncQuery(q, { id: route.params.slug });

const loading = ref(false);
const hasNextPage = ref(false);
const endCursor = ref(null);
const posts = ref([]);

if (!data.value?.tag) {
    throw createError({ statusCode: 404, statusMessage: 'Mot-clé introuvable' })
} else {
    posts.value = data.value.tag.posts.nodes;
    hasNextPage.value = data.value.tag.posts.pageInfo.hasNextPage;
    endCursor.value = data.value.tag.posts.pageInfo.endCursor;
}

async function loadMore() {
    loading.value = true;

    const { data, pending } = await useAsyncQuery(q, { id: route.params.slug, after: endCursor.value });
    posts.value = posts.value.concat(data.value.tag.posts.nodes);
    hasNextPage.value = data.value.tag.posts.pageInfo.hasNextPage;
    endCursor.value = data.value.tag.posts.pageInfo.endCursor;

    if (!pending.value) {
        loading.value = false;
    }
}
</script>

<template>
    <!-- TODO : SEO -->
    <h1 class="text-4xl mb-6 font-bold dark:text-gray-200">Mot-clé&nbsp;: {{ data.tag.name }}</h1>
    <PostCard v-for="post in posts" :post="post" :key="post.id" />
    <div class="flex mt-6 justify-center" v-if="hasNextPage">
        <button class="btn  btn-primary" :class="(loading) ? 'loading' : ''" @click="loadMore"
            v-text="(loading) ? 'Chargement en cours' : 'Afficher plus d\'articles'"></button>
    </div>
</template>
