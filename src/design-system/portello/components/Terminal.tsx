import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { PortelloIconView } from "./icons";

export interface TerminalLine {
  cmd?: string;
  out?: ReactNode;
  color?: string;
  comment?: string;
}

export interface TerminalProps extends HTMLAttributes<HTMLDivElement> {
  prompt?: string;
  cwd?: string;
  lines?: TerminalLine[];
  header?: boolean;
  title?: string;
  live?: boolean;
  height?: CSSProperties["height"];
}

export function Terminal({
  prompt = "dev@portfolio",
  cwd = "~",
  lines = [],
  header = true,
  title = "TERMINAL",
  live = false,
  height,
  style,
  ...rest
}: TerminalProps) {
  const Prompt = () => (
    <>
      <span style={{ color: "var(--terminal-green)" }}>{prompt}</span>
      <span style={{ color: "var(--text-muted)" }}>:</span>
      <span style={{ color: "var(--ansi-blue)" }}>{cwd}</span>
      <span style={{ color: "var(--text-muted)" }}>$ </span>
    </>
  );

  const caret = (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 15,
        marginLeft: 2,
        transform: "translateY(2px)",
        background: "var(--terminal-green)",
        animation: "portello-caret var(--cursor-blink) step-end infinite",
      }}
    />
  );

  const terminalStyle: CSSProperties = {
    background: "var(--surface-panel)",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-sm)",
    boxShadow: "var(--shadow-card)",
    boxSizing: "border-box",
    ...style,
  };

  return (
    <div style={terminalStyle} {...rest}>
      {header && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            height: 30,
            padding: "0 10px",
            background: "var(--surface-titlebar)",
            borderBottom: "1px solid var(--border-subtle)",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-2xs)",
            letterSpacing: "0.08em",
            color: "var(--text-muted)",
            textTransform: "uppercase",
          }}
        >
          <span>{title}</span>
          <div style={{ flex: 1 }} />
          {(["plus", "trash-2", "x"] as const).map((icon) => (
            <PortelloIconView
              key={icon}
              icon={icon}
              size={14}
              style={{ color: "var(--text-faint)" }}
            />
          ))}
        </div>
      )}

      <div
        style={{
          padding: "var(--space-3) var(--space-4)",
          lineHeight: "var(--leading-code)",
          color: "var(--ansi-white)",
          height,
          overflow: height ? "auto" : undefined,
          whiteSpace: "pre-wrap",
        }}
      >
        {lines.map((line, i) => {
          const last = i === lines.length - 1;
          if (line.comment !== undefined) {
            return (
              <div key={i} style={{ color: "var(--terminal-green)" }}>
                {line.comment}
              </div>
            );
          }

          if (line.cmd !== undefined) {
            return (
              <div key={i}>
                <Prompt />
                <span style={{ color: "var(--ansi-white)" }}>{line.cmd}</span>
                {live && last && caret}
              </div>
            );
          }

          return (
            <div key={i} style={{ color: line.color || "var(--ansi-white)" }}>
              {line.out}
              {live && last && caret}
            </div>
          );
        })}
        {live && lines.length === 0 && (
          <div>
            <Prompt />
            {caret}
          </div>
        )}
      </div>
    </div>
  );
}
