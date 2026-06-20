import { projects } from "../data/projects";

export function getProjectsByPriority() {
  return [...projects].sort((a, b) => a.priority - b.priority);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return projects.map((project) => project.slug);
}
