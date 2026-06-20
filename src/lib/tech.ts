import type { TechCategory, TechItem } from "../data/types";

const visibleCategories = new Set<TechCategory>(["backend", "ai", "data", "infra", "test", "docs"]);

export function getVisibleTechStack(items: TechItem[]): TechItem[] {
  return items.filter((item) => visibleCategories.has(item.category));
}

export function groupTechByCategory(items: TechItem[]): Record<string, TechItem[]> {
  return getVisibleTechStack(items).reduce<Record<string, TechItem[]>>((groups, item) => {
    groups[item.category] = groups[item.category] ?? [];
    groups[item.category].push(item);
    return groups;
  }, {});
}
