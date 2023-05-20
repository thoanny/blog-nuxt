<script setup>

const { data: myGames } = await useFetch('https://wp.thoanny.fr/wp-admin/admin-ajax.php?action=thoanny_games');

const platforms = {
    'Amazon Games': 'Amazon',
    'Epic Games Store': 'EGS',
    'EA Origin': 'EA',
    'Legacy Games': 'Legacy',
    'Microsoft Store': 'Microsoft',
    'Ubisoft Connect': 'Ubisoft'
};

const allGames = ref(myGames.value.data);
const games = ref(myGames.value.data);
const filters = ref(null);

function handleFilter(f) {
    if (filters.value === f) {
        filters.value = null;
        games.value = allGames.value;
    } else {
        filters.value = f;
        if (f === 'played' || f === 'streamed' || f === 'liked') {
            games.value = allGames.value.filter(game => game[f] == true);
        } else {
            games.value = allGames.value.filter(game => game[f]);
        }
    }
}

</script>

<template>
    <h1 class="text-4xl mb-6 font-bold dark:text-gray-200">
        Liste de mes jeux
        <span v-if="games" class="text-base">
            (<span v-if="filters">{{ games.length }}/</span>{{ allGames.length }})
        </span>
    </h1>

    <button v-if="!games" class="btn btn-ghost loading">Chargement...</button>
    <div v-else="games">
        <div class="flex flex-wrap text-nowrap gap-2 items-center mb-6">
            <span class="font-semibold">Filtrer :</span>
            <button class="btn btn-sm"
                :class="{ 'btn-primary': filters == 'played', 'btn-outline': !filters || filters != 'played' }"
                @click="handleFilter('played')">Joués</button>
            <button class="btn btn-sm"
                :class="{ 'btn-primary': filters == 'streamed', 'btn-outline': !filters || filters != 'streamed' }"
                @click="handleFilter('streamed')">Streamés</button>
            <button class="btn btn-sm"
                :class="{ 'btn-primary': filters == 'liked', 'btn-outline': !filters || filters != 'liked' }"
                @click="handleFilter('liked')">Aimés</button>
            <button class="btn btn-sm"
                :class="{ 'btn-primary': filters == 'vod', 'btn-outline': !filters || filters != 'vod' }"
                @click="handleFilter('vod')">VOD</button>
            <button class="btn btn-sm"
                :class="{ 'btn-primary': filters == 'post', 'btn-outline': !filters || filters != 'post' }"
                @click="handleFilter('post')">Articles</button>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            <div class="card card-compact bg-base-100 shadow-xl" v-for="game in games " :key="game.id">
                <figure v-if="game.thumbnail">
                    <img :src="game.thumbnail" alt="" class="w-full" loading="lazy" />
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
                        <div class="tooltip" :data-tip="(game.played) ? 'J\'y ai joué' : 'Je n\'y ai pas joué'">
                            <span class="btn btn-circle btn-sm"
                                :class="{ 'btn-disabled': !game.played, 'btn-secondary text-white': game.played }">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor"
                                    class="w-5 h-5">
                                    <path
                                        d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z" />
                                </svg>
                            </span>
                        </div>
                        <div class="tooltip" :data-tip="(game.played) ? 'Je l\'ai streamé' : 'Je ne l\'ai pas streamé'">
                            <span class="btn btn-circle btn-sm"
                                :class="{ 'btn-disabled': !game.streamed, 'btn-secondary text-white': game.streamed }">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"
                                    class="w-4 h-4">
                                    <path
                                        d="M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z" />
                                </svg>
                            </span>
                        </div>
                        <div :class="{ 'tooltip': game.like }" data-tip="'J\'ai beaucoup aimé'">
                            <span class="btn btn-circle btn-sm"
                                :class="{ 'btn-disabled': !game.liked, 'btn-secondary text-white': game.liked }">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"
                                    class="w-4 h-4">
                                    <path
                                        d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                                </svg>
                            </span>
                        </div>
                        <div class="tooltip" :data-tip="(game.vod) ? 'VOD' : 'Pas de VOD'">
                            <span class="btn btn-circle btn-sm btn-disabled" v-if="!game.vod">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5"
                                    viewBox="0 0 576 512">
                                    <path
                                        d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                                </svg>
                            </span>
                            <a :href="game.vod" class="btn btn-circle btn-sm btn-secondary text-white" target="_blank"
                                v-else>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5"
                                    viewBox="0 0 576 512">
                                    <path
                                        d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                                </svg>
                            </a>
                        </div>
                        <div class="tooltip"
                            :data-tip="(game.post) ? 'Mon article sur ce jeu' : 'Pas d\'article sur ce jeu'">
                            <span class="btn btn-circle btn-sm btn-disabled" v-if="!game.post">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 h-4"
                                    viewBox="0 0 448 512">
                                    <path
                                        d="M352 64c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32z" />
                                </svg>
                            </span>
                            <a :href="game.post" class="btn btn-circle btn-sm btn-secondary text-white" target="_blank"
                                v-else>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 h-4"
                                    viewBox="0 0 448 512">
                                    <path
                                        d="M352 64c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>