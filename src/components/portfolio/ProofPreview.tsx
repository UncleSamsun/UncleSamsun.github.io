import type { ProjectMetric, ProjectVisualAsset } from "@/data/types";

interface ProofPreviewProps {
  metrics: ProjectMetric[];
  visuals: ProjectVisualAsset[];
  href?: string;
}

function formatMetric(metric: ProjectMetric) {
  return metric.value ?? `${metric.before} → ${metric.after}`;
}

export function ProofPreview({ metrics, visuals, href }: ProofPreviewProps) {
  const previewMetrics = metrics.slice(0, 2);

  return (
    <section className="proof-preview" aria-label="핵심 근거 미리보기">
      <div className="proof-preview-list">
        {previewMetrics.map((metric) => (
          <div className="proof-preview-item" key={metric.label}>
            <span className="proof-preview-label">{metric.label}</span>
            <strong className="proof-preview-value">{formatMetric(metric)}</strong>
          </div>
        ))}
        {visuals.length ? (
          <div className="proof-preview-item">
            <span className="proof-preview-label">근거 자료</span>
            <strong className="proof-preview-value">{visuals.length}개</strong>
          </div>
        ) : null}
      </div>
      {href ? (
        <a className="portfolio-link-button portfolio-link-button--primary proof-preview-link" href={href}>
          근거 보기
        </a>
      ) : null}
    </section>
  );
}
