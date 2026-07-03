"use client"

import { useState, useRef, useCallback } from "react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const comparisons = [
  { label: "Binary Size",  docker: "58 MB",  doki: "8.56 MB", dockerVal: 58, dokiVal: 8.56, unit: "MB" },
  { label: "Memory idle",  docker: "85 MB",  doki: "12 MB",   dockerVal: 85, dokiVal: 12,   unit: "MB" },
  { label: "Startup time", docker: "~50ms",  doki: "<15ms",   dockerVal: 50, dokiVal: 15,   unit: "ms" },
  { label: "Dependencies", docker: "12",     doki: "0",       dockerVal: 12, dokiVal: 0,    unit: "" },
  { label: "Kubernetes",   docker: "No",     doki: "1.32",    dockerVal: 0,  dokiVal: 1,    unit: "" },
  { label: "Podman API",   docker: "N/A",    doki: "v5",      dockerVal: 0,  dokiVal: 1,    unit: "" },
]

export function Comparison() {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging   = useRef(false)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current || !isDragging.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x    = ((clientX - rect.left) / rect.width) * 100
    setSliderPos(Math.max(5, Math.min(95, x)))
  }, [])

  const startDrag = useCallback(() => { isDragging.current = true }, [])
  const stopDrag  = useCallback(() => { isDragging.current = false }, [])

  return (
    <section className="relative py-[var(--section-padding)] bg-parchment-pattern">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[var(--max-width)] mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--gold-bright)" aria-hidden="true" className="opacity-70">
                <path d="M8,0 L9.5,5.5 L15,5.5 L10.5,9 L12,15 L8,11.5 L4,15 L5.5,9 L1,5.5 L6.5,5.5 Z" />
              </svg>
              <span className="text-[var(--brown-500)] text-[11px] font-sans uppercase tracking-[0.14em]">
                Comparison
              </span>
            </div>
            <h2 className="font-display text-[clamp(28px,4.5vw,44px)] font-semibold tracking-wide text-[var(--brown-900)] mb-4 leading-tight">
              Docker vs{" "}
              <span className="gradient-text-animated">Doki</span>
            </h2>
            <p className="max-w-lg mx-auto text-[var(--brown-600)] leading-relaxed font-sans text-[15px]">
              Drag the slider to see the difference.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div
            ref={containerRef}
            className="relative rounded-2xl overflow-hidden select-none"
            style={{
              height:     420,
              border:     "1px solid var(--border-gold)",
              boxShadow:  "var(--shadow-lg)",
              cursor:     "ew-resize",
            }}
            onMouseMove={(e) => handleMove(e.clientX)}
            onMouseDown={startDrag}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            onTouchStart={startDrag}
            onTouchEnd={stopDrag}
            role="img"
            aria-label="Slider comparing Docker and Doki metrics"
          >
            {/* Docker side — left */}
            <div
              className="absolute inset-0 flex flex-col"
              style={{ background: "var(--parchment-200)" }}
            >
              <div className="px-10 pt-8 pb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: "var(--brown-400)" }} />
                <span className="text-sm font-mono" style={{ color: "var(--brown-500)" }}>Docker</span>
              </div>
              <div className="flex flex-col justify-center flex-1 px-10 gap-7">
                {comparisons.map((c) => (
                  <div key={c.label} className="flex items-center justify-between">
                    <span className="text-sm font-sans" style={{ color: "var(--brown-500)" }}>{c.label}</span>
                    <span className="font-mono text-base" style={{ color: "var(--brown-400)" }}>{c.docker}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Doki side — right, clipped */}
            <div
              className="absolute inset-0 flex flex-col"
              style={{
                background: "var(--parchment-50)",
                clipPath:   `inset(0 0 0 ${sliderPos}%)`,
              }}
            >
              <div className="px-10 pt-8 pb-4 flex items-center justify-end gap-2">
                <span className="text-sm font-mono" style={{ color: "var(--wine-bright)" }}>Doki</span>
                <div className="w-2 h-2 rounded-full" style={{ background: "var(--wine-bright)" }} />
              </div>
              <div className="flex flex-col justify-center flex-1 px-10 gap-7">
                {comparisons.map((c) => (
                  <div key={c.label} className="flex items-center justify-between">
                    <span className="text-sm font-sans" style={{ color: "var(--brown-600)" }}>{c.label}</span>
                    <span className="font-mono text-base font-semibold" style={{ color: "var(--wine-bright)" }}>{c.doki}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider line + handle */}
            <div
              className="absolute top-0 bottom-0 z-10 pointer-events-none"
              style={{
                left:      `${sliderPos}%`,
                transform: "translateX(-50%)",
                width:     2,
                background: `linear-gradient(180deg, var(--wine-bright), var(--gold-bright), var(--wine-bright))`,
                boxShadow:  "0 0 16px rgba(212, 175, 55, 0.4)",
              }}
            >
              {/* Handle knob */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "var(--gold-bright)",
                  boxShadow:  "0 0 20px rgba(212, 175, 55, 0.5), 0 2px 8px rgba(28,15,10,0.2)",
                }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="var(--brown-900)" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
