"use client"

import { useState, useRef, useCallback } from "react"

const comparisons = [
  { label: "Binary Size", docker: "58 MB", doki: "6.6 MB", dockerVal: 58, dokiVal: 6.6, unit: "MB" },
  { label: "Memory (idle)", docker: "85 MB", doki: "12 MB", dockerVal: 85, dokiVal: 12, unit: "MB" },
  { label: "Startup Time", docker: "~50ms", doki: "<15ms", dockerVal: 50, dokiVal: 15, unit: "ms" },
  { label: "Dependencies", docker: "12", doki: "0", dockerVal: 12, dokiVal: 0, unit: "" },
]

export function Comparison() {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current || !isDragging.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    setSliderPos(Math.max(5, Math.min(95, x)))
  }, [])

  const handleMouseDown = useCallback(() => { isDragging.current = true }, [])
  const handleMouseUp = useCallback(() => { isDragging.current = false }, [])

  const handleTouchStart = useCallback(() => { isDragging.current = true }, [])

  return (
    <section className="relative py-[var(--section-padding)] bg-[var(--bg-000)]">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[var(--max-width)] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[var(--accent-cyan)] text-sm font-mono mb-3">Comparison</p>
          <h2 className="font-display text-[clamp(32px,5vw,48px)] font-bold tracking-[-0.03em] text-[var(--text-100)] mb-4">
            Docker vs
            <span className="text-gradient-animated"> Doki</span>
          </h2>
          <p className="max-w-lg mx-auto text-[var(--text-400)] leading-relaxed">
            Drag the slider to see the difference.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative rounded-2xl border border-[var(--border-100)] overflow-hidden select-none"
          style={{ height: 400 }}
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleMouseUp}
        >
          {/* Docker side (left) */}
          <div className="absolute inset-0 bg-[var(--bg-200)]">
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--text-500)]" />
              <span className="text-sm font-mono text-[var(--text-500)]">Docker</span>
            </div>
            <div className="flex flex-col justify-center h-full px-12 gap-8">
              {comparisons.map((c) => (
                <div key={c.label} className="flex items-center justify-between">
                  <span className="text-sm text-[var(--text-400)]">{c.label}</span>
                  <span className="font-mono text-lg text-[var(--text-500)]">{c.docker}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Doki side (right) */}
          <div
            className="absolute inset-0 bg-[var(--bg-100)]"
            style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
          >
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <span className="text-sm font-mono text-[var(--accent-cyan)]">Doki</span>
              <div className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
            </div>
            <div className="flex flex-col justify-center h-full px-12 gap-8">
              {comparisons.map((c) => (
                <div key={c.label} className="flex items-center justify-between">
                  <span className="text-sm text-[var(--text-300)]">{c.label}</span>
                  <span className="font-mono text-lg text-[var(--accent-cyan)]">{c.doki}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Slider handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-[var(--accent-cyan)] z-10"
            style={{ left: `${sliderPos}%`, transform: "translateX(-50%)", boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--accent-cyan)] flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
