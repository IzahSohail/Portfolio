"use client"

import type React from "react"

import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getTechIcon } from "@/lib/tech-icons"

interface ProjectModalProps {
  project: {
    id: number
    title: string
    image: string
    images?: string[]
    description?: string
    technologies?: string[]
    link?: string
  } | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (project) {
      setIsVisible(true)
      setCurrentImageIndex(0)
    }
  }, [project])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!project?.images) return
    setCurrentImageIndex((prev) => (prev + 1) % project.images!.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!project?.images) return
    setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length)
  }

  if (!project) return null

  const images = project.images || [project.image]
  const currentImage = images[currentImageIndex]

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-ink/30 p-2 transition-opacity duration-300 sm:p-4 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        data-modal-scroll
        className={`relative max-h-[92vh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-sm bg-white p-4 shadow-xl transition-all duration-300 dark:bg-[#151d30] sm:p-8 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 text-zinc-500 transition hover:text-ink dark:text-zinc-400 dark:hover:text-zinc-100 sm:right-4 sm:top-4"
        >
          <X size={22} />
        </button>

        <h2 className="mb-3 pr-8 font-heading text-3xl font-extrabold italic text-heading dark:text-[#8ab0f0] sm:mb-5 sm:text-4xl">
          {project.title}
        </h2>

        <div className="relative mb-4 h-[250px] w-full sm:mb-6 sm:h-[400px]">
          <Image
            src={currentImage}
            alt={`${project.title} - image ${currentImageIndex + 1}`}
            fill
            className="rounded-sm bg-white/60 object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 800px"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full bg-ink/60 p-1.5 text-white transition hover:bg-ink sm:left-2 sm:p-2"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-ink/60 p-1.5 text-white transition hover:bg-ink sm:right-2 sm:p-2"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentImageIndex(index)
                    }}
                    className={`h-2 w-2 rounded-full ${
                      index === currentImageIndex ? "bg-ink" : "bg-ink/30"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <p className="mb-4 font-body text-sm text-ink/80 dark:text-slate-300 sm:mb-6 sm:text-base">{project.description}</p>

        {project.technologies && (
          <div className="mb-4 sm:mb-6">
            <h3 className="mb-2 font-heading text-lg font-semibold text-ink dark:text-[#9db8e8] sm:text-xl">
              Technologies Used
            </h3>
            <ul className="project-card-tech">
              {project.technologies.map((tech) => {
                const icon = getTechIcon(tech)
                if (!icon) {
                  return (
                    <li key={tech}>
                      <span className="rounded-full bg-ink/10 px-3 py-1 text-xs text-ink dark:bg-white/10 dark:text-slate-200 sm:text-sm">
                        {tech}
                      </span>
                    </li>
                  )
                }
                return (
                  <li key={tech} className="project-card-tech-item" title={tech}>
                    <Image src={icon.src} alt={icon.alt} width={32} height={32} unoptimized />
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-ink px-4 py-2 text-sm text-white transition hover:bg-heading dark:bg-[#2f66bd] dark:hover:bg-[#3b76d4] sm:text-base"
          >
            View project
          </a>
        )}
      </div>
    </div>
  )
}
