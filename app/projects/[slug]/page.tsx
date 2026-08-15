import { notFound } from "next/navigation"
import CaseStudy from "@/components/case-study"
import SiteNav from "@/components/site-nav"
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects"

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: "Project | Izah Sohail" }
  return {
    title: `${project.title} | Izah Sohail`,
    description: project.lede,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <main className="page-content project-detail-page">
      <SiteNav />
      <CaseStudy project={project} />
    </main>
  )
}
