import { Badge } from "@/design-system/portello/components";
import type { PortfolioProject, TechCategory } from "@/data/types";
import { profile } from "@/data/profile";
import { formatOwnership } from "@/lib/ownership";
import { groupTechByCategory } from "@/lib/tech";
import { ProjectEvidence } from "./ProjectEvidence";
import { ProjectLinks } from "./ProjectLinks";
import { ProofPreview } from "./ProofPreview";
import { RecruiterSummary } from "./RecruiterSummary";
import { RichText } from "./RichText";
import type { ReactNode } from "react";

interface ProjectDetailProps {
  project: PortfolioProject;
}

const categoryLabels: Record<TechCategory, string> = {
  backend: "Backend",
  ai: "AI",
  data: "Data",
  infra: "Infra",
  test: "Test",
  docs: "Docs",
};

function ListBlock({ items }: { items: string[] }) {
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

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="code-map-row">
      <span className="code-map-key">{label}</span>
      <span className="code-map-value">
        {typeof children === "string" ? <RichText text={children} /> : children}
      </span>
    </div>
  );
}

function Section({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  const titleId = `detail-${title.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase()}`;

  return (
    <section className="detail-section portfolio-reading" id={id} aria-labelledby={titleId}>
      <div className="detail-section-header">
        <h2 id={titleId}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className="project-detail-page portfolio-reading">
      <div className="detail-shell">
        <nav className="detail-topbar" aria-label="포트폴리오 네비게이션">
          <a className="detail-home-link" href="/">
            <span className="detail-home-name">{profile.name}</span>
            <span className="detail-home-role">{profile.role}</span>
          </a>
          <a className="detail-back-link" href="/">← 포트폴리오로</a>
        </nav>
        <ProjectDetailBody project={project} />
      </div>
    </article>
  );
}

export function ProjectDetailBody({ project }: ProjectDetailProps) {
  const groupedTech = groupTechByCategory(project.tech);
  const evidenceId = `${project.slug}-evidence`;

  return (
    <>
        <header className="detail-hero">
          <p className="code-comment">// projects/{project.slug}</p>
          <h1>{project.name}</h1>
          <p>
            <RichText text={project.summary} />
          </p>
          <div className="badge-row">
            <Badge variant="status" status={project.status === "active" ? "success" : "neutral"}>
              {project.status}
            </Badge>
            <Badge>{project.label}</Badge>
            <Badge>{project.team}</Badge>
          </div>
          <RecruiterSummary summary={project.recruiterSummary} />
          <ProofPreview metrics={project.metrics} visuals={project.visuals} href={`#${evidenceId}`} />
        </header>

        <Section title="Project.java">
          <div className="code-map">
            <Field label="project_name">{project.name}</Field>
            <Field label="period_team">
              {project.period} / {project.team}
            </Field>
            <Field label="purpose">{project.common.purpose}</Field>
            <Field label="goal">{project.common.goal}</Field>
            <Field label="development_issue">{project.common.developmentIssue}</Field>
            <Field label="results">
              <ListBlock items={project.common.results} />
            </Field>
          </div>
        </Section>

        <Section title="Role.md">
          <div className="code-map">
            <Field label="role">{project.role.title}</Field>
            <Field label="contribution">{project.role.contribution}</Field>
            <Field label="implemented_features">
              <ListBlock items={project.role.implementedFeatures} />
            </Field>
            <Field label="personal_achievements">
              <ListBlock items={project.role.achievements} />
            </Field>
          </div>
        </Section>

        <Section title="TechDecision.md">
          <div className="detail-grid">
            {Object.entries(groupedTech).map(([category, items]) => (
              <div className="decision-card" key={category}>
                <h3>{categoryLabels[category as TechCategory]}</h3>
                {items.length > 0 ? (
                  <div className="code-map">
                    {items.map((item) => (
                      <Field key={item.name} label={item.name}>
                        {item.reason}
                      </Field>
                    ))}
                  </div>
                ) : (
                  <p>
                    <RichText text="이 범주의 대표 기술은 없습니다." />
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="detail-grid">
            {project.decisions.map((decision) => (
              <div className="decision-card" key={decision.title}>
                <h3>{decision.title}</h3>
                <div className="code-map">
                  <Field label="decision">{decision.decision}</Field>
                  <Field label="reason">{decision.reason}</Field>
                  <Field label="alternatives">{decision.alternatives.join(", ")}</Field>
                  <Field label="trade_off">{decision.tradeOff}</Field>
                  <Field label="verification">{decision.verification}</Field>
                  <Field label="ownership">{formatOwnership(decision.ownership, decision.ownershipNote)}</Field>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Problems.md">
          <div className="detail-grid">
            {project.problems.map((problem) => (
              <div className="problem-card" key={problem.title}>
                <h3>{problem.title}</h3>
                <div className="code-map">
                  <Field label="problem">{problem.problem}</Field>
                  <Field label="approach">{problem.approach}</Field>
                  <Field label="cause">{problem.cause}</Field>
                  <Field label="solution">{problem.solution}</Field>
                  <Field label="result">{problem.result}</Field>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {project.ai ? (
          <Section title="AI.md">
            <div className="code-map">
              <Field label="model">{project.ai.model}</Field>
              <Field label="input_data">{project.ai.inputData}</Field>
              <Field label="output_data">{project.ai.outputData}</Field>
              <Field label="preprocessing">
                <ListBlock items={project.ai.preprocessing} />
              </Field>
              <Field label="data_characteristics">
                <ListBlock items={project.ai.dataCharacteristics} />
              </Field>
              <Field label="why_selected">{project.ai.selectedModelReason}</Field>
              <Field label="improvements">
                <ListBlock items={project.ai.resultDrivenImprovements} />
              </Field>
            </div>
          </Section>
        ) : null}

        <Section title="Evidence/" id={evidenceId}>
          <ProjectEvidence visuals={project.visuals} />
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
        </Section>

        <Section title="Links.md">
          <ProjectLinks links={project.links} />
        </Section>

        <Section title="Retrospective.md">
          <div className="detail-grid">
            <div>
              <p className="section-kicker">learned</p>
              <ListBlock items={project.retrospective.learned} />
            </div>
            <div>
              <p className="section-kicker">regrets</p>
              <ListBlock items={project.retrospective.regrets} />
            </div>
            <div>
              <p className="section-kicker">improvements</p>
              <ListBlock items={project.retrospective.improvements} />
            </div>
            <div>
              <p className="section-kicker">collaboration</p>
              <p>
                <RichText text={project.retrospective.collaboration} />
              </p>
            </div>
          </div>
        </Section>

        <Section title="STAR.md">
          <div className="detail-grid">
            {project.star.map((story) => (
              <div className="star-card" key={story.title}>
                <h3>{story.title}</h3>
                <div className="code-map">
                  <Field label="Situation">{story.situation}</Field>
                  <Field label="Action">{story.action}</Field>
                  <Field label="Result">{story.result}</Field>
                  <Field label="Learning">{story.learning}</Field>
                </div>
              </div>
            ))}
          </div>
        </Section>
    </>
  );
}
