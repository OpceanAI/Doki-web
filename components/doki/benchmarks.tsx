"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useCounter } from "@/hooks/use-counter"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const metrics = [
  { label: "Binary Size", doki: "6.6 MB", docker: "58 MB", podman: "45 MB", win: true },
  { label: "Memory (idle)", doki: "12 MB", docker: "85 MB", podman: "60 MB", win: true },
  { label: "Cold Start", doki: "<15ms", docker: "~50ms", podman: "~30ms", win: true },
  { label: "Root Required", doki: "No", docker: "Yes", podman: "No", win: true },
  { label: "Android Native", doki: "Yes", docker: "No", podman: "No", win: true },
  { label: "OCI Registry", doki: "Yes", docker: "Yes", podman: "Yes", win: false },
  { label: "Compose", doki: "Yes", docker: "Yes", podman: "Yes", win: false },
]

function CounterStat({ value, suffix, label }: { value: number, suffix: string, label: string }) {
  const { count, ref } = useCounter(value, 1200, true)
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-semibold text-[var(--accent-cyan)] font-mono counter-value">
        {count}{suffix}
      </div>
      <div className="text-xs text-[var(--text-500)] mt-1">{label}</div>
    </div>
  )
}

export function Benchmarks() {
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
    <section id="performance" ref={ref} className="relative py-[var(--section-padding)] bg-[var(--bg-100)]">
      <div className="section-divider-enhanced absolute top-0 left-0 right-0" />

      <div className="max-w-[var(--max-width)] mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-12">
            <p className="text-[var(--accent-cyan)] text-sm font-mono mb-3">Performance</p>
            <h2 className="font-display text-[clamp(32px,5vw,48px)] font-bold tracking-[-0.03em] text-[var(--text-100)] mb-4">
              Built for mobile.
              <br />
              <span className="text-[var(--text-400)]">Tested on real hardware.</span>
            </h2>
            <p className="max-w-lg text-[var(--text-400)] leading-relaxed">
              No daemon eating your battery. Doki starts when you need it, stops when you don&apos;t.
            </p>
          </div>
        </ScrollReveal>

        {/* Counter stats */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <CounterStat value={6} suffix=".6MB" label="Binary size" />
            <CounterStat value={12} suffix="MB" label="Memory idle" />
            <CounterStat value={15} suffix="ms" label="Cold start" />
            <CounterStat value={0} suffix="" label="Dependencies" />
          </div>
        </ScrollReveal>

        {/* Table */}
        <ScrollReveal delay={200}>
          <div className="rounded-xl border border-[var(--border-100)] overflow-hidden hover-glow">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-100)] bg-[var(--bg-200)]">
                    <th className="px-6 py-4 text-left font-medium text-[var(--text-400)]">Metric</th>
                    <th className="px-6 py-4 text-left font-medium text-[var(--accent-cyan)]">
                      <span className="inline-flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
                        Doki
                      </span>
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-[var(--text-500)]">Docker</th>
                    <th className="px-6 py-4 text-left font-medium text-[var(--text-500)]">Podman</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.map((row) => (
                    <tr key={row.label} className="border-b border-[var(--border-100)] last:border-0 hover:bg-[var(--bg-200)] transition-colors">
                      <td className="px-6 py-4 text-[var(--text-300)]">{row.label}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-2 font-mono ${row.win ? "text-[var(--accent-cyan)]" : "text-[var(--text-200)]"}`}>
                          {row.doki}
                          {row.win && (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-[var(--text-500)]">{row.docker}</td>
                      <td className="px-6 py-4 font-mono text-[var(--text-500)]">{row.podman}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <p className="mt-4 text-xs text-[var(--text-600)]">
            Benchmarks on Snapdragon 685 / 4GB RAM / Termux. Docker/Podman values from x86_64 Linux.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
