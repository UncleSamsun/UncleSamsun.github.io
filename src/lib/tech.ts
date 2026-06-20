import type { TechCategory, TechItem } from "../data/types";

const visibleCategories = new Set<TechCategory>(["backend", "ai", "data", "infra", "test", "docs"]);
const visibleCategoryOrder: TechCategory[] = ["backend", "ai", "data", "infra", "test", "docs"];

export function getVisibleTechStack(items: TechItem[]): TechItem[] {
  return items.filter((item) => visibleCategories.has(item.category));
}

export function groupTechByCategory(items: TechItem[]): Record<TechCategory, TechItem[]> {
  const initialGroups = Object.fromEntries(
    visibleCategoryOrder.map((category) => [category, [] as TechItem[]]),
  ) as Record<TechCategory, TechItem[]>;

  return getVisibleTechStack(items).reduce<Record<TechCategory, TechItem[]>>((groups, item) => {
    groups[item.category].push(item);
    return groups;
  }, initialGroups);
}
