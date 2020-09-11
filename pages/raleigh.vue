<template>
  <v-sheet>
    <v-parallax class="mx-13" src="/raleigh.jpg" height="300"></v-parallax>
    <v-row>
      <v-card width="100%" class="mx-16">
        <v-card-title>City of Raleigh Publishers</v-card-title>
        <v-tabs
          class="ma-auto"
          show-arrows
          :mobile-break-point="$vuetify.breakpoint.mobile"
        >
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
    <v-row>
      <v-col class="ml-16" cols="2">
        <v-row><h3>Find by tags:</h3></v-row>
        <v-row>
          <v-select
            v-model="selectedTags"
            class="mr-2"
            :items="keywordTags"
            hide-selected
            clearable
            chips
            label="Select one or more tags:"
            multiple
          >
            <template v-slot:selection="data">
              <v-chip color="pink" dark>
                {{ data.item }}
              </v-chip>
            </template>
          </v-select>
        </v-row>
        <v-row><h3>Find by distribution types:</h3></v-row>
        <v-row>
          <v-chip
            v-for="(item, index) in distributionTypes"
            :key="index"
            color="pink"
            dark
            class="ma-1"
            @click="selected(item)"
            >{{ item }}</v-chip
          >
        </v-row>
      </v-col>
      <v-col>
        <v-row class="mr-13">
          <v-col
            v-for="(entry, index) in filteredCatalog"
            :key="index"
            cols="3"
            style="min-width: fit-content"
          >
            <v-card :href="entry.landingPage" target="_blank">
              <v-card-title>{{ entry.title }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  data() {
    return {
      selectedValue: '',
      selectedTags: [],
      selectedPublisher: 'City of Raleigh',
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
    // eslint-disable-next-line vue/return-in-computed-property
    filteredCatalog() {
      if (this.selectedTags.length === 0) {
        return this.raleighCatalog.filter(
          (element) => element.publisher.name === this.selectedPublisher
        )
      } else {
        return this.raleighCatalog.filter(
          (element) =>
            element.publisher.name === this.selectedPublisher &&
            element.keyword.some((item) => this.selectedTags.includes(item))
        )
      }
    },
    distributionTypes() {
      const dists = []
      this.filteredCatalog.forEach((element) => {
        for (let i = 0; i < element.distribution.length; i++) {
          dists.push(element.distribution[i].format)
        }
      })
      return Array.from(new Set(dists))
    },
    keywordTags() {
      const tags = []
      this.filteredCatalog.forEach((item) => {
        item.keyword.forEach((item) => {
          tags.push(item)
        })
      })
      return Array.from(new Set(tags))
    },
  },
  methods: {
    selected(value) {
      this.selectedValue = value
    },
    publisherDisplay(value) {
      this.selectedTags = []
      this.selectedPublisher = value
    },
  },
}
</script>
