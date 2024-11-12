// tests/homepage.spec.js

const { test, expect } = require('@playwright/test');

test.describe('Homepage Tests', () => {
  test('should load the homepage and display correct title', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');

    // Check that the page has the correct title
    await expect(page).toHaveTitle(/Home Page/i);

    // Check that the header contains the correct text
    await expect(page.locator('header h1')).toHaveText('My Express EJS App');
  });

  test('should display navigation links', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');

    // Check that the navigation contains 'Home', 'About', 'Users'
    const nav = page.locator('header nav');

    await expect(nav.locator('a[href="/"]')).toHaveText('Home');
    await expect(nav.locator('a[href="/about"]')).toHaveText('About');
    await expect(nav.locator('a[href="/users"]')).toHaveText('Users');
  });

  test('should display main content correctly', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');

    // Check for the main heading
    await expect(page.locator('main h2')).toHaveText('Welcome to the Home Page!');

    // Check for the main paragraph
    await expect(page.locator('main p')).toHaveText('This is the home page of your Express EJS application.');
  });

});
