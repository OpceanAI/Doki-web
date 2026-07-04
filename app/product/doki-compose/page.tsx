"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/doki/navigation"
import { Footer } from "@/components/doki/footer"

const features = [
  {
    title: "docker-compose compatible",
    desc: "Reads existing docker-compose.yml files. No rewriting needed. Volumes, networks, ports, env vars — all work.",
  },
  {
    title: "Multi-container orchestration",
    desc: "Start, stop, scale, and manage groups of containers. Dependency ordering, health checks, restart policies.",
  },
  {
    title: "Project isolation",
    desc: "Each compose project gets its own network namespace, volume namespace, and lifecycle. No cross-project interference.",
  },
  {
    title: "Hot reload",
    desc: "Watch for file changes and automatically rebuild containers. Perfect for local development workflows.",
  },
  {
    title: "Cross-platform services",
    desc: "Mix ARM64 and AMD64 images. Doki handles platform emulation transparently on all supported architectures.",
  },
  {
    title: "Secrets & configs",
    desc: "Manage sensitive data with built-in secrets support. Mount configs without baking them into images.",
  },
]

export default function DokiComposePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <main>
      <Navigation />

      <section className="relative min-h-[70dvh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className={`relative z-10 max-w-[var(--max-width)] mx-auto px-[var(--gutter)] w-full py-[var(--section-y)] transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="max-w-[var(--measure)]">
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)]">Doki Compose</span>
            <h1 className="font-sans font-semibold text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-0.02em] text-foreground mt-6 mb-6">
              Multi-container apps
              <br />
              <span className="text-[var(--clay)]">without the lock-in</span>
            </h1>
            <p className="text-[clamp(17px,1.6vw,19px)] text-[var(--text-70)] leading-relaxed font-serif max-w-[520px] mb-8">
              Your docker-compose.yml files work as-is. Doki Compose is a drop-in replacement that runs on Android, Linux, and macOS.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/install" className="btn btn-primary">
                Install Doki
              </Link>
              <Link href="/docs/quick-start" className="btn btn-secondary">
                Quick start
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band-surface" style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}>
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <div className="surface-card p-6 md:p-8 mb-12">
            <code className="text-[13px] font-mono text-[var(--clay)] block whitespace-pre-wrap">$ doki compose up -d
[+] Running 3/3
 ✔ Container postgres   Started
 ✔ Container redis      Started
 ✔ Container app        Started</code>
          </div>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)] mb-4">Features</p>
          <h2 className="font-sans font-semibold text-[clamp(28px,3.5vw,40px)] tracking-[-0.02em] text-foreground mb-12">
            Orchestrate complex stacks.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="surface-card p-6">
                <h3 className="font-sans font-semibold text-[15px] text-foreground mb-2">{f.title}</h3>
                <p className="text-[14px] text-[var(--text-70)] leading-relaxed font-serif">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}>
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <div className="max-w-[var(--measure)] mx-auto text-center">
            <h2 className="font-sans font-semibold text-[clamp(28px,3.5vw,40px)] tracking-[-0.02em] text-foreground mb-4">
              Why Doki Compose?
            </h2>
            <div className="space-y-6 text-left font-serif text-[15px] text-[var(--text-70)] leading-relaxed">
              <p>Docker Compose is the standard way to define multi-container applications. But it requires Docker Engine — which means it does not run on Android and requires root on Linux.</p>
              <p>Doki Compose reads the same YAML files, supports the same CLI flags, and produces the same results. The difference: it works on phones, tablets, Chromebooks, and locked-down corporate laptops.</p>
              <p>No daemon requirement, no root, no systemd. Just one binary and your compose file.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
