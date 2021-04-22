<template>
    <table class="table">
        <thead>
            <tr>
                <th :class="{'sort-asc': currentSort === 'name' && currentSortDir === -1, 'sort-desc': currentSort === 'name' && currentSortDir === 1}" @click="sort('name')">Server name</th>
                <th :class="{'sort-asc': currentSort === 'population' && currentSortDir === -1, 'sort-desc': currentSort === 'population' && currentSortDir === 1}" @click="sort('population')">Population status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="server in sortedServers" :key="server.id">
                <td>{{ server.name }}</td>
                <td :class="className(server.population)">{{ server.population | insertSpaces }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    filters: {
        // Regex to split up words, since 'VeryHigh' needs a space.
        insertSpaces(value) {
            if(!value) {
                return ''
            }

            value = value.replace(/([a-z])([A-Z])/g, '$1 $2')
            value = value.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')

            return value
        }
    },

    props: {
        servers: {
            type: Array,
            required: true
        }
    },

    data: () => ({
        currentSort: 'name',
        currentSortDir: -1, // asc
    }),

    computed: {
        sortedServers() {
            if (!this.currentSort) {
                return this.servers
            }

            // Assign sortable numbers to population status
            const populationSort = {
                'Low': 0,
                'Medium': 1,
                'High': 2,
                'VeryHigh': 3,
                'Full': 4
            }

            // Sort servers
            return this.servers.slice().sort((a, b) => {
                if (this.currentSort === 'name') {
                    if (a.name < b.name) {
                        return this.currentSortDir
                    } else {
                        return -this.currentSortDir
                    }
                } else {
                    return this.currentSortDir * (populationSort[a.population] - populationSort[b.population])
                }
            })
        }
    },

    methods: {
        // Sort on @click
        sort(s) {
            if(s === this.currentSort) {
              this.currentSortDir = -this.currentSortDir
            } else {
              this.currentSortDir = 1
            }
            this.currentSort = s
        },

        // Add classnames to population table data to colorize depending on status
        className(population) {
            if(population === 'Low') {
                return 'population-low'
            } else if(population === 'Medium') {
                return 'population-medium'
            } else if(population === 'High') {
                return 'population-high'
            } else if(population === 'VeryHigh') {
                return 'population-very-high'
            } else if(population === 'Full') {
                return 'population-full'
            }
        }
    }
}
</script>
