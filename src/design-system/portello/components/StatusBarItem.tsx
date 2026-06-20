import type { CSSProperties, HTMLAttributes } from "react";
import { useState } from "react";
import { PortelloIconView, type PortelloIcon } from "./icons";

export interface StatusBarItemProps extends HTMLAttributes<HTMLDivElement> {
  icon?: PortelloIcon;
  accent?: boolean;
}

export function StatusBarItem({
  icon,
  children,
  accent = false,
  onClick,
  title,
  style,
  ...rest
}: StatusBarItemProps) {
  const [hover, setHover] = useState(false);
  const interactive = !!onClick;
  const itemStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    height: "var(--statusbar-height)",
    padding: "0 8px",
    fontFamily: "var(--font-ui)",
    fontSize: "var(--text-2xs)",
    color: accent ? "var(--statusbar-fg)" : "var(--text-secondary)",
    background: accent
      ? hover
        ? "color-mix(in srgb, var(--statusbar-bg) 80%, white)"
        : "var(--statusbar-bg)"
      : hover && interactive
        ? "rgba(255,255,255,0.08)"
        : "transparent",
    cursor: interactive ? "pointer" : "default",
    userSelect: "none",
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...style,
  };

  return (
    <div
      role={interactive ? "button" : undefined}
      title={title}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={itemStyle}
      {...rest}
    >
      {icon && <PortelloIconView icon={icon} size={13} style={{ flex: "none" }} />}
      {children}
    </div>
  );
}
