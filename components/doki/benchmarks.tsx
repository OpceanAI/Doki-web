"use client"

import { useEffect, useRef, useState } from "react"
import { useCounter } from "@/hooks/use-counter"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const metrics = [
  { label: "Binary Size",       doki: "8.56 MB",      docker: "58 MB",          podman: "45 MB",         win: true },
  { label: "Memory (idle)",     doki: "12 MB",        docker: "85 MB",          podman: "60 MB",         win: true },
  { label: "Cold Start",        doki: "<15ms",        docker: "~50ms",          podman: "~30ms",         win: true },
  { label: "Root Required",     doki: "No",           docker: "Yes",            podman: "No",            win: true },
  { label: "Android Native",    doki: "Yes",          docker: "No",             podman: "No",            win: true },
  { label: "OCI Registry",      doki: "Yes",          docker: "Yes",            podman: "Yes",           win: false },
  { label: "Compose",           doki: "Yes",          docker: "Yes",            podman: "Yes",           win: false },
  { label: "Podman API v5",     doki: "39 endpoints", docker: "N/A",            podman: "184 endpoints", win: false },
  { label: "Kubernetes 1.32",   doki: "6 components", docker: "No",             podman: "No",            win: true },
  { label: "Landlock Sandbox",  doki: "ABI v9",       docker: "No",             podman: "No",            win: true },
]

function CounterStat({
  value,
  suffix,
  label,
  accent = false,
}: {
  value: number
  suffix: string
  label: string
  accent?: boolean
}) {
  const { count, ref } = useCounter(value, 1200, true)
  return (
    <div ref={ref} className="text-center group">
      <div
        className={`text-[28px] font-semibold font-mono counter-value mb-1 ${
          accent ? "text-[var(--wine-bright)]" : "text-[var(--brown-800)]"
        }`}
      >
        {count}
        {suffix}
      </div>
      <div className="text-[11px] text-[var(--brown-400)] uppercase tracking-[0.1em] font-sans">{label}</div>
    </div>
  )
}

// Check icon — warm gold
function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-[var(--gold-rich)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
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
    <section id="performance" ref={ref} className="relative py-[var(--section-padding)] bg-linen-pattern">
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 50% 50% at 80% 50%, rgba(212,175,55,0.05), transparent)",
        }}
      />

      <div className="max-w-[var(--max-width)] mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--gold-bright)" aria-hidden="true" className="opacity-70">
                <path d="M8,0 L9.5,5.5 L15,5.5 L10.5,9 L12,15 L8,11.5 L4,15 L5.5,9 L1,5.5 L6.5,5.5 Z" />
              </svg>
              <span className="text-[var(--brown-500)] text-[11px] font-sans uppercase tracking-[0.14em]">
                Performance
              </span>
            </div>

            <h2 className="font-display text-[clamp(28px,4.5vw,44px)] font-semibold tracking-wide text-[var(--brown-900)] mb-4 leading-tight">
              Built for mobile.
              <br />
              <span
                className="text-[var(--brown-400)] font-normal italic"
                style={{ fontFamily: 'var(--font-lora)' }}
              >
                Tested on real hardware.
              </span>
            </h2>
            <p className="max-w-lg text-[var(--brown-600)] leading-relaxed font-sans text-[15px]">
              {"No daemon eating your battery. Doki starts when you need it, stops when you don't."}
            </p>
          </div>
        </ScrollReveal>

        {/* Stats row */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-12 rounded-xl overflow-hidden border border-[var(--border-gold)]">
            {[
              { value: 8, suffix: ".56MB", label: "Binary size", accent: false },
              { value: 12, suffix: "MB", label: "Memory idle", accent: false },
              { value: 15, suffix: "ms", label: "Cold start", accent: true },
              { value: 0, suffix: "", label: "Dependencies", accent: false },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`bg-[var(--parchment-100)] px-6 py-8 flex items-center justify-center ${
                  i < 3 ? "border-r border-[var(--border-parchment)]" : ""
                }`}
              >
                <CounterStat
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  accent={stat.accent}
                />
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Comparison table */}
        <ScrollReveal delay={200}>
          <div className="rounded-xl border border-[var(--border-gold)] overflow-hidden shadow-[var(--shadow-md)]">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-gold)] bg-[var(--parchment-200)]">
                    <th className="px-6 py-4 text-left font-display font-semibold text-[var(--brown-700)] tracking-wide text-[13px]">
                      Metric
                    </th>
                    <th className="px-6 py-4 text-left text-[13px]">
                      <span className="inline-flex items-center gap-2 font-display font-semibold text-[var(--wine-bright)] tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-[var(--wine-bright)]" />
                        Doki
                      </span>
                    </th>
                    <th className="px-6 py-4 text-left font-display font-medium text-[var(--brown-400)] text-[13px] tracking-wide">
                      Docker
                    </th>
                    <th className="px-6 py-4 text-left font-display font-medium text-[var(--brown-400)] text-[13px] tracking-wide">
                      Podman
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.map((row, i) => (
                    <tr
                      key={row.label}
                      className={`border-b border-[var(--border-parchment)] last:border-0 transition-colors hover:bg-[var(--parchment-200)] ${
                        i % 2 === 0 ? "bg-[var(--parchment-50)]" : "bg-[var(--parchment-100)]"
                      }`}
                    >
                      <td className="px-6 py-4 text-[var(--brown-600)] font-sans text-[13px]">
                        {row.label}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 font-mono text-[13px] ${
                            row.win ? "text-[var(--wine-bright)] font-semibold" : "text-[var(--brown-700)]"
                          }`}
                        >
                          {row.doki}
                          {row.win && <CheckIcon />}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-[var(--brown-400)] text-[13px]">
                        {row.docker}
                      </td>
                      <td className="px-6 py-4 font-mono text-[var(--brown-400)] text-[13px]">
                        {row.podman}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <p className="mt-4 text-[11px] text-[var(--brown-400)] font-sans italic">
            Benchmarks on Snapdragon 685 / 4GB RAM / Termux. Docker/Podman values from x86_64 Linux.
          </p>
        </ScrollReveal>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
