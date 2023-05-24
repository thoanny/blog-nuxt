<script setup>

import GameCard from '@/components/GameCard.vue';
import GameList from '@/components/GameList.vue';

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
const display = ref('list');

function handleFilter(f) {
    if (filters.value === f) {
        filters.value = null;
        games.value = allGames.value;
    } else {
        filters.value = f;
        if (f === 'liked') {
            games.value = allGames.value.filter(game => game[f] == true);
        } else if (f === 'wishlist' || f === 'played' || f === 'streamed') {
            games.value = allGames.value.filter(game => game['status'] == f);
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
        <div class="block lg:flex gap-4 justify-between items-center mb-6">
            <div class="flex flex-wrap text-nowrap gap-2 items-center mb-4 lg:mb-0">
                <span class="font-semibold">Filtrer :</span>
                <button class="btn btn-sm"
                    :class="{ 'btn-primary': filters == 'wishlist', 'btn-outline': !filters || filters != 'wishlist' }"
                    @click="handleFilter('wishlist')">Liste de souhaits</button>
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
            <div class="flex gap-2 text-nowrap flex-wrap items-center">
                <span class="font-semibold">Affichage :</span>
                <button class="btn btn-sm"
                    :class="{ 'btn-primary': display == 'card', 'btn-outline': !display || display != 'card' }"
                    @click="() => { display = 'card' }">
                    Cartes
                </button>
                <button class="btn btn-sm"
                    :class="{ 'btn-primary': display == 'list', 'btn-outline': !display || display != 'list' }"
                    @click="() => { display = 'list' }">
                    Liste
                </button>
            </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6" v-if="display === 'card'">
            <GameCard v-for="game in games" :key="game.id" :game="game" :platforms="platforms" />
        </div>
        <div v-else>
            <GameList v-for="game in games" :key="game.id" :game="game" :platforms="platforms" />
        </div>
    </div>
</template>

<style scoped>
.aspect-3-4 {
    aspect-ratio: 3/4;
}
</style>