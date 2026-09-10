import { test, expect } from '@playwright/test'
 
test('should navigate to the sign in page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/')
  // Find an element with the text 'Sign In' and click on it
  await page.click('text=Sign in')
  // The new URL should be "/Sign in" (baseURL is used there)
  await expect(page).toHaveURL('http://localhost:3000/sign-in')
  // The new page should contain an h1 with "Sign in"
  await expect(page.locator('h1')).toContainText('Sign In')
})