"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/doki/navigation"
import { Footer } from "@/components/doki/footer"

export default function LinuxPage() {
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
              <span className="text-[var(--clay)]">Linux</span>
            </h1>
            <p className="text-[clamp(17px,1.6vw,19px)] text-[var(--text-70)] leading-relaxed font-serif max-w-[520px] mb-8">
              Lightweight container runtime for servers, desktops, and embedded Linux. One binary replaces containerd, runc, and Docker Engine.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/install" className="btn btn-primary">Install on Linux</Link>
              <Link href="/docs/quick-start" className="btn btn-secondary">Quick start</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section-band-surface" style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}>
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ["Single binary", "No containerd, runc, dockerd, or systemd. One ~8.5MB static binary with zero runtime dependencies."],
              ["Kubernetes-ready", "doki-kube starts a full K8s control plane. Perfect for local development, CI, or edge clusters."],
              ["12 isolation levels", "Auto-probes the host and picks the strongest mode: native, proot, Landlock, or microVM."],
              ["Podman API compatible", "Use docker CLI, docker-compose, or any Podman client. Full API compatibility."],
              ["Rootless by default", "No sudo, no setuid, no capabilities required. Runs as an unprivileged user."],
              ["Minimal footprint", "12MB idle memory, 8.56MB binary. Ideal for resource-constrained VPS and Raspberry Pi."],
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
