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

async function openFileWithTerminal(page: import("@playwright/test").Page, fileName: string) {
  await openTerminal(page);
  const terminal = page.getByLabel("Terminal command");
  await terminal.fill(`open ${fileName}`);
  await terminal.press("Enter");
  await expect(page.getByText(`opened ${fileName}`)).toBeVisible();
  await page.getByRole("region", { name: "Portfolio terminal" }).getByLabel("Close terminal").click();
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

test("home opens Profile.md before the project summary", async ({ page }) => {
  await page.goto("/");
  await waitForPortfolioHydration(page);

  await expect(page.getByText("// Profile.md")).toBeVisible();
  await expect(page.getByRole("heading", { name: "프로필" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "프로젝트 요약" })).toHaveCount(0);
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
  await waitForPortfolioHydration(page);
  await openFileWithTerminal(page, "ProjectSummary.md");

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
  await expect(page.getByText("try: ls 또는 ls projects")).toBeVisible();
});

test("terminal presents a clean compact shell popover", async ({ page }) => {
  await page.goto("/");
  await waitForPortfolioHydration(page);

  await openTerminal(page);

  const terminalRegion = page.getByRole("region", { name: "Portfolio terminal" });
  await expect(terminalRegion.getByText("minjoon@portfolio: ~")).toBeVisible();
  await expect(terminalRegion.getByText("minjoon@portfolio:~$").first()).toBeVisible();
  await expect(terminalRegion.getByLabel("Close terminal")).toBeVisible();

  const placement = await terminalRegion.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      rightGap: window.innerWidth - rect.right,
      bottomGap: window.innerHeight - rect.bottom,
      width: rect.width,
      height: rect.height,
      viewportWidth: window.innerWidth,
    };
  });

  expect(placement.rightGap).toBeLessThanOrEqual(32);
  expect(placement.bottomGap).toBeGreaterThanOrEqual(80);
  expect(placement.bottomGap).toBeLessThanOrEqual(130);
  expect(placement.width).toBeLessThanOrEqual(Math.min(580, placement.viewportWidth - 24));
  expect(placement.height).toBeLessThanOrEqual(390);
});

test("terminal ls guides users and short open command switches to the Hola project file", async ({ page }) => {
  await page.goto("/");
  await waitForPortfolioHydration(page);

  await openTerminal(page);
  const terminal = page.getByLabel("Terminal command");
  await terminal.fill("ls");
  await terminal.press("Enter");
  await expect(page.getByText("Tip: open Profile.md 또는 ls projects")).toBeVisible();

  await terminal.fill("ls projects");
  await terminal.press("Enter");
  await expect(page.getByText("Tip: Projects/ 없이 open hola-climbing.md 로 열 수 있습니다.")).toBeVisible();

  await terminal.fill("open hola-climbing.md");
  await terminal.press("Enter");

  await expect(page.getByText("opened hola-climbing.md")).toBeVisible();
  await expect(page.getByText("// Projects/hola-climbing.md")).toBeVisible();
  await expect(page.getByText("// AI PIPELINE")).toBeVisible();
});

test("terminal opens the combined profile page with education and career", async ({ page }) => {
  await page.goto("/");
  await waitForPortfolioHydration(page);

  await openTerminal(page);
  const terminal = page.getByLabel("Terminal command");

  await terminal.fill("open Profile.md");
  await terminal.press("Enter");
  await expect(page.getByRole("heading", { name: "프로필" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "SSAFY - 삼성청년SW아카데미" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "샬롬엔지니어링(주) - 하드웨어 및 소프트웨어 개발 대리" })).toBeVisible();
});

test("ProjectSummary.md acts as a project summary rather than a mixed profile page", async ({ page }) => {
  await page.goto("/");
  await waitForPortfolioHydration(page);
  await openFileWithTerminal(page, "ProjectSummary.md");

  await expect(page.getByRole("heading", { name: "프로젝트 요약" })).toBeVisible();
  await expect(page.getByText("// Projects/ProjectSummary.md")).toBeVisible();
  await expect(page.getByRole("heading", { name: "SSAFY - 삼성청년SW아카데미" })).toHaveCount(0);
});

