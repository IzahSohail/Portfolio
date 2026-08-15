import { euroVotes } from "./euro-votes"
import { falconMarket } from "./falcon-market"
import { feverDream, mathConfidence, nycMurals, photoshare } from "./other-projects"
import type { Project } from "./types"

export type { Project, CaseSection, CaseFigure } from "./types"

export const PROJECTS: Project[] = [
  falconMarket,
  mathConfidence,
  euroVotes,
  nycMurals,
  photoshare,
  feverDream,
]

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((project) => project.slug)
}
