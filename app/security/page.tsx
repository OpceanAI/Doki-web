"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/doki/navigation"
import { Footer } from "@/components/doki/footer"

const layers = [
  { title: "Seccomp", desc: "Default profile allows ~80 syscalls including io_uring, pidfd, rseq, userfaultfd, landlock. Blocks ~250+ unnecessary syscalls." },
  { title: "Capabilities", desc: "Drops all capabilities by default. Opt-in via --cap-add for specific use cases. No NET_RAW, no SYS_ADMIN without explicit request." },
  { title: "User namespaces", desc: "Root inside container maps to unprivileged user outside. No uid 0 on the host. Kernel-enforced isolation." },
  { title: "Landlock", desc: "Linux 5.13+ ABI v9. Filesystem sandbox, network restrictions, scope rules. Auto-detection with graceful fallback." },
  { title: "mTLS", desc: "Mutual TLS enforcement for daemon communication. Certificate rotation, constant-time comparison, no weak ciphers." },
  { title: "Image verification", desc: "OCI image signatures verified on pull. Content-addressable storage prevents tampering. Digest pins for production." },
]

export default function SecurityPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <main>
      <Navigation />
      <section className="relative min-h-[60dvh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className={`relative z-10 max-w-[var(--max-width)] mx-auto px-[var(--gutter)] w-full py-[var(--section-y)] transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="max-w-[var(--measure)]">
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)]">Security</span>
            <h1 className="font-sans font-semibold text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-0.02em] text-foreground mt-6 mb-6">
              Defense in depth
              <br />
              <span className="text-[var(--clay)]">from the ground up</span>
            </h1>
            <p className="text-[clamp(17px,1.6vw,19px)] text-[var(--text-70)] leading-relaxed font-serif max-w-[520px] mb-8">
              Doki applies security at every layer: seccomp, capabilities, user namespaces, Landlock, mTLS, and image verification. Rootless by default, safe by design.
            </p>
          </div>
        </div>
      </section>
      <section className="section-band-surface" style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}>
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {layers.map((l) => (
              <div key={l.title} className="surface-card p-6">
                <h3 className="font-sans font-semibold text-[15px] text-foreground mb-2">{l.title}</h3>
                <p className="text-[14px] text-[var(--text-70)] leading-relaxed font-serif">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}>
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <div className="max-w-[var(--measure)] mx-auto">
            <h2 className="font-sans font-semibold text-[clamp(24px,3vw,36px)] tracking-[-0.02em] text-foreground mb-6">Rootless architecture</h2>
            <div className="space-y-4 font-serif text-[15px] text-[var(--text-70)] leading-relaxed">
              <p>Doki was designed to run without privileges from day one. Unlike Docker, which requires root or a rootful daemon, Doki executes every container as an unprivileged user.</p>
              <p>On Android, this means no bootloader unlock. On Linux, no sudo in CI pipelines. On macOS, no privileged helper tools.</p>
              <p>For defense-in-depth details, see the <Link href="/docs/security" className="text-[var(--clay)] hover:underline">Security documentation</Link>.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
