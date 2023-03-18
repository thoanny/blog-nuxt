<script setup>
import q from '@/queries/posts.gql'
const { data } = await useAsyncQuery(q)
</script>

<template>
    <div>
        <ul v-if="data.posts">
            <li v-for="post in data.posts.nodes" :key="post.id">
                <NuxtLink :to="post.uri">{{ post.title }}</NuxtLink>
            </li>
        </ul>
    </div>
</template>