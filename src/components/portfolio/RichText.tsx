import type { ReactNode } from "react";

type RichTextKind = "strong" | "mark" | "code";

interface RichTextProps {
  text: string;
}

interface RichTextToken {
  kind: RichTextKind | "text";
  text: string;
}

const markers: { kind: RichTextKind; open: string; close: string }[] = [
  { kind: "strong", open: "**", close: "**" },
  { kind: "mark", open: "==", close: "==" },
  { kind: "code", open: "`", close: "`" },
];

function findNextMarker(text: string, from: number) {
  return markers
    .map((marker) => ({ marker, index: text.indexOf(marker.open, from) }))
    .filter((candidate) => candidate.index !== -1)
    .sort((a, b) => a.index - b.index || b.marker.open.length - a.marker.open.length)[0];
}

export function tokenizeRichText(text: string): RichTextToken[] {
  const tokens: RichTextToken[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    const next = findNextMarker(text, cursor);
    if (!next) {
      tokens.push({ kind: "text", text: text.slice(cursor) });
      break;
    }

    if (next.index > cursor) {
      tokens.push({ kind: "text", text: text.slice(cursor, next.index) });
    }

    const contentStart = next.index + next.marker.open.length;
    const contentEnd = text.indexOf(next.marker.close, contentStart);
    if (contentEnd === -1) {
      tokens.push({ kind: "text", text: text.slice(next.index) });
      break;
    }

    const content = text.slice(contentStart, contentEnd);
    if (content.length === 0) {
      tokens.push({ kind: "text", text: text.slice(next.index, contentEnd + next.marker.close.length) });
    } else {
      tokens.push({ kind: next.marker.kind, text: content });
    }
    cursor = contentEnd + next.marker.close.length;
  }

  return tokens.filter((token) => token.text.length > 0);
}

export function RichText({ text }: RichTextProps) {
  return (
    <>
      {tokenizeRichText(text).map((token, index): ReactNode => {
        if (token.kind === "strong") {
          return (
            <strong className="rich-text-strong" key={`${token.kind}-${index}`}>
              {token.text}
            </strong>
          );
        }

        if (token.kind === "mark") {
          return (
            <mark className="rich-text-mark" key={`${token.kind}-${index}`}>
              {token.text}
            </mark>
          );
        }

        if (token.kind === "code") {
          return (
            <code className="rich-text-code" key={`${token.kind}-${index}`}>
              {token.text}
            </code>
          );
        }

        return token.text;
      })}
    </>
  );
}
