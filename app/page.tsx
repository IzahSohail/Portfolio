"use client"

import { useEffect, useRef } from "react"
import ProjectCard from "@/components/project-card"
import SiteNav from "@/components/site-nav"
import TechTicker from "@/components/tech-ticker"
import Image from "next/image"
import { PROJECTS } from "@/lib/projects"

const HERO_TAGS = ["System Design", "Full-Stack", "AI Engineering", "Test-Driven"]

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
  }, [])

  return (
    <main className="page-content">
      <SiteNav />

      <section className="landing">
        <div className="landing-inner">
          <div className="landing-hero">
            <div className="landing-copy">
              <h1 className="landing-title">Izah Sohail</h1>
              <p className="landing-subtitle">AI & Full-Stack Developer</p>
              <ul className="landing-tags" aria-label="Focus areas">
                {HERO_TAGS.map((tag) => (
                  <li key={tag}>
                    <span className="landing-tag">{tag}</span>
                  </li>
                ))}
              </ul>
              <p className="landing-tagline">
                I enjoy exploring new tech to turn data into insight & insight into products.
              </p>
            </div>

            <div className="landing-illustration-wrap">
              <Image
                src="/about/illustration.svg"
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
              slug={project.slug}
              technologies={project.technologies}
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
                src="/about/portrait.jpg"
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
    </main>
  )
}
