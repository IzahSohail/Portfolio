"use client"

import { useEffect, useRef } from "react"

/* Lerp factors per frame — lower = lazier trailing. The two glows use
   different speeds so they drift apart while moving, like layered light. */
const MAIN_EASE = 0.09
const TEAL_EASE = 0.05

export default function CursorGlow() {
  const mainRef = useRef<HTMLDivElement>(null)
  const tealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hasPointer = window.matchMedia("(pointer: fine)").matches
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!hasPointer || reducedMotion) return

    const main = mainRef.current
    const teal = tealRef.current
    if (!main || !teal) return

    let raf = 0
    let following = false
    const target = { x: 0, y: 0 }
    const mainPos = { x: 0, y: 0 }
    const tealPos = { x: 0, y: 0 }

    const place = (el: HTMLDivElement, pos: { x: number; y: number }) => {
      el.style.transform = `translate3d(${pos.x - el.offsetWidth / 2}px, ${pos.y - el.offsetHeight / 2}px, 0)`
    }

    const tick = () => {
      mainPos.x += (target.x - mainPos.x) * MAIN_EASE
      mainPos.y += (target.y - mainPos.y) * MAIN_EASE
      tealPos.x += (target.x - tealPos.x) * TEAL_EASE
      tealPos.y += (target.y - tealPos.y) * TEAL_EASE
      place(main, mainPos)
      place(teal, tealPos)
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (following) return
      following = true

      // Seed positions from where the glows currently sit so they glide
      // toward the cursor instead of jumping on the first mouse move.
      for (const [el, pos] of [
        [main, mainPos],
        [teal, tealPos],
      ] as const) {
        const rect = el.getBoundingClientRect()
        pos.x = rect.left + rect.width / 2
        pos.y = rect.top + rect.height / 2
        place(el, pos)
        el.classList.add("is-following")
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={mainRef} className="ambient-glow ambient-glow--main" aria-hidden />
      <div ref={tealRef} className="ambient-glow ambient-glow--teal" aria-hidden />
    </>
  )
}
