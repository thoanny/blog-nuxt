<script setup>
defineProps(['error'])
</script>

<template>
    <div class="error">
        <div class="error__title">{{ error.statusCode }}</div>
        <div class="error__message">{{ error.statusMessage }}</div>
        <NuxtLink to="/" class="btn btn-primary gap-2 mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd"
                    d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
                    clip-rule="evenodd" />
            </svg>
            Retourner à l'accueil
        </NuxtLink>
    </div>
</template>

<style lang="scss" scoped>
.error {
    @apply flex items-center justify-center flex-col p-8 gap-6;
    width: 100vw;
    height: 100vh;

    &__title,
    &__message {
        @apply uppercase;
    }

    &__title {
        @apply text-primary text-9xl font-bold tracking-wide leading-none;
    }

    &__message {
        @apply font-semibold text-xl tracking-widest leading-none;
    }
}
</style>