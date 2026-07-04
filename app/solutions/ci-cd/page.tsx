"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/doki/navigation"
import { Footer } from "@/components/doki/footer"

export default function CiCdPage() {
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
              Containers for
              <br />
              <span className="text-[var(--clay)]">CI/CD</span>
            </h1>
            <p className="text-[clamp(17px,1.6vw,19px)] text-[var(--text-70)] leading-relaxed font-serif max-w-[520px] mb-8">
              Ephemeral container environments for CI pipelines. Spin up, run tests, tear down. No daemon required.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/install" className="btn btn-primary">Install</Link>
              <Link href="/docs/home" className="btn btn-secondary">Documentation</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section-band-surface" style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}>
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ["No daemon needed", "Doki runs containers directly. No dockerd, no containerd, no background processes. Perfect for ephemeral runners."],
              ["Cold start under 15ms", "First container starts in milliseconds. No waiting for a daemon to initialize."],
              ["Ephemeral by design", "No state to clean up. Containers are removed when the process exits. No dangling resources."],
              ["Kubernetes in CI", "doki-kube starts a full K8s cluster in CI. Test manifests, run e2e tests, then destroy."],
              ["Works on any runner", "GitHub Actions, GitLab CI, Jenkins, CircleCI — Doki runs anywhere a binary can execute."],
              ["Minimal disk usage", "8.56MB binary. Layer caching avoids re-pulling images. Fraction of the storage of Docker in CI."],
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
