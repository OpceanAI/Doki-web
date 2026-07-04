"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"

const stats = [
  { lang: "Go", lines: "38,000", pct: 69, color: "#00ADD8" },
  { lang: "C", lines: "16,000", pct: 29, color: "#A8B9CC" },
  { lang: "ObjC", lines: "1,000", pct: 2, color: "#F5A623" },
]

const dockItems = [
  { name: "Go", color: "#00ADD8" },
  { name: "C", color: "#A8B9CC" },
  { name: "ObjC", color: "#F5A623" },
]

export function BuiltWith() {
  const t = useTranslations('builtWith')
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
    <section
      ref={ref}
      style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}
    >
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
        {}
        <div
          className={`mb-16 max-w-[var(--measure)] transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)] mb-4">
            {t('title')}
          </p>
          <h2 className="font-sans font-semibold text-[clamp(32px,4.5vw,48px)] tracking-[-0.02em] text-foreground mb-4 leading-tight">
            {t('headline')}
          </h2>
          <p className="text-[17px] text-[var(--text-70)] leading-relaxed font-serif">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {}
          <div
            className={`space-y-6 transition-all duration-500 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {stats.map((s, i) => (
              <div key={s.lang}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[14px] font-medium text-foreground">
                    {s.lang}
                  </span>
                  <span className="font-mono text-[13px] text-[var(--mist)]">
                    {s.lines} lines
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[var(--vellum)] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: visible ? `${s.pct}%` : "0%",
                      backgroundColor: s.color,
                      transitionDelay: visible ? `${i * 150 + 200}ms` : "0ms",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {}
          <div
            className={`flex justify-center transition-all duration-500 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="inline-flex items-end gap-6 p-6 rounded-xl bg-[var(--vellum)] border border-[var(--border-subtle)]">
              {dockItems.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center font-mono font-bold text-[14px]"
                    style={{ color: item.color, background: "var(--paper)" }}
                  >
                    {item.name.slice(0, 2)}
                  </div>
                  <span className="text-[11px] font-mono text-[var(--mist)]">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
