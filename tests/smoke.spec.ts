import { expect, test } from "@playwright/test";

async function expectNoHorizontalOverflow(page: import("@playwright/test").Page) {
  const widths = await page.evaluate(() => ({
    scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    viewportWidth: window.innerWidth,
  }));

  expect(widths.scrollWidth).toBeLessThanOrEqual(widths.viewportWidth);
}

async function waitForPortfolioHydration(page: import("@playwright/test").Page) {
  await expect(page.locator("astro-island[ssr]")).toHaveCount(0);
}

async function openTerminal(page: import("@playwright/test").Page) {
  await page.getByRole("button", { name: "Open terminal" }).click();
  await expect(page.getByLabel("Terminal command")).toBeVisible();
}

test("home renders IDE shell and Hola project", async ({ page }) => {
  await page.goto("/");
  await waitForPortfolioHydration(page);

  await expect(page.getByText("PROJECTS", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Portfolio file explorer").getByText("hola-climbing.md", { exact: true })).toBeVisible();

  await openTerminal(page);
  const terminal = page.getByLabel("Terminal command");
  await terminal.fill("whoami");
  await terminal.press("Enter");
  await expect(page.getByText("김민준 - Backend Developer")).toBeVisible();
});

test("hola detail route renders backend and AI content", async ({ page }) => {
  await page.goto("/projects/hola-climbing/");

  await expect(page.getByRole("heading", { name: "Hola Climbing" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "AI.md" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "GCS Signed URL 직접 업로드" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Redis Streams 기반 AI dispatch" })).toBeVisible();
});

test("frontend-only stacks are not shown as project tech badges", async ({ page }) => {
  await page.goto("/");

  const holaTechBadges = page.getByLabel("Hola Climbing 기술 스택");
  await expect(holaTechBadges.getByText("Spring Boot 4")).toBeVisible();
  await expect(holaTechBadges.getByText("Vue 3")).toHaveCount(0);
  await expect(holaTechBadges.getByText("Capacitor")).toHaveCount(0);
});

test("not-found page renders local 404 content", async ({ page }) => {
  await page.goto("/404");

  await expect(page.getByRole("heading", { name: "페이지를 찾을 수 없습니다." })).toBeVisible();
  await expect(page.getByText("요청한 경로가 없거나 포트폴리오 파일 위치가 바뀌었습니다.")).toBeVisible();
});

test("terminal invalid open command explains the missing file", async ({ page }) => {
  await page.goto("/");
  await waitForPortfolioHydration(page);

  await openTerminal(page);
  const terminal = page.getByLabel("Terminal command");
  await terminal.fill("open missing.md");
  await terminal.press("Enter");

  await expect(page.getByText("open: missing.md: file not found")).toBeVisible();
  await expect(page.getByText("try: ls")).toBeVisible();
});

test("terminal valid open command switches to the Hola project file", async ({ page }) => {
  await page.goto("/");
  await waitForPortfolioHydration(page);

  await openTerminal(page);
  const terminal = page.getByLabel("Terminal command");
  await terminal.fill("open Projects/hola-climbing.md");
  await terminal.press("Enter");

  await expect(page.getByText("opened Projects/hola-climbing.md")).toBeVisible();
  await expect(page.getByText("// Projects/hola-climbing.md")).toBeVisible();
  await expect(page.getByText("// AI PIPELINE")).toBeVisible();
});

test("terminal supports keyboard shortcut, history, and tab completion", async ({ page, isMobile }) => {
  await page.goto("/");
  await waitForPortfolioHydration(page);

  const launcher = page.getByRole("button", { name: "Open terminal" });
  await expect(launcher).toHaveAttribute("title", /Ctrl\+`/);
  if (isMobile) {
    await launcher.click();
  } else {
    await page.keyboard.press("Control+Backquote");
  }

  const terminal = page.getByLabel("Terminal command");
  await expect(terminal).toBeVisible();
  await terminal.fill("whoami");
  await terminal.press("Enter");
  await terminal.fill("neofetch");
  await terminal.press("Enter");

  await terminal.press("ArrowUp");
  await expect(terminal).toHaveValue("neofetch");
  await terminal.press("ArrowUp");
  await expect(terminal).toHaveValue("whoami");
  await terminal.press("ArrowDown");
  await expect(terminal).toHaveValue("neofetch");

  await terminal.fill("open Projects/ho");
  await terminal.press("Tab");
  await expect(terminal).toHaveValue("open Projects/hola-climbing.md");
  await terminal.press("Enter");
  await expect(page.getByText("opened Projects/hola-climbing.md")).toBeVisible();
  await expect(page.getByRole("region", { name: "Portfolio terminal" }).getByLabel("Close terminal")).toBeVisible();
});

test("detail route opens project detail as an in-shell modal", async ({ page }) => {
  await page.goto("/");
  await waitForPortfolioHydration(page);

  await page
    .locator(".project-card")
    .filter({ has: page.getByRole("heading", { name: "Hola Climbing" }) })
    .getByRole("link", { name: "detail route" })
    .click();

  const dialog = page.getByRole("dialog", { name: /Hola Climbing/ });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "STAR.md" })).toBeVisible();
  expect(new URL(page.url()).pathname).toBe("/");

  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});

test("home and Hola detail avoid horizontal overflow", async ({ page }) => {
  for (const path of ["/", "/projects/hola-climbing/"]) {
    await page.goto(path);
    await expectNoHorizontalOverflow(page);
  }
});
