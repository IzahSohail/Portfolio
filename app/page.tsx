"use client"

import { useEffect, useRef, useState } from "react"
import { Menu, FileText, Mail, Github } from "lucide-react"
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
        "/project1-detail3.jpg",
        "/project1-detail4.jpg",
      ],
      description:
        "An interactive data visualization tool that analyzes voting patterns in the European Parliament. The project scrapes legislative roll-call data and MEP information using BeautifulSoup, stores it in PostgreSQL, and presents visual trends via D3.js and Plotly. It enables users to explore alignments across countries, parties, and ideologies.",
      technologies: ["Django", "PostgreSQL", "BeautifulSoup", "Plotly.js", "D3.js"],
    },
    {
      id: 2,
      title: "Math Confidence",
      image: "/math-confidence.jpg",
      images: [
        "/math-confidence.jpg",
        "/math-confidence-detail1.jpg",
        "/math-confidence-detail2.jpg",
      ],
      description:
        "An Interactive Pre-Algebra AI Textbook designed to enhance learners' confidence in mathematics. The platform features an AI tutor that guides users step-by-step through pre-algebra topics, automatically assessing mastery and promoting a growth mindset. Built with Next.js and TypeScript for the frontend, and Tailwind CSS for styling, the application ensures a responsive and user-friendly experience. The AI tutor functionality is powered by OpenAI's GPT-4, providing personalized and adaptive learning experiences.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI GPT-4"],
      link: "https://math-confidence.com",
    },
    {
      id: 3,
      title: "EconoMe",
      image: "/econo-me.jpg",
      images: [
        "/econo-me.jpg",
        "/econo-me-detail1.jpg",
        "/econo-me-detail2.jpg",
      ],
      description:
        "EconoMe is a comprehensive financial management application designed to help users track expenses, set financial goals, and make informed financial decisions. It features secure user authentication via Auth0, intuitive expense tracking with categorization, goal setting with progress monitoring, and a price comparison tool to maximize savings. The responsive user interface ensures accessibility across devices. The application is structured with a React frontend and a Node.js backend, utilizing Express for server-side logic and MongoDB for data storage.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Auth0"],
      link: "https://github.com/IzahSohail/Econo-Me",
    },
    {
      id: 4,
      title: "NYC Murals",
      image: "/nyc-murals.jpg",
      images: [
        "/nyc-murals.jpg",
        "/nyc-murals-detail1.jpg",
        "/nyc-murals-detail2.jpg",
      ],
      description:
        "An interactive web application that showcases murals across New York City, allowing users to explore and learn about various street artworks. Built with Next.js and TypeScript, the project leverages server-side rendering for optimized performance and utilizes Tailwind CSS for responsive and modern styling. The application features dynamic routing to provide detailed information about each mural and integrates map functionalities to display mural locations effectively.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      link: "https://nyc-murals.vercel.app",
    },
    {
      id: 5,
      title: "SchedYouLater",
      image: "/SchedYouLater.png",
      images: [
        "/SchedYouLater.png",
        "/SchedYouLater-detail1.jpg",
      ],
      description:
        "SchedYouLater is a web-based application designed to help users find optimal times to schedule calls with their family or friends, taking time zone differences into account. The app allows users to view their own and their friends' schedules, find free time slots, and propose meeting times that work for both parties, automatically converting times to the correct time zone for each user.",
      technologies: ["React.js", "Node.js", "TimeAPI.io", "PostgreSQL"],
      link: "https://github.com/IzahSohail/SchedYouLater",
    },
    {
      id: 6,
      title: "Spot AI",
      image: "/spot-ai.jpg",
      images: [
        "/spot-ai.jpg",
        "/spot-ai-detail1.jpg",
        "/spot-ai-detail2.jpg",
      ],
      description:
        "A real-time multiplayer web game that challenges players to distinguish between human-written and AI-generated responses. In each round, players respond to the same prompt with their own text. One additional response is generated by GPT-4. All responses are then displayed anonymously, and players vote on which one they believe was written by the AI. Players earn points if their responses fool others. The game offers a playful but revealing look at how convincingly AI can mimic human writing. Built using Flask and PostgreSQL for a scalable backend, and WebSockets for real-time gameplay.",
      technologies: ["Flask", "PostgreSQL", "Socket.io", "OpenAI API"],
    },    
    {
      id: 7,
      title: "PhotoShare",
      image: "/photoshare.jpg",
      images: [
        "/photoshare.jpg",
      ],
      description:
        "A Flickr-inspired web app developed for a Database Systems course. Users can register, upload photos, create albums, tag content, like/comment on photos, and receive recommendations. Backend is built using Django and PostgreSQL with ER modeling, indexing strategies, and query optimization. Includes photo search, user management, and content discovery tools.",
      technologies: ["Django", "PostgreSQL", "Bootstrap", "JavaScript"],
      link: "https://github.com/IzahSohail/instagram2.0",
    },
    {
      id: 8,
      title: "Fever Dream",
      image: "/fever-dream.jpg",
      images: [
        "/fever-dream.jpg",
        "/fever-dream-detail1.jpg",
        "/fever-dream-detail2.jpg",
      ],
      description:
        "An experimental digital experience blending generative art and music visualization. Users interact with dreamlike visuals generated using shaders and Perlin noise, synced to ambient audio. Built with WebGL and Three.js to render psychedelic visual loops in real-time.",
      technologies: ["Adobe Illustrator, JavaScript"],
      link: "https://izahsohail.github.io/fever-dream",
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
        document.removeEventListener("touchmove", handleTouchMove)
        document.removeEventListener("touchend", handleTouchEnd)
      }

      document.addEventListener("touchmove", handleTouchMove, { passive: true })
      document.addEventListener("touchend", handleTouchEnd, { passive: true })
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
          <button className="text-white md:hidden" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            <Menu size={24} />
          </button>

          {/* Updated links - hidden on mobile, shown on larger screens */}
          <div className="hidden md:flex gap-4 ml-auto">
            <Link
              href="/resume.pdf"
              className="text-white hover:text-gray-300 transition"
              download
              aria-label="Download Resume"
            >
              <FileText size={24} />
            </Link>
            <Link
              href="mailto:is2587@nyu.edu"
              className="text-white hover:text-gray-300 transition"
              aria-label="Email Me"
            >
              <Mail size={24} />
            </Link>
            <Link
              href="https://github.com/IzahSohail"
              className="text-white hover:text-gray-300 transition"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Github size={24} />
            </Link>
          </div>
        </div>

        {/* Mobile menu overlay */}
        <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

        <div className="flex-1 flex flex-col px-4 md:px-16">
          <div className="mt-8 md:mt-16">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white">HI, IM IZAH</h1>
            <div className="mt-2 md:mt-4 text-xl md:text-2xl text-white">
              I&apos;M A <TypewriterComponent />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center mt-8 md:mt-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">PROJECTS</h2>
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

