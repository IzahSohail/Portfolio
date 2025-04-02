"use client"

import { useEffect, useRef, useState } from "react"
import { Twitter, Twitch, Youtube, Menu } from 'lucide-react'
import Link from "next/link"
import TypewriterComponent from "@/components/typewriter"
import ProjectCard from "@/components/project-card"
import ProjectModal from "@/components/project-modal"
import MobileMenu from "@/components/mobile-menu"
import { useMobile } from "@/hooks/use-mobile"

// Define a more complete project type
interface Project {
  id: number
  title: string
  image: string
  images?: string[] // Array of image URLs
  description?: string
  technologies?: string[]
  link?: string
}

export default function Portfolio() {
  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: "Euro Votes",
      image: "/project1.jpg",
      images: [
        "/project1.jpg",
        "/project1-detail1.jpg",
        "/project1-detail2.jpg",
      ],
      description:
        "A comprehensive analysis and tracking system for professional gaming teams preparing for league competitions. This project includes performance metrics, strategy analysis, and competitor tracking.",
      technologies: ["Django", "PostgreSQL", "BeautifulSoup", "Plotly.js", "D3.js"],
      link: "https://example.com/road-to-league",
    },
    {
      id: 2,
      title: "Championship Night Stream (Season 4)",
      image: "/project2.jpg",
      images: [
        "/project2.jpg",
        "/project2-detail1.jpg",
        "/project2-detail2.jpg",
      ],
      description:
        "A streaming platform designed specifically for championship gaming events. Features include multi-camera views, real-time statistics, and interactive audience engagement tools.",
      technologies: ["Next.js", "WebRTC", "Redis", "AWS", "Socket.io"],
      link: "https://example.com/championship-stream",
    },
    {
      id: 3,
      title: "Fun With Friends: Boys' Night In",
      image: "/project3.jpg",
      images: [
        "/project3.jpg",
        "/project3-detail1.jpg",
        "/project3-detail2.jpg",
      ],
      description:
        "A social gaming platform that enables friends to play together remotely. Includes video chat, shared game libraries, and synchronized gameplay features.",
      technologies: ["React", "Firebase", "WebRTC", "Three.js", "TypeScript"],
      link: "https://example.com/fun-with-friends",
    },
    {
      id: 4,
      title: "AI-Powered Game Analytics",
      image: "/project4.jpg",
      images: [
        "/project4.jpg",
        "/project4-detail1.jpg",
        "/project4-detail2.jpg",
      ],
      description:
        "An advanced analytics platform that uses AI to analyze gameplay patterns and provide insights for improving player performance and game design.",
      technologies: ["Python", "TensorFlow", "React", "PostgreSQL", "Flask"],
      link: "https://example.com/ai-analytics",
    },
    {
      id: 5,
      title: "Blockchain Gaming Platform",
      image: "/project5.jpg",
      images: [
        "/project5.jpg",
        "/project5-detail1.jpg",
        "/project5-detail2.jpg",
      ],
      description:
        "A decentralized gaming platform that uses blockchain technology for secure in-game transactions, ownership of digital assets, and transparent gameplay mechanics.",
      technologies: ["Solidity", "Ethereum", "React", "Node.js", "Web3.js"],
      link: "https://example.com/blockchain-gaming",
    },
  ])

  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (selectedProject) return // Don't scroll when modal is open

      e.preventDefault()

      if (containerRef.current) {
        // Calculate new scroll position based on wheel delta
        const delta = e.deltaY
        const newPosition = Math.max(0, scrollPosition + delta)

        // Limit the maximum scroll position
        const maxScroll = projects.length * (isMobile ? 300 : 400) - window.innerWidth + 100
        setScrollPosition(Math.min(newPosition, maxScroll))
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (selectedProject) return // Don't handle touch when modal is open
      
      const touch = e.touches[0]
      const startX = touch.clientX
      
      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0]
        const deltaX = startX - touch.clientX
        
        // Move projects based on touch movement
        const newPosition = Math.max(0, scrollPosition + deltaX * 1.5)
        const maxScroll = projects.length * (isMobile ? 300 : 400) - window.innerWidth + 100
        setScrollPosition(Math.min(newPosition, maxScroll))
      }
      
      const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
      
      document.addEventListener('touchmove', handleTouchMove, { passive: true })
      document.addEventListener('touchend', handleTouchEnd, { passive: true })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
        container.removeEventListener("touchstart", handleTouchStart)
      }
    }
  }, [scrollPosition, projects.length, selectedProject, isMobile])

  return (
    <div className="h-screen w-full overflow-hidden bg-black" ref={containerRef}>
      <div className="gradient-bg fixed inset-0 z-0"></div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header with social icons and mobile menu button */}
        <div className="flex justify-between items-center p-4 md:p-6">
          {/* Mobile menu button - only visible on small screens */}
          <button 
            className="text-white md:hidden" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          
          {/* Social icons - hidden on mobile, shown on larger screens */}
          <div className="hidden md:flex gap-4 ml-auto">
            <Link href="#" className="text-white hover:text-gray-300 transition">
              <Twitter size={24} />
            </Link>
            <Link href="#" className="text-white hover:text-gray-300 transition">
              <Twitch size={24} />
            </Link>
            <Link href="#" className="text-white hover:text-gray-300 transition">
              <Youtube size={24} />
            </Link>
          </div>
        </div>

        {/* Mobile menu overlay */}
        <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

        <div className="flex-1 flex flex-col px-4 md:px-16">
          <div className="mt-8 md:mt-16">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white">
              HI, IM IZAH
            </h1>
            <div className="mt-2 md:mt-4 text-xl md:text-2xl text-white">
              I&apos;M A <TypewriterComponent />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center mt-8 md:mt-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              PROJECTS
            </h2>
            <div className="w-full flex justify-center mb-4 md:mb-8">
              <div className="h-1 bg-orange-500 w-32 md:w-48"></div>
            </div>

            <div className="h-[1px] w-full bg-white/20 mt-2 mb-4 md:mb-8"></div>

            {/* Projects container with horizontal scrolling */}
            <div
              className="flex gap-4 md:gap-8 transition-transform duration-300 ease-out pb-4 md:pb-0"
              style={{ transform: `translateX(-${scrollPosition}px)` }}
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  image={project.image}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
            
            {/* Mobile scroll indicator */}
            <div className="flex justify-center mt-4 md:hidden">
              <p className="text-white/60 text-sm">Swipe to see more projects</p>
            </div>
          </div>
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
}