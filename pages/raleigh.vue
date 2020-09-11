<template>
  <v-sheet>
    <v-parallax src="/raleigh.jpg" height="300"></v-parallax>
    <v-row>
      <v-card class="ma-auto">
        <v-tabs>
          <v-tab
            v-for="item in publishers"
            :key="item"
            @click="publisherDisplay(item)"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </v-card>
    </v-row>
    <v-row class="mx-16">
      <v-col class="ma-auto">
        <v-card v-for="(entry, index) in filteredCatalog" :key="index">
          <v-card-title>{{ entry.title }}</v-card-title>
          <v-card-actions>Tags: {{ entry.keyword }}</v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-container>
      <v-row><h1>Find by publishers:</h1></v-row>
      <v-row>
        <v-chip
          v-for="item in publishers"
          :key="item"
          color="pink"
          dark
          class="ma-1"
          @click="selected(item)"
          >{{ item }}</v-chip
        >
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
      selectedPublisher: 'City of Raleigh',
      headers: [
        { text: 'Data Set Name', value: 'title' },
        { text: 'Publisher', value: 'publisher.name' },
        { text: 'Access Level', value: 'accessLevel' },
      ],
    }
  },
  computed: {
    ...mapState(['raleighCatalog']),
    publishers() {
      const pubs = []
      this.raleighCatalog.forEach((element) => {
        pubs.push(element.publisher.name)
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
        (element) => element.publisher.name === this.selectedPublisher
      )
    },
  },
  methods: {
    selected(value) {
      this.selectedValue = value
    },
    publisherDisplay(value) {
      this.selectedPublisher = value
    },
  },
}
</script>
