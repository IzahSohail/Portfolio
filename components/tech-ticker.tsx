"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const TECH_ICONS = [
  { src: "/assets/CSS.svg", alt: "CSS" },
  { src: "/assets/JavaScript.svg", alt: "JavaScript" },
  { src: "/assets/Kafka.svg", alt: "Kafka" },
  { src: "/assets/MongoDB.svg", alt: "MongoDB" },
  { src: "/assets/postgre.svg", alt: "PostgreSQL" },
  { src: "/assets/Python-Light.svg", alt: "Python" },
  { src: "/assets/react.svg", alt: "React" },
  { src: "/assets/TailwindCSS-Light.svg", alt: "Tailwind CSS" },
  { src: "/assets/Supabase-Light.svg", alt: "Supabase" },
]

/** Icon box size — keep in sync with CSS */
const ICON_PX = 64
/** Equal gap after every icon (including the last) so the loop seam matches mid-sequence gaps */
const GAP_PX = 56
/** Constant scroll speed for a smooth feel at any sequence length */
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
        <li key={`${icon.src}-${index}`} className="tech-ticker-item">
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
      // Fill at least the viewport (+ one set buffer) so the strip never looks sparse
      const setsNeeded = Math.max(2, Math.ceil((window.innerWidth + oneSetWidth) / oneSetWidth))
      const sequenceWidth = setsNeeded * oneSetWidth
      setSetCount(setsNeeded)
      // Animate exactly one sequence width at constant px/s → seamless when resetting at -50%
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
        {/* Two identical sequences; CSS translates by -50% (= one sequence) for a continuous loop */}
        <Sequence icons={sequence} />
        <Sequence icons={sequence} ariaHidden />
      </div>
    </div>
  )
}
