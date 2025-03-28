import { defineConfig } from 'cypress'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    setupNodeEvents(on, config) {
      on('before:run', () => {
        // Clean up screenshots directory before run
        const screenshotsDir = path.join('cypress', 'screenshots')
        if (fs.existsSync(screenshotsDir)) {
          fs.rmSync(screenshotsDir, { recursive: true })
        }
      })
      return config
    }
  },
  
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  },

  screenshotsFolder: 'cypress/screenshots',
  trashAssetsBeforeRuns: true
})