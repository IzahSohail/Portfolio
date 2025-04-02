"use client"

import type React from "react"

import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface ProjectModalProps {
  project: {
    id: number
    title: string
    image: string
    images?: string[] // Array of image URLs
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
      setCurrentImageIndex(0) // Reset to first image when opening modal
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [project])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300) // Match transition duration
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!project || !project.images) return
    setCurrentImageIndex((prev) => (prev + 1) % project.images!.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!project || !project.images) return
    setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length)
  }

  if (!project) return null

  // Use project.images if available, otherwise create an array with just the main image
  const images = project.images || [project.image]
  const currentImage = images[currentImageIndex]

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg border border-orange-500 bg-black p-6 transition-all duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} className="absolute right-4 top-4 text-white hover:text-gray-300 z-10">
          <X size={24} />
        </button>

        <h2 className="mb-4 text-2xl font-bold text-white">{project.title}</h2>

        {/* Image Carousel */}
        <div className="relative mb-6 h-[300px] w-full">
          <Image
            src={currentImage || "/placeholder.svg"}
            alt={`${project.title} - image ${currentImageIndex + 1}`}
            fill
            className="rounded-md object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />

          {/* Navigation arrows - only show if there are multiple images */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Image indicator dots */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                  className={`h-2 w-2 rounded-full ${index === currentImageIndex ? "bg-orange-500" : "bg-white/50"}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <p className="text-white">
            {project.description ||
              "This is a detailed description of the project. It explains the goals, challenges, and outcomes of the project. The description provides context about why the project was undertaken and what problems it solves."}
          </p>
        </div>

        {project.technologies && (
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold text-white">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="rounded-full bg-orange-500/20 px-3 py-1 text-sm text-orange-500">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.link && (
          <div className="mt-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600"
            >
              View Project
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

