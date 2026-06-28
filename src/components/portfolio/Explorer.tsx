import type { CSSProperties } from "react";
import { PortelloIconView } from "@/design-system/portello/components";
import type { PortfolioFile } from "@/data/navigation";

interface ExplorerProps {
  files: PortfolioFile[];
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
  isOpen?: boolean;
}

const folders = ["ABOUT", "PROJECTS", "CONTACT"] as const;

const rowBaseStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  width: "calc(100% - 12px)",
  height: "var(--row-height)",
  lineHeight: "var(--row-height)",
  margin: "0 6px",
  paddingRight: 8,
  border: 0,
  borderRadius: "var(--radius-sm)",
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-xs)",
  color: "var(--text-secondary)",
  background: "transparent",
  textAlign: "left",
  userSelect: "none",
  whiteSpace: "nowrap",
  boxSizing: "border-box",
};

function FolderRow({ label }: { label: string }) {
  return (
    <div className="explorer-folder-row" style={{ ...rowBaseStyle, paddingLeft: 8 }}>
      <PortelloIconView icon="chevron-down" size={14} style={{ flex: "none", color: "var(--text-faint)" }} />
      <PortelloIconView icon="folder-open" size={15} style={{ flex: "none", color: "var(--portfolio-accent-cool)" }} />
      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
    </div>
  );
}

function FileRow({
  file,
  active,
  onSelectFile,
}: {
  file: PortfolioFile;
  active: boolean;
  onSelectFile: (fileId: string) => void;
}) {
  return (
    <button
      type="button"
      className={`explorer-file-row${active ? " explorer-file-row--active" : ""}`}
      style={{
        ...rowBaseStyle,
        paddingLeft: 22,
        color: active ? "var(--text-bright)" : "var(--text-secondary)",
        background: active ? "color-mix(in srgb, var(--portfolio-accent-cool) 11%, var(--surface-active))" : "transparent",
        boxShadow: active
          ? "inset 0 0 0 1px color-mix(in srgb, var(--portfolio-accent-cool) 32%, transparent)"
          : "none",
        cursor: "pointer",
      }}
      aria-current={active ? "page" : undefined}
      onClick={() => onSelectFile(file.id)}
    >
      <span style={{ width: 14, flex: "none" }} />
      <PortelloIconView
        icon="file-text"
        size={15}
        style={{
          flex: "none",
          color: file.view === "project" ? "var(--portfolio-accent-cool)" : "var(--text-muted)",
        }}
      />
      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>{file.label}</span>
    </button>
  );
}

export function Explorer({ files, activeFileId, onSelectFile, isOpen = false }: ExplorerProps) {
  return (
    <aside
      id="portfolio-explorer"
      className={`explorer${isOpen ? " explorer--open" : ""}`}
      aria-label="Portfolio file explorer"
    >
      <div className="explorer-header">
        <span>EXPLORER</span>
      </div>
      <nav className="explorer-tree" aria-label="PORTFOLIO">
        <div className="explorer-root">PORTFOLIO</div>
        <ul style={{ display: "grid", gap: 0, margin: 0, padding: 0, listStyle: "none" }}>
          {folders.map((folder) => (
            <li className="explorer-folder" key={folder}>
              <FolderRow label={folder} />
              <ul style={{ display: "grid", gap: 0, margin: 0, padding: 0, listStyle: "none" }}>
                {files
                  .filter((file) => file.folder === folder)
                  .map((file) => (
                    <li key={file.id}>
                      <FileRow file={file} active={file.id === activeFileId} onSelectFile={onSelectFile} />
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
