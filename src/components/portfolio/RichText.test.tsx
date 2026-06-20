import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { RichText } from "./RichText";

describe("RichText", () => {
  it("renders emphasis, highlights, and inline code markers", () => {
    const html = renderToStaticMarkup(
      <RichText text="**단독 담당**으로 ==p95 9.8ms== 근거와 `Redis Streams`를 정리했다." />,
    );

    expect(html).toContain('<strong class="rich-text-strong">단독 담당</strong>');
    expect(html).toContain('<mark class="rich-text-mark">p95 9.8ms</mark>');
    expect(html).toContain('<code class="rich-text-code">Redis Streams</code>');
  });

  it("renders plain text without wrappers when markers are absent", () => {
    expect(renderToStaticMarkup(<RichText text="마킹 없는 문장은 그대로 출력된다." />)).toBe(
      "마킹 없는 문장은 그대로 출력된다.",
    );
  });

  it("does not inject raw HTML from text", () => {
    const html = renderToStaticMarkup(<RichText text="==<script>alert(1)</script>==" />);

    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(html).not.toContain("<script>");
  });
});
