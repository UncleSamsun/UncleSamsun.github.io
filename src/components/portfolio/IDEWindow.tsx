import { useEffect, useMemo, useState } from "react";
import type { PortfolioProject } from "@/data/types";
import { defaultFileId, portfolioFiles } from "@/data/navigation";
import type { PortfolioFile } from "@/data/navigation";
import { PortelloIconView } from "@/design-system/portello/components";
import { ActivityBar } from "./ActivityBar";
import { EditorPane } from "./EditorPane";
import { EditorTabs } from "./EditorTabs";
import { Explorer } from "./Explorer";
import { Modal } from "./Modal";
import { ProjectDetailBody } from "./ProjectDetail";
import { TerminalPanel } from "./TerminalPanel";

type Profile = typeof import("@/data/profile").profile;

export const files = portfolioFiles;

interface IDEWindowProps {
  profile: Profile;
  projects: PortfolioProject[];
}

function getActiveFile(activeFileId: string): PortfolioFile {
  return files.find((file) => file.id === activeFileId) ?? files[0];
}

export function IDEWindow({ profile, projects }: IDEWindowProps) {
  const [activeFileId, setActiveFileId] = useState(defaultFileId);
  const [detailSlug, setDetailSlug] = useState<string | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const activeFile = useMemo(() => getActiveFile(activeFileId), [activeFileId]);
  const detailProject = useMemo(
    () => (detailSlug ? projects.find((project) => project.slug === detailSlug) ?? null : null),
    [detailSlug, projects],
  );

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNavOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [navOpen]);

  const selectFromExplorer = (fileId: string) => {
    setActiveFileId(fileId);
    setNavOpen(false);
  };

  return (
    <div className="portfolio-shell">
      <section className="ide-window" aria-label="김민준 IDE portfolio">
        <div className="ide-titlebar">
          <div className="window-traffic" aria-hidden="true">
            <span className="window-dot close" />
            <span className="window-dot minimize" />
            <span className="window-dot maximize" />
          </div>
          <div className="ide-title">minjoon-portfolio - {activeFile.id}</div>
          <div className="titlebar-right">
            <div className="title-actions">
              <span>Java</span>
              <span>Spring</span>
              <span>AI pipeline</span>
            </div>
            <button
              type="button"
              className="nav-toggle"
              aria-label={navOpen ? "Close file navigator" : "Open file navigator"}
              aria-expanded={navOpen}
              aria-controls="portfolio-explorer"
              onClick={() => setNavOpen((value) => !value)}
            >
              <PortelloIconView icon={navOpen ? "x" : "file-text"} size={18} />
            </button>
          </div>
        </div>

        <div className="ide-body">
          <ActivityBar />
          <Explorer
            files={files}
            activeFileId={activeFile.id}
            onSelectFile={selectFromExplorer}
            isOpen={navOpen}
          />
          {navOpen ? (
            <button
              type="button"
              className="nav-backdrop"
              aria-label="Close file navigator"
              onClick={() => setNavOpen(false)}
            />
          ) : null}
          <div className="editor-area">
            <EditorTabs files={files} activeFileId={activeFile.id} onSelectFile={setActiveFileId} />
            <EditorPane
              activeFile={activeFile}
              profile={profile}
              projects={projects}
              onOpenFile={setActiveFileId}
              onOpenDetail={setDetailSlug}
            />
          </div>
        </div>

        <div className="status-bar" role="contentinfo">
          <span>main</span>
          <span>Backend & AI Portfolio</span>
          <span className="status-spacer" />
          <span>{activeFile.id}</span>
          <span>UTF-8</span>
        </div>

        <TerminalPanel files={files} onOpenFile={setActiveFileId} />
      </section>

      <Modal
        open={detailProject !== null}
        title={detailProject ? `${detailProject.name} — detail` : "detail"}
        onClose={() => setDetailSlug(null)}
      >
        {detailProject ? (
          <div className="detail-shell detail-shell--modal">
            <ProjectDetailBody project={detailProject} />
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
