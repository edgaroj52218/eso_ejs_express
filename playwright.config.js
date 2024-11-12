// playwright.config.js

// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright Configuration File
 * 
 * Optimized to:
 * - Use only Chromium browser
 * - Capture videos for all tests
 */

module.exports = defineConfig({
  // **Test Directory**
  testDir: './tests',

  // **Timeouts**
  timeout: 30 * 1000, // Maximum time one test can run (30 seconds)

  // **Retries**
  retries: process.env.CI ? 2 : 0, // Retry tests twice on CI, no retries locally

  // **Workers**
  workers: process.env.CI ? 2 : undefined, // Limit workers on CI for resource constraints

  // **Reporter**
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],

  // **Use**
  use: {
    // Base URL for your application under test
    baseURL: 'http://localhost:3000',

    // Browser options
    headless: true, // Run tests in headless mode
    viewport: { width: 1280, height: 720 }, // Set viewport size

    // Action timeout
    actionTimeout: 0, // No limit

    // Ignore HTTPS errors
    ignoreHTTPSErrors: true,

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // **Video recording for all tests**
    video: 'on', // Capture video for every test

    // Trace collection for debugging
    trace: 'retain-on-failure', // Retain traces only on failure
  },

  // **Projects**
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // **Global Setup and Teardown via Web Server**
  // Automatically starts your Express server before running tests
  webServer: {
    command: 'npm run start', // Command to start your server
    url: 'http://localhost:3000', // URL to wait for before running tests
    reuseExistingServer: !process.env.CI, // Reuse server if already running locally
    timeout: 120 * 1000, // Maximum time to wait for the server to start (2 minutes)
    stdout: 'pipe', // Capture server output (optional)
  },

  // **Reporter Options**
  // Configure where videos are stored
  outputDir: 'test-results/', // Optional: Directory for test artifacts
});
