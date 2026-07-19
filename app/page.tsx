"use client"

import { useEffect, useRef, useState } from "react"
import { Github, Linkedin } from "lucide-react"
import ProjectCard from "@/components/project-card"
import ProjectModal from "@/components/project-modal"
import AboutModal from "@/components/about-modal"
import TechTicker from "@/components/tech-ticker"
import Image from "next/image"

const SOCIAL = {
  github: "https://github.com/IzahSohail",
  linkedin: "https://www.linkedin.com/in/izah-sohail-12087a194/",
}

interface Project {
  id: number
  title: string
  tagline: string
  image: string
  images?: string[]
  description?: string
  technologies?: string[]
  link?: string
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Euro Votes",
    tagline: "Political transparency",
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
    link: "https://github.com/IzahSohail/Eu-Parliament",
  },
  {
    id: 2,
    title: "Math Confidence",
    tagline: "AI pre-algebra tutor",
    image: "/math-confidence.jpg",
    images: ["/math-confidence.jpg", "/math-confidence-detail1.jpg", "/math-confidence-detail2.jpg"],
    description:
      "An Interactive Pre-Algebra AI Textbook designed to enhance learners' confidence in mathematics. The platform features an AI tutor that guides users step-by-step through pre-algebra topics, automatically assessing mastery and promoting a growth mindset. Built with Next.js and TypeScript for the frontend, and Tailwind CSS for styling, the application ensures a responsive and user-friendly experience. The AI tutor functionality is powered by OpenAI's GPT-4, providing personalized and adaptive learning experiences.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI GPT-4"],
    link: "https://math-confidence.com",
  },
  {
    id: 3,
    title: "EconoMe",
    tagline: "Personal finance tracker",
    image: "/econo-me.jpg",
    images: ["/econo-me.jpg", "/econo-me-detail1.jpg", "/econo-me-detail2.jpg"],
    description:
      "EconoMe is a comprehensive financial management application designed to help users track expenses, set financial goals, and make informed financial decisions. It features secure user authentication via Auth0, intuitive expense tracking with categorization, goal setting with progress monitoring, and a price comparison tool to maximize savings. The responsive user interface ensures accessibility across devices. The application is structured with a React frontend and a Node.js backend, utilizing Express for server-side logic and MongoDB for data storage.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Auth0"],
    link: "https://github.com/IzahSohail/Econo-Me",
  },
  {
    id: 4,
    title: "NYC Murals",
    tagline: "Street art explorer",
    image: "/nyc-murals.jpg",
    images: ["/nyc-murals.jpg", "/nyc-murals-detail1.jpg", "/nyc-murals-detail2.jpg"],
    description:
      "An interactive web application that showcases murals across New York City, allowing users to explore and learn about various street artworks. Built with Next.js and TypeScript, the project leverages server-side rendering for optimized performance and utilizes Tailwind CSS for responsive and modern styling. The application features dynamic routing to provide detailed information about each mural and integrates map functionalities to display mural locations effectively.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://nyc-murals.vercel.app",
  },
  {
    id: 5,
    title: "SchedYouLater",
    tagline: "Timezone-friendly call planning",
    image: "/schedYouLater.png",
    images: ["/schedYouLater.png", "/SchedYouLater-detail1.jpg"],
    description:
      "SchedYouLater is a web-based application designed to help users find optimal times to schedule calls with their family or friends, taking time zone differences into account. The app allows users to view their own and their friends' schedules, find free time slots, and propose meeting times that work for both parties, automatically converting times to the correct time zone for each user.",
    technologies: ["React.js", "Node.js", "TimeAPI.io", "PostgreSQL"],
    link: "https://github.com/IzahSohail/SchedYouLater",
  },
  {
    id: 6,
    title: "Spot AI",
    tagline: "Human or AI? A party game",
    image: "/spot-ai.jpg",
    images: ["/spot-ai.jpg", "/spot-ai-detail1.jpg", "/spot-ai-detail2.jpg"],
    description:
      "A real-time multiplayer web game that challenges players to distinguish between human-written and AI-generated responses. In each round, players respond to the same prompt with their own text. One additional response is generated by GPT-4. All responses are then displayed anonymously, and players vote on which one they believe was written by the AI. Players earn points if their responses fool others. The game offers a playful but revealing look at how convincingly AI can mimic human writing. Built using Flask and PostgreSQL for a scalable backend, and WebSockets for real-time gameplay.",
    technologies: ["Flask", "PostgreSQL", "Socket.io", "OpenAI API"],
  },
  {
    id: 7,
    title: "PhotoShare",
    tagline: "Photo sharing platform",
    image: "/photoshare.jpg",
    images: ["/photoshare.jpg"],
    description:
      "A Flickr-inspired web app developed for a Database Systems course. Users can register, upload photos, create albums, tag content, like/comment on photos, and receive recommendations. Backend is built using Django and PostgreSQL with ER modeling, indexing strategies, and query optimization. Includes photo search, user management, and content discovery tools.",
    technologies: ["Django", "PostgreSQL", "Bootstrap", "JavaScript"],
    link: "https://github.com/IzahSohail/instagram2.0",
  },
  {
    id: 8,
    title: "Fever Dream",
    tagline: "Generative art experiment",
    image: "/fever-dream.jpg",
    images: ["/fever-dream.jpg", "/fever-dream-detail1.jpg", "/fever-dream-detail2.jpg"],
    description:
      "An experimental digital experience blending generative art and music visualization. Users interact with dreamlike visuals generated using shaders and Perlin noise, synced to ambient audio. Built with WebGL and Three.js to render psychedelic visual loops in real-time.",
    technologies: ["Adobe Illustrator, JavaScript"],
    link: "https://izahsohail.github.io/feverdream",
  },
]

