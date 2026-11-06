import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
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
    // quickly.
    responseTimeout: 5000,
  },
})
