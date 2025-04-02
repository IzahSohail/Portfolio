"use client"

import { X, Twitter, Twitch, Youtube } from 'lucide-react'
import Link from 'next/link'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col p-6">
      <div className="flex justify-end">
        <button 
          onClick={onClose}
          className="text-white"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <Link 
          href="#" 
          className="text-white hover:text-orange-500 transition flex items-center gap-2"
          onClick={onClose}
        >
          <Twitter size={20} />
          <span>Twitter</span>
        </Link>
        <Link 
          href="#" 
          className="text-white hover:text-orange-500 transition flex items-center gap-2"
          onClick={onClose}
        >
          <Twitch size={20} />
          <span>Twitch</span>
        </Link>
        <Link 
          href="#" 
          className="text-white hover:text-orange-500 transition flex items-center gap-2"
          onClick={onClose}
        >
          <Youtube size={20} />
          <span>YouTube</span>
        </Link>
      </div>
    </div>
  )
}