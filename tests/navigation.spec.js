// tests/homepage.spec.js

const { test, expect } = require('@playwright/test');

test.describe('Homepage Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before each test
    await page.goto('/');
  });

  test('should load the homepage and display correct title', async ({ page }) => {
    // Check that the page has the correct title
    await expect(page).toHaveTitle('Home Page');

    // Check that the header contains the correct text
    await expect(page.locator('header h1')).toHaveText('My Express EJS App');

    // Check that the main content displays the correct heading and message
    await expect(page.locator('main h2')).toHaveText('Welcome to the Home Page!');
    await expect(page.locator('main p')).toHaveText('This is the home page of your Express EJS application.');
  });

  test('should display navigation links with correct text and href', async ({ page }) => {
    // Locate the navigation bar
    const nav = page.locator('header nav');

    // Check that the navigation contains 'Home', 'About', 'Users'
    const links = nav.locator('a');
    await expect(links).toHaveCount(3);

    // Verify each navigation link's text and href attribute
    await expect(links.nth(0)).toHaveAttribute('href', '/');
    await expect(links.nth(0)).toHaveText('Home');

    await expect(links.nth(1)).toHaveAttribute('href', '/about');
    await expect(links.nth(1)).toHaveText('About');

    await expect(links.nth(2)).toHaveAttribute('href', '/users');
    await expect(links.nth(2)).toHaveText('Users');
  });

  test('should navigate to About page and display correct content', async ({ page }) => {
    // Click on the 'About' navigation link
    await page.click('header nav >> text=About');

    // Wait for navigation to complete and verify URL
    await expect(page).toHaveURL('/about');

    // Verify the page title
    await expect(page).toHaveTitle('About Us');

    // Verify the header remains consistent
    await expect(page.locator('header h1')).toHaveText('My Express EJS App');

    // Verify the main content of the About page
    await expect(page.locator('main h2')).toHaveText('Learn more About Us.');
    await expect(page.locator('main p')).toHaveText('This is the About page of your Express EJS application.');
  });

  test('should navigate to Users page and display correct content', async ({ page }) => {
    // Click on the 'Users' navigation link
    await page.click('header nav >> text=Users');

    // Wait for navigation to complete and verify URL
    await expect(page).toHaveURL('/users');

    // Verify the page title
    await expect(page).toHaveTitle('Users');

    // Verify the header remains consistent
    await expect(page.locator('header h1')).toHaveText('My Express EJS App');

    // Verify the main content of the Users page
    await expect(page.locator('main h2')).toHaveText('List of Users');
    await expect(page.locator('main ul')).toBeVisible();

    // Optionally, verify the list of users
    const users = page.locator('main ul li');
    await expect(users).toHaveCount(4);
    await expect(users.nth(0)).toHaveText('Alice, Age: 25');
    await expect(users.nth(1)).toHaveText('Bob, Age: 30');
    await expect(users.nth(2)).toHaveText('Charlie, Age: 35');
    await expect(users.nth(3)).toHaveText('Keith, Age: 49');
  });

});
