import type { CSSProperties, HTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { useState } from "react";
import { PortelloIconView } from "./icons";

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  subtitle?: ReactNode;
  menu?: boolean;
  onMenu?: MouseEventHandler<HTMLButtonElement>;
  media?: ReactNode;
  interactive?: boolean;
}

export function Card({
  title,
  subtitle,
  menu = false,
  onMenu,
  media,
  interactive = false,
  children,
  style,
  ...rest
}: CardProps) {
  const [hover, setHover] = useState(false);

  const cardStyle: CSSProperties = {
    background: "var(--surface-card)",
    border: `1px solid ${hover ? "var(--border-strong)" : "var(--border-default)"}`,
    borderRadius: "var(--radius-lg)",
    boxShadow: hover ? "var(--shadow-widget)" : "var(--shadow-card)",
    padding: "var(--space-5)",
    fontFamily: "var(--font-mono)",
    color: "var(--text-primary)",
    transition:
      "border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)",
    boxSizing: "border-box",
    ...style,
  };

  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={cardStyle}
      {...rest}
    >
      {(title || menu) && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "var(--space-3)",
            marginBottom: subtitle || children ? "var(--space-3)" : 0,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            {title && (
              <div
                style={{
                  fontSize: "var(--text-lg)",
                  fontWeight: "var(--weight-bold)",
                  color: "var(--text-bright)",
                  lineHeight: 1.25,
                }}
              >
                {title}
              </div>
            )}
            {subtitle && (
              <div style={{ fontSize: "var(--text-xs)", color: "var(--text-faint)", marginTop: 4 }}>
                {subtitle}
              </div>
            )}
          </div>
          {menu && (
            <button
              type="button"
              onClick={onMenu}
              aria-label="More"
              style={{
                flex: "none",
                width: 24,
                height: 24,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-muted)",
                cursor: "pointer",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = "var(--surface-hover)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = "transparent";
              }}
            >
              <PortelloIconView icon="more-horizontal" size={16} />
            </button>
          )}
        </div>
      )}

      {children && (
        <div
          style={{
            fontSize: "var(--text-sm)",
            lineHeight: "var(--leading-normal)",
            color: "var(--text-secondary)",
          }}
        >
          {children}
        </div>
      )}

      {media && (
        <div
          style={{
            marginTop: "var(--space-4)",
            background: "var(--surface-panel)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-md)",
            padding: "var(--space-4)",
            overflow: "hidden",
          }}
        >
          {media}
        </div>
      )}
    </div>
  );
}
