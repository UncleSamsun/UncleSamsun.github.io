import { describe, expect, it } from "vitest";
import type { TechCategory, TechItem } from "../src/data/types";
import { getVisibleTechStack, groupTechByCategory } from "../src/lib/tech";

const visibleCategories: TechCategory[] = ["backend", "ai", "data", "infra", "test", "docs"];
const visibleCategorySet = new Set<TechCategory>(visibleCategories);

describe("tech helpers", () => {
  it("keeps only backend and AI portfolio categories", () => {
    const items = [
      { name: "Spring Boot", category: "backend" },
      { name: "MediaPipe Pose", category: "ai" },
      { name: "Vue 3", category: "frontend" },
    ] as unknown as TechItem[];

    expect(getVisibleTechStack(items).map((item) => item.name)).toEqual([
      "Spring Boot",
      "MediaPipe Pose",
    ]);
  });

  it("groups visible technologies by category", () => {
    const grouped = groupTechByCategory([
      { name: "Spring Boot", category: "backend" },
      { name: "Redis Streams", category: "infra" },
    ]);

    expect(grouped.backend.map((item) => item.name)).toEqual(["Spring Boot"]);
    expect(grouped.infra.map((item) => item.name)).toEqual(["Redis Streams"]);
  });

  it("initializes every visible category even when the group is empty", () => {
    const grouped = groupTechByCategory([{ name: "Spring Boot", category: "backend" }]);

    for (const category of visibleCategories) {
      expect(Array.isArray(grouped[category])).toBe(true);
    }
    expect(grouped.ai.map((item) => item.name)).toEqual([]);
    expect(grouped.data.map((item) => item.name)).toEqual([]);
    expect(grouped.infra.map((item) => item.name)).toEqual([]);
    expect(grouped.test.map((item) => item.name)).toEqual([]);
    expect(grouped.docs.map((item) => item.name)).toEqual([]);
  });

  it("does not expose frontend-only technology categories", () => {
    const items = [
      { name: "React", category: "frontend" },
      { name: "Vue", category: "frontend" },
      { name: "Vite", category: "frontend" },
      { name: "TypeScript", category: "frontend" },
      { name: "JUnit 5", category: "test" },
    ] as unknown as TechItem[];

    expect(getVisibleTechStack(items).map((item) => item.name)).toEqual(["JUnit 5"]);
  });

  it("uses only portfolio-visible categories for every visible item", () => {
    const items = [
      { name: "Spring Security", category: "backend" },
      { name: "PostgreSQL", category: "data" },
      { name: "Swagger", category: "docs" },
    ] satisfies TechItem[];

    for (const item of getVisibleTechStack(items)) {
      expect(visibleCategorySet.has(item.category)).toBe(true);
    }
  });
});
