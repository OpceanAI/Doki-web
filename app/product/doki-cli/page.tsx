"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/doki/navigation"
import { Footer } from "@/components/doki/footer"

const features = [
  {
    title: "OCI-compatible",
    desc: "Pull, run, and manage any image from Docker Hub or any OCI registry. Full layer caching, multi-arch support.",
  },
  {
    title: "Podman API v5",
    desc: "39 endpoints — same API as Docker Engine v1.54. Works with docker-compose, Podman clients, and existing tooling.",
  },
  {
    title: "Zero deps binary",
    desc: "Single 8.56MB static binary. No containerd, no runc, no libseccomp. Copy it to any Linux, Android, or macOS machine.",
  },
  {
    title: "12 isolation levels",
    desc: "From WASM sandbox to microVM. Doki probes the host and picks the strongest available mode automatically.",
  },
  {
    title: "Rootless by default",
    desc: "Runs as unprivileged user. No root, no sudo, no namespace tricks. Works on stock Android phones.",
  },
  {
    title: "Built-in DNS",
    desc: "Internal DNS server with automatic container resolution. Custom upstream DNS, port 8053 on Android.",
  },
]

const quickCmds = [
  { cmd: "doki pull nginx:alpine", desc: "Pull an image" },
  { cmd: "doki run -d -p 8080:80 nginx:alpine", desc: "Run a container" },
  { cmd: "doki ps", desc: "List running containers" },
  { cmd: "doki logs -f <container>", desc: "Tail container logs" },
  { cmd: "doki exec -it <container> sh", desc: "Shell into a container" },
  { cmd: "doki compose up", desc: "Start docker-compose services" },
]

export default function DokiCliPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <main>
      <Navigation />

      <section className="relative min-h-[80dvh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className={`relative z-10 max-w-[var(--max-width)] mx-auto px-[var(--gutter)] w-full py-[var(--section-y)] transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="max-w-[var(--measure)]">
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)]">Doki CLI</span>
            <h1 className="font-sans font-semibold text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-0.02em] text-foreground mt-6 mb-6">
              The container engine
              <br />
              <span className="text-[var(--clay)]">for the rest of us</span>
            </h1>
            <p className="text-[clamp(17px,1.6vw,19px)] text-[var(--text-70)] leading-relaxed font-serif max-w-[520px] mb-8">
              One binary. Zero dependencies. No root. Run any OCI image on Android, Linux, or macOS — with the same CLI you already know.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/install" className="btn btn-primary">
                Install Doki
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/docs/home" className="btn btn-secondary">
                Read the docs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="section-band-surface" style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}>
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)] mb-4">Quick start</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickCmds.map((item) => (
              <div key={item.cmd} className="surface-card p-5">
                <code className="text-[13px] font-mono text-[var(--clay)] block mb-2 break-all">{item.cmd}</code>
                <p className="text-[13px] text-[var(--text-70)] font-serif">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}>
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)] mb-4">Features</p>
          <h2 className="font-sans font-semibold text-[clamp(28px,3.5vw,40px)] tracking-[-0.02em] text-foreground mb-12">
            Everything you need to run containers.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={f.title} className="surface-card p-6">
                <h3 className="font-sans font-semibold text-[15px] text-foreground mb-2">{f.title}</h3>
                <p className="text-[14px] text-[var(--text-70)] leading-relaxed font-serif">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="section-band-cream py-24 text-center">
        <div className="max-w-[var(--measure)] mx-auto px-[var(--gutter)]">
          <h2 className="font-sans font-semibold text-[clamp(28px,3.5vw,40px)] tracking-[-0.02em] text-foreground mb-4">
            Ready to run containers anywhere?
          </h2>
          <p className="text-[17px] text-[var(--text-70)] font-serif mb-8">
            One curl command and you are up and running.
          </p>
          <div className="inline-flex items-center gap-3">
            <Link href="/install" className="btn btn-primary">Install Doki</Link>
            <Link href="/docs/home" className="btn btn-secondary">Documentation</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
