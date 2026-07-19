"use client"

import Image from "next/image"

interface ProjectCardProps {
  title: string
  tagline?: string
  image: string
  onClick: () => void
}

export default function ProjectCard({ title, tagline, image, onClick }: ProjectCardProps) {
  return (
    <button type="button" className="polaroid" onClick={onClick}>
      <div className="polaroid-image">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
        />
      </div>
      <h3 className="polaroid-title">{title}</h3>
      {tagline ? <p className="polaroid-tagline">{tagline}</p> : null}
    </button>
  )
}
