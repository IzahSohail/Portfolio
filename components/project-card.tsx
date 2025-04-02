"use client"

import Image from "next/image"
import { X, Minus, Square } from 'lucide-react'
import { useMobile } from "@/hooks/use-mobile"

interface ProjectCardProps {
  title: string
  image: string
  onClick: () => void
}

export default function ProjectCard({ title, image, onClick }: ProjectCardProps) {
  const isMobile = useMobile()
  
  return (
    <div className={`flex flex-col ${isMobile ? 'w-[280px]' : 'w-[350px]'} flex-shrink-0`}>
      <div
        className="border border-orange-500 rounded-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
        onClick={onClick}
      >
        <div className="bg-black px-3 py-2 flex items-center border-b border-orange-500">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center">
              <X size={8} className="text-red-800" />
            </div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center">
              <Minus size={8} className="text-yellow-800" />
            </div>
            <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center">
              <Square size={8} className="text-green-800" />
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
        <div className={`relative ${isMobile ? 'h-[160px]' : 'h-[200px]'} w-full`}>
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 280px, 350px"
          />
        </div>
        <div className="flex border-t border-orange-500">
          <div className="border-r border-orange-500 px-2 py-1 text-white">&lt;</div>
          <div className="flex-1"></div>
          <div className="border-l border-orange-500 px-2 py-1 text-white">&gt;</div>
        </div>
      </div>
      <h3 className="text-white text-center mt-2 md:mt-4 mb-2 md:mb-8 text-sm md:text-base truncate">{title}</h3>
    </div>
  )
}