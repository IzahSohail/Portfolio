"use client"

import { usePathname, useRouter } from "next/navigation"
import { Github, Linkedin } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"

const SOCIAL = {
  github: "https://github.com/IzahSohail",
  linkedin: "https://www.linkedin.com/in/izah-sohail-12087a194/",
}

export default function SiteNav() {
  const pathname = usePathname()
  const router = useRouter()

  const goHomeSection = (id: string) => {
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }
    router.push(`/#${id}`)
  }

  return (
    <nav className="site-nav">
      <button type="button" onClick={() => goHomeSection("about")}>
        About me
      </button>
      <button type="button" onClick={() => goHomeSection("projects")}>
        Projects
      </button>
      <button type="button" onClick={() => goHomeSection("publications")}>
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
      <ThemeToggle />
    </nav>
  )
}
