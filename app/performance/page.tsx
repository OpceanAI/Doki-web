"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Navigation } from "@/components/doki/navigation"
import { Footer } from "@/components/doki/footer"

const benchmarks = [
  { metricKey: "Binary size", doki: "8.56 MB", docker: "~800 MB" },
  { metricKey: "Memory (idle)", doki: "12 MB", docker: "~200 MB" },
  { metricKey: "Cold start", doki: "<15 ms", docker: "~2 s" },
  { metricKey: "Image pull (nginx)", doki: "0.8 s", docker: "1.2 s" },
  { metricKey: "Container create", doki: "6 ms", docker: "~50 ms" },
  { metricKey: "Dependencies", doki: "0", docker: "6+" },
  { metricKey: "CPU overhead", doki: "<0.5%", docker: "~2%" },
  { metricKey: "RAM per container", doki: "~8 MB", docker: "~30 MB" },
  { metricKey: "Disk usage (install)", doki: "~9 MB", docker: "~2 GB" },
  { metricKey: "Root required", doki: "No", docker: "Yes" },
]

export default function PerformancePage() {
  const t = useTranslations("performance")
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[65dvh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div
          className={`relative z-10 max-w-[var(--max-width)] mx-auto px-[var(--gutter)] w-full py-[var(--section-y)] transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="max-w-[var(--measure)]">
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)]">
              {t("eyebrow")}
            </span>
            <h1 className="font-sans font-semibold text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-0.02em] text-foreground mt-6 mb-6 text-pretty">
              {t("headline1")}
              <br />
              <span className="text-[var(--clay)]">{t("headline2")}</span>
            </h1>
            <p className="text-[clamp(16px,1.4vw,18px)] text-[var(--text-70)] leading-relaxed font-serif max-w-[520px]">
              {t("subtext")}
            </p>
          </div>
        </div>
      </section>

      {/* Benchmarks table */}
      <section className="section-band-surface">
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <div className="surface-card overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[400px]">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)]">
                    <th className="p-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mist)]">
                      {t("metric")}
                    </th>
                    <th className="p-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--clay)]">
                      {t("doki")}
                    </th>
                    <th className="p-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mist)]">
                      {t("docker")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {benchmarks.map((b) => (
                    <tr key={b.metricKey} className="border-b border-[var(--border-subtle)] last:border-0">
                      <td className="p-4 text-[14px] font-serif text-foreground">{b.metricKey}</td>
                      <td className="p-4 text-[14px] font-mono text-[var(--clay)]">{b.doki}</td>
                      <td className="p-4 text-[14px] font-mono text-[var(--text-70)]">{b.docker}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-[12px] text-[var(--text-70)] font-serif text-center leading-relaxed">
            {t("footnote")}
          </p>
        </div>
      </section>

      <div className="section-band-dark">
        <Footer />
      </div>
    </main>
  )
}
