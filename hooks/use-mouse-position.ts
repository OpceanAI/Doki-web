"use client"

import { useState, useEffect, useCallback, type RefObject } from "react"

export function useMousePosition(ref?: RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (ref?.current) {
      const rect = ref.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setPosition({ x, y })
    } else {
      setPosition({ x: e.clientX, y: e.clientY })
    }
  }, [ref])

  useEffect(() => {
    const target = ref?.current || window
    const listener = handleMouseMove as EventListener
    target.addEventListener("mousemove", listener, { passive: true })
    return () => target.removeEventListener("mousemove", listener)
  }, [ref, handleMouseMove])

  return position
}