import { useState } from "react";
import type { ProjectVisualAsset } from "@/data/types";
import { PortelloIconView } from "@/design-system/portello/components";
import { activateOnKeyboard } from "@/design-system/portello/components/events";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { Lightbox } from "./Lightbox";
import { RichText } from "./RichText";

interface ProjectEvidenceProps {
  visuals: ProjectVisualAsset[];
}

export function ProjectEvidence({ visuals }: ProjectEvidenceProps) {
  const [activeAsset, setActiveAsset] = useState<ProjectVisualAsset | null>(null);

  if (visuals.length === 0) {
    return (
      <p className="portfolio-reading">
        <RichText text="시각 자료 추가 예정." />
      </p>
    );
  }

  return (
    <>
      <div className="evidence-grid">
        {visuals.map((asset) => (
          <article className="evidence-card" key={`${asset.kind}-${asset.title}`}>
            <div
              className="evidence-media"
              role="button"
              tabIndex={0}
              aria-label={`${asset.title} 크게 보기`}
              onClick={() => setActiveAsset(asset)}
              onKeyDown={activateOnKeyboard}
            >
              {asset.kind === "architecture" ? (
                <ArchitectureDiagram asset={asset} />
              ) : (
                <img src={asset.src} alt={asset.title} loading="lazy" />
              )}
              <span className="evidence-zoom-hint" aria-hidden="true">
                <PortelloIconView icon="search" size={13} />
                크게 보기
              </span>
            </div>
            <div className="evidence-body portfolio-reading">
              <h3>{asset.title}</h3>
              <p>
                <RichText text={asset.caption} />
              </p>
              {asset.highlight ? (
                <p className="ownership-note">
                  <RichText text={asset.highlight} />
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </div>
      {activeAsset ? (
        <Lightbox
          src={activeAsset.src}
          title={activeAsset.title}
          caption={activeAsset.caption}
          onClose={() => setActiveAsset(null)}
        />
      ) : null}
    </>
  );
}