test("Contact.md uses a clean invitation copy and spaced contact buttons", async ({ page }) => {
  await page.goto("/");
  await waitForPortfolioHydration(page);
  await openFileWithTerminal(page, "Contact.md");

  await expect(page.getByText("// Contact.md")).toBeVisible();
  await expect(page.getByText("프로젝트나 협업에 대해 이야기를 나누고 싶다면 편하게 연락 주세요.")).toBeVisible();

  const links = page.locator(".editor-pane .contact-links .portfolio-link-button");
  await expect(links).toHaveCount(2);
  const emailBox = await links.nth(0).boundingBox();
  const githubBox = await links.nth(1).boundingBox();
  expect(emailBox).not.toBeNull();
  expect(githubBox).not.toBeNull();
  if (!emailBox || !githubBox) return;

  const sameRow = Math.abs(githubBox.y - emailBox.y) < 4;
  if (sameRow) {
    expect(githubBox.x - (emailBox.x + emailBox.width)).toBeGreaterThanOrEqual(14);
  } else {
    expect(githubBox.y - (emailBox.y + emailBox.height)).toBeGreaterThanOrEqual(14);
  }
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

  await terminal.fill("open ho");
  await terminal.press("Tab");
  await expect(terminal).toHaveValue("open hola-climbing.md");
  await terminal.press("Enter");
  await expect(page.getByText("opened hola-climbing.md")).toBeVisible();
  await expect(page.getByRole("region", { name: "Portfolio terminal" }).getByLabel("Close terminal")).toBeVisible();
});

test("detail route opens project detail as an in-shell modal", async ({ page }) => {
  await page.goto("/");
  await waitForPortfolioHydration(page);
  await openFileWithTerminal(page, "ProjectSummary.md");

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

test("project detail evidence media stays inside the media frame", async ({ page }) => {
  await page.goto("/projects/hola-climbing/");

  const cards = page.locator(".evidence-card");
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);

  for (let index = 0; index < count; index += 1) {
    const card = cards.nth(index);
    const mediaBox = await card.locator(".evidence-media").boundingBox();
    const imageBox = await card.locator(".evidence-media img").first().boundingBox();
    const bodyBox = await card.locator(".evidence-body").boundingBox();

    expect(mediaBox).not.toBeNull();
    expect(imageBox).not.toBeNull();
    expect(bodyBox).not.toBeNull();
    if (!mediaBox || !imageBox || !bodyBox) continue;

    expect(imageBox.x).toBeGreaterThanOrEqual(mediaBox.x - 1);
    expect(imageBox.y).toBeGreaterThanOrEqual(mediaBox.y - 1);
    expect(imageBox.x + imageBox.width).toBeLessThanOrEqual(mediaBox.x + mediaBox.width + 1);
    expect(imageBox.y + imageBox.height).toBeLessThanOrEqual(mediaBox.y + mediaBox.height + 1);
    expect(mediaBox.y + mediaBox.height).toBeLessThanOrEqual(bodyBox.y + 1);
  }
});

test("mobile navigator toggles the explorer as a drawer", async ({ page }) => {
  await page.goto("/");
  await waitForPortfolioHydration(page);

  const toggle = page.getByRole("button", { name: "Open file navigator" });
  test.skip(!(await toggle.isVisible()), "navigator toggle is only shown on the mobile layout");

  const explorer = page.getByLabel("Portfolio file explorer");
  const explorerBox = await explorer.boundingBox();
  expect(explorerBox?.x ?? 0).toBeLessThan(0); // drawer parked off-screen

  await toggle.click();
  await expect.poll(async () => (await explorer.boundingBox())?.x ?? -1).toBe(0);

  await explorer.getByText("readandshare.md", { exact: true }).click();
  await expect(page.getByText("// Projects/readandshare.md")).toBeVisible();
  await expect.poll(async () => (await explorer.boundingBox())?.x ?? 0).toBeLessThan(0);
});

test("home and Hola detail avoid horizontal overflow", async ({ page }) => {
  for (const path of ["/", "/projects/hola-climbing/"]) {
    await page.goto(path);
    await expectNoHorizontalOverflow(page);
  }
});
