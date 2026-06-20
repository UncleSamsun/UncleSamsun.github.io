import { readFile, stat } from "node:fs/promises";
import { describe, expect, test } from "vitest";

describe("Astro scaffold", () => {
  test("uses the production canonical domain in public deployment metadata", async () => {
    const [robots, sitemap] = await Promise.all([
      readFile("public/robots.txt", "utf8"),
      readFile("public/sitemap.xml", "utf8"),
    ]);

    expect(robots).toContain("Sitemap: https://minjoon.me/sitemap.xml");
    expect(sitemap).toContain("<loc>https://minjoon.me/</loc>");
    expect(`${robots}\n${sitemap}`).not.toContain("unclesamsun.github.io");
  });

  test("declares the local npm package manager", async () => {
    const packageJson = JSON.parse(await readFile("package.json", "utf8"));

    expect(packageJson.packageManager).toBe("npm@11.11.0");
  });

  test("retires the legacy root static portfolio files", async () => {
    const legacyFiles = [
      "index.html",
      "styles.css",
      "script.js",
      "assets/projects.js",
      "assets/favicon.svg",
      "assets/og-image.svg",
      "projects/cafe-gamsugwang/index.html",
      "projects/jsonstore/index.html",
      "projects/readandshare/index.html",
      "projects/the-last-supper/index.html",
      "CNAME",
      "robots.txt",
      "sitemap.xml",
    ];

    for (const legacyFile of legacyFiles) {
      await expect(stat(legacyFile), legacyFile).rejects.toMatchObject({ code: "ENOENT" });
    }
  });

  test("deploys the Astro dist output to GitHub Pages", async () => {
    const workflow = await readFile(".github/workflows/deploy.yml", "utf8");

    expect(workflow).toContain("Deploy Astro portfolio to GitHub Pages");
    expect(workflow).toContain("actions/setup-node@v4");
    expect(workflow).toContain("node-version: 22");
    expect(workflow).toContain("npm run check");
    expect(workflow).toContain("npm run build");
    expect(workflow).toContain("actions/upload-pages-artifact@v3");
    expect(workflow).toContain("path: ./dist");
    expect(workflow).toContain("actions/deploy-pages@v4");
  });
});
