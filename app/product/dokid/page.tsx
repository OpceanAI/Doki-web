"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/doki/navigation"
import { Footer } from "@/components/doki/footer"

const features = [
  {
    title: "Background daemon",
    desc: "dokid runs as a persistent daemon, managing container lifecycles, networking, and image storage. Start it once and forget it.",
  },
  {
    title: "Podman API server",
    desc: "Exposes 39 Podman API v5 endpoints over HTTP. Connect any Podman-compatible client, including docker CLI and docker-compose.",
  },
  {
    title: "Unix + TCP sockets",
    desc: "Listen on Unix socket (secured) or TCP (remote access). Configurable via DOKID_HOST environment variable.",
  },
  {
    title: "Image management",
    desc: "Pull, tag, push, and prune images. Layer caching with content-addressable storage. Multi-arch support.",
  },
  {
    title: "Volume management",
    desc: "Create, inspect, and manage volumes. Mount paths, named volumes, tmpfs. Bind-mount support for host paths.",
  },
  {
    title: "Container health",
    desc: "Health checks, restart policies, resource limits (CPU, memory, PIDs). Graceful shutdown and timeout controls.",
  },
]

export default function DokidPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <main>
      <Navigation />

      <section className="relative min-h-[70dvh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className={`relative z-10 max-w-[var(--max-width)] mx-auto px-[var(--gutter)] w-full py-[var(--section-y)] transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="max-w-[var(--measure)]">
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)]">Dokid</span>
            <h1 className="font-sans font-semibold text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-0.02em] text-foreground mt-6 mb-6">
              The daemon that
              <br />
              <span className="text-[var(--clay)]">runs everywhere</span>
            </h1>
            <p className="text-[clamp(17px,1.6vw,19px)] text-[var(--text-70)] leading-relaxed font-serif max-w-[520px] mb-8">
              Persistent container daemon with a full Podman-compatible API. Run it on a server, a Raspberry Pi, or your Android phone.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/install" className="btn btn-primary">Install Doki</Link>
              <Link href="/docs/architecture" className="btn btn-secondary">Architecture</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band-surface" style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}>
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <div className="surface-card p-6 md:p-8 mb-12">
            <code className="text-[13px] font-mono text-[var(--clay)] block whitespace-pre-wrap"># Start the daemon
$ dokid --listen unix:

# From another terminal, use the CLI
$ doki --remote unix:
CONTAINER ID   IMAGE          STATUS        PORTS
abc123         nginx:alpine   Up 2 hours    0.0.0.0:8080-&gt;80/tcp</code>
          </div>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)] mb-4">Features</p>
          <h2 className="font-sans font-semibold text-[clamp(28px,3.5vw,40px)] tracking-[-0.02em] text-foreground mb-12">
            Production-ready container daemon.
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

      <Footer />
    </main>
  )
}
