import { expect, test } from "@playwright/test";

test("home metadata uses the production canonical URL", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("김민준 | Backend & AI Portfolio");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://minjoon.me/");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://minjoon.me/assets/og-image.svg",
  );
});
