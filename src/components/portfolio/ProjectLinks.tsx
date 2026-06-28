import { PortelloIconView, type PortelloIconName } from "@/design-system/portello/components";
import type { PortfolioProject } from "@/data/types";

interface ProjectLinksProps {
  links: PortfolioProject["links"];
  className?: string;
  variant?: "default" | "overview";
}

function isPrimaryLink(label: string) {
  const normalized = label.toLowerCase();
  return normalized.includes("live") || label.includes("배포");
}

function getLinkIcon(label: string): PortelloIconName {
  const normalized = label.toLowerCase();

  if (normalized.includes("github")) return "git-branch";
  if (normalized.includes("live") || label.includes("배포")) return "globe";
  if (normalized.includes("doc") || normalized.includes("readme")) return "file-text";

  return "arrow-right";
}

export function ProjectLinks({ links, className, variant = "default" }: ProjectLinksProps) {
  if (!links.length) return null;

  return (
    <div
      className={["project-link-list", `project-link-list--${variant}`, className].filter(Boolean).join(" ")}
      aria-label="프로젝트 링크"
    >
      {links.map((link) => (
        <a
          className={`project-link-chip${isPrimaryLink(link.label) ? " project-link-chip--primary" : ""}`}
          href={link.url}
          key={link.url}
          rel={link.external ? "noreferrer" : undefined}
          target={link.external ? "_blank" : undefined}
          title={link.label}
        >
          <PortelloIconView icon={getLinkIcon(link.label)} size={14} />
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  );
}
