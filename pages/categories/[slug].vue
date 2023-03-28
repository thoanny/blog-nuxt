<script setup>
import q from '@/queries/category.gql';

const route = useRoute();
const { data } = await useAsyncQuery(q, { id: route.params.slug });

const loading = ref(false);
const hasNextPage = ref(false);
const endCursor = ref(null);
const posts = ref([]);

if (!data.value?.category) {
    throw createError({ statusCode: 404, statusMessage: 'Catégorie introuvable' })
} else {
    posts.value = data.value.category.posts.nodes;
    hasNextPage.value = data.value.category.posts.pageInfo.hasNextPage;
    endCursor.value = data.value.category.posts.pageInfo.endCursor;
}

async function loadMore() {
    loading.value = true;

    const { data, pending } = await useAsyncQuery(q, { id: route.params.slug, after: endCursor.value });
    posts.value = posts.value.concat(data.value.category.posts.nodes);
    hasNextPage.value = data.value.category.posts.pageInfo.hasNextPage;
    endCursor.value = data.value.category.posts.pageInfo.endCursor;

    if (!pending.value) {
        loading.value = false;
    }
}

</script>

<template>
    <!-- TODO : SEO -->
    <h1 class="text-4xl mb-6 font-bold dark:text-gray-200">Catégorie&nbsp;: {{ data.category.name }}</h1>
    <PostCard v-for="post in posts" :post="post" :key="post.id" />
    <div class="flex mt-6 justify-center" v-if="hasNextPage">
        <button class="btn btn-primary" :class="(loading) ? 'loading' : ''" @click="loadMore"
            v-text="(loading) ? 'Chargement en cours' : 'Afficher plus d\'articles'"></button>
    </div>
</template>
