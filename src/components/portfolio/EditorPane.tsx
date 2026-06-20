import { Badge, CodeBlock } from "@/design-system/portello/components";
import type { PortfolioFile } from "@/data/navigation";
import type { PortfolioProject } from "@/data/types";
import { getVisibleTechStack } from "@/lib/tech";
import { CodeLikeSection } from "./CodeLikeSection";
import { ProjectCard } from "./ProjectCard";
import { RichText } from "./RichText";

type Profile = typeof import("@/data/profile").profile;
type ProfileTimelineItem = (Profile["education"][number] | Profile["career"][number]) & {
  category: "교육" | "경력";
};

interface EditorPaneProps {
  activeFile: PortfolioFile;
  profile: Profile;
  projects: PortfolioProject[];
  onOpenFile: (fileId: string) => void;
  onOpenDetail: (slug: string) => void;
}

function findProject(activeFile: PortfolioFile, projects: PortfolioProject[]) {
  return activeFile.slug ? projects.find((project) => project.slug === activeFile.slug) : undefined;
}

function renderList(items: string[]) {
  return (
    <ul className="portfolio-list">
      {items.map((item) => (
        <li key={item}>
          <RichText text={item} />
        </li>
      ))}
    </ul>
  );
}

function ProjectSummaryView({ projects, onOpenFile, onOpenDetail }: Omit<EditorPaneProps, "activeFile" | "profile">) {
  return (
    <article className="editor-document portfolio-reading">
      <header className="editor-hero">
        <p className="editor-eyebrow">// README.md</p>
        <h1>프로젝트 요약</h1>
        <p>
          <RichText text="백엔드와 **AI 파이프라인** 프로젝트를 문제, 기술 선택, 결과 중심으로 정리했습니다." />
        </p>
      </header>

      <div className="project-card-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} onOpen={onOpenFile} onOpenDetail={onOpenDetail} />
        ))}
      </div>
    </article>
  );
}

function createProfileTimeline(profile: Profile): ProfileTimelineItem[] {
  return [
    ...profile.education.map((item) => ({ ...item, category: "교육" as const })),
    ...profile.career.map((item) => ({ ...item, category: "경력" as const })),
  ];
}

