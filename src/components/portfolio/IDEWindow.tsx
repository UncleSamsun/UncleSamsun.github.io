import { useMemo, useState } from "react";
import type { PortfolioProject } from "@/data/types";
import { defaultFileId, portfolioFiles } from "@/data/navigation";
import type { PortfolioFile } from "@/data/navigation";
import { ActivityBar } from "./ActivityBar";
import { EditorPane } from "./EditorPane";
import { EditorTabs } from "./EditorTabs";
import { Explorer } from "./Explorer";
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
  const activeFile = useMemo(() => getActiveFile(activeFileId), [activeFileId]);

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
          <div className="title-actions">
            <span>Java</span>
            <span>Spring</span>
            <span>AI pipeline</span>
          </div>
        </div>

        <div className="ide-body">
          <ActivityBar />
          <Explorer files={files} activeFileId={activeFile.id} onSelectFile={setActiveFileId} />
          <div className="editor-area">
            <EditorTabs files={files} activeFileId={activeFile.id} onSelectFile={setActiveFileId} />
            <EditorPane activeFile={activeFile} profile={profile} projects={projects} onOpenFile={setActiveFileId} />
            <TerminalPanel files={files} onOpenFile={setActiveFileId} />
          </div>
        </div>

        <div className="status-bar" role="contentinfo">
          <span>main</span>
          <span>Backend & AI Portfolio</span>
          <span className="status-spacer" />
          <span>{activeFile.id}</span>
          <span>UTF-8</span>
        </div>
      </section>
    </div>
  );
}
