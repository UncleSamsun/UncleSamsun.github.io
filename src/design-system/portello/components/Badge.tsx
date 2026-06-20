import type { CSSProperties, HTMLAttributes } from "react";

const techColors: Record<string, string> = {
  java: "var(--tech-java)",
  "spring boot": "var(--tech-spring)",
  spring: "var(--tech-spring)",
  mysql: "var(--tech-mysql)",
  redis: "var(--tech-redis)",
  aws: "var(--tech-aws)",
  nginx: "var(--tech-nginx)",
  docker: "var(--tech-docker)",
  kubernetes: "var(--tech-kubernetes)",
  k8s: "var(--tech-kubernetes)",
  python: "var(--tech-python)",
  go: "var(--tech-go)",
  golang: "var(--tech-go)",
  "node.js": "var(--tech-node)",
  node: "var(--tech-node)",
  postgres: "var(--tech-postgres)",
  postgresql: "var(--tech-postgres)",
  kafka: "var(--tech-kafka)",
  graphql: "var(--tech-graphql)",
  typescript: "var(--tech-typescript)",
};

const statusColors = {
  success: "var(--success)",
  warning: "var(--warning)",
  error: "var(--error)",
  info: "var(--info)",
  neutral: "var(--text-muted)",
} as const;

export type BadgeVariant = "tech" | "status" | "count";
export type BadgeStatus = keyof typeof statusColors;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  color?: string;
  status?: BadgeStatus;
  dot?: boolean;
}

export function Badge({
  children,
  variant = "tech",
  color,
  status = "neutral",
  dot = false,
  style,
  ...rest
}: BadgeProps) {
  let hue: string;
  if (variant === "status") {
    hue = statusColors[status];
  } else {
    const key = typeof children === "string" ? children.toLowerCase().trim() : "";
    hue = color ?? techColors[key] ?? "var(--tech-default)";
  }

  if (variant === "count") {
    const countStyle: CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 18,
      height: 18,
      padding: "0 6px",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-2xs)",
      fontWeight: "var(--weight-bold)",
      color: "var(--accent-on)",
      background: "var(--accent)",
      borderRadius: "var(--radius-pill)",
      lineHeight: 1,
      boxSizing: "border-box",
      ...style,
    };

    return (
      <span style={countStyle} {...rest}>
        {children}
      </span>
    );
  }

  const badgeStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-xs)",
    fontWeight: "var(--weight-medium)",
    lineHeight: 1.6,
    padding: "2px 10px",
    color: `color-mix(in srgb, ${hue} 86%, var(--text-bright))`,
    border: `1px solid color-mix(in srgb, ${hue} 30%, transparent)`,
    background: `color-mix(in srgb, ${hue} 9%, transparent)`,
    borderRadius: "var(--radius-pill)",
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...style,
  };

  return (
    <span style={badgeStyle} {...rest}>
      {(dot || variant === "status") && (
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: hue,
            flex: "none",
          }}
        />
      )}
      {children}
    </span>
  );
}
