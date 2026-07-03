"use client"

import { useState, useEffect, useCallback } from "react"

export function useScrollAnimations() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [direction, setDirection] = useState<"up" | "down">("down")
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setDirection(currentScrollY > lastScrollY ? "down" : "up")
      setLastScrollY(currentScrollY)

      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [lastScrollY])

  return { scrollY, scrollProgress, direction }
}

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMouseMove)
  }, [])

  return position
}

export function useInView(threshold = 0.1, once = true) {
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold }
    )

    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, threshold, once])

  return { setRef, isInView }
}

export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setOffset(window.scrollY * speed)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [speed])

  return offset
}
