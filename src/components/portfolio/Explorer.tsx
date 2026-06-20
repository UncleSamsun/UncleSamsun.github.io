import { FileTreeItem } from "@/design-system/portello/components";
import type { PortfolioFile } from "@/data/navigation";

interface ExplorerProps {
  files: PortfolioFile[];
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
}

const folders = ["ABOUT", "PROJECTS", "CONTACT"] as const;

export function Explorer({ files, activeFileId, onSelectFile }: ExplorerProps) {
  return (
    <aside className="explorer" aria-label="Portfolio file explorer">
      <div className="explorer-header">
        <span>EXPLORER</span>
      </div>
      <div className="explorer-tree" role="tree" aria-label="PORTFOLIO">
        <div className="explorer-root">PORTFOLIO</div>
        {folders.map((folder) => (
          <div className="explorer-folder" key={folder}>
            <FileTreeItem label={folder} type="folder" open depth={0} />
            {files
              .filter((file) => file.folder === folder)
              .map((file) => (
                <FileTreeItem
                  key={file.id}
                  label={file.label}
                  type="file"
                  depth={1}
                  active={file.id === activeFileId}
                  icon="file-text"
                  glyphColor={file.view === "project" ? "var(--portfolio-accent-warm)" : "var(--text-muted)"}
                  onClick={() => onSelectFile(file.id)}
                />
              ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
