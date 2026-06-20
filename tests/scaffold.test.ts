import { readFile } from "node:fs/promises";
import { describe, expect, test } from "vitest";

describe("Astro scaffold", () => {
  test("uses the production canonical domain in legacy deployment metadata", async () => {
    const [robots, sitemap] = await Promise.all([
      readFile("robots.txt", "utf8"),
      readFile("sitemap.xml", "utf8"),
    ]);

    expect(robots).toContain("Sitemap: https://minjoon.me/sitemap.xml");
    expect(sitemap).toContain("<loc>https://minjoon.me/</loc>");
    expect(`${robots}\n${sitemap}`).not.toContain("https://unclesamsun.github.io");
  });

  test("declares the local npm package manager", async () => {
    const packageJson = JSON.parse(await readFile("package.json", "utf8"));

    expect(packageJson.packageManager).toBe("npm@11.11.0");
  });
});
