<script setup>
defineProps(['game', 'platforms'])
</script>

<template>
    <div class="card card-compact bg-base-100 shadow-xl">
        <figure v-if="game.thumbnail">
            <img :src="game.thumbnail" alt="" class="w-full aspect-3-4" loading="lazy" />
        </figure>
        <div class="card-body">
            <h2 class="card-title text-base text-center font-bold truncate block w-full">
                {{ game.name }}
            </h2>
            <div class="card-actions justify-center mb-2">
                <div class="badge badge-sm">{{ game.release }}</div>
                <div class="badge badge-sm badge-outline" v-for="platform in game.platforms">
                    {{ (platforms[platform]) ? platforms[platform] : platform }}
                </div>
            </div>
            <div class="card-actions justify-center">

                <div class="tooltip" data-tip="Dans ma liste de souhaits" v-if="game.status == 'wishlist'">
                    <span class="btn btn-circle btn-sm btn-secondary text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" class="w-5 h-5">
                            <path
                                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                        </svg>
                    </span>
                </div>

                <div class="tooltip" data-tip="J'y ai joué" v-else-if="game.status == 'played'">
                    <span class="btn btn-circle btn-sm btn-secondary text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" class="w-5 h-5">
                            <path
                                d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z" />
                        </svg>
                    </span>
                </div>

                <div class="tooltip" data-tip="Je l'ai streamé" v-else-if="game.status == 'streamed'">
                    <span class="btn btn-circle btn-sm btn-secondary text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" class="w-4 h-4">
                            <path
                                d="M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z" />
                        </svg>
                    </span>
                </div>

                <div class="tooltip" data-tip="Je n'y ai pas joué" v-else>
                    <span class="btn btn-circle btn-sm btn-disabled">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" class="w-5 h-5">
                            <path
                                d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z" />
                        </svg>
                    </span>
                </div>

                <div :class="{ 'tooltip': game.like }" data-tip="'J\'ai beaucoup aimé'">
                    <span class="btn btn-circle btn-sm"
                        :class="{ 'btn-disabled': !game.liked, 'btn-secondary text-white': game.liked }">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" class="w-4 h-4">
                            <path
                                d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                        </svg>
                    </span>
                </div>
                <div class="tooltip" :data-tip="(game.vod) ? 'VOD' : 'Pas de VOD'">
                    <span class="btn btn-circle btn-sm btn-disabled" v-if="!game.vod">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5" viewBox="0 0 576 512">
                            <path
                                d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                        </svg>
                    </span>
                    <a :href="game.vod" class="btn btn-circle btn-sm btn-secondary text-white" target="_blank" v-else>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5" viewBox="0 0 576 512">
                            <path
                                d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                        </svg>
                    </a>
                </div>
                <div class="tooltip" :data-tip="(game.post) ? 'Mon article sur ce jeu' : 'Pas d\'article sur ce jeu'">
                    <span class="btn btn-circle btn-sm btn-disabled" v-if="!game.post">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 h-4" viewBox="0 0 448 512">
                            <path
                                d="M352 64c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32z" />
                        </svg>
                    </span>
                    <a :href="game.post" class="btn btn-circle btn-sm btn-secondary text-white" target="_blank" v-else>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 h-4" viewBox="0 0 448 512">
                            <path
                                d="M352 64c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.aspect-3-4 {
    aspect-ratio: 3/4;
}
</style>