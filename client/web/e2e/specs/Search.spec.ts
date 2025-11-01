import { test, expect, Page } from "@playwright/test";

const SEARCH_INPUT_PLACEHOLDER = "Search";
const COURSE_CARD_SELECTOR = ".card";

async function searchAndAwait(
  page: Page,
  keyword: string,
  delay: number = 500
) {
  const searchInput = page.getByPlaceholder(SEARCH_INPUT_PLACEHOLDER);
  await searchInput.fill(keyword, { timeout: 60000 });
  await page.waitForTimeout(delay);
}

test.describe("Search Feature E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", {
      waitUntil: "networkidle",
    });
  });

  test("should successfully search for a course and display results", async ({
    page,
  }) => {
    const keyword = "Python";

    await test.step("1. Perform search with a valid keyword", async () => {
      await searchAndAwait(page, keyword);
    });

    await test.step("2. Verify URL is updated", async () => {
      await expect(page).toHaveURL(new RegExp(`search=${keyword}`, "i"));
    });

    await test.step("3. Verify results are displayed", async () => {
      await expect(page.locator(COURSE_CARD_SELECTOR).first()).toBeVisible()
    });
  });
});
