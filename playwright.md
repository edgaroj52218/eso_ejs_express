# Playwright End-to-End Testing Guide

Welcome to the **Playwright End-to-End (E2E) Testing Guide**! This guide provides a streamlined setup for testing your Express.js application using Playwright. Follow the steps below to install, configure, and run your first Playwright tests.

## Table of Contents

- [Playwright End-to-End Testing Guide](#playwright-end-to-end-testing-guide)
  - [Table of Contents](#table-of-contents)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Installation](#2-installation)
  - [3. Project Structure](#3-project-structure)
    - [File Descriptions](#file-descriptions)
  - [4. Playwright Configuration](#4-playwright-configuration)
    - [Key Settings](#key-settings)
  - [5. Writing Your First Test](#5-writing-your-first-test)
    - [Test Breakdown](#test-breakdown)
  - [6. Running Tests](#6-running-tests)
    - [Update `package.json` Scripts](#update-packagejson-scripts)
    - [Execute Tests](#execute-tests)
    - [Run Tests in Headed Mode (Optional)](#run-tests-in-headed-mode-optional)
    - [Generate and View HTML Report](#generate-and-view-html-report)
  - [7. Viewing Test Artifacts](#7-viewing-test-artifacts)
  - [8. Debugging Tests](#8-debugging-tests)
    - [Playwright Inspector](#playwright-inspector)
    - [Using `page.pause()`](#using-pagepause)
    - [Screenshots and Traces](#screenshots-and-traces)
  - [9. Additional Resources](#9-additional-resources)

---

## 1. Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14 or higher): [Download Node.js](https://nodejs.org/)
- **NPM** (comes with Node.js)

## 2. Installation

1. **Initialize Your Project**

   If you haven't already, initialize a new Node.js project:

   ```bash
   npm init -y
   ```

2. **Install Dependencies**

   Install Express.js and Playwright as development dependencies:

   ```bash
   npm install express
   npm install --save-dev @playwright/test
   ```

3. **Install Playwright Browsers**

   Download the necessary browser binaries:

   ```bash
   npx playwright install
   ```

## 3. Project Structure

Organize your project as follows:

```
your-project/
├── src/
│   ├── app.js
│   └── server.js
├── tests/
│   └── homepage.spec.js
├── playwright.config.js
├── package.json
└── .env (optional)
```

### File Descriptions

- **`src/app.js`**: Configures and exports your Express application without starting the server.
- **`src/server.js`**: Imports the Express app and starts the server.
- **`tests/homepage.spec.js`**: Contains Playwright tests for the homepage.
- **`playwright.config.js`**: Configures Playwright settings.
- **`.env`**: (Optional) Stores environment variables.

## 4. Playwright Configuration

Create a `playwright.config.js` file in the root directory with the following content:

```javascript
// playwright.config.js

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000, // 30 seconds per test
  retries: process.env.CI ? 2 : 0, // Retries on CI
  workers: process.env.CI ? 2 : undefined, // Parallel workers
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'on', // Capture video for all tests
    trace: 'retain-on-failure',
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'npm run start', // Starts the Express server
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000, // 2 minutes
    stdout: 'pipe',
  },

  outputDir: 'test-results/',
});
```

### Key Settings

- **`testDir`**: Directory containing test files.
- **`use`**: Shared settings for all tests.
  - **`baseURL`**: Base URL for navigation.
  - **`video`**: Captures video for every test.
- **`projects`**: Defines browser projects (only Chromium here).
- **`webServer`**: Automatically starts your Express server before tests.
- **`reporter`**: Specifies test reporters.

## 5. Writing Your First Test

Create a test file at `tests/homepage.spec.js` with the following content:

```javascript
// tests/homepage.spec.js

const { test, expect } = require('@playwright/test');

test.describe('Homepage Tests', () => {
  
  test('should load the homepage and display correct title', async ({ page }) => {
    await page.goto('/'); // Navigates to http://localhost:3000/
    await expect(page).toHaveTitle(/Home Page/i);
    await expect(page.locator('header h1')).toHaveText('My Express EJS App');
  });

  test('should display navigation links', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('header nav');
    await expect(nav.locator('a[href="/"]')).toHaveText('Home');
    await expect(nav.locator('a[href="/about"]')).toHaveText('About');
    await expect(nav.locator('a[href="/users"]')).toHaveText('Users');
  });

  test('should display main content correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main h2')).toHaveText('Welcome to the Home Page!');
    await expect(page.locator('main p')).toHaveText('This is the home page of your Express EJS application.');
  });

  test('should display footer correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer p')).toHaveText('© 2024 Express EJS Demo. All rights reserved.');
  });

});
```

### Test Breakdown

1. **Title Verification**: Ensures the page title is "Home Page".
2. **Header Verification**: Checks that the header displays "My Express EJS App".
3. **Navigation Links**: Verifies the presence and text of navigation links.
4. **Main Content**: Confirms the main heading and paragraph are correct.
5. **Footer Verification**: Ensures the footer contains the correct text.

## 6. Running Tests

### Update `package.json` Scripts

Add the following scripts to your `package.json`:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test:e2e": "playwright test",
    "test:report": "playwright show-report"
  }
}
```

### Execute Tests

Run the E2E tests using:

```bash
npm run test:e2e
```

### Run Tests in Headed Mode (Optional)

For visual debugging, run tests with the browser UI visible:

```bash
npx playwright test --headed
```

### Generate and View HTML Report

After tests complete, generate and view the HTML report:

```bash
npm run test:report
```

## 7. Viewing Test Artifacts

- **Videos**: Located in `test-results/videos/`. Each test has its own video recording.
- **HTML Report**: Open `playwright-report/index.html` in your browser for a detailed overview.

## 8. Debugging Tests

### Playwright Inspector

Launch the inspector to step through tests:

```bash
npx playwright test --debug
```

### Using `page.pause()`

Insert `page.pause()` in your test to open the inspector at a specific point:

```javascript
await page.goto('/');
await page.pause(); // Execution pauses here
```

### Screenshots and Traces

- **Screenshots**: Automatically captured on test failures.
- **Traces**: Collected on failures for in-depth debugging.

## 9. Additional Resources

- **Playwright Documentation**: [https://playwright.dev/docs/intro](https://playwright.dev/docs/intro)
- **Playwright GitHub Repository**: [https://github.com/microsoft/playwright](https://github.com/microsoft/playwright)
- **Playwright Examples**: [https://github.com/microsoft/playwright/tree/main/examples](https://github.com/microsoft/playwright/tree/main/examples)
- **Community Support**: Join the [Playwright Discord](https://playwright.dev/community/) or ask questions on [Stack Overflow](https://stackoverflow.com/questions/tagged/playwright).

---

**Happy Testing! 🚀**