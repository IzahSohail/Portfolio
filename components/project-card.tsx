"use client"

import Image from "next/image"
import Link from "next/link"
import { getTechIcon } from "@/lib/tech-icons"

interface ProjectCardProps {
  title: string
  tagline?: string
  image: string
  slug: string
  technologies?: string[]
}

export default function ProjectCard({
  title,
  tagline,
  image,
  slug,
  technologies,
}: ProjectCardProps) {
  const href = `/projects/${slug}`

  return (
    <article className="project-card">
      <Link href={href} className="project-card-media" aria-label={`Open ${title}`}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
        />
      </Link>

      <h3 className="project-card-title">
        <Link href={href}>{title}</Link>
      </h3>

      {tagline ? <p className="project-card-tagline">{tagline}</p> : null}

      {technologies && technologies.length > 0 ? (
        <ul className="project-card-tech" aria-label={`${title} tech stack`}>
          {technologies.map((tech) => {
            const icon = getTechIcon(tech)
            if (!icon) return null
            return (
              <li key={tech} className="project-card-tech-item" data-name={tech} title={tech}>
                <Image src={icon.src} alt={icon.alt} width={28} height={28} unoptimized />
              </li>
            )
          })}
        </ul>
      ) : null}

      <Link className="project-card-cta" href={href}>
        View project
      </Link>
    </article>
  )
}
