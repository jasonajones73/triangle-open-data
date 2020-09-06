<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Triangle Open Data</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="ml-1" text nuxt to="/"
        ><v-icon left>mdi-menu</v-icon>Menu</v-btn
      >
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      fixed: false,
    }
  },
  created() {
    this.$store.dispatch('fetchRaleighDataCatalog')
    this.$store.dispatch('fetchChapelDataCatalog')
    this.$store.dispatch('fetchDurhamDataCatalog')
  },
}
</script>
