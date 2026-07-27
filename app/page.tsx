"use client"

import { useEffect, useRef, useState } from "react"
import ProjectCard from "@/components/project-card"
import ProjectModal from "@/components/project-modal"
import SiteNav from "@/components/site-nav"
import TechTicker from "@/components/tech-ticker"
import Image from "next/image"

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
    title: "Falcon Market",
    tagline: "A student marketplace with seller tools and real-time analytics",
    image: "/falcon-market-thumbnail.jpg",
    images: ["/falcon-market-thumbnail.jpg"],
    description:
      "A full-stack multi-vendor marketplace built for students to buy, sell, and manage secondhand items. The platform supports secure Auth0-based login, role-based workflows for users, businesses, and admins, bulk CSV/JSON catalog uploads with validation, and a Kafka-powered analytics pipeline for tracking sales activity in real time. Designed to combine core e-commerce flows with scalable data processing and operational reporting.",
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "Kafka"],
    link: "https://github.com/IzahSohail/Retail_App",
  },
  {
    id: 2,
    title: "Math Confidence",
    tagline: "AI pre-algebra tutor that builds mastery",
    image: "/math-confidence-thumbnail.jpg",
    images: ["/math-confidence.jpg", "/math-confidence-detail1.jpg", "/math-confidence-detail2.jpg"],
    description:
      "An Interactive Pre-Algebra AI Textbook designed to enhance learners' confidence in mathematics. The platform features an AI tutor that guides users step-by-step through pre-algebra topics, automatically assessing mastery and promoting a growth mindset. Built with Next.js and TypeScript for the frontend, and Tailwind CSS for styling, the application ensures a responsive and user-friendly experience. The AI tutor functionality is powered by OpenAI Assistants, with Supabase for data and auth.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "OpenAI Assistants",
      "Supabase",
    ],
    link: "https://math-confidence.com",
  },
  {
    id: 3,
    title: "Euro Votes",
    tagline: "Political transparency through EU voting data",
    image: "/Euro-votes-thumbnail.jpg",
    images: [
      "/project1.jpg",
      "/project1-detail1.jpg",
      "/project1-detail2.jpg",
      "/project1-detail3.jpg",
      "/project1-detail4.jpg",
    ],
    description:
      "An interactive data visualization tool that analyzes voting patterns in the European Parliament. The project scrapes legislative roll-call data and MEP information using BeautifulSoup, stores it in PostgreSQL, and presents visual trends via Matplotlib, Plotly, and Pandas. It enables users to explore alignments across countries, parties, and ideologies.",
    technologies: [
      "Python",
      "Django",
      "PostgreSQL",
      "JavaScript",
      "Matplotlib",
      "Plotly",
      "Pandas",
      "BeautifulSoup",
    ],
    link: "https://github.com/IzahSohail/Eu-Parliament",
  },
  {
    id: 4,
    title: "NYC Murals",
    tagline: "Explore street art across New York City",
    image: "/nyc-murals-thumbnail.jpg",
    images: ["/nyc-murals.jpg", "/nyc-murals-detail1.jpg", "/nyc-murals-detail2.jpg"],
    description:
      "An interactive web application that showcases murals across New York City, allowing users to explore and learn about various street artworks. Built with Next.js and TypeScript, the project leverages server-side rendering for optimized performance and utilizes Tailwind CSS for responsive and modern styling. The application features dynamic routing to provide detailed information about each mural and integrates map functionalities to display mural locations effectively.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    link: "https://nyc-murals.vercel.app",
  },
  {
    id: 5,
    title: "PhotoShare",
    tagline: "Flickr-inspired photo sharing platform",
    image: "/photoshare-thumbnail.jpg",
    images: ["/photoshare.jpg"],
    description:
      "A Flickr-inspired web app developed for a Database Systems course. Users can register, upload photos, create albums, tag content, like/comment on photos, and receive recommendations. Backend is built using Django and PostgreSQL with ER modeling, indexing strategies, and query optimization. Includes photo search, user management, and content discovery tools.",
    technologies: ["Django", "PostgreSQL", "Bootstrap", "JavaScript"],
    link: "https://github.com/IzahSohail/instagram2.0",
  },
  {
    id: 6,
    title: "Fever Dream",
    tagline: "Generative art and music visualization",
    image: "/fever-dream-thumbnail.jpg",
    images: ["/fever-dream.jpg", "/fever-dream-detail1.jpg", "/fever-dream-detail2.jpg"],
    description:
      "An experimental digital experience blending generative art and music visualization. Users interact with dreamlike visuals designed in Adobe Illustrator and brought to life with JavaScript.",
    technologies: ["Adobe Illustrator", "JavaScript"],
    link: "https://izahsohail.github.io/feverdream",
  },
]

