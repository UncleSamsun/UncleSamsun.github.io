import type { ReactNode } from "react";

interface CodeLikeSectionProps {
  heading: string;
  children: ReactNode;
  className?: string;
}

export function CodeLikeSection({ heading, children, className }: CodeLikeSectionProps) {
  const headingId = `section-${heading.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase()}`;

  return (
    <section className={`code-like-section ${className ?? ""}`.trim()} aria-labelledby={headingId}>
      <h2 className="section-heading" id={headingId}>
        {heading}
      </h2>
      {children}
    </section>
  );
}
