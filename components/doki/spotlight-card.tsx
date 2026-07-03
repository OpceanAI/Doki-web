"use client"

import { useRef, useState, useCallback } from "react"
import { useMousePosition } from "@/hooks/use-mouse-position"

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
}

export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { x, y } = useMousePosition(ref)
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => setIsHovering(false), [])

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        background: isHovering
          ? `radial-gradient(600px circle at ${x}% ${y}%, rgba(0, 212, 255, 0.06), transparent 40%), var(--bg-100)`
          : "var(--bg-100)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