export default function Portfolio() {
  const projectsSectionRef = useRef<HTMLElement>(null)
  const publicationsSectionRef = useRef<HTMLElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [aboutOpen, setAboutOpen] = useState(false)

  const getMaxScroll = () => {
    const el = publicationsSectionRef.current ?? projectsSectionRef.current
    if (!el) return 0
    return Math.max(0, el.offsetTop + el.offsetHeight - window.innerHeight)
  }

  useEffect(() => {
    const open = aboutOpen || selectedProject !== null
    if (!open) return

    const scrollY = window.scrollY
    const { documentElement: html, body } = document

    html.style.overflow = "hidden"
    body.style.overflow = "hidden"
    body.style.position = "fixed"
    body.style.top = `-${scrollY}px`
    body.style.left = "0"
    body.style.right = "0"
    body.style.width = "100%"

    const blockBackgroundScroll = (e: Event) => {
      const target = e.target as Element | null
      if (target?.closest?.("[data-modal-scroll]")) return
      e.preventDefault()
    }

    document.addEventListener("wheel", blockBackgroundScroll, { passive: false })
    document.addEventListener("touchmove", blockBackgroundScroll, { passive: false })

    return () => {
      document.removeEventListener("wheel", blockBackgroundScroll)
      document.removeEventListener("touchmove", blockBackgroundScroll)
      html.style.overflow = ""
      body.style.overflow = ""
      body.style.position = ""
      body.style.top = ""
      body.style.left = ""
      body.style.right = ""
      body.style.width = ""
      window.scrollTo(0, scrollY)
    }
  }, [aboutOpen, selectedProject])

  useEffect(() => {
    if (aboutOpen || selectedProject) return

    const enforce = () => {
      const max = getMaxScroll()
      if (window.scrollY > max) window.scrollTo(0, max)
    }

    const onWheel = (e: WheelEvent) => {
      const max = getMaxScroll()
      if (window.scrollY >= max - 1 && e.deltaY > 0) e.preventDefault()
    }

    enforce()
    window.addEventListener("scroll", enforce, { passive: true })
    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("resize", enforce)
    return () => {
      window.removeEventListener("scroll", enforce)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("resize", enforce)
    }
  }, [aboutOpen, selectedProject])

  const goToProjects = () => {
    projectsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const goToPublications = () => {
    publicationsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <main className="page-content">
      <nav className="site-nav">
        <button type="button" onClick={() => setAboutOpen(true)}>
          About me
        </button>
        <button type="button" onClick={goToProjects}>
          Projects
        </button>
        <button type="button" onClick={goToPublications}>
          Publications
        </button>
        <a
          href={SOCIAL.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="nav-icon-link"
        >
          <Github className="nav-icon" strokeWidth={1.75} />
        </a>
        <a
          href={SOCIAL.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="nav-icon-link"
        >
          <Linkedin className="nav-icon" strokeWidth={1.75} />
        </a>
      </nav>

      <section className="landing">
        <div className="landing-inner">
          <div className="landing-hero">
            <div className="landing-copy">
              <h1 className="landing-title">Izah Sohail</h1>
              <p className="landing-subtitle">AI & Full-Stack Developer</p>
            </div>

            <div className="landing-illustration-wrap">
              <Image
                src="/assets/profile-illustration.svg"
                alt="Illustration of Izah"
                width={527}
                height={529}
                priority
                unoptimized
                className="landing-illustration"
              />
            </div>
          </div>
        </div>

        <div className="tech-ticker-wrap">
          <TechTicker />
        </div>
      </section>

      <section id="projects" ref={projectsSectionRef} className="projects-section">
        <h2 className="projects-heading">Projects</h2>
        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              tagline={project.tagline}
              image={project.image}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </section>

      <section
        id="publications"
        ref={publicationsSectionRef}
        className="projects-section publications-section"
      >
        <h2 className="projects-heading">Publications</h2>
        <ul className="publications-list">
          <li>
            <a
              className="publication-card"
              href="https://dl.acm.org/doi/10.1145/3803437.3805542"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="publication-title">
                The Emotional Cost of Technical Debt: Quantifying Developer Frustration Across
                Debt-Related Concern Themes
              </h3>
              <p className="publication-venue">
                FSE Companion &apos;26: Proceedings of the 34th ACM International Conference on the
                Foundations of Software Engineering
              </p>
              <p className="publication-meta">Pages 1643–1651</p>
              <p className="publication-doi">https://doi.org/10.1145/3803437.3805542</p>
            </a>
          </li>
        </ul>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </main>
  )
}
