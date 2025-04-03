"use client"

import { X, FileText, Mail, Github } from "lucide-react"
import Link from "next/link"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col p-6">
      <div className="flex justify-end">
        <button onClick={onClose} className="text-white" aria-label="Close menu">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <Link
          href="/resume.pdf"
          className="text-white hover:text-orange-500 transition flex items-center gap-2"
          download
          onClick={onClose}
        >
          <FileText size={20} />
          <span>Download Resume</span>
        </Link>
        <Link
          href="mailto:is2587@nyu.edu"
          className="text-white hover:text-orange-500 transition flex items-center gap-2"
          onClick={onClose}
        >
          <Mail size={20} />
          <span>Email Me</span>
        </Link>
        <Link
          href="https://github.com/IzahSohail"
          className="text-white hover:text-orange-500 transition flex items-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
        >
          <Github size={20} />
          <span>GitHub</span>
        </Link>
      </div>
    </div>
  )
}

