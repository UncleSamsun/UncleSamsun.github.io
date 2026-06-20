import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test, vi } from "vitest";
import { activateOnKeyboard, type KeyboardActivationEvent } from "./events";
import { FileTreeItem } from "./FileTreeItem";
import { PortelloIconView, type PortelloIconName } from "./icons";
import { StatusBarItem } from "./StatusBarItem";
import { Tab } from "./Tab";
import { Terminal } from "./Terminal";

describe("Portello primitive accessibility contracts", () => {
  test("tabs expose tab semantics and do not render an inert close icon", () => {
    const activeMarkup = renderToStaticMarkup(<Tab label="README.md" active />);
    const inactiveMarkup = renderToStaticMarkup(<Tab label="README.md" />);

    expect(activeMarkup).toContain('role="tab"');
    expect(activeMarkup).toContain('aria-selected="true"');
    expect(activeMarkup).toContain('tabindex="0"');
    expect(inactiveMarkup).not.toContain("lucide-x");
  });

  test("file tree rows expose selection and folder expansion semantics", () => {
    const markup = renderToStaticMarkup(
      <FileTreeItem label="projects" type="folder" open active onClick={() => undefined} />,
    );

    expect(markup).toContain('role="treeitem"');
    expect(markup).toContain('aria-selected="true"');
    expect(markup).toContain('aria-expanded="true"');
    expect(markup).toContain('tabindex="0"');
  });

  test("status bar items only become buttons when clickable", () => {
    const clickable = renderToStaticMarkup(<StatusBarItem onClick={() => undefined}>main</StatusBarItem>);
    const staticItem = renderToStaticMarkup(<StatusBarItem>TypeScript</StatusBarItem>);

    expect(clickable).toContain('role="button"');
    expect(clickable).toContain('tabindex="0"');
    expect(staticItem).not.toContain('role="button"');
    expect(staticItem).not.toContain("tabindex");
  });

  test("keyboard activation helpers trigger click on Enter and Space", () => {
    const click = vi.fn();
    const preventDefault = vi.fn();
    const currentTarget = { click };
    const enter: KeyboardActivationEvent = { key: "Enter", currentTarget, preventDefault };
    const space: KeyboardActivationEvent = { key: " ", currentTarget, preventDefault };
    const escape: KeyboardActivationEvent = { key: "Escape", currentTarget, preventDefault };

    activateOnKeyboard(enter);
    activateOnKeyboard(space);
    activateOnKeyboard(escape);

    expect(click).toHaveBeenCalledTimes(2);
    expect(preventDefault).toHaveBeenCalledTimes(2);
  });
});

describe("Portello primitive visual contracts", () => {
  test("terminal prompt is generic by default", () => {
    expect(renderToStaticMarkup(<Terminal header={false} lines={[{ cmd: "whoami" }]} />)).toContain(
      "dev@portfolio",
    );
  });

  test("source design-system icon names are mapped", () => {
    const icons: PortelloIconName[] = [
      "arrow-right",
      "image",
      "mail",
      "users",
      "trending-up",
      "shield-check",
      "globe",
      "shield",
      "server",
      "database",
      "hard-drive",
      "file",
      "braces",
    ];

    for (const icon of icons) {
      expect(renderToStaticMarkup(<PortelloIconView icon={icon} size={16} />)).toContain("lucide");
    }
  });
});
