import { test, expect } from '@playwright/test';

test.describe('Home flow', () => {
    test('should be able to go to login page', async ({ page }) => {
        await page.goto('/');

        await expect(page.getByRole('heading', { name: 'Design, Build & Launch' })).toBeVisible();
    });
});