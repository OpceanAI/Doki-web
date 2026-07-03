"use client"

import { useEffect, useRef, useState } from "react"

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

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-[var(--clay)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

export function DokiVsDocker() {
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
      id="performance"
      ref={ref}
      style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}
    >
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
        {/* Header */}
        <div
          className={`mb-16 max-w-[var(--measure)] transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)] mb-4">
            Performance
          </p>
          <h2 className="font-sans font-semibold text-[clamp(32px,4.5vw,48px)] tracking-[-0.02em] text-foreground mb-4 leading-tight">
            Docker vs Doki.
          </h2>
          <p className="text-[17px] text-[var(--text-70)] leading-relaxed font-serif">
            Built for mobile. Tested on real hardware. No daemon eating your battery.
          </p>
        </div>

        {/* Comparison table */}
        <div
          className={`transition-all duration-500 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="rounded-lg border border-[var(--border)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--vellum)]">
                    <th className="px-6 py-4 text-left font-sans font-semibold text-foreground text-[13px]">
                      Metric
                    </th>
                    <th className="px-6 py-4 text-left text-[13px]">
                      <span className="inline-flex items-center gap-2 font-sans font-semibold text-[var(--clay)]">
                        <span className="w-2 h-2 rounded-full bg-[var(--clay)]" />
                        Doki
                      </span>
                    </th>
                    <th className="px-6 py-4 text-left font-sans font-medium text-[var(--text-70)] text-[13px]">
                      Docker
                    </th>
                    <th className="px-6 py-4 text-left font-sans font-medium text-[var(--text-70)] text-[13px]">
                      Podman
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.map((row, i) => (
                    <tr
                      key={row.label}
                      className={`border-b border-[var(--border-subtle)] last:border-0 transition-colors hover:bg-[var(--vellum)] ${
                        i % 2 === 0 ? "bg-background" : "bg-[var(--vellum)]/30"
                      }`}
                    >
                      <td className="px-6 py-4 text-[var(--text-70)] font-serif text-[13px]">
                        {row.label}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 font-mono text-[13px] ${
                            row.win ? "text-[var(--clay)] font-semibold" : "text-foreground"
                          }`}
                        >
                          {row.doki}
                          {row.win && <CheckIcon />}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-[var(--text-70)] text-[13px]">
                        {row.docker}
                      </td>
                      <td className="px-6 py-4 font-mono text-[var(--text-70)] text-[13px]">
                        {row.podman}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-[var(--mist)] font-serif italic">
            Benchmarks on Snapdragon 685 / 4GB RAM / Termux. Docker/Podman values from x86_64 Linux.
          </p>
        </div>
      </div>
    </section>
  )
}
