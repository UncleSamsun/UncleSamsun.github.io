import type { CSSProperties } from "react";
import { PortelloIconView } from "@/design-system/portello/components";
import type { PortfolioFile } from "@/data/navigation";

interface EditorTabsProps {
  files: PortfolioFile[];
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
}

export function EditorTabs({ files, activeFileId, onSelectFile }: EditorTabsProps) {
  return (
    <nav className="editor-tabs" aria-label="Open portfolio files">
      {files.map((file) => (
        <button
          key={file.id}
          type="button"
          aria-current={file.id === activeFileId ? "page" : undefined}
          onClick={() => onSelectFile(file.id)}
          style={getTabStyle(file.id === activeFileId)}
        >
          {file.id === activeFileId && (
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
          <PortelloIconView
            icon="file-text"
            size={14}
            style={{
              flex: "none",
              color: file.view === "project" ? "var(--portfolio-accent-cool)" : "var(--text-muted)",
            }}
          />
          <span>{file.label}</span>
        </button>
      ))}
    </nav>
  );
}

function getTabStyle(active: boolean): CSSProperties {
  return {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 7,
    height: "var(--tab-height)",
    padding: "0 28px 0 12px",
    border: 0,
    borderRight: "1px solid var(--border-subtle)",
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-xs)",
    color: active ? "var(--text-bright)" : "var(--text-muted)",
    background: active ? "var(--surface-editor)" : "transparent",
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    boxSizing: "border-box",
  };
}