function ProfileView({ profile }: { profile: Profile }) {
  const timeline = createProfileTimeline(profile);

  return (
    <article className="editor-document portfolio-reading">
      <header className="editor-hero">
        <p className="editor-eyebrow">// Profile.md</p>
        <h1>프로필</h1>
        <p>
          <RichText text={profile.intro} />
        </p>
      </header>

      <div className="editor-grid">
        <section className="portfolio-card">
          <h2>backend_ai_focus.ts</h2>
          {renderList(profile.about)}
        </section>
        <section className="portfolio-card">
          <h2>core_stack.json</h2>
          <div className="profile-stack-grid">
            {profile.skillGroups.map((group) => (
              <div key={group.title}>
                <p className="section-kicker">{group.title}</p>
                <div className="badge-row">
                  {group.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="editor-hero editor-hero--compact">
        <p className="editor-eyebrow">// timeline</p>
        <h1>경력 · 교육</h1>
      </section>
      <div className="timeline-list">
        {timeline.map((item) => (
          <section className="timeline-card" key={`${item.period}-${item.title}`}>
            <div className="timeline-meta">
              <p className="timeline-period">{item.period}</p>
              <span className="timeline-category">{item.category}</span>
            </div>
            <h2>{item.title}</h2>
            <p>
              <RichText text={item.description} />
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}

function ProjectCompactView({
  project,
  onOpenDetail,
}: {
  project: PortfolioProject;
  onOpenDetail: (slug: string) => void;
}) {
  const visibleTech = getVisibleTechStack(project.tech);

  return (
    <article className="editor-document compact-project portfolio-reading">
      <header className="compact-project-header">
        <div className="compact-project-title">
          <p className="editor-eyebrow">// Projects/{project.slug}.md</p>
          <h2>{project.name}</h2>
          <p>
            <RichText text={project.summary} />
          </p>
        </div>
        <a
          className="portfolio-link-button portfolio-link-button--primary"
          href={`/projects/${project.slug}/`}
          onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
            event.preventDefault();
            onOpenDetail(project.slug);
          }}
        >
          detail route
        </a>
      </header>

      <CodeLikeSection heading="// PROJECT RESULT">
        <div className="code-map">
          <div className="code-map-row">
            <span className="code-map-key">period_team</span>
            <span className="code-map-value">
              {project.period} / {project.team}
            </span>
          </div>
          <div className="code-map-row">
            <span className="code-map-key">purpose</span>
            <span className="code-map-value">
              <RichText text={project.common.purpose} />
            </span>
          </div>
          <div className="code-map-row">
            <span className="code-map-key">goal</span>
            <span className="code-map-value">
              <RichText text={project.common.goal} />
            </span>
          </div>
          <div className="code-map-row">
            <span className="code-map-key">issue</span>
            <span className="code-map-value">
              <RichText text={project.common.developmentIssue} />
            </span>
          </div>
        </div>
        {renderList(project.common.results)}
      </CodeLikeSection>

      <CodeLikeSection heading="// ROLE AND CONTRIBUTION">
        <p>
          <RichText text={project.role.contribution} />
        </p>
        {renderList(project.role.implementedFeatures.slice(0, 6))}
      </CodeLikeSection>

      <CodeLikeSection heading="// TECHNICAL DECISIONS">
        <div className="badge-row">
          {visibleTech.map((item) => (
            <Badge key={item.name}>{item.name}</Badge>
          ))}
        </div>
        {project.decisions.slice(0, 3).map((decision) => (
          <div className="decision-card" key={decision.title}>
            <h3>{decision.title}</h3>
            <p>
              <RichText text={decision.decision} />
            </p>
            <p className="ownership-note">
              ownership: {decision.ownership}
              {decision.ownershipNote ? ` / ${decision.ownershipNote}` : ""}
            </p>
          </div>
        ))}
      </CodeLikeSection>

      <CodeLikeSection heading="// PROBLEM SOLVING">
        {project.problems.map((problem) => (
          <div className="problem-card" key={problem.title}>
            <h3>{problem.title}</h3>
            <p>
              <RichText text={problem.problem} />
            </p>
            <p>
              <RichText text={problem.solution} />
            </p>
          </div>
        ))}
      </CodeLikeSection>

      {project.ai ? (
        <CodeLikeSection heading="// AI PIPELINE">
          <div className="code-map">
            <div className="code-map-row">
              <span className="code-map-key">model</span>
              <span className="code-map-value">{project.ai.model}</span>
            </div>
            <div className="code-map-row">
              <span className="code-map-key">input</span>
              <span className="code-map-value">
                <RichText text={project.ai.inputData} />
              </span>
            </div>
            <div className="code-map-row">
              <span className="code-map-key">output</span>
              <span className="code-map-value">
                <RichText text={project.ai.outputData} />
              </span>
            </div>
          </div>
          {renderList(project.ai.resultDrivenImprovements)}
        </CodeLikeSection>
      ) : null}

      <CodeLikeSection heading="// EVIDENCE">
        <div className="metric-grid">
          {project.metrics.map((metric) => (
            <div className="metric-card" key={metric.label}>
              <h3>{metric.label}</h3>
              <p className="metric-value">{metric.value ?? `${metric.before} -> ${metric.after}`}</p>
              <p>
                <RichText text={metric.note} />
              </p>
            </div>
          ))}
        </div>
      </CodeLikeSection>

      <CodeLikeSection heading="// RETROSPECTIVE">
        <p>
          <RichText text={project.retrospective.collaboration} />
        </p>
        {renderList(project.retrospective.learned)}
      </CodeLikeSection>
    </article>
  );
}

function ContactView({ profile }: { profile: Profile }) {
  const code = JSON.stringify(
    {
      name: profile.name,
      role: profile.role,
      email: profile.email,
      github: profile.github,
      focus: ["backend", "AI pipeline", "data", "infra", "test", "docs"],
    },
    null,
    2,
  );

  return (
    <article className="editor-document portfolio-reading">
      <header className="editor-hero">
        <p className="editor-eyebrow">// Contact.txt</p>
        <h1>연락처</h1>
        <p>
          <RichText text="백엔드와 **AI 파이프라인 경계**를 명확히 나누는 프로젝트 이야기를 이어갈 수 있습니다." />
        </p>
      </header>
      <CodeBlock filename="contact.json" language="json" code={code} />
      <div className="contact-links">
        <a className="portfolio-link-button" href={`mailto:${profile.email}`}>
          Email
        </a>
        <a className="portfolio-link-button" href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </article>
  );
}

export function EditorPane({ activeFile, profile, projects, onOpenFile, onOpenDetail }: EditorPaneProps) {
  const project = findProject(activeFile, projects);

  return (
    <section className="editor-pane" aria-label={`${activeFile.label} editor`}>
      {activeFile.view === "summary" ? (
        <ProjectSummaryView projects={projects} onOpenFile={onOpenFile} onOpenDetail={onOpenDetail} />
      ) : null}
      {activeFile.view === "profile" ? <ProfileView profile={profile} /> : null}
      {activeFile.view === "project" && project ? (
        <ProjectCompactView project={project} onOpenDetail={onOpenDetail} />
      ) : null}
      {activeFile.view === "contact" ? <ContactView profile={profile} /> : null}
      {activeFile.view === "project" && !project ? (
        <article className="editor-document portfolio-reading">
          <CodeLikeSection heading="// PROJECT NOT FOUND">
            <p>프로젝트 데이터가 아직 연결되지 않았습니다.</p>
          </CodeLikeSection>
        </article>
      ) : null}
    </section>
  );
}
