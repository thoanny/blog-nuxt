<script setup>
const { pendingStreamelements, data: streamelements } = useLazyFetch('https://anthony-destenay.fr/projects/open-space/twitch/streamelements.php')
const { pendingGifts, data: gifts } = useLazyFetch('https://anthony-destenay.fr/projects/open-space/twitch/gifts.php')

useHead({
    bodyAttrs: {
        class: 'twitch'
    },
})
</script>

<template>
    <div id="twitch-player">
        <iframe src="https://player.twitch.tv/?channel=thoanny&parent=thoanny.fr" height="1080" width="1920" allowfullscreen
            title="Thoanny" class="aspect-video w-full h-full rounded-xl overflow-hidden shadow" />
    </div>
    <div class="mx-auto max-w-2xl text-center mb-12">
        <h2 class="text-3xl font-semibold">💜 Merci 💜</h2>
        <div class="text-lg">
            <p class="mt-4">
                C'est toujours un plaisir que j'ai, de partager avec vous mes sessions de jeux et
                découvertes. Je tiens à toutes et tous vous remercier, pour votre présence et votre
                soutien&nbsp;!
            </p>
        </div>
    </div>

    <div class="flex justify-center" v-if="pendingStreamelements">
        <button class="btn btn-primary loading">Chargement en cours...</button>
    </div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6 mb-12">
        <div class="flex items-center justify-center text-center border rounded-2xl shadow-lg p-6 bg-white"
            v-for="se in streamelements">
            <div>
                <div class="avatar mb-2">
                    <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img :src="se.data.avatar" />
                    </div>
                </div>
                <div>
                    <div class="font-bold text-xl mb-2 block truncate">
                        {{ se.data.displayName }}
                    </div>
                    <div class="text-sm mb-2" v-if="se.type == 'raid'">
                        +{{ se.data.amount }} spectateurs
                    </div>
                    <span class="badge badge-primary uppercase">{{ se.type }}</span>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-2xl mx-auto mb-12 mt-20 text-lg text-center">
        <h2>🎁 Récompenses 🎁</h2>
        <p class="mt-4 ">
            En participant à mes lives, tu gagnes des points de chaîne Twitch (T-coins). Grâce à ces
            points, tu peux lancer des sons et acheter des coffres Guild Wars 2.
        </p>
        <p class="mt-4 font-bold">Tous les coffres Guild Wars 2 sont gagnants&nbsp;!</p>
        <p>L'ouverture de ce coffre est limitée à 1 toutes les 10 minutes et coûte 2000 T-coins.</p>
    </div>

    <div class="flex justify-center" v-if="pendingGifts">
        <button class="btn btn-primary loading">Chargement en cours...</button>
    </div>
    <div v-else class="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto my-6 mb-12">
        <div class="relative tooltip" :data-tip="g.name" v-for="g in gifts">
            <span class="badge badge-sm absolute bottom-1 right-1" v-if="g.count > 1">
                {{ g.count }}
            </span>
            <div class="avatar block">
                <div class="w-16 h-16 rounded-lg shadow" :class="'rarity-' + g.rarity">
                    <img :src="g.icon" :alt="g.name" class="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#twitch-player {
    @apply mb-12;

    @screen xl {
        margin-top: calc(-37rem + 8rem);
    }
}

h1,
h2,
h3,
h4,
h5,
h6 {
    @apply font-bold text-primary mt-12;
}

h1 {
    @apply text-5xl;
}

h2 {
    @apply text-4xl;
}

.tooltip {
    .badge {
        z-index: 1;
    }
}
</style>