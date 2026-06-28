import type { PortfolioProject } from "@/data/types";

interface ProjectLinksProps {
  links: PortfolioProject["links"];
}

function isPrimaryLink(label: string) {
  const normalized = label.toLowerCase();
  return normalized.includes("live") || label.includes("배포");
}

export function ProjectLinks({ links }: ProjectLinksProps) {
  if (!links.length) return null;

  return (
    <div className="link-grid project-link-grid" aria-label="프로젝트 링크">
      {links.map((link) => (
        <a
          className={`portfolio-link-button${isPrimaryLink(link.label) ? " portfolio-link-button--primary" : ""}`}
          href={link.url}
          key={link.url}
          rel={link.external ? "noreferrer" : undefined}
          target={link.external ? "_blank" : undefined}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
