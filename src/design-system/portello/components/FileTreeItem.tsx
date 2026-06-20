import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useState } from "react";
import { PortelloIconView, type PortelloIcon } from "./icons";

export interface FileTreeItemProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  type?: "file" | "folder";
  open?: boolean;
  depth?: number;
  active?: boolean;
  icon?: PortelloIcon;
  glyphColor?: string;
  badge?: ReactNode;
}

export function FileTreeItem({
  label,
  type = "file",
  open = false,
  depth = 0,
  active = false,
  icon,
  glyphColor = "var(--text-muted)",
  badge,
  style,
  ...rest
}: FileTreeItemProps) {
  const [hover, setHover] = useState(false);
  const bg = active ? "var(--surface-active)" : hover ? "var(--surface-hover)" : "transparent";
  const rowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    height: "var(--row-height)",
    lineHeight: "var(--row-height)",
    paddingLeft: 8 + depth * 14,
    paddingRight: 8,
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-xs)",
    color: active ? "var(--text-bright)" : "var(--text-secondary)",
    background: bg,
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    boxShadow: active ? "inset 0 0 0 1px var(--border-default)" : "none",
    ...style,
  };

  const fileGlyph =
    typeof label === "string" ? label.replace(/^.*\./, "").slice(0, 1).toUpperCase() : ".";

  return (
    <div
      role="treeitem"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={rowStyle}
      {...rest}
    >
      {type === "folder" ? (
        <PortelloIconView
          icon={open ? "chevron-down" : "chevron-right"}
          size={14}
          style={{ flex: "none", color: "var(--text-faint)" }}
        />
      ) : (
        <span style={{ width: 14, flex: "none" }} />
      )}

      {type === "folder" ? (
        <PortelloIconView
          icon={open ? "folder-open" : "folder"}
          size={15}
          style={{ flex: "none", color: "var(--ansi-yellow)" }}
        />
      ) : icon ? (
        <PortelloIconView icon={icon} size={15} style={{ flex: "none", color: glyphColor }} />
      ) : (
        <span
          style={{
            width: 15,
            height: 15,
            flex: "none",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 9,
            fontWeight: "var(--weight-bold)",
            color: glyphColor,
          }}
        >
          {fileGlyph}
        </span>
      )}

      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
      {badge}
    </div>
  );
}
