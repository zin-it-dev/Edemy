import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should display sign-in and sign-up options on home page', async ({ page }) => {
    await page.goto('/');
    
    // Check if we can navigate to sign-in
    const signInLink = page.locator('a').filter({ hasText: 'Sign In' });
    await signInLink.click();
    await expect(page).toHaveURL(/\/sign-in/);
    
    // Go back and check sign-up
    await page.goto('/');
    const signUpLink = page.locator('a').filter({ hasText: 'Get Started' });
    await signUpLink.click();
    await expect(page).toHaveURL(/\/sign-up/);
  });

  test('should redirect unauthenticated users to sign-in when accessing dashboard', async ({ page }) => {
    // Try to access dashboard directly
    await page.goto('/dashboard');
    
    // Should redirect to sign-in
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test('should display sign-in form with proper fields', async ({ page }) => {
    await page.goto('/sign-in');
    
    // Check that the sign-in page loaded
    await expect(page).toHaveURL(/\/sign-in/);
    
    // Check for email field (using more general selector)
    const emailInput = page.locator('input[type="email"]').or(page.getByPlaceholder(/email/i));
    await expect(emailInput.first()).toBeVisible({ timeout: 10000 });
    
    // Check for password field (using more general selector)
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput.first()).toBeVisible();
    
    // Check for continue button
    await expect(page.getByRole('button', { name: 'Continue' }).or(page.getByRole('button', { name: 'Sign in' })).first()).toBeVisible();
  });

  test('should display sign-up form with proper fields', async ({ page }) => {
    await page.goto('/sign-up');
    
    // Check that the sign-up page loaded
    await expect(page).toHaveURL(/\/sign-up/);
    
    // Check for email field (using more general selector)
    const emailInput = page.locator('input[type="email"]').or(page.getByPlaceholder(/email/i));
    await expect(emailInput.first()).toBeVisible({ timeout: 10000 });
    
    // Check for password field (using more general selector)
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput.first()).toBeVisible();
    
    // Check for continue button
    await expect(page.getByRole('button', { name: 'Continue' }).or(page.getByRole('button', { name: 'Sign up' })).first()).toBeVisible();
  });

  test('should protect dashboard routes from unauthenticated access', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/sign-in/, { timeout: 10000 });
  });
});
