import { useMemo, useState } from "react";
import { PortelloIconView } from "@/design-system/portello/components";
import type { PortfolioFile } from "@/data/navigation";

interface EditorTabsProps {
  files: PortfolioFile[];
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
}

const pinnedTabIds = new Set(["Profile.md", "Projects/ProjectSummary.md"]);

export function EditorTabs({ files, activeFileId, onSelectFile }: EditorTabsProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleTabs = useMemo(() => {
    const pinnedTabs = files.filter((file) => pinnedTabIds.has(file.id));
    const activeFile = files.find((file) => file.id === activeFileId);
    if (!activeFile || pinnedTabIds.has(activeFile.id)) return pinnedTabs;
    return [...pinnedTabs, activeFile];
  }, [activeFileId, files]);
  const visibleIds = new Set(visibleTabs.map((file) => file.id));
  const overflowFiles = files.filter((file) => !visibleIds.has(file.id));

  const selectFile = (fileId: string) => {
    setMenuOpen(false);
    onSelectFile(fileId);
  };

  return (
    <nav className="editor-tabs" aria-label="Open portfolio files">
      <div className="editor-tab-list">
        {visibleTabs.map((file) => {
          const active = file.id === activeFileId;

          return (
            <button
              key={file.id}
              type="button"
              className={`editor-tab${active ? " editor-tab--active" : ""}`}
              aria-current={active ? "page" : undefined}
              onClick={() => selectFile(file.id)}
            >
              {active ? <span className="editor-tab-active-line" /> : null}
              <PortelloIconView
                icon="file-text"
                size={14}
                className={file.view === "project" ? "editor-tab-icon editor-tab-icon--project" : "editor-tab-icon"}
              />
              <span className="editor-tab-label">{file.label}</span>
            </button>
          );
        })}
      </div>
      {overflowFiles.length > 0 ? (
        <details
          className="editor-tabs-menu"
          open={menuOpen}
          onToggle={(event) => setMenuOpen(event.currentTarget.open)}
        >
          <summary aria-label="Open more portfolio files">
            <PortelloIconView icon="folder-open" size={14} />
            <span className="editor-tabs-menu-label">Files</span>
            <span className="editor-tabs-menu-count">{overflowFiles.length}</span>
          </summary>
          <div className="editor-tabs-menu-popover">
            {overflowFiles.map((file) => (
              <button
                key={file.id}
                type="button"
                className="editor-tabs-menu-item"
                onClick={() => selectFile(file.id)}
              >
                <PortelloIconView
                  icon="file-text"
                  size={15}
                  className={file.view === "project" ? "editor-tab-icon editor-tab-icon--project" : "editor-tab-icon"}
                />
                <span>{file.label}</span>
              </button>
            ))}
          </div>
        </details>
      ) : null}
    </nav>
  );
}
