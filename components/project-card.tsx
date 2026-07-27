"use client"

import Image from "next/image"
import { getTechIcon } from "@/lib/tech-icons"

interface ProjectCardProps {
  title: string
  tagline?: string
  image: string
  technologies?: string[]
  link?: string
  onClick: () => void
}

export default function ProjectCard({
  title,
  tagline,
  image,
  technologies,
  link,
  onClick,
}: ProjectCardProps) {
  return (
    <article className="project-card">
      <button type="button" className="project-card-media" onClick={onClick} aria-label={`Open ${title}`}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
        />
      </button>

      <h3 className="project-card-title">
        <button type="button" onClick={onClick}>
          {title}
        </button>
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

      {link ? (
        <a
          className="project-card-cta"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          View project
        </a>
      ) : null}
    </article>
  )
}
