"use client"

import { useEffect, useState } from "react"

const roles = ["STUDENT", "RESEARCHER", "DESIGNER"]

export default function TypewriterComponent() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const currentRole = roles[currentRoleIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(currentRole.substring(0, currentText.length + 1))

        if (currentText.length === currentRole.length) {
          // Wait a bit before starting to delete
          setIsDeleting(true)
          setTypingSpeed(200)
        }
      } else {
        setCurrentText(currentRole.substring(0, currentText.length - 1))

        if (currentText.length === 0) {
          setIsDeleting(false)
          setCurrentRoleIndex((currentRoleIndex + 1) % roles.length)
          setTypingSpeed(200)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, currentRoleIndex, isDeleting, typingSpeed])

  return <span className="text-orange-500">{currentText}</span>
}

