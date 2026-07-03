"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { lang: "Go", lines: "38,000", pct: 69, color: "#00ADD8" },
  { lang: "C", lines: "16,000", pct: 29, color: "#A8B9CC" },
  { lang: "ObjC", lines: "1,000", pct: 2, color: "#F5A623" },
]

export function TechStack() {
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
    <section ref={ref} className="relative py-[var(--section-padding)] bg-[var(--bg-100)]">
      <div className="section-divider absolute top-0 left-0 right-0" />
      
      <div className="max-w-[var(--max-width)] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Header + Stats */}
          <div className={`transition-all duration-500 ${visible ? "opacity-100" : "opacity-0 translate-y-4"}`}>
            <p className="text-[var(--accent-cyan)] text-sm font-mono mb-3">Tech Stack</p>
            <h2 className="font-display text-[clamp(32px,5vw,48px)] font-bold tracking-[-0.03em] text-[var(--text-100)] mb-8">
              Built with precision.
            </h2>

            <div className="space-y-5">
              {stats.map((s, i) => (
                <div 
                  key={s.lang}
                  className="transition-all duration-500"
                  style={{ transitionDelay: visible ? `${i * 100 + 100}ms` : "0ms" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[var(--text-200)]">{s.lang}</span>
                    <span className="text-sm font-mono text-[var(--text-500)]">{s.lines} lines</span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--bg-300)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: visible ? `${s.pct}%` : "0%",
                        backgroundColor: s.color,
                        transitionDelay: visible ? `${i * 100 + 200}ms` : "0ms",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Origin card */}
          <div className={`transition-all duration-500 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="p-8 bg-[var(--bg-200)] border border-[var(--border-100)] rounded-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-[var(--bg-300)] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--text-300)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-100)]">Development Origin</h3>
                  <p className="text-sm text-[var(--text-500)]">The constraints became features</p>
                </div>
              </div>

              <p className="text-[var(--text-400)] leading-relaxed mb-4">
                Doki was developed entirely in Termux on a Snapdragon 685 device. No desktop, no powerful workstation. Just a phone, a terminal, and a goal.
              </p>

              <p className="text-[var(--text-400)] leading-relaxed mb-6">
                This constraint forced every decision toward efficiency: smaller binary, lower memory, faster startup.
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-[var(--border-100)]">
                <div className="flex items-center gap-2 text-sm text-[var(--text-500)]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21" />
                  </svg>
                  Snapdragon 685
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-500)]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  Termux
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
