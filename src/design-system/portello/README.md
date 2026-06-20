# Portello Internal Design System

Portello is the IDE/terminal visual system used by this portfolio.

## Boundaries

- This folder contains reusable design tokens and primitive UI components.
- This folder must not contain Minjoun-specific project data.
- Portfolio-specific composition belongs in `src/components/portfolio`.
- Portfolio content belongs in `src/data`.

## Typography

- IDE chrome, file names, code blocks, terminal prompts: JetBrains Mono.
- Long Korean reading text: gothic/system Korean stack through `--font-korean`.

## Iconography

Production code uses `lucide-react`. The original design-system demo used Lucide CDN and Babel; those are not used here.
