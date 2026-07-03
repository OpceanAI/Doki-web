"use client"

import { useState, useCallback } from "react"

interface ScrollRevealTextProps {
  text: string
  className?: string
  as?: "p" | "span" | "h1" | "h2" | "h3"
}

export function ScrollRevealText({ text, className = "", as: Tag = "p" }: ScrollRevealTextProps) {
  const [revealed, setRevealed] = useState(false)
  const words = text.split(" ")

  const handleInView = useCallback(() => setRevealed(true), [])

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-500"
          style={{
            opacity: revealed ? 1 : 0.15,
            transform: revealed ? "translateY(0)" : "translateY(8px)",
            transitionDelay: `${i * 40}ms`,
          }}
          data-word={word}
          onPointerEnter={handleInView}
        >
          {word}{" "}
        </span>
      ))}
    </Tag>
  )
}
