import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";

test("legacy home metadata uses the production canonical URL", async () => {
  const html = await readFile("index.html", "utf8");

  expect(html).toContain('<link rel="canonical" href="https://minjoon.me/" />');
  expect(html).toContain('<meta property="og:url" content="https://minjoon.me/" />');
});
