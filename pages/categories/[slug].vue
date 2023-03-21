<script setup>
import q from '@/queries/category.gql';

const route = useRoute();
const { data } = await useAsyncQuery(q, { id: route.params.slug });

if (!data.value?.category) {
    throw createError({ statusCode: 404, statusMessage: 'Catégorie introuvable' })
}

</script>

<template>
    <!-- TODO : SEO -->
    <h1 class="text-4xl mb-6 font-bold dark:text-gray-200">Catégorie&nbsp;: {{ data.category.name }}</h1>
    <Posts :data="data.category.posts" />
</template>
