<script setup>
import { stripHtml } from 'string-strip-html';
import q from '@/queries/content.gql'

const route = useRoute()
const { data } = await useAsyncQuery(q, { id: route.params.uri });

const content = ref(null)
const contentType = ref(null)

if (data.value?.page) {
    content.value = data.value.page;
} else if (data.value?.post) {
    content.value = data.value.post;
} else {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

if (content.value) {
    contentType.value = content.value.__typename
}

const seoTitle = content.value.title + ' | Thoanny';
const seoDescription = (content.value.excerpt) ? stripHtml(content.value.excerpt).result : null
const seoImage = (content.value.featuredImage) ? content.value.featuredImage.node.mediaItemUrl : null

</script>

<template>
    <Head>
        <Title>{{ seoTitle }}</Title>
        <Meta name="title" :content="seoTitle" />
        <Meta v-if="seoDescription" name="description" :content="seoDescription" />
        <Meta property="og:title" :content="seoTitle" />
        <Meta v-if="seoDescription" property="og:description" :content="seoDescription" />
        <Meta v-if="seoImage" property="og:image" :content="seoImage" />
        <Meta property="twitter:title" :content="seoTitle" />
        <Meta v-if="seoDescription" property="twitter:description" :content="seoDescription" />
        <Meta v-if="seoImage" property="twitter:image" :content="seoImage" />
    </Head>
    <div>
        <p>
            <NuxtLink to="/">Accueil</NuxtLink>
        </p>
        <img v-if="content.featuredImage" :src="content.featuredImage.node.mediaItemUrl"
            :width="content.featuredImage.node.mediaDetails.width" :height="content.featuredImage.node.mediaDetails.height"
            :alt="content.featuredImage.node.altText" />
        <h1>{{ content.title }}</h1>
        <div v-html="content.content"></div>
    </div>
</template>