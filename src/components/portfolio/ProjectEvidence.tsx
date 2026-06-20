import type { ProjectVisualAsset } from "@/data/types";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

interface ProjectEvidenceProps {
  visuals: ProjectVisualAsset[];
}

export function ProjectEvidence({ visuals }: ProjectEvidenceProps) {
  if (visuals.length === 0) {
    return <p className="portfolio-reading">정리된 시각 자료는 다음 업데이트에서 추가합니다.</p>;
  }

  return (
    <div className="evidence-grid">
      {visuals.map((asset) => (
        <article className="evidence-card" key={`${asset.kind}-${asset.title}`}>
          <div className="evidence-media">
            {asset.kind === "architecture" ? (
              <ArchitectureDiagram asset={asset} />
            ) : (
              <img src={asset.src} alt={asset.title} loading="lazy" />
            )}
          </div>
          <div className="evidence-body portfolio-reading">
            <h3>{asset.title}</h3>
            <p>{asset.caption}</p>
            {asset.highlight ? <p className="ownership-note">{asset.highlight}</p> : null}
          </div>
        </article>
      ))}
    </div>
  );
}
