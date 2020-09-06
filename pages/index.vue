<template>
  <v-sheet>
    <v-row align="center" justify="center">
      <v-col class="text-center" cols="12"><h1>Triangle Open Data</h1></v-col>
    </v-row>
    <v-row class="ml-2 mr-2"
      ><v-col v-for="city in cities" :key="city.city" cols="4"
        ><v-card
          align="center"
          justify="center"
          :color="city.color"
          :to="city.link"
          nuxt
          dark
        >
          <v-img :src="city.img" height="150"
            ><h1>{{ city.city }}</h1></v-img
          ></v-card
        ></v-col
      ></v-row
    >
  </v-sheet>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  data() {
    return {
      selectedValue: '',
      headers: [
        { text: 'Data Set Name', value: 'title' },
        { text: 'Publisher', value: 'publisher.source' },
        { text: 'Access Level', value: 'accessLevel' },
      ],
      cities: [
        {
          city: 'Raleigh',
          link: '/raleigh',
          color: 'teal darken-4',
          img: '/raleigh.jpg',
        },
        {
          city: 'Durham',
          link: '/durham',
          color: 'light-blue lighten-1',
          img: '/durham.jpeg',
        },
        {
          city: 'Chapel Hill',
          link: '/chapelhill',
          color: 'green',
          img: '/chapelhill.jpeg',
        },
      ],
    }
  },
  computed: {
    ...mapState(['raleighCatalog']),
    publishers() {
      const pubs = []
      this.raleighCatalog.forEach((element) => {
        pubs.push(element.publisher.source)
      })
      return Array.from(new Set(pubs))
    },
    keywords() {
      const keys = []
      this.raleighCatalog.forEach((element) => {
        for (let i = 0; i < element.keyword.length; i++) {
          keys.push(element.keyword[i])
        }
      })
      return Array.from(new Set(keys))
    },
    distributionTypes() {
      const dists = []
      this.raleighCatalog.forEach((element) => {
        for (let i = 0; i < element.distribution.length; i++) {
          dists.push(element.distribution[i].format)
        }
      })
      return Array.from(new Set(dists))
    },
    filteredCatalog() {
      return this.raleighCatalog.filter(
        (element) => element.publisher.source === this.selectedValue
      )
    },
  },
  methods: {
    selected(value) {
      this.selectedValue = value
    },
    consolidateCatalogs() {
      this.$store.dispatch('consolidateCatalogs')
    },
  },
}
</script>
