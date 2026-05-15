"use client"

import { useState, useRef, useEffect } from "react"

const dockItems = [
  {
    name: "Rust",
    color: "#DEA584",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
  },
  {
    name: "Docker",
    color: "#2496ED",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M13.976 9.15c-2.172-.806-3.396-1.22-4.175-1.601-.886-.442-1.283-.77-1.283-1.283 0-.61.558-.976 1.396-.976 1.61 0 3.247.58 4.872 1.722l.69-1.653C13.465 4.06 11.526 3.32 9.623 3.32c-2.096 0-3.457 1.056-3.457 2.722 0 1.776 1.272 2.587 3.29 3.396 2.078.83 3.44 1.47 3.44 2.47 0 .83-.64 1.396-1.94 1.396-1.61 0-3.67-.696-5.39-1.94l-.72 1.66c1.87 1.396 4.24 2.196 6.28 2.196 2.27 0 3.76-1.11 3.76-2.89 0-1.94-1.396-2.68-3.59-3.59l.69-.39zM21 12.976v-1.86h-1.86V9.25h-1.86v1.86h-1.86v1.86h1.86v1.86h1.86v-1.86H21z" />
      </svg>
    ),
  },
  {
    name: "Linux",
    color: "#FCC624",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.269.818-.405 1.672-.322 2.536.058.596.256 1.167.573 1.664.436.684 1.05 1.22 1.762 1.544.712.324 1.493.434 2.255.318.762-.116 1.48-.42 2.072-.884.592-.464 1.04-1.07 1.296-1.756.256-.686.31-1.44.156-2.16-.154-.72-.53-1.372-1.07-1.87-.54-.498-1.21-.742-1.91-.696-.7.046-1.35.38-1.84.936-.49.556-.79 1.27-.85 2.03-.06.76.12 1.51.51 2.16.39.65.97 1.16 1.65 1.47.68.31 1.42.41 2.14.29.72-.12 1.38-.42 1.9-.87.52-.45.88-1.02 1.04-1.65.16-.63.12-1.3-.12-1.9-.24-.6-.66-1.1-1.2-1.44-.54-.34-1.18-.5-1.84-.46-.66.04-1.28.28-1.78.68-.5.4-.86.94-1.04 1.54-.18.6-.18 1.24 0 1.84.18.6.54 1.12 1.04 1.5.5.38 1.1.6 1.72.64.62.04 1.22-.1 1.74-.4.52-.3.94-.74 1.22-1.26.28-.52.4-1.12.34-1.72-.06-.6-.3-1.16-.68-1.62-.38-.46-.88-.8-1.44-.98-.56-.18-1.16-.2-1.74-.06-.58.14-1.1.44-1.5.86-.4.42-.66.96-.74 1.54-.08.58.02 1.18.28 1.72.26.54.66 1 1.16 1.34.5.34 1.08.54 1.68.58.6.04 1.2-.08 1.74-.34.54-.26 1-.66 1.34-1.16.34-.5.54-1.08.58-1.68.04-.6-.08-1.2-.34-1.74-.26-.54-.66-1-1.16-1.34-.5-.34-1.08-.54-1.68-.58-.6-.04-1.2.08-1.74.34-.54.26-1 .66-1.34 1.16-.34.5-.54 1.08-.58 1.68-.04.6.08 1.2.34 1.74.26.54.66 1 1.16 1.34.5.34 1.08.54 1.68.58.6.04 1.2-.08 1.74-.34.54-.26 1-.66 1.34-1.16.34-.5.54-1.08.58-1.68.04-.6-.08-1.2-.34-1.74-.26-.54-.66-1-1.16-1.34-.5-.34-1.08-.54-1.68-.58-.6-.04-1.2.08-1.74.34-.54.26-1 .66-1.34 1.16-.34.5-.54 1.08-.58 1.68z" />
      </svg>
    ),
  },
  {
    name: "ARM",
    color: "#0091BD",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M7 2v11h3v9l7-12h-4l4-8H7z" />
      </svg>
    ),
  },
  {
    name: "OCI",
    color: "#26ABF2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    color: "#ffffff",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Termux",
    color: "#666666",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M4 17l6-5-6-5V4l8 7-8 7V17zm10 0h6v-2h-6v2z" />
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
          <div className="inline-flex items-end gap-2 p-4 rounded-2xl bg-[var(--bg-200)]/50 border border-[var(--border-100)] backdrop-blur-xl">
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
                  <span className="text-[10px] text-[var(--text-500)] opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
