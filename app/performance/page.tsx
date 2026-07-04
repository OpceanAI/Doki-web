"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/doki/navigation"
import { Footer } from "@/components/doki/footer"

const benchmarks = [
  { metric: "Binary size", doki: "8.56 MB", docker: "~800 MB" },
  { metric: "Memory (idle)", doki: "12 MB", docker: "~200 MB" },
  { metric: "Cold start", doki: "&lt;15 ms", docker: "~2 s" },
  { metric: "Image pull (nginx)", doki: "0.8 s", docker: "1.2 s" },
  { metric: "Container create", doki: "6 ms", docker: "~50 ms" },
  { metric: "Dependencies", doki: "0", docker: "6+" },
  { metric: "CPU overhead", doki: "&lt;0.5%", docker: "~2%" },
  { metric: "RAM per container", doki: "~8 MB", docker: "~30 MB" },
  { metric: "Disk usage (install)", doki: "~9 MB", docker: "~2 GB" },
  { metric: "Root required", doki: "No", docker: "Yes" },
]

export default function PerformancePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <main>
      <Navigation />
      <section className="relative min-h-[60dvh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className={`relative z-10 max-w-[var(--max-width)] mx-auto px-[var(--gutter)] w-full py-[var(--section-y)] transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="max-w-[var(--measure)]">
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)]">Performance</span>
            <h1 className="font-sans font-semibold text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-0.02em] text-foreground mt-6 mb-6">
              Built for speed
              <br />
              <span className="text-[var(--clay)]">built for mobile</span>
            </h1>
            <p className="text-[clamp(17px,1.6vw,19px)] text-[var(--text-70)] leading-relaxed font-serif max-w-[520px] mb-8">
              Doki is engineered for resource-constrained devices. Smaller binary, less memory, faster startup — without sacrificing compatibility.
            </p>
          </div>
        </div>
      </section>
      <section className="section-band-surface" style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}>
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <div className="surface-card overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="p-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mist)]">Metric</th>
                  <th className="p-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--clay)]">Doki</th>
                  <th className="p-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mist)]">Docker</th>
                </tr>
              </thead>
              <tbody>
                {benchmarks.map((b) => (
                  <tr key={b.metric} className="border-b border-[var(--border-subtle)] last:border-0">
                    <td className="p-4 text-[14px] font-serif text-foreground">{b.metric}</td>
                    <td className="p-4 text-[14px] font-mono text-[var(--clay)]" dangerouslySetInnerHTML={{ __html: b.doki }} />
                    <td className="p-4 text-[14px] font-mono text-[var(--text-70)]" dangerouslySetInnerHTML={{ __html: b.docker }} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[12px] text-[var(--text-70)] font-serif text-center">
            Benchmarks measured on a Pixel 8 (Android 14, 8GB RAM). Docker measured on Ubuntu 24.04 (x86_64, 16GB RAM). Your mileage may vary.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
