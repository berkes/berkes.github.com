// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import { addMatchImageSnapshotCommand } from '@simonsmith/cypress-image-snapshot/command'

addMatchImageSnapshotCommand()
// The Discu comment script performs a runtime fetch to an external API,
// which rejects when CI has no external network. That rejection is
// unrelated to any render under test; comment templates are covered by
// explicit assertions instead.
Cypress.on('uncaught:exception', (err) => {
  if (err.message && err.message.includes('Failed to fetch')) {
    return false
  }
})