const ABOUT_PARAGRAPHS = [
  "I've always had a knack for solving problems. Whether it was figuring out how something worked or finding a better way to do it, I've always enjoyed breaking challenges down and finding practical solutions.",
  "At NYU, I discovered the potential of turning ideas into products that people can actually use. Through coursework, research, and countless side projects, I learned that software isn't just about writing code. It's about understanding problems deeply enough to build the right solutions.",
  "That perspective grew even stronger through my research, where I worked on challenges ranging from political transparency to AI-assisted software engineering. Seeing how thoughtful software and data can make complex information more accessible, reveal meaningful insights, and support better decision-making inspired me to build technology with real-world impact.",
  "Over the years, I've applied my skills across different areas, from AI-powered learning tools to full-stack web applications, taking projects from the initial idea all the way to deployment. More than any particular technology, I value curiosity, adaptability, and the excitement of learning something new.",
  "Outside of software, I enjoy exploring new digital tools, creating digital art, and playing just about any racket sport.",
]

export default function Portfolio() {
  const projectsSectionRef = useRef<HTMLElement>(null)
  const publicationsSectionRef = useRef<HTMLElement>(null)
  const aboutSectionRef = useRef<HTMLElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const getMaxScroll = () => {
    const el =
      aboutSectionRef.current ?? publicationsSectionRef.current ?? projectsSectionRef.current
    if (!el) return 0
    return Math.max(0, el.offsetTop + el.offsetHeight - window.innerHeight)
  }

  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (!hash) return
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }, [])

  useEffect(() => {
    if (selectedProject === null) return

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
  }, [selectedProject])

  useEffect(() => {
    if (selectedProject) return

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
  }, [selectedProject])

  return (
    <main className="page-content">
      <SiteNav />

      <section className="landing">
        <div className="landing-inner">
          <div className="landing-hero">
            <div className="landing-copy">
              <h1 className="landing-title">Izah Sohail</h1>
              <p className="landing-subtitle">AI & Full-Stack Developer</p>
              <p className="landing-tagline">
                I enjoy exploring new tech to turn data into insight & insight into products.
              </p>
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
              technologies={project.technologies}
              link={project.link}
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
              <p className="publication-description">
                Developed a scalable metric to measure developers&apos; negative emotions toward
                technical debt by analyzing over 73,000 issue tracker comments from large
                open-source projects. My work showed that infrastructure-related technical debt
                causes greater emotional burden than implementation-level issues, highlighting the
                importance of considering developer well-being when prioritizing technical debt.
              </p>
              <p className="publication-meta">Pages 1643–1651</p>
              <p className="publication-doi">https://doi.org/10.1145/3803437.3805542</p>
            </a>
          </li>
        </ul>
      </section>

      <section
        id="about"
        ref={aboutSectionRef}
        className="about-section"
        aria-labelledby="about-heading"
      >
        <div className="about-layout">
          <h2 id="about-heading" className="about-heading">
            About me
          </h2>

          <div className="about-grid">
            <div className="about-copy">
              <div className="about-prose">
                {ABOUT_PARAGRAPHS.map((text) => (
                  <p key={text.slice(0, 32)} className="about-body">
                    {text}
                  </p>
                ))}
              </div>

              <div className="about-actions">
                <a className="about-cta" href="mailto:is2587@nyu.edu">
                  Let&apos;s connect!
                </a>
              </div>
            </div>

            <div className="about-photo-frame">
              <Image
                src="/about-me.jpg"
                alt="Portrait of Izah Sohail"
                width={720}
                height={900}
                sizes="(max-width: 640px) 240px, 340px"
                className="about-photo"
              />
            </div>
          </div>
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  )
}
