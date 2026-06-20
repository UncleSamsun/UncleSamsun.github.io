import type { CSSProperties, HTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { useState } from "react";
import { activateOnKeyboard, composeEventHandlers } from "./events";
import { PortelloIconView, type PortelloIcon } from "./icons";

export interface TabProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  icon?: PortelloIcon;
  glyphColor?: string;
  active?: boolean;
  dirty?: boolean;
  onClose?: MouseEventHandler<HTMLButtonElement>;
}

export function Tab({
  label,
  icon,
  glyphColor = "var(--text-muted)",
  active = false,
  dirty = false,
  onClose,
  style,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  tabIndex,
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
      {...rest}
      role="tab"
      aria-selected={active}
      tabIndex={tabIndex ?? 0}
      onMouseEnter={composeEventHandlers(onMouseEnter, () => setHover(true))}
      onMouseLeave={composeEventHandlers(onMouseLeave, () => setHover(false))}
      onKeyDown={composeEventHandlers(onKeyDown, activateOnKeyboard)}
      style={tabStyle}
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
        onMouseEnter={(event) => {
          event.currentTarget.style.background = "var(--surface-active)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.background = "transparent";
        }}
      >
        {dirty && (!hover || !onClose) ? (
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--text-secondary)" }} />
        ) : onClose ? (
          <button
            type="button"
            aria-label="Close tab"
            onClick={(event) => {
              event.stopPropagation();
              onClose(event);
            }}
            style={{
              width: 16,
              height: 16,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              border: "none",
              background: "transparent",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            <PortelloIconView icon="x" size={13} style={{ opacity: hover ? 1 : 0 }} />
          </button>
        ) : (
          null
        )}
      </span>
    </div>
  );
}
