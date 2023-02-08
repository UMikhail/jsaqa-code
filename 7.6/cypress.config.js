const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    retries: 1,
    viewportHeight: 768,
    viewportWidth: 1366,
    specPattern: "cypress/e2e/**/*.spec.{js, jsx, ts, tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
