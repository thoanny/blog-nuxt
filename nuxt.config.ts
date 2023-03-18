// https://nuxt.com/docs/api/configuration/nuxt-config
const seoTitle = 'Thoanny';
const seoDescription = 'Blog de Thoanny, où sont partagés des actualités de ses projets personnels, des articles sur le thème du streaming, du jeu vidéo, et aussi des trucs et astuces...';
const seoImage = 'TODO';

export default defineNuxtConfig({
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    css: ['~/assets/css/main.css'],
    app: {
        head: {
            title: seoTitle,
            meta: [
                { name: 'title', content: seoTitle },
                { name: 'description', content: seoDescription },
                { property: 'og:type', content: 'website' },
                { property: 'og:title', content: seoTitle },
                { property: 'og:description', content: seoDescription },
                { property: 'og:image', content: seoImage },
                { property: 'twitter:card', content: 'summary_large_image' },
                { property: 'twitter:title', content: seoTitle },
                { property: 'twitter:description', content: seoDescription },
                { property: 'twitter:image', content: seoImage },
            ],
        }
    },
    modules: ['@nuxtjs/apollo'],
    plugins: [{ src: '~/plugins/vercel.ts', mode: 'client' }],
    apollo: {
        clients: {
            default: {
                httpEndpoint: 'https://wp.thoanny.fr/graphql'
            }
        },
    },
})