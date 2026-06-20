# 2026-06-20 Portello Portfolio Redesign Design

## Goal

Rebuild the portfolio site around the Portello IDE/terminal design system while keeping GitHub Pages deployment simple and reliable. The site should feel like a backend engineer's workspace: a code editor shell, explorer, editor tabs, project files, and a terminal-style contact panel.

## Context

The current portfolio is a static GitHub Pages site built from `index.html`, `styles.css`, `script.js`, and `assets/projects.js`. It is simple to deploy, but the styling and page behavior are tightly coupled.

The provided `Design System` is not just a CSS theme. It contains Portello tokens, React components, prompt docs, guidelines, screenshots, and a full IDE portfolio UI kit. The best fit is to adopt it as an internal design system and build the portfolio as a static app that compiles to GitHub Pages.

## Recommended Stack

Use Astro with React islands.

- Astro owns routing, page metadata, static generation, and GitHub Pages output.
- React owns interactive IDE pieces such as tabs, explorer selection, and terminal commands.
- Portello tokens and primitive components live inside the repo as an internal design system.

## Architecture

```text
src/
  design-system/
    portello/
      tokens/
      components/
      styles.css
      README.md
  components/
    portfolio/
      IDEWindow.tsx
      Explorer.tsx
      EditorPane.tsx
      TerminalPanel.tsx
      ProjectCard.tsx
  data/
    profile.ts
    projects.ts
  pages/
    index.astro
    projects/
      [slug].astro
docs/
  design-system/
    portello.md
public/
  assets/
```

## Boundaries

`src/design-system/portello/` contains reusable design-system material:

- design tokens: colors, type, spacing, radius, shadows, motion
- primitive components: Button, Badge, Card, Tab, FileTreeItem, StatusBarItem, Terminal, CodeBlock
- Portello usage notes copied and adapted from the provided design-system README

`src/components/portfolio/` contains this portfolio's product-specific composition:

- IDE window layout
- project explorer model
- editor views for profile, projects, experience, and contact
- terminal command behavior for contact and navigation

`src/data/` contains Minjoun-specific content:

- profile, headline, links, career, education
- project summaries, stacks, role, architecture, problem-solving, validation, results

Design-system files must not contain personal portfolio data.

## Routing

The first implementation should keep real static URLs:

- `/` renders the IDE portfolio shell.
- `/projects/[slug]/` renders shareable project detail pages using the same Portello visual language.

The home page can also open project files inside the IDE shell, but project detail URLs remain available for SEO, direct sharing, and GitHub Pages reliability.

## Deployment

GitHub Pages should serve Astro's static build output. `CNAME`, `robots.txt`, `sitemap.xml`, favicon, and Open Graph assets must be preserved or regenerated.

The Portello UI kit's CDN React/Babel demo should not be used as production code. React and Portello components should be bundled at build time.

## Data Flow

Current `assets/projects.js` data should move to typed TypeScript modules:

- `src/data/profile.ts`
- `src/data/projects.ts`

Astro pages and React components import the same data source. This avoids duplicated project content between the IDE shell and standalone project detail pages.

## Error Handling

- Unknown project slugs should render a static not-found state or redirect to `/`.
- Terminal commands should return friendly shell-style output for unknown commands.
- External links should use safe attributes and remain accessible from non-JavaScript detail pages.

## Testing And Verification

Verification should cover:

- `npm run build`
- local preview of the generated static site
- desktop and mobile screenshots of `/`
- direct access to each `/projects/[slug]/`
- keyboard navigation for explorer, tabs, links, and terminal input
- metadata checks for title, description, canonical URL, favicon, and Open Graph image

## Trade-Offs

Astro + React gains static routing, SEO, and typed component composition while still allowing rich IDE interactions. It costs more setup work than a plain static site.

Vite + React would be faster to prototype, but project detail routing and metadata are weaker on GitHub Pages unless extra routing work is added.

Keeping the current static structure has the lowest migration cost, but it wastes the React component model already present in Portello and makes IDE interactions harder to maintain.

## Reversibility

The decision is moderately reversible. Content remains in `src/data/`, so another frontend stack could reuse it. The main migration cost is converting current static HTML/CSS/JS into Astro and React components.

## Implementation Sequence

1. Scaffold Astro + React without changing portfolio content.
2. Vendor Portello tokens and primitive components into `src/design-system/portello/`.
3. Move existing profile and project data into typed modules.
4. Build the IDE shell home page.
5. Build static project detail routes.
6. Preserve deployment files and verify GitHub Pages output.
