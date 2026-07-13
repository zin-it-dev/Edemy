import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration.
 *
 * baseURL resolution order:
 *   1. DEPLOYMENT_URL env var (set by CI against preview deploys)
 *   2. http://localhost:3000 (local dev default)
 *
 * Run a single project:   npx playwright test --project=chromium
 * Run the UI mode:        npx playwright test --ui
 * Debug one test:         npx playwright test path/to/file.spec.ts --debug
 */
const baseURL = process.env.DEPLOYMENT_URL ?? 'http://localhost:5173';

export default defineConfig({
  testDir: './e2e',

  // Run tests in each file in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source.
  forbidOnly: !!process.env.CI,

  // Retry flakes on CI, never locally.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel workers on CI to reduce flake from shared state.
  workers: process.env.CI ? 1 : undefined,

  // Reporters: pretty HTML report for humans, list reporter for CI logs.
  reporter: [['html', { open: 'never' }], ['list']],

  webServer: [
    {
      command: 'bunx --bun vite --host 127.0.0.1',
      url: 'http://localhost:5173',
      name: 'Frontend',
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
    },
  ],

  use: {
    baseURL,
    // Collect a trace the first time a test is retried — cheap and invaluable.
    trace: 'on-first-retry',
    // Capture a screenshot only when a test fails.
    screenshot: 'only-on-failure',
    // Record video on first retry too.
    video: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
