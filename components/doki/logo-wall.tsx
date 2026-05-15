"use client"

import { useEffect, useRef, useState } from "react"

const logos = [
  {
    name: "Docker",
    svg: (
      <svg viewBox="0 0 123 30" fill="currentColor" className="h-6">
        <path d="M10.4 17.5h-2.4v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM14.5 17.5h-2.4v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM18.6 17.5h-2.4v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM22.7 17.5h-2.4v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM26.8 17.5h-2.4v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM30.9 17.5h-2.4v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM10.4 21.6h-2.4v-2.4h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM14.5 21.6h-2.4v-2.4h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM18.6 21.6h-2.4v-2.4h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM6.3 21.6H3.9v-2.4h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM6.3 17.5H3.9v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM6.3 13.4H3.9v-2.4h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM10.4 13.4H3.9V11h6.5c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM14.5 13.4h-2.4V11h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM18.6 13.4h-2.4V11h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM22.7 13.4h-2.4V11h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM26.8 13.4h-2.4V11h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM30.9 13.4h-2.4V11h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM35 17.5h-2.4v-5H35c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM39.1 17.5h-2.4v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM43.2 17.5h-2.4v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM47.3 17.5h-2.4v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM51.4 17.5H49v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM55.5 17.5h-2.4v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM59.6 17.5h-2.4v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM63.7 17.5h-2.4v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM67.8 17.5h-2.4v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM71.9 17.5h-2.4v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM76 17.5h-2.4v-5H76c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM80.1 17.5h-2.4v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM84.2 17.5h-2.4v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM88.3 17.5h-2.4v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM92.4 17.5H90v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM96.5 17.5h-2.4v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM100.6 17.5h-2.4v-5h2.4c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5z" />
        <path d="M106.3 8.5c-1.2-1.4-3.2-2.3-5.5-2.3-1.3 0-2.5.3-3.5.8-.5-1.2-1.3-2.3-2.3-3.2-1.7-1.5-4-2.3-6.5-2.3-2.5 0-4.8.8-6.5 2.3-1 .9-1.8 2-2.3 3.2-1-.5-2.2-.8-3.5-.8-2.3 0-4.3.9-5.5 2.3-1.2 1.4-1.8 3.3-1.8 5.5 0 2.2.6 4.1 1.8 5.5 1.2 1.4 3.2 2.3 5.5 2.3h20.5c2.3 0 4.3-.9 5.5-2.3 1.2-1.4 1.8-3.3 1.8-5.5 0-2.2-.6-4.1-1.8-5.5z" />
      </svg>
    ),
  },
  {
    name: "OCI",
    svg: (
      <svg viewBox="0 0 100 30" fill="currentColor" className="h-6">
        <text x="0" y="22" fontFamily="monospace" fontWeight="bold" fontSize="20">OCI</text>
      </svg>
    ),
  },
  {
    name: "Kubernetes",
    svg: (
      <svg viewBox="0 0 120 30" fill="currentColor" className="h-7">
        <path d="M32 15l-3-1.7V9.8l3-1.7 3 1.7v3.5L32 15zm0 0l3 1.7v3.5L32 22l-3-1.7v-3.5L32 15z" />
        <circle cx="32" cy="15" r="2" fill="none" stroke="currentColor" strokeWidth="1" />
        <text x="42" y="22" fontFamily="sans-serif" fontWeight="600" fontSize="14">Kubernetes</text>
      </svg>
    ),
  },
  {
    name: "GitHub",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Alpine",
    svg: (
      <svg viewBox="0 0 100 30" fill="currentColor" className="h-6">
        <path d="M15 8L5 22h4l2-3h8l2 3h4L15 8zm0 5l3 4h-6l3-4z" />
        <text x="30" y="22" fontFamily="sans-serif" fontWeight="600" fontSize="14">Alpine</text>
      </svg>
    ),
  },
  {
    name: "Ubuntu",
    svg: (
      <svg viewBox="0 0 100 30" fill="currentColor" className="h-6">
        <circle cx="15" cy="15" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="15" cy="5" r="2" />
        <circle cx="23.66" cy="20" r="2" />
        <circle cx="6.34" cy="20" r="2" />
        <text x="30" y="22" fontFamily="sans-serif" fontWeight="600" fontSize="14">Ubuntu</text>
      </svg>
    ),
  },
  {
    name: "Termux",
    svg: (
      <svg viewBox="0 0 100 30" fill="currentColor" className="h-6">
        <path d="M5 8l8 7-8 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 22h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <text x="30" y="22" fontFamily="sans-serif" fontWeight="600" fontSize="14">Termux</text>
      </svg>
    ),
  },
  {
    name: "Reddit",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.143a.593.593 0 01.111-.222l.968-1.25c.14-.182.35-.292.576-.292l2.616.547zM6.778 11.213a.878.878 0 00-.878.878c0 .486.392.878.878.878a.878.878 0 00.878-.878.878.878 0 00-.878-.878zm10.444 0a.878.878 0 00-.878.878.878.878 0 00.878.878.878.878 0 00.878-.878.878.878 0 00-.878-.878zm-5.222 3.545c-1.25 0-2.37-.14-3.26-.42-.14-.042-.28.042-.322.182-.042.14.042.28.182.322.98.308 2.18.462 3.4.462s2.42-.154 3.4-.462c.14-.042.224-.182.182-.322-.042-.14-.182-.224-.322-.182-.89.28-2.01.42-3.26.42z" />
      </svg>
    ),
  },
]

export function LogoWall() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative py-[var(--section-padding)] bg-[var(--bg-000)]">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[var(--max-width)] mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-[var(--accent-cyan)] text-sm font-mono mb-3">Ecosystem</p>
          <h2 className="font-display text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.03em] text-[var(--text-100)] mb-4">
            Compatible with the ecosystem
            <br />
            <span className="text-[var(--text-400)]">you already use</span>
          </h2>
          <p className="max-w-md mx-auto text-[var(--text-400)] leading-relaxed">
            Works with the tools, images, and platforms you know. Zero lock-in.
          </p>
        </div>

        {/* Logo Grid */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="group flex items-center justify-center p-6 rounded-xl bg-[var(--bg-100)] border border-[var(--border-100)] text-[var(--text-500)] hover:text-[var(--text-100)] hover:border-[var(--border-200)] hover:bg-[var(--bg-200)] transition-all duration-300 hover:scale-[1.02] cursor-default"
            >
              <div className="opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                {logo.svg}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
