<template>
    <div id="app">
        <div class="container">
            <div class="row xs-justify-center mx-auto">
                <div class="xs-12">
                    <h1 class="section-title">Guild Wars 2 Server Population Check</h1>
                </div>
                <div class="xs-12 sm-6">
                    <h3 class="section-title">EU servers</h3>
                    <client-only placeholder="Loading...">
                        <gw2-table :servers="euServers" />
                    </client-only>
                </div>
                <div class="xs-12 sm-6">
                    <h3 class="section-title">NA Servers</h3>
                    <client-only placeholder="Loading...">
                        <gw2-table :servers="naServers" />
                    </client-only>
                </div>
            </div>
            <footer>
                <div class="row xs-justify-center mx-auto">
                    <div class="xs-12">
                        <p>Data from <a href="https://wiki.guildwars2.com/wiki/API:Main">official GW2 API</a>. Source code on <a href="https://github.com/arkyfinity/gw2-servercheck">GitHub</a>.</p>
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
</style>
