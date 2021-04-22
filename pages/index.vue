<template>
    <div id="app">
        <div class="container">
            <div class="row xs-justify-center mx-auto">
                <div class="xs-12">
                    <h1 class="section-title">Guild Wars 2 Server Population Check</h1>
                </div>
                <div class="xs-12 md-6">
                    <h3 class="section-title">EU servers</h3>
                    <client-only placeholder="Loading...">
                        <gw2-table :servers="euServers" />
                    </client-only>
                </div>
                <div class="xs-12 md-6">
                    <h3 class="section-title">NA Servers</h3>
                    <client-only placeholder="Loading...">
                        <gw2-table :servers="naServers" />
                    </client-only>
                </div>
            </div>
            <footer>
                <div class="row xs-justify-center mx-auto">
                    <div class="xs-12">
                        <p>Data from <a href="https://wiki.guildwars2.com/wiki/API:Main">official GW2 API</a>. Source code on <a href="https://github.com/arkyfinity/gw2-servercheck">GitHub</a>. <span @click="modeToggle">
                                <svg v-if="!darkmode" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24">
                                    <path fill="#444444" d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z" />
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" verson="1.1" viewBox="0 0 24 24">
                                    <path fill="#dddddd" d="M 11 0 L 11 3 L 13 3 L 13 0 L 11 0 z M 4.2226562 2.8085938 L 2.8085938 4.2226562 L 4.9296875 6.34375 L 6.34375 4.9296875 L 4.2226562 2.8085938 z M 19.777344 2.8085938 L 17.65625 4.9296875 L 19.070312 6.34375 L 21.191406 4.2226562 L 19.777344 2.8085938 z M 12 5 A 7 7 0 0 0 5 12 A 7 7 0 0 0 12 19 A 7 7 0 0 0 19 12 A 7 7 0 0 0 12 5 z M 0 11 L 0 13 L 3 13 L 3 11 L 0 11 z M 21 11 L 21 13 L 24 13 L 24 11 L 21 11 z M 4.9296875 17.65625 L 2.8085938 19.777344 L 4.2226562 21.191406 L 6.34375 19.070312 L 4.9296875 17.65625 z M 19.070312 17.65625 L 17.65625 19.070312 L 19.777344 21.191406 L 21.191406 19.777344 L 19.070312 17.65625 z M 11 21 L 11 24 L 13 24 L 13 21 L 11 21 z" />
                                </svg>
                            </span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

const isDev = process.env.NODE_ENV !== 'production'

export default {
    components: {
        'gw2-table': () => import('~/components/gw2-table.vue')
    },

    data: () => ({
        darkMode: false
    }),

    async asyncData({ req }) {
        // Server ID's - https://wiki.guildwars2.com/wiki/API:2/worlds
        const eu = '2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2101,2102,2103,2104,2105,2201,2202,2203,2204,2205,2206,2207,2301'
        const na = '1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011,1012,1013,1014,1015,1016,1017,1018,1019,1020,1021,1022,1023,1024'

        const euServers = []
        const naServers = []
        const { data: servers } = await axios.get(isDev ? `/api/worlds?ids=${eu},${na}&lang=en` : `${process.env.apiURL}/worlds?ids=${eu},${na}&lang=en`)

        for (const server of servers) {
            if (eu.includes(server.id)) {
                euServers.push(server)
            } else {
                naServers.push(server)
            }
        }

        return {euServers, naServers}
    },

    mounted() {
        if(localStorage.getItem('_darkmode') === 'enabled') {
            document.querySelector('body').classList.add('darkmode')
            this.darkmode = true
        } else if(document.querySelector('body').classList.contains('darkmode') && (localStorage.getItem('_darkmode') === false || localStorage.getItem('_darkmode') == null)) {
            document.querySelector('body').classList.remove('darkmode')
            this.darkmode = false
        } else {
            this.darkmode = false
        }
    },

    methods: {
        night() {
            document.querySelector('body').classList.add('darkmode')
            this.darkmode = true
            this.$emit('dark')
            localStorage.setItem('_darkmode', 'enabled')
        },

        day() {
            document.querySelector('body').classList.remove('darkmode')
            this.darkmode = false
            this.$emit('day')
            localStorage.removeItem('_darkmode')
        },

        checkStorage() {
            localStorage.getItem('_darkmode')
        },

        modeToggle() {
            if(this.darkmode || document.querySelector('body').classList.contains('darkmode') || this.checkStorage() === 'enabled') {
                this.day()
            } else {
                this.night()
            }
        }
    }
}
</script>

<style lang="scss">
.row {
    > .xs-12.sm-6 {
        &:last-of-type {
            margin-top: 2rem;

            @media (min-width: 768px) {
                margin-top: 0;
            }
        }
    }
}

footer {
    svg {
        width: 16px;
        height: 16px;

        &:hover,
        &:focus,
        &:hover:active {
            cursor: pointer;
        }
    }
}
</style>
