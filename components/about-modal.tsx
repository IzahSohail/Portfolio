"use client"

import { X } from "lucide-react"

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4"
      style={{ backgroundColor: "rgba(34, 84, 156, 0.28)" }}
      onClick={onClose}
    >
      <div
        data-modal-scroll
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-sm bg-[#f7f6f2] p-8 shadow-xl sm:p-12"
        style={{ overscrollBehavior: "contain" }}
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-zinc-500 transition hover:opacity-70"
        >
          <X size={22} />
        </button>
        <h2
          className="pr-8 text-4xl font-extrabold italic leading-none sm:text-5xl"
          style={{ color: "#22549c", fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
        >
          About me
        </h2>
        <p
          className="mt-5 text-lg"
          style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif", color: "#1a1a1a" }}
        >
          hi im Izah!
        </p>
        <p
          className="mt-4 max-w-md text-sm sm:text-base"
          style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif", color: "#4a4a4a" }}
        >
          I&apos;m a recent Computer Science graduate based in the UAE. 
          I&apos;m interested in working at the intersection of technology and data, where I can combine analytical thinking with creativity to solve interesting problems. 
          Having studied across New York, Abu Dhabi, Jordan, and Paris, I bring a global perspective to the way I think, learn, and build. <br /><br /> Scroll around to see what I&apos;ve been working
          on, or reach me at{" "}
          <a href="mailto:is2587@nyu.edu" className="underline" style={{ color: "#22549c" }}>
            is2587@nyu.edu
          </a>
          .
        </p>
      </div>
    </div>
  )
}
