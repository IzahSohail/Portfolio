"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const TECH_ICONS = [
  { src: "/icons/CSS.svg", alt: "CSS" },
  { src: "/icons/JavaScript.svg", alt: "JavaScript" },
  { src: "/icons/Kafka.svg", alt: "Kafka" },
  { src: "/icons/MongoDB.svg", alt: "MongoDB" },
  { src: "/icons/postgre.svg", alt: "PostgreSQL" },
  { src: "/icons/Python-Light.svg", alt: "Python" },
  { src: "/icons/react.svg", alt: "React" },
  { src: "/icons/TailwindCSS-Light.svg", alt: "Tailwind CSS" },
  { src: "/icons/Supabase-Light.svg", alt: "Supabase" },
]

const ICON_PX = 64
const GAP_PX = 56
const SPEED_PX_PER_SEC = 55

function Sequence({
  icons,
  ariaHidden,
}: {
  icons: typeof TECH_ICONS
  ariaHidden?: boolean
}) {
  return (
    <ul className="tech-ticker-sequence" aria-hidden={ariaHidden || undefined}>
      {icons.map((icon, index) => (
        <li
          key={`${icon.src}-${index}`}
          className="tech-ticker-item"
          data-name={icon.alt}
        >
          <Image
            src={icon.src}
            alt={ariaHidden ? "" : icon.alt}
            width={ICON_PX}
            height={ICON_PX}
            unoptimized
            draggable={false}
          />
        </li>
      ))}
    </ul>
  )
}

export default function TechTicker() {
  const [setCount, setSetCount] = useState(2)
  const [durationSec, setDurationSec] = useState(30)

  useEffect(() => {
    const update = () => {
      const oneSetWidth = TECH_ICONS.length * (ICON_PX + GAP_PX)
      const setsNeeded = Math.max(2, Math.ceil((window.innerWidth + oneSetWidth) / oneSetWidth))
      const sequenceWidth = setsNeeded * oneSetWidth
      setSetCount(setsNeeded)
      setDurationSec(sequenceWidth / SPEED_PX_PER_SEC)
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const sequence = Array.from({ length: setCount }, () => TECH_ICONS).flat()

  return (
    <div className="tech-ticker">
      <div
        className="tech-ticker-track"
        style={{ animationDuration: `${durationSec}s` }}
        aria-label="Tech stack"
      >
        <Sequence icons={sequence} />
        <Sequence icons={sequence} ariaHidden />
      </div>
    </div>
  )
}
