<script setup>
import q from '@/queries/posts.gql'
const { data } = await useAsyncQuery(q)
</script>

<template>
    <div>
        <Posts :data="data.posts" :hero="true" />
    </div>
</template>