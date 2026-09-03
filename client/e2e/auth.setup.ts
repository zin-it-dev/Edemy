import { test as setup, expect } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';

setup('authenticate as test user', async ({ page }) => {
  // Navigate to sign-in page
  await page.goto('/sign-in');
  
  // Fill in sign-in form with test credentials
  // Note: You'll need to configure Clerk test credentials in your environment
  await page.getByPlaceholder('Email address').fill(process.env.TEST_USER_EMAIL || 'test@example.com');
  await page.getByPlaceholder('Enter your password').fill(process.env.TEST_USER_PASSWORD || 'TestPassword123!');
  
  // Submit the form
  await page.getByRole('button', { name: 'Continue' }).click();
  
  // Wait for successful authentication
  await page.waitForURL('/dashboard', { timeout: 10000 });
  
  // Save authentication state
  await page.context().storageState({ path: STORAGE_STATE });
  
  // Verify we're on the dashboard
  await expect(page.getByTestId('dashboard-layout')).toBeVisible();
});
