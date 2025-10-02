import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(
    /Edemy 🎓 - Discover and learn about any topic 🔖/
  );
});
