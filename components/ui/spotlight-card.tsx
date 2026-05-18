"use client"

import { useRef, useState, useCallback, type ReactNode } from "react"

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function SpotlightCard({ children, className = "", intensity = 1 }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => setIsHovering(false), [])

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: isHovering
          ? `radial-gradient(${600 * intensity}px circle at ${position.x}px ${position.y}px, rgba(0, 212, 255, 0.06), transparent 40%), var(--bg-100)`
          : "var(--bg-100)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
