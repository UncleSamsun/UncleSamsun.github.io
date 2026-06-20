import type { CSSProperties, HTMLAttributes } from "react";

const keywords = new Set([
  "const",
  "let",
  "var",
  "function",
  "return",
  "class",
  "extends",
  "new",
  "import",
  "export",
  "from",
  "default",
  "public",
  "private",
  "protected",
  "static",
  "void",
  "int",
  "String",
  "boolean",
  "final",
  "package",
  "if",
  "else",
  "for",
  "while",
  "try",
  "catch",
  "throw",
  "async",
  "await",
  "true",
  "false",
  "null",
  "this",
  "super",
]);

const colors = {
  comment: "var(--syntax-comment)",
  string: "var(--syntax-string)",
  number: "var(--syntax-number)",
  keyword: "var(--syntax-keyword)",
  property: "var(--syntax-property)",
  function: "var(--syntax-function)",
  type: "var(--syntax-type)",
  plain: "var(--text-primary)",
} as const;

interface Token {
  text: string;
  color: string;
}

function tokenize(line: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  const n = line.length;
  const push = (text: string, color: string) => out.push({ text, color });

  while (i < n) {
    const ch = line[i];

    if (ch === "/" && line[i + 1] === "/") {
      push(line.slice(i), colors.comment);
      break;
    }

    if (ch === "/" && line[i + 1] === "*") {
      const end = line.indexOf("*/", i + 2);
      const stop = end === -1 ? n : end + 2;
      push(line.slice(i, stop), colors.comment);
      i = stop;
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      let j = i + 1;
      while (j < n && line[j] !== ch) {
        if (line[j] === "\\") j++;
        j++;
      }
      j = Math.min(j + 1, n);
      const str = line.slice(i, j);
      const rest = line.slice(j).match(/^\s*:/);
      push(str, rest ? colors.property : colors.string);
      i = j;
      continue;
    }

    if (/[0-9]/.test(ch) && !/[A-Za-z_]/.test(line[i - 1] || "")) {
      let j = i;
      while (j < n && /[0-9._xXa-fA-F]/.test(line[j])) j++;
      push(line.slice(i, j), colors.number);
      i = j;
      continue;
    }

    if (/[A-Za-z_$]/.test(ch)) {
      let j = i;
      while (j < n && /[A-Za-z0-9_$]/.test(line[j])) j++;
      const word = line.slice(i, j);
      const after = line.slice(j);
      let color: string = colors.plain;
      if (keywords.has(word)) color = colors.keyword;
      else if (/^\s*\(/.test(after)) color = colors.function;
      else if (/^\s*:/.test(after)) color = colors.property;
      else if (/^[A-Z]/.test(word)) color = colors.type;
      push(word, color);
      i = j;
      continue;
    }

    let j = i;
    while (j < n && !/[0-9A-Za-z_$"'`/]/.test(line[j])) j++;
    if (j === i) j = i + 1;
    push(line.slice(i, j), "var(--syntax-operator)");
    i = j;
  }

  return out;
}

export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  code?: string;
  filename?: string;
  language?: string;
  showLineNumbers?: boolean;
  startLine?: number;
}

export function CodeBlock({
  code = "",
  filename,
  language,
  showLineNumbers = true,
  startLine = 1,
  style,
  ...rest
}: CodeBlockProps) {
  const lines = String(code).replace(/\n$/, "").split("\n");
  const blockStyle: CSSProperties = {
    background: "var(--surface-editor)",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-sm)",
    boxSizing: "border-box",
    ...style,
  };

  return (
    <div style={blockStyle} {...rest}>
      {(filename || language) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            height: 30,
            padding: "0 12px",
            background: "var(--surface-titlebar)",
            borderBottom: "1px solid var(--border-subtle)",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-2xs)",
            color: "var(--text-muted)",
          }}
        >
          {filename && <span style={{ color: "var(--text-secondary)" }}>{filename}</span>}
          <div style={{ flex: 1 }} />
          {language && <span style={{ letterSpacing: "0.06em" }}>{language}</span>}
        </div>
      )}
      <div
        style={{
          display: "flex",
          padding: "var(--space-3) 0",
          lineHeight: "var(--leading-code)",
          overflow: "auto",
        }}
      >
        {showLineNumbers && (
          <div
            style={{
              flex: "none",
              textAlign: "right",
              padding: "0 12px",
              color: "var(--text-faint)",
              userSelect: "none",
              fontSize: "var(--text-xs)",
            }}
          >
            {lines.map((_, i) => (
              <div key={i}>{startLine + i}</div>
            ))}
          </div>
        )}
        <div style={{ flex: 1, paddingRight: "var(--space-4)", whiteSpace: "pre" }}>
          {lines.map((line, i) => (
            <div key={i} style={{ minHeight: "1.55em" }}>
              {tokenize(line).map((token, k) => (
                <span key={k} style={{ color: token.color }}>
                  {token.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
