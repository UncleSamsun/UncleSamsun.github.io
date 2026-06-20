import type { CSSProperties } from "react";
import { PortelloIconView } from "@/design-system/portello/components";
import type { PortfolioFile } from "@/data/navigation";

interface ExplorerProps {
  files: PortfolioFile[];
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
}

const folders = ["ABOUT", "PROJECTS", "CONTACT"] as const;

const rowBaseStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  width: "100%",
  height: "var(--row-height)",
  lineHeight: "var(--row-height)",
  paddingRight: 8,
  border: 0,
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
    <div style={{ ...rowBaseStyle, paddingLeft: 8 }}>
      <PortelloIconView icon="chevron-down" size={14} style={{ flex: "none", color: "var(--text-faint)" }} />
      <PortelloIconView icon="folder-open" size={15} style={{ flex: "none", color: "var(--ansi-yellow)" }} />
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
      style={{
        ...rowBaseStyle,
        paddingLeft: 22,
        color: active ? "var(--text-bright)" : "var(--text-secondary)",
        background: active ? "var(--surface-active)" : "transparent",
        boxShadow: active ? "inset 0 0 0 1px var(--border-default)" : "none",
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
          color: file.view === "project" ? "var(--portfolio-accent-warm)" : "var(--text-muted)",
        }}
      />
      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>{file.label}</span>
    </button>
  );
}

export function Explorer({ files, activeFileId, onSelectFile }: ExplorerProps) {
  return (
    <aside className="explorer" aria-label="Portfolio file explorer">
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
