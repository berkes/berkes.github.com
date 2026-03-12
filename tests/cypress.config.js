const { defineConfig } = require('cypress')
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin')

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config)
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:8000',
  },
})
