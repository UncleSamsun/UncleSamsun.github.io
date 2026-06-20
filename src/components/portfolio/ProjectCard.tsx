import { Badge } from "@/design-system/portello/components";
import type { PortfolioProject } from "@/data/types";
import { getVisibleTechStack } from "@/lib/tech";

interface ProjectCardProps {
  project: PortfolioProject;
  onOpen?: (fileId: string) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const visibleTech = getVisibleTechStack(project.tech).slice(0, 6);
  const fileId = `Projects/${project.slug}.md`;

  return (
    <article className="portfolio-card project-card portfolio-reading">
      <div className="compact-project-header">
        <div className="compact-project-title">
          <p className="project-card-meta">{project.label}</p>
          <h3>{project.name}</h3>
        </div>
        <Badge variant="status" status={project.status === "active" ? "success" : "neutral"}>
          {project.status}
        </Badge>
      </div>
      <p>{project.summary}</p>
      <p className="project-card-meta">
        {project.period} / {project.team}
      </p>
      <div className="badge-row" aria-label={`${project.name} 기술 스택`}>
        {visibleTech.map((item) => (
          <Badge key={`${project.slug}-${item.name}`}>{item.name}</Badge>
        ))}
      </div>
      <div className="contact-links">
        {onOpen ? (
          <button className="project-card-link" type="button" onClick={() => onOpen(fileId)}>
            editor에서 열기
          </button>
        ) : null}
        <a className="project-card-link" href={`/projects/${project.slug}/`}>
          detail route
        </a>
      </div>
    </article>
  );
}
