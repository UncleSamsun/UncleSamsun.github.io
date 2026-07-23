import { expect, test } from "@playwright/test";

async function expectNoHorizontalOverflow(page: import("@playwright/test").Page) {
  const widths = await page.evaluate(() => ({
    scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    viewportWidth: window.innerWidth,
  }));

  expect(widths.scrollWidth).toBeLessThanOrEqual(widths.viewportWidth);
}

test("home is a navigable room that opens into the project street", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "AI를 서비스로." })).toBeVisible();
  await expect(page.getByRole("button", { name: "소개 보기" })).toBeVisible();
  await expect(page.getByRole("button", { name: "스킬 보기" })).toBeVisible();
  await expect(page.getByRole("button", { name: "프로젝트 둘러보기" })).toBeVisible();

  await page.getByRole("button", { name: "스킬 보기" }).click();
  await expect(page.getByRole("heading", { name: "직접 쓰는 기술." })).toBeVisible();

  await page.getByRole("button", { name: "프로젝트 둘러보기" }).click();
  await expect(page.getByTitle("MINJOON ST. 프로젝트 거리")).toBeVisible();
  const street = page.frameLocator('iframe[title="MINJOON ST. 프로젝트 거리"]');
  await expect(street.locator(".street-entry-cue")).toHaveText("입장 →");
  await expect(page.getByRole("link", { name: "Hola Climbing" })).toHaveAttribute(
    "href",
    "/projects/hola-climbing/?from=street",
  );
  await expectNoHorizontalOverflow(page);
});

test("last project street leads back to the home doorbell", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "프로젝트 둘러보기" }).click();

  const street = page.frameLocator('iframe[title="MINJOON ST. 프로젝트 거리"]');
  await street.locator("#stage").evaluate(() => (window as unknown as { __dot: { jump: (index: number) => void } }).__dot.jump(4));
  await street.locator("#stage").press("ArrowRight");

  await expect(page.getByRole("heading", { name: "연락하기." })).toBeVisible();
  await expect(page.getByRole("link", { name: "alswns5620@naver.com" })).toHaveAttribute("href", "mailto:alswns5620@naver.com");
  await expectNoHorizontalOverflow(page);
});

test("store detail uses readable project content over the interior concept", async ({ page }) => {
  await page.goto("/projects/hola-climbing/");

  await expect(page.getByRole("heading", { name: "Hola Climbing" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "프로젝트 안내" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "AI·데이터 파이프라인" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Redis Streams 기반 AI dispatch" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Live Service" })).toHaveAttribute("href", "https://hola-climb.app");
  await expect(page.getByRole("link", { name: "Hola Climbing 가게가 있는 거리로 나가기" })).toHaveAttribute(
    "href",
    "/?scene=street&shop=hola-climbing&arrival=store",
  );
  await expect(page.locator(".store-interior")).toHaveCount(1);
  const keyEvidence = page.locator(".store-reading-panel .rich-text-mark").first();
  await expect(keyEvidence).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(keyEvidence).toHaveCSS("text-decoration-line", "underline");
  await expectNoHorizontalOverflow(page);
});

test("street return route restores the project position", async ({ page }) => {
  await page.goto("/?scene=street&shop=readandshare");

  const street = page.frameLocator('iframe[title="MINJOON ST. 프로젝트 거리"]');
  await expect(street.locator("#ix")).toHaveText("04 / 05");
  await expect(street.locator(".street-scene")).toHaveCount(5);
  await expect(street.locator(".street-scene.is-active img")).toHaveAttribute(
    "src",
    "/assets/street/readandshare-district.png",
  );
  await expectNoHorizontalOverflow(page);
});

test("world keeps direction when returning from the contact house and a project store", async ({ page }) => {
  await page.goto("/?scene=street&shop=jsonstore");

  let street = page.frameLocator('iframe[title="MINJOON ST. 프로젝트 거리"]');
  await expect(street.locator("#ix")).toHaveText("05 / 05");
  await street.locator("#stage").press("ArrowRight");
  await expect(page.getByRole("heading", { name: "연락하기." })).toBeVisible();

  await page.getByRole("button", { name: "문 안으로 들어가 작업실로 돌아가기" }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { name: "AI를 서비스로." })).toBeVisible();

  await page.goto("/?scene=street&shop=jsonstore");
  street = page.frameLocator('iframe[title="MINJOON ST. 프로젝트 거리"]');
  await street.locator("#stage").press("ArrowRight");
  await expect(page.getByRole("heading", { name: "연락하기." })).toBeVisible();
  await page.getByRole("button", { name: "거리로 돌아가기" }).click();
  street = page.frameLocator('iframe[title="MINJOON ST. 프로젝트 거리"]');
  await expect(street.locator("#ix")).toHaveText("05 / 05");

  await page.goto("/?scene=street&shop=readandshare");
  street = page.frameLocator('iframe[title="MINJOON ST. 프로젝트 거리"]');
  await expect(street.locator("#ix")).toHaveText("04 / 05");
  await street.locator("#store-entry").click();
  await expect(page).toHaveURL("/projects/readandshare/?from=street");

  await page.getByRole("link", { name: "ReadAndShare 가게가 있는 거리로 나가기" }).click();
  await expect(page).toHaveURL("/?scene=street&shop=readandshare");
  street = page.frameLocator('iframe[title="MINJOON ST. 프로젝트 거리"]');
  await expect(street.locator("#ix")).toHaveText("04 / 05");
});

