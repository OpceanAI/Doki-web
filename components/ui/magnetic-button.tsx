"use client"

import { useRef, useState, useCallback, type ReactNode, type MouseEvent } from "react"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  onClick,
  href,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    setPosition({
      x: deltaX * strength,
      y: deltaY * strength,
    })
  }, [strength])

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 })
  }, [])

  const content = (
    <div
      ref={ref}
      className={`magnetic-btn ${className}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  )

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className="inline-block">
        {content}
      </a>
    )
  }

  return content
}
