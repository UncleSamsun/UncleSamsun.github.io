import { describe, expect, it } from "vitest";
import { portfolioFiles } from "../src/data/navigation";
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
const frontendOnlyTechPattern = /\b(react|vue|vite|capacitor|frontend-only)\b/i;
const frontendOnlyTechIncludes = ["typescript"];

function expectNonEmpty(value: string) {
  expect(value.trim()).not.toHaveLength(0);
}

describe("portfolio project data", () => {
  it("includes Hola Climbing as the first project", () => {
    const [first] = getProjectsByPriority();

    expect(first.slug).toBe("hola-climbing");
  });

  it("exports every required project slug", () => {
    expect(getProjectSlugs()).toEqual(requiredSlugs);
  });

  it("does not allow duplicate project slugs or priorities", () => {
    const slugs = projects.map((project) => project.slug);
    const priorities = projects.map((project) => project.priority);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(priorities).size).toBe(priorities.length);
  });

  it("keeps project navigation slugs in sync with project data", () => {
    const navigationSlugs = portfolioFiles
      .filter((file) => file.view === "project")
      .map((file) => file.slug);

    expect(navigationSlugs).toEqual(getProjectSlugs());
  });

  it("includes every required attachment checklist section", () => {
    for (const project of projects) {
      expectNonEmpty(project.name);
      expectNonEmpty(project.period);
      expectNonEmpty(project.team);
      expectNonEmpty(project.summary);
      expectNonEmpty(project.common.purpose);
      expectNonEmpty(project.common.goal);
      expectNonEmpty(project.common.developmentIssue);
      expect(project.common.results.length).toBeGreaterThan(0);
      expectNonEmpty(project.role.title);
      expectNonEmpty(project.role.contribution);
      expect(project.role.implementedFeatures.length).toBeGreaterThan(0);
      expect(project.role.achievements.length).toBeGreaterThan(0);
      expect(project.tech.length).toBeGreaterThan(0);
      expect(project.decisions.length).toBeGreaterThan(0);
      expect(project.problems.length).toBeGreaterThan(0);
      expect(project.metrics.length).toBeGreaterThan(0);
      expect(project.retrospective.learned.length).toBeGreaterThan(0);
      expect(project.retrospective.regrets.length).toBeGreaterThan(0);
      expect(project.retrospective.improvements.length).toBeGreaterThan(0);
      expectNonEmpty(project.retrospective.collaboration);
      expect(project.star.length).toBeGreaterThan(0);
    }
  });

  it("fills every nested decision, problem, metric, and STAR field", () => {
    for (const project of projects) {
      for (const decision of project.decisions) {
        expectNonEmpty(decision.title);
        expectNonEmpty(decision.decision);
        expectNonEmpty(decision.reason);
        expect(decision.alternatives.length).toBeGreaterThan(0);
        for (const alternative of decision.alternatives) {
          expectNonEmpty(alternative);
        }
        expectNonEmpty(decision.tradeOff);
        expectNonEmpty(decision.verification);
        expect(["direct", "team", "analyzed"]).toContain(decision.ownership);
        if (decision.ownership === "team" || decision.ownership === "analyzed") {
          expect(typeof decision.ownershipNote).toBe("string");
          expectNonEmpty(decision.ownershipNote ?? "");
        }
      }

      for (const problem of project.problems) {
        expectNonEmpty(problem.title);
        expectNonEmpty(problem.problem);
        expectNonEmpty(problem.approach);
        expectNonEmpty(problem.cause);
        expectNonEmpty(problem.solution);
        expectNonEmpty(problem.result);
      }

      for (const metric of project.metrics) {
        expectNonEmpty(metric.label);
        expectNonEmpty(metric.note);
        expect(Boolean(metric.value?.trim()) || Boolean(metric.before?.trim() && metric.after?.trim())).toBe(
          true,
        );
      }

      for (const story of project.star) {
        expectNonEmpty(story.title);
        expectNonEmpty(story.situation);
        expectNonEmpty(story.action);
        expectNonEmpty(story.result);
        expectNonEmpty(story.learning);
      }
    }
  });

  it("resolves project by slug", () => {
    expect(getProjectBySlug("hola-climbing")?.name).toBe("Hola Climbing");
  });

  it("keeps technology categories in the visible backend and AI portfolio taxonomy", () => {
    for (const project of projects) {
      for (const item of project.tech) {
        expect(visibleCategories.has(item.category)).toBe(true);
        expect(typeof item.reason).toBe("string");
        expectNonEmpty(item.reason ?? "");
      }
    }
  });

  it("does not use frontend-only stacks as primary technology items", () => {
    for (const project of projects) {
      const techNames = project.tech.map((item) => item.name);

      for (const techName of techNames) {
        const normalized = techName.toLowerCase();

        expect(frontendOnlyTechPattern.test(techName)).toBe(false);
        for (const frontendOnlyTech of frontendOnlyTechIncludes) {
          expect(normalized.includes(frontendOnlyTech)).toBe(false);
        }
      }
    }
  });

  it("provides labels and URLs for every link", () => {
    for (const project of projects) {
      for (const link of project.links) {
        expectNonEmpty(link.label);
        expect(link.url).toMatch(/^https?:\/\//);
      }
    }
  });
});
