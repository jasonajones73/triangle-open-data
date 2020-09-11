import fetch from 'node-fetch'

export const state = () => ({
  raleighCatalog: [],
  chapelCatalog: [],
  durhamCatalog: [],
  consolidatedCatalogs: [],
  consolidatedLoading: false,
})

export const mutations = {
  POPULATE_RALEIGH_CATALOG(state, catalog) {
    state.raleighCatalog = catalog
  },
  POPULATE_CHAPEL_CATALOG(state, catalog) {
    state.chapelCatalog = catalog
  },
  POPULATE_DURHAM_CATALOG(state, catalog) {
    state.durhamCatalog = catalog
  },
  CONSOLIDATE_CATALOGS(state) {
    state.consolidatedCatalogs = []
    state.raleighCatalog.forEach((item) =>
      state.consolidatedCatalogs.push(item)
    )
    state.chapelCatalog.forEach((item) => state.consolidatedCatalogs.push(item))
    state.durhamCatalog.forEach((item) => state.consolidatedCatalogs.push(item))
  },
}

export const actions = {
  async fetchRaleighDataCatalog({ commit }) {
    await fetch('https://data-ral.opendata.arcgis.com/data.json')
      .then((response) => {
        return response.ok ? response.json() : Promise.reject(response.status)
      })
      .then((data) => {
        commit('POPULATE_RALEIGH_CATALOG', data.dataset)
      })
  },
  async fetchChapelDataCatalog({ commit }) {
    await fetch('https://opendata-townofchapelhill.hub.arcgis.com/data.json')
      .then((response) => {
        return response.ok ? response.json() : Promise.reject(response.status)
      })
      .then((data) => {
        commit('POPULATE_CHAPEL_CATALOG', data.dataset)
      })
  },
  async fetchDurhamDataCatalog({ commit }) {
    await fetch('https://live-durhamnc.opendata.arcgis.com/data.json')
      .then((response) => {
        return response.ok ? response.json() : Promise.reject(response.status)
      })
      .then((data) => {
        commit('POPULATE_DURHAM_CATALOG', data.dataset)
      })
  },
  consolidateCatalogs({ commit }) {
    commit('CONSOLIDATE_CATALOGS')
  },
}
