import { describe, expect, it } from "vitest";
import { projects } from "../src/data/projects";
import { getProjectBySlug, getProjectSlugs, getProjectsByPriority } from "../src/lib/portfolio";

const requiredSlugs = [
  "hola-climbing",
  "cafe-gamsugwang",
  "jsonstore",
  "readandshare",
  "the-last-supper",
];

const visibleCategories = new Set(["backend", "ai", "data", "infra", "test", "docs"]);
const frontendOnlyTech = new Set(["React", "Vue", "Vue 3", "Vite", "Capacitor", "TypeScript"]);

describe("portfolio project data", () => {
  it("includes Hola Climbing as the first project", () => {
    const [first] = getProjectsByPriority();

    expect(first.slug).toBe("hola-climbing");
  });

  it("exports every required project slug", () => {
    expect(getProjectSlugs()).toEqual(requiredSlugs);
  });

  it("includes every required attachment checklist section", () => {
    for (const project of projects) {
      expect(project.name).not.toHaveLength(0);
      expect(project.period).not.toHaveLength(0);
      expect(project.team).not.toHaveLength(0);
      expect(project.summary).not.toHaveLength(0);
      expect(project.common.purpose).not.toHaveLength(0);
      expect(project.common.goal).not.toHaveLength(0);
      expect(project.common.developmentIssue).not.toHaveLength(0);
      expect(project.common.results.length).toBeGreaterThan(0);
      expect(project.role.title).not.toHaveLength(0);
      expect(project.role.contribution).not.toHaveLength(0);
      expect(project.role.implementedFeatures.length).toBeGreaterThan(0);
      expect(project.role.achievements.length).toBeGreaterThan(0);
      expect(project.decisions.length).toBeGreaterThan(0);
      expect(project.problems.length).toBeGreaterThan(0);
      expect(project.metrics.length).toBeGreaterThan(0);
      expect(project.retrospective.learned.length).toBeGreaterThan(0);
      expect(project.retrospective.regrets.length).toBeGreaterThan(0);
      expect(project.retrospective.improvements.length).toBeGreaterThan(0);
      expect(project.retrospective.collaboration).not.toHaveLength(0);
      expect(project.star.length).toBeGreaterThan(0);
    }
  });

  it("resolves project by slug", () => {
    expect(getProjectBySlug("hola-climbing")?.name).toBe("Hola Climbing");
  });

  it("keeps technology categories in the visible backend and AI portfolio taxonomy", () => {
    for (const project of projects) {
      for (const item of project.tech) {
        expect(visibleCategories.has(item.category)).toBe(true);
      }
    }
  });

  it("does not use frontend-only stacks as primary technology items", () => {
    for (const project of projects) {
      const techNames = project.tech.map((item) => item.name);

      for (const techName of techNames) {
        expect(frontendOnlyTech.has(techName)).toBe(false);
      }
    }
  });

  it("provides labels and URLs for every link", () => {
    for (const project of projects) {
      for (const link of project.links) {
        expect(link.label).not.toHaveLength(0);
        expect(link.url).toMatch(/^https?:\/\//);
      }
    }
  });
});
