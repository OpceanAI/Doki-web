"use client"

import { useState } from "react"

const dockItems = [
  {
    name: "C",
    color: "#A8B9CC",
    lines: "30,000",
    pct: "55%",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <text x="3" y="18" fontFamily="sans-serif" fontWeight="bold" fontSize="18">C</text>
      </svg>
    ),
  },
  {
    name: "Go",
    color: "#00ADD8",
    lines: "24,000",
    pct: "44%",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <text x="2" y="18" fontFamily="sans-serif" fontWeight="bold" fontSize="16">Go</text>
      </svg>
    ),
  },
  {
    name: "Rust",
    color: "#DEA584",
    lines: "640",
    pct: "1%",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <text x="1" y="18" fontFamily="sans-serif" fontWeight="bold" fontSize="14">Rs</text>
      </svg>
    ),
  },
]

export function Dock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative py-[var(--section-padding)] bg-[var(--bg-000)]">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[var(--max-width)] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[var(--accent-cyan)] text-sm font-mono mb-3">Tech Stack</p>
          <h2 className="font-display text-[clamp(32px,5vw,48px)] font-bold tracking-[-0.03em] text-[var(--text-100)] mb-4">
            Built with
            <span className="text-gradient-animated"> precision.</span>
          </h2>
        </div>

        <div className="flex justify-center">
          <div className="inline-flex items-end gap-3 p-4 rounded-2xl bg-[var(--bg-200)]/50 border border-[var(--border-100)] backdrop-blur-xl">
            {dockItems.map((item, i) => {
              const isHovered = hoveredIndex === i
              const isNeighbor = hoveredIndex !== null && Math.abs(hoveredIndex - i) === 1
              const scale = isHovered ? "scale-150 -translate-y-2" : isNeighbor ? "scale-125 -translate-y-1" : ""

              return (
                <div
                  key={item.name}
                  className={`dock-item relative flex flex-col items-center gap-1 cursor-default ${scale}`}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200"
                    style={{ color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <span className="text-[10px] text-[var(--text-500)] font-medium">{item.name}</span>
                  {isHovered && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-[var(--bg-300)] border border-[var(--border-100)] text-[10px] font-mono text-[var(--text-300)] whitespace-nowrap">
                      {item.lines} lines ({item.pct})
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
