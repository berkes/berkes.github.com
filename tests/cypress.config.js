const { defineConfig } = require('cypress')
const { addMatchImageSnapshotPlugin } = require('@simonsmith/cypress-image-snapshot/plugin')

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config)
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:8000',
    // The site under test is a static build served from localhost: no
    // async data fetching, no animations. Elements that are going to
    // appear are there within milliseconds, so a failing assertion
    // gains nothing from waiting the 4s default - fail fast instead.
    defaultCommandTimeout: 1500,
    // Page loads over localhost are near-instant; 30s default only
    // stalls reports on a wedged server.
    pageLoadTimeout: 10000,
    // responseTimeout is the general cap; 5s fails stalled commands
    // quickly. The visual specs override this per-command: their very
    // tall screenshots (tags is ~61000px, ~23s to capture) legitimately
    // need longer, see snapshotOptions in visual_regression.cy.js.
    responseTimeout: 5000,
    // Retry flaky tests when running headless (CI), never interactively.
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
})
