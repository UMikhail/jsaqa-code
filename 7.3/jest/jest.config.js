/** @type {import('jest').Config} */
const config = {
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!**/jest.config.js/**",
  ],
};

module.exports = config;
