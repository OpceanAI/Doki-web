"use client"

import { useEffect, useState, useRef, useCallback } from "react"

export function useCounter(target: number, duration = 1500, startOnVisible = true) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(!startOnVisible)
  const ref = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | undefined>(undefined)

  const animate = useCallback(() => {
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [target, duration])

  useEffect(() => {
    if (!startOnVisible || !ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          animate()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [startOnVisible, hasStarted, animate])

  useEffect(() => {
    if (hasStarted && startOnVisible) return
    if (!startOnVisible) animate()
  }, [hasStarted, startOnVisible, animate])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return { count, ref }
}