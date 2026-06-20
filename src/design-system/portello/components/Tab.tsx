import type { CSSProperties, HTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { useState } from "react";
import { PortelloIconView, type PortelloIcon } from "./icons";

export interface TabProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  icon?: PortelloIcon;
  glyphColor?: string;
  active?: boolean;
  dirty?: boolean;
  onClose?: MouseEventHandler<HTMLSpanElement>;
}

export function Tab({
  label,
  icon,
  glyphColor = "var(--text-muted)",
  active = false,
  dirty = false,
  onClose,
  style,
  ...rest
}: TabProps) {
  const [hover, setHover] = useState(false);
  const tabStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 7,
    height: "var(--tab-height)",
    padding: "0 10px 0 12px",
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-xs)",
    color: active ? "var(--text-bright)" : "var(--text-muted)",
    background: active ? "var(--surface-editor)" : "transparent",
    borderRight: "1px solid var(--border-subtle)",
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...style,
  };

  return (
    <div
      role="tab"
      aria-selected={active}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={tabStyle}
      {...rest}
    >
      {active && (
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1.5,
            background: "var(--accent-focus)",
          }}
        />
      )}
      {icon && <PortelloIconView icon={icon} size={14} style={{ flex: "none", color: glyphColor }} />}
      <span>{label}</span>
      <span
        style={{
          width: 16,
          height: 16,
          marginLeft: 2,
          flex: "none",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "var(--radius-sm)",
          color: "var(--text-muted)",
        }}
        onClick={(event) => {
          event.stopPropagation();
          onClose?.(event);
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.background = "var(--surface-active)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.background = "transparent";
        }}
      >
        {dirty && !hover ? (
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--text-secondary)" }} />
        ) : (
          <PortelloIconView icon="x" size={13} style={{ opacity: hover || !onClose ? 1 : 0 }} />
        )}
      </span>
    </div>
  );
}
