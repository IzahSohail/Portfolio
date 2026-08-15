import Image from "next/image"
import Link from "next/link"
import type { CaseFigure, CaseSection, Project } from "@/lib/projects"

function Figure({ figure }: { figure: CaseFigure }) {
  const variant = figure.variant ?? "default"
  return (
    <figure className={`case-figure${variant !== "default" ? ` case-figure--${variant}` : ""}`}>
      <div className="case-figure-media">
        <Image
          src={figure.src}
          alt={figure.alt}
          width={1400}
          height={900}
          className="case-figure-image"
          sizes="(max-width: 900px) 100vw, 900px"
        />
      </div>
      <figcaption>
        {figure.label ? <span className="case-label">{figure.label}</span> : null}
        <span className="case-figure-caption">{figure.caption}</span>
      </figcaption>
    </figure>
  )
}

function Section({ section }: { section: CaseSection }) {
  switch (section.type) {
    case "prose":
      return (
        <section className="case-section">
          <h2>{section.title}</h2>
          {section.body ? <p>{section.body}</p> : null}
          {section.bullets?.length ? (
            <ul className="case-bullets">
              {section.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      )

    case "cards":
      return (
        <section className="case-section">
          <h2>{section.title}</h2>
          {section.intro ? <p>{section.intro}</p> : null}
          <div className={`case-grid case-grid--${section.cards.length >= 3 ? "3" : "2"}`}>
            {section.cards.map((card) => (
              <div key={card.title} className="case-card">
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </section>
      )

    case "figures":
      return (
        <section className="case-section">
          <h2>{section.title}</h2>
          {section.intro ? <p>{section.intro}</p> : null}
          <div
            className={`case-figures case-figures--${section.layout ?? "stack"}`}
          >
            {section.figures.map((figure) => (
              <Figure key={figure.src} figure={figure} />
            ))}
          </div>
        </section>
      )

    case "split":
      return (
        <section className="case-section">
          <div className="case-grid case-grid--split">
            <div className="case-split-copy">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              {section.bullets?.length ? (
                <ul className="case-bullets">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
            <Figure figure={section.figure} />
          </div>
        </section>
      )

    case "phases":
      return (
        <section className="case-section">
          <h2>{section.title}</h2>
          {section.intro ? <p>{section.intro}</p> : null}
          <ol className="case-phases">
            {section.phases.map((phase, index) => (
              <li key={phase.title}>
                <span className="case-step">{index + 1}</span>
                <div>
                  <strong>{phase.title}</strong>
                  <span>{phase.body}</span>
                </div>
              </li>
            ))}
          </ol>
          {section.figure ? <Figure figure={section.figure} /> : null}
        </section>
      )

    case "adrs":
      return (
        <section className="case-section">
          <h2>{section.title}</h2>
          <div className="case-grid case-grid--2">
            {section.items.map((item) => (
              <div key={item.label} className="case-adr">
                <span className="case-label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      )

    case "table":
      return (
        <section className="case-section">
          <h2>{section.title}</h2>
          {section.intro ? <p>{section.intro}</p> : null}
          <div className="case-table-wrap">
            <table className="case-table">
              <thead>
                <tr>
                  <th>{section.headers[0]}</th>
                  <th>{section.headers[1]}</th>
                </tr>
              </thead>
              <tbody>
                {section.rows.map(([left, right]) => (
                  <tr key={left}>
                    <td>{left}</td>
                    <td>{right}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )

    case "gallery":
      return (
        <section className="case-section">
          <h2>{section.title}</h2>
          {section.intro ? <p>{section.intro}</p> : null}
          <div className="case-gallery">
            {section.images.map((src, index) => (
              <div key={src} className="case-gallery-item">
                <Image
                  src={src}
                  alt={`${section.title} image ${index + 1}`}
                  width={1200}
                  height={750}
                  className="case-gallery-image"
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </section>
      )

    default:
      return null
  }
}

export default function CaseStudy({ project }: { project: Project }) {
  return (
    <article className="case-study">
      <div className="case-shell">
        <Link href="/#projects" className="case-back">
          ← Back to projects
        </Link>

        <header className="case-hero">
          <h1>{project.title}</h1>
          <p className="case-lede">{project.lede}</p>

          <div className="case-meta" aria-label="Tech stack">
            {project.technologies.map((tech) => (
              <span className="case-chip" key={tech}>
                {tech}
              </span>
            ))}
          </div>

          {project.link ? (
            <div className="case-links">
              <a
                className="case-link"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.linkLabel ?? "View project"} →
              </a>
            </div>
          ) : null}
        </header>

        {project.sections.map((section) => (
          <Section key={`${section.type}-${section.title}`} section={section} />
        ))}

        {project.footnote ? <p className="case-footnote">{project.footnote}</p> : null}
      </div>
    </article>
  )
}
