// https://nuxt.com/docs/api/configuration/nuxt-config
const seoTitle = 'Thoanny';
const seoDescription = 'Blog de Thoanny, où sont partagés des actualités de ses projets personnels, des articles sur le thème du streaming, du jeu vidéo, et aussi des trucs et astuces...';
const seoImage = 'https://wp.thoanny.fr/wp-content/uploads/preview.png';

export default defineNuxtConfig({
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    css: ['~/assets/css/main.scss'],
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
                { name: 'apple-mobile-web-app-title', conten: seoTitle },
                { name: 'application-name', conten: seoTitle },
                { name: 'msapplication-TileColor', conten: '#93c045' },
                { name: 'msapplication-TileImage', conten: '/mstile-144x144.png' },
                { name: 'theme-color', conten: '#93c045' },
            ],
            link: [
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
                { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-chrome-192x192.png' },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
                { rel: 'manifest', href: '/site.webmanifest' },
                { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#93c045' },
            ]
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