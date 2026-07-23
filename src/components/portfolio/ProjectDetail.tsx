import type { ReactNode } from "react";
import type { PortfolioProject, TechCategory } from "@/data/types";
import { formatOwnership } from "@/lib/ownership";
import { groupTechByCategory } from "@/lib/tech";
import { ProjectEvidence } from "./ProjectEvidence";
import { ProjectLinks } from "./ProjectLinks";
import { RichText } from "./RichText";

interface ProjectDetailProps {
  project: PortfolioProject;
}

const categoryLabels: Record<TechCategory, string> = {
  backend: "백엔드",
  ai: "AI",
  data: "데이터",
  infra: "인프라",
  test: "테스트",
  docs: "문서화",
};

const storeInteriors: Record<string, string> = {
  "hola-climbing": "/assets/projects/interiors/hola-climbing-store.png",
  "cafe-gamsugwang": "/assets/projects/interiors/cafe-gamsugwang-store.png",
  "the-last-supper": "/assets/projects/interiors/the-last-supper-store.png",
  readandshare: "/assets/projects/interiors/readandshare-store.png",
  jsonstore: "/assets/projects/interiors/jsonstore-store.png",
};

function ListBlock({ items }: { items: string[] }) {
  return (
    <ul className="store-list">
      {items.map((item) => (
        <li key={item}><RichText text={item} /></li>
      ))}
    </ul>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="store-field">
      <span>{label}</span>
      <div>{typeof children === "string" ? <RichText text={children} /> : children}</div>
    </div>
  );
}

