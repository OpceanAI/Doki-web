"use client"

import { useState, useCallback, useEffect, useRef } from "react"

interface ScrollRevealTextProps {
  text: string
  className?: string
  as?: "p" | "span" | "h1" | "h2" | "h3"
}

export function ScrollRevealText({ text, className = "", as: Tag = "p" }: ScrollRevealTextProps) {
  const [revealed, setRevealed] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const words = text.split(" ")

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleInView = useCallback(() => setRevealed(true), [])

  return (
    <Tag ref={ref} className={className}>
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
          onClick={handleInView}
        >
          {word}{" "}
        </span>
      ))}
    </Tag>
  )
}