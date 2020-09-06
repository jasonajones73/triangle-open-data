<template>
  <v-sheet>
    <v-parallax src="/durham.jpeg" height="300"></v-parallax>
    <v-container>
      <v-row><h1>Find by publishers:</h1></v-row>
      <v-row>
        <v-col
          v-for="item in publishers"
          :key="item"
          cols="4"
          style="min-width: fit-content"
        >
          <v-btn x-large block rounded @click="selected(item)">{{
            item
          }}</v-btn>
        </v-col>
      </v-row>
      <v-row><h1>Find by distribution type:</h1></v-row>
      <v-row>
        <v-col
          v-for="item in distributionTypes"
          :key="item"
          cols="4"
          style="min-width: fit-content"
        >
          <v-btn x-large block rounded @click="selected(item)">{{
            item
          }}</v-btn>
        </v-col>
      </v-row>
      <v-row><h1>Filtered table of resources:</h1></v-row>
      <v-row
        ><v-data-table
          :items="filteredCatalog"
          :headers="headers"
          sort-by="title"
          class="elevation-1"
        ></v-data-table
      ></v-row>
    </v-container>
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
    }
  },
  computed: {
    ...mapState(['durhamCatalog']),
    publishers() {
      const pubs = []
      this.durhamCatalog.forEach((element) => {
        pubs.push(element.publisher.source)
      })
      return Array.from(new Set(pubs))
    },
    keywords() {
      const keys = []
      this.durhamCatalog.forEach((element) => {
        for (let i = 0; i < element.keyword.length; i++) {
          keys.push(element.keyword[i])
        }
      })
      return Array.from(new Set(keys))
    },
    distributionTypes() {
      const dists = []
      this.durhamCatalog.forEach((element) => {
        for (let i = 0; i < element.distribution.length; i++) {
          dists.push(element.distribution[i].format)
        }
      })
      return Array.from(new Set(dists))
    },
    filteredCatalog() {
      return this.durhamCatalog.filter(
        (element) => element.publisher.source === this.selectedValue
      )
    },
  },
  methods: {
    selected(value) {
      this.selectedValue = value
    },
  },
}
</script>
