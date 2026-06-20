import { Tab } from "@/design-system/portello/components";
import type { PortfolioFile } from "@/data/navigation";

interface EditorTabsProps {
  files: PortfolioFile[];
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
}

export function EditorTabs({ files, activeFileId, onSelectFile }: EditorTabsProps) {
  return (
    <div className="editor-tabs" role="tablist" aria-label="Open portfolio files">
      {files.map((file) => (
        <Tab
          key={file.id}
          label={file.label}
          icon="file-text"
          active={file.id === activeFileId}
          glyphColor={file.view === "project" ? "var(--portfolio-accent-warm)" : "var(--text-muted)"}
          onClick={() => onSelectFile(file.id)}
        />
      ))}
    </div>
  );
}