function Section({ title, children, id, note }: { title: string; children: ReactNode; id?: string; note?: string }) {
  const titleId = `store-${(id ?? title).replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase()}`;

  return (
    <section className="store-section" id={id} aria-labelledby={titleId}>
      <div className="store-section-title">
        <p>IN THE STORE</p>
        <h2 id={titleId}>{title}</h2>
        {note ? <span>{note}</span> : null}
      </div>
      {children}
    </section>
  );
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const interior = storeInteriors[project.slug];

  return (
    <article className="store-detail">
      {interior ? <div className="store-interior" style={{ backgroundImage: `url(${interior})` }} aria-hidden="true" /> : null}
      <div className="store-detail-scrim" aria-hidden="true" />
      <div className="store-shell">
        <nav className="store-topbar" aria-label="포트폴리오 탐색">
          <a className="store-brand" href="/">MINJOON ST.</a>
          <span aria-hidden="true">/</span>
          <span>{project.name.toUpperCase()} STORE</span>
          <a className="store-back-link" href={`/?scene=street&shop=${project.slug}`}>거리로 돌아가기</a>
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
    <div className="store-reading-panel">
      <header className="store-hero">
        <p className="store-hero-kicker">WELCOME TO THE PROJECT STORE</p>
        <h1>{project.name}</h1>
        <p className="store-hero-summary"><RichText text={project.summary} /></p>
        <div className="store-meta" aria-label="프로젝트 개요">
          <span>{project.label}</span>
          <span>{project.period}</span>
          <span>{project.team}</span>
          <span>{project.status === "active" ? "운영 중" : "완료"}</span>
        </div>
        <ProjectLinks links={project.links} className="store-project-links" variant="overview" />
        <dl className="store-recruiter-summary">
          <div><dt>ROLE</dt><dd><RichText text={project.recruiterSummary.role} /></dd></div>
          <div><dt>IMPACT</dt><dd><RichText text={project.recruiterSummary.impact} /></dd></div>
          <div><dt>PROOF</dt><dd><RichText text={project.recruiterSummary.proof} /></dd></div>
        </dl>
      </header>

      <Section title="프로젝트 안내" note="WHY THIS STORE EXISTS">
        <div className="store-facts">
          <Field label="목적">{project.common.purpose}</Field>
          <Field label="목표">{project.common.goal}</Field>
          <Field label="개발 과제">{project.common.developmentIssue}</Field>
          <Field label="결과"><ListBlock items={project.common.results} /></Field>
        </div>
      </Section>

      <Section title="내가 맡은 일" note="OWNERSHIP">
        <div className="store-facts">
          <Field label="역할">{project.role.title}</Field>
          <Field label="기여도">{project.role.contribution}</Field>
          <Field label="구현한 기능"><ListBlock items={project.role.implementedFeatures} /></Field>
          <Field label="개인 성과"><ListBlock items={project.role.achievements} /></Field>
        </div>
      </Section>

      <Section title="기술과 선택" note="TECH & DECISIONS">
        <div className="store-card-grid store-card-grid--tech">
          {Object.entries(groupedTech).filter(([, items]) => items.length > 0).map(([category, items]) => (
            <article className="store-card" key={category}>
              <p className="store-card-label">{categoryLabels[category as TechCategory]}</p>
              <div className="store-facts store-facts--compact">
                {items.map((item) => <Field key={item.name} label={item.name}>{item.reason ?? "프로젝트 구현에 사용"}</Field>)}
              </div>
            </article>
          ))}
        </div>
        <div className="store-card-grid">
          {project.decisions.map((decision) => (
            <article className="store-card" key={decision.title}>
              <h3>{decision.title}</h3>
              <div className="store-facts store-facts--compact">
                <Field label="선택">{decision.decision}</Field>
                <Field label="이유">{decision.reason}</Field>
                <Field label="대안">{decision.alternatives.join(", ")}</Field>
                <Field label="트레이드오프">{decision.tradeOff}</Field>
                <Field label="검증">{decision.verification}</Field>
                <Field label="주도성">{formatOwnership(decision.ownership, decision.ownershipNote)}</Field>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="문제를 푼 방식" note="PROBLEM SOLVING">
        <div className="store-card-grid">
          {project.problems.map((problem) => (
            <article className="store-card" key={problem.title}>
              <h3>{problem.title}</h3>
              <div className="store-facts store-facts--compact">
                <Field label="문제">{problem.problem}</Field>
                <Field label="접근">{problem.approach}</Field>
                <Field label="원인">{problem.cause}</Field>
                <Field label="해결">{problem.solution}</Field>
                <Field label="결과">{problem.result}</Field>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {project.ai ? (
        <Section title="AI·데이터 파이프라인" note="FROM INPUT TO RESULT">
          <div className="store-facts">
            <Field label="모델">{project.ai.model}</Field>
            <Field label="입력 데이터">{project.ai.inputData}</Field>
            <Field label="출력 데이터">{project.ai.outputData}</Field>
            <Field label="전처리"><ListBlock items={project.ai.preprocessing} /></Field>
            <Field label="데이터 특성"><ListBlock items={project.ai.dataCharacteristics} /></Field>
            <Field label="선택 이유">{project.ai.selectedModelReason}</Field>
            <Field label="결과 기반 개선"><ListBlock items={project.ai.resultDrivenImprovements} /></Field>
          </div>
        </Section>
      ) : null}

      <Section title="검증 자료" id={evidenceId} note="EVIDENCE, NOT DECORATION">
        <ProjectEvidence visuals={project.visuals} />
        <div className="store-metric-grid">
          {project.metrics.map((metric) => (
            <article className="store-metric-card" key={metric.label}>
              <p>{metric.label}</p>
              <strong>{metric.value ?? `${metric.before} → ${metric.after}`}</strong>
              <span><RichText text={metric.note} /></span>
            </article>
          ))}
        </div>
      </Section>

      <Section title="회고" note="WHAT I LEARNED">
        <div className="store-retrospective-grid">
          <article><h3>배운 점</h3><ListBlock items={project.retrospective.learned} /></article>
          <article><h3>아쉬운 점</h3><ListBlock items={project.retrospective.regrets} /></article>
          <article><h3>다음 개선</h3><ListBlock items={project.retrospective.improvements} /></article>
          <article><h3>협업</h3><p><RichText text={project.retrospective.collaboration} /></p></article>
        </div>
      </Section>

      <Section title="면접에서 설명할 사례" note="STAR STORIES">
        <div className="store-card-grid">
          {project.star.map((story) => (
            <article className="store-card" key={story.title}>
              <h3>{story.title}</h3>
              <div className="store-facts store-facts--compact">
                <Field label="상황">{story.situation}</Field>
                <Field label="행동">{story.action}</Field>
                <Field label="결과">{story.result}</Field>
                <Field label="배움">{story.learning}</Field>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
