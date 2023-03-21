<script setup>
import q from '@/queries/tag.gql';

const route = useRoute();
const { data } = await useAsyncQuery(q, { id: route.params.slug });

if (!data.value?.tag) {
    throw createError({ statusCode: 404, statusMessage: 'Tag Not Found' })
}
</script>

<template>
    <!-- TODO : SEO -->
    <h1 class="text-4xl mb-6 font-bold dark:text-gray-200">Mot-clé&nbsp;: {{ data.tag.name }}</h1>
    <Posts :data="data.tag.posts" />
</template>
