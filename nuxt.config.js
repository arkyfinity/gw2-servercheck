import { build, manifest, meta } from './config'

require('dotenv').config()

const isDev = process.env.NODE_ENV !== 'production'

export default {
    ssr: false,
    modern: !isDev && 'client',

    watch: ['~/config/*'],

    meta,

    env: {
        apiURL: 'https://api.guildwars2.com/v2'
    },

    loading: {
        color: '#006494',
        failedColor: '#d00000',
        height: '3px'
    },

    css: [
        '~/node_modules/flexgrid.io/dist/flexgrid-utils.min.css',
        '~/assets/scss/app.scss'
    ],

    plugins: [],

    buildModules: [
        '@nuxtjs/eslint-module',
        '@nuxtjs/netlify-files'
    ],

    modules: [
        ['@nuxtjs/dotenv', { systemvars: true }],
        '@nuxtjs/proxy',
        '@nuxtjs/pwa'
    ],

    axios: {
        proxy: true
    },

    proxy: {
        '/api': {
            target: 'https://api.guildwars2.com/v2',
            pathRewrite: { '^/api': '' }
        }
    },

    webfontloader: {
        custom: {
            families: [
                'Source Sans Pro:n4,n6'
            ],
            urls: [
                'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap'
            ]
        }
    },

    netlifyFiles: {
        existingFilesDirectory: './netlify'
    },

    manifest,

    build
}