test("store details offer an animated keyboard exit as well as the visible street link", async ({ page }) => {
  await page.goto("/?scene=street&shop=the-last-supper");

  const street = page.frameLocator('iframe[title="MINJOON ST. 프로젝트 거리"]');
  await street.locator("#store-entry").click();
  await expect(page).toHaveURL("/projects/the-last-supper/?from=street");
  await expect(page.getByRole("link", { name: "The Last Supper 가게가 있는 거리로 나가기" })).toBeVisible();
  await expect(page.getByText("Esc · 브라우저 ←")).toHaveCount(1);

  await page.keyboard.press("Escape");
  await expect(page).toHaveURL("/?scene=street&shop=the-last-supper");
  await expect(page.frameLocator('iframe[title="MINJOON ST. 프로젝트 거리"]').locator("#ix")).toHaveText("03 / 05");
});

test("direct project visits never rely on a fixed history offset for Escape", async ({ page }) => {
  await page.goto("/projects/hola-climbing/?from=street");
  await expect(page.getByRole("heading", { name: "Hola Climbing" })).toBeVisible();

  await page.keyboard.press("Escape");

  await expect(page).toHaveURL("/?scene=street&shop=hola-climbing");
  await expect(page.frameLocator('iframe[title="MINJOON ST. 프로젝트 거리"]').locator("#ix")).toHaveText("01 / 05");
});

test("browser back exits a store through the same street transition", async ({ page }) => {
  await page.goto("/?scene=street&shop=cafe-gamsugwang");

  const street = page.frameLocator('iframe[title="MINJOON ST. 프로젝트 거리"]');
  await street.locator("#store-entry").click();
  await expect(page).toHaveURL("/projects/cafe-gamsugwang/?from=street");

  await page.evaluate(() => window.history.back());
  await expect(page).toHaveURL("/?scene=street&shop=cafe-gamsugwang");
  await expect(page.frameLocator('iframe[title="MINJOON ST. 프로젝트 거리"]').locator("#ix")).toHaveText("02 / 05");
});

test("the first storefront returns naturally to the room", async ({ page }) => {
  await page.goto("/?scene=street&shop=hola-climbing");

  const street = page.frameLocator('iframe[title="MINJOON ST. 프로젝트 거리"]');
  await expect(street.locator("#ix")).toHaveText("01 / 05");
  await street.locator("#stage").press("ArrowLeft");
  await expect(page.getByRole("heading", { name: "AI를 서비스로." })).toBeVisible();
});

test("vertical scrolling never sends the first storefront back to the room", async ({ page }) => {
  await page.goto("/?scene=street&shop=hola-climbing");

  const street = page.frameLocator('iframe[title="MINJOON ST. 프로젝트 거리"]');
  await street.locator("#stage").evaluate((element) => {
    element.dispatchEvent(new WheelEvent("wheel", { bubbles: true, cancelable: true, deltaY: -120 }));
  });

  await expect(street.locator("#ix")).toHaveText("01 / 05");
  await expect(page.getByRole("heading", { name: "AI를 서비스로." })).toHaveCount(0);
});

test("mobile street and store detail stay within the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "AI를 서비스로." })).toBeVisible();
  await page.getByRole("button", { name: "스킬 보기" }).click();
  await expect(page.getByRole("heading", { name: "직접 쓰는 기술." })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.goto("/projects/cafe-gamsugwang/");
  await expect(page.getByRole("heading", { name: "카페감수광" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "검증 자료" })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("not-found page keeps a local path back to the street", async ({ page }) => {
  await page.goto("/404");

  await expect(page.getByRole("heading", { name: "페이지를 찾을 수 없습니다." })).toBeVisible();
  await expect(page.getByRole("link", { name: "포트폴리오 홈으로 돌아가기" })).toHaveAttribute("href", "/");
});
