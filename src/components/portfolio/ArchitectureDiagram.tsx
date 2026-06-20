import type { ProjectVisualAsset } from "@/data/types";

interface ArchitectureDiagramProps {
  asset: ProjectVisualAsset;
}

export function ArchitectureDiagram({ asset }: ArchitectureDiagramProps) {
  return (
    <figure className="architecture-diagram" aria-label={asset.title}>
      <img src={asset.src} alt={asset.title} loading="lazy" />
    </figure>
  );
}
