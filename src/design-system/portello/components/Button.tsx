import type { ButtonHTMLAttributes, CSSProperties, MouseEvent } from "react";
import { PortelloIconView, type PortelloIcon } from "./icons";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: PortelloIcon;
  iconRight?: PortelloIcon;
  fullWidth?: boolean;
}

const sizes: Record<
  ButtonSize,
  {
    padding: string;
    height: number;
    fontSize: string;
    gap: number;
    icon: number;
  }
> = {
  sm: { padding: "0 10px", height: 24, fontSize: "var(--text-xs)", gap: 6, icon: 14 },
  md: { padding: "0 14px", height: 30, fontSize: "var(--text-sm)", gap: 7, icon: 16 },
  lg: { padding: "0 18px", height: 38, fontSize: "var(--text-base)", gap: 8, icon: 18 },
};

const variants: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: "var(--accent)",
    color: "var(--accent-on)",
    border: "1px solid transparent",
  },
  secondary: {
    background: "var(--surface-card)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-strong)",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-secondary)",
    border: "1px solid transparent",
  },
  icon: {
    background: "transparent",
    color: "var(--text-secondary)",
    border: "1px solid transparent",
  },
};

const hoverBackgrounds: Record<ButtonVariant, string> = {
  primary: "var(--accent-hover)",
  secondary: "var(--surface-active)",
  ghost: "var(--surface-hover)",
  icon: "var(--surface-hover)",
};

const activeBackgrounds: Record<ButtonVariant, string> = {
  primary: "var(--accent-active)",
  secondary: "var(--surface-hover)",
  ghost: "var(--surface-active)",
  icon: "var(--surface-active)",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  fullWidth = false,
  disabled = false,
  type = "button",
  style,
  ...rest
}: ButtonProps) {
  const s = sizes[size];
  const v = variants[variant];
  const isIconOnly = variant === "icon";
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    fontFamily: "var(--font-mono)",
    fontSize: s.fontSize,
    fontWeight: "var(--weight-medium)",
    lineHeight: 1,
    height: s.height,
    width: isIconOnly ? s.height : fullWidth ? "100%" : undefined,
    padding: isIconOnly ? 0 : s.padding,
    borderRadius: isIconOnly ? "var(--radius-sm)" : "var(--radius-md)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transition:
      "background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)",
    userSelect: "none",
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...v,
    ...style,
  };

  const setBackground = (event: MouseEvent<HTMLButtonElement>, background: string) => {
    if (!disabled) event.currentTarget.style.background = background;
  };

  return (
    <button
      type={type}
      disabled={disabled}
      style={base}
      onMouseEnter={(event) => setBackground(event, hoverBackgrounds[variant])}
      onMouseLeave={(event) => setBackground(event, String(v.background))}
      onMouseDown={(event) => setBackground(event, activeBackgrounds[variant])}
      onMouseUp={(event) => setBackground(event, hoverBackgrounds[variant])}
      onFocus={(event) => {
        event.currentTarget.style.boxShadow = "var(--ring-focus)";
      }}
      onBlur={(event) => {
        event.currentTarget.style.boxShadow = "none";
      }}
      {...rest}
    >
      {icon ? <PortelloIconView icon={icon} size={s.icon} /> : null}
      {!isIconOnly ? children : children && !icon ? children : null}
      {iconRight ? <PortelloIconView icon={iconRight} size={s.icon} /> : null}
    </button>
  );
}
