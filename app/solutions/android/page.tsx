"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/doki/navigation"
import { Footer } from "@/components/doki/footer"

export default function AndroidPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <main>
      <Navigation />
      <section className="relative min-h-[70dvh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className={`relative z-10 max-w-[var(--max-width)] mx-auto px-[var(--gutter)] w-full py-[var(--section-y)] transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="max-w-[var(--measure)]">
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)]">Solution</span>
            <h1 className="font-sans font-semibold text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-0.02em] text-foreground mt-6 mb-6">
              Containers on
              <br />
              <span className="text-[var(--clay)]">Android</span>
            </h1>
            <p className="text-[clamp(17px,1.6vw,19px)] text-[var(--text-70)] leading-relaxed font-serif max-w-[520px] mb-8">
              Run Docker containers on your phone or tablet. No root, no custom ROM, no compromises. Doki was built for Android from the ground up.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/install" className="btn btn-primary">Install on Android</Link>
              <Link href="/docs/installation" className="btn btn-secondary">Setup guide</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section-band-surface" style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}>
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ["Termux native", "Doki runs entirely within Termux. No cross-compilation, no chroot, no VNC. Just install and run."],
              ["No root required", "Uses proot-based isolation that works on stock Android. No bootloader unlock, no Magisk, no kernel mods."],
              ["SELinux compatible", "DNS on port 8053, automatic LD_PRELOAD stripping, and proot execve fallback handle SELinux restrictions transparently."],
              ["ARM64 + ARMv7", "Native ARM64 builds for modern phones. ARMv7 for older devices and Chromebooks in Android mode."],
              ["Full OCI support", "Pull any image from Docker Hub. Run nginx, PostgreSQL, Redis, Python, Node.js — anything in the registry."],
              ["Background daemon", "dokid runs as a persistent service. Containers stay alive after closing Termux. Manage via the API from any app."],
            ].map(([title, desc]) => (
              <div key={title} className="surface-card p-6">
                <h3 className="font-sans font-semibold text-[15px] text-foreground mb-2">{title}</h3>
                <p className="text-[14px] text-[var(--text-70)] leading-relaxed font-serif">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
