"use client"

import { useEffect, useRef, useState } from "react"

const logos = [
  {
    name: "Docker",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
        <path d="M13.976 9.15c-2.172-.806-3.396-1.22-4.175-1.601-.886-.442-1.283-.77-1.283-1.283 0-.61.558-.976 1.396-.976 1.61 0 3.247.58 4.872 1.722l.69-1.653C13.465 4.06 11.526 3.32 9.623 3.32c-2.096 0-3.457 1.056-3.457 2.722 0 1.776 1.272 2.587 3.29 3.396 2.078.83 3.44 1.47 3.44 2.47 0 .83-.64 1.396-1.94 1.396-1.61 0-3.67-.696-5.39-1.94l-.72 1.66c1.87 1.396 4.24 2.196 6.28 2.196 2.27 0 3.76-1.11 3.76-2.89 0-1.94-1.396-2.68-3.59-3.59l.69-.39zM21 12.976v-1.86h-1.86V9.25h-1.86v1.86h-1.86v1.86h1.86v1.86h1.86v-1.86H21z" />
      </svg>
    ),
  },
  {
    name: "OCI",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Kubernetes",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "Alpine",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
        <path d="M12 2L2 22h20L12 2zm0 4l6 14H6l6-14z" />
      </svg>
    ),
  },
  {
    name: "Ubuntu",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
      </svg>
    ),
  },
  {
    name: "Termux",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
        <path d="M4 17l6-5-6-5V4l8 7-8 7V17zm10 0h6v-2h-6v2z" />
      </svg>
    ),
  },
  {
    name: "Reddit",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
        <path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.143a.593.593 0 01.111-.222l.968-1.25c.14-.182.35-.292.576-.292l2.616.547z" />
      </svg>
    ),
  },
]

function LogoItem({ logo }: { logo: (typeof logos)[0] }) {
  return (
    <div className="flex items-center justify-center px-8 py-5 text-[var(--brown-400)] hover:text-[var(--brown-700)] transition-all duration-300 cursor-default group">
      <div className="opacity-30 group-hover:opacity-80 transition-opacity duration-300 scale-100 group-hover:scale-105 transition-transform">
        {logo.svg}
      </div>
    </div>
  )
}

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
    <section ref={ref} className="relative py-[var(--section-padding)] bg-parchment-pattern overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[var(--max-width)] mx-auto px-6">
        <div
          className={`text-center mb-14 transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--gold-bright)" aria-hidden="true" className="opacity-70">
              <path d="M8,0 L9.5,5.5 L15,5.5 L10.5,9 L12,15 L8,11.5 L4,15 L5.5,9 L1,5.5 L6.5,5.5 Z" />
            </svg>
            <span className="text-[var(--brown-500)] text-[11px] font-sans uppercase tracking-[0.14em]">
              Ecosystem
            </span>
          </div>

          <h2 className="font-display text-[clamp(26px,4vw,40px)] font-semibold tracking-wide text-[var(--brown-900)] mb-4 leading-tight">
            Compatible with the ecosystem
            <br />
            <span
              className="text-[var(--brown-400)] font-normal italic"
              style={{ fontFamily: 'var(--font-lora)' }}
            >
              you already use
            </span>
          </h2>
          <p className="max-w-md mx-auto text-[var(--brown-600)] leading-relaxed font-sans text-[15px]">
            Works with the tools, images, and platforms you know. Zero lock-in.
          </p>
        </div>

        <div
          className={`space-y-4 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Row 1 — left scroll */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--parchment-50)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--parchment-50)] to-transparent z-10 pointer-events-none" />
            <div className="flex marquee-track">
              {[...logos, ...logos].map((logo, i) => (
                <LogoItem key={`row1-${i}`} logo={logo} />
              ))}
            </div>
          </div>

          {/* Row 2 — right scroll */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--parchment-50)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--parchment-50)] to-transparent z-10 pointer-events-none" />
            <div className="flex marquee-track-reverse">
              {[...logos.slice().reverse(), ...logos.slice().reverse()].map((logo, i) => (
                <LogoItem key={`row2-${i}`} logo={logo} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
