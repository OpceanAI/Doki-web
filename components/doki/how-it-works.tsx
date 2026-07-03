"use client"

import { useEffect, useRef, useState } from "react"
import { CodeBlock } from "./code-block"

const steps = [
  {
    title: "Pull",
    description: "Download OCI images from any registry. Auto-detects your architecture and pulls the correct layers.",
    code: `doki pull alpine
Pulling ARM64 layers...
Downloaded 4.0 MB in 2.1s`,
  },
  {
    title: "Build",
    description: "Build OCI images from Dokifiles. 18 instructions, multi-stage builds, build cache.",
    code: `doki build -t myapp .
[1/3] FROM alpine:latest
[2/3] RUN apk add --no-cache gcc
[3/3] COPY . /app
Built in 3.2s`,
  },
  {
    title: "Run",
    description: "Execute containers in proot, Linux namespaces, or microVM mode. Auto-selected at runtime.",
    code: `doki run --distro alpine echo hello
Hello from Doki
Started in 10ms`,
  },
  {
    title: "Mesh",
    description: "Connect containers across devices. DokiLink mesh with mDNS discovery and encrypted P2P channels.",
    code: `doki link add peer.local
Discovering via mDNS...
✓ Peer connected
Mesh: 2 nodes, encrypted`,
  },
]

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

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
            How it works
          </p>
          <h2 className="font-sans font-semibold text-[clamp(32px,4.5vw,48px)] tracking-[-0.02em] text-foreground mb-4 leading-tight">
            Pull, build, run.
            <br />
            <span className="text-[var(--text-70)] font-normal font-serif italic">
              That&apos;s all it takes.
            </span>
          </h2>
          <p className="text-[17px] text-[var(--text-70)] leading-relaxed font-serif">
            From pulling images to running containers. No daemon, no config, no overhead.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const isActive = i === activeStep
            return (
              <button
                key={step.title}
                onClick={() => setActiveStep(i)}
                className={`text-left transition-all duration-300 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: visible ? `${i * 80}ms` : "0ms" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[13px] font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-[var(--clay)] text-[var(--paper)]"
                        : "bg-[var(--vellum)] text-[var(--mist)]"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <h3
                    className={`font-sans font-semibold text-[17px] transition-colors duration-200 ${
                      isActive ? "text-foreground" : "text-[var(--text-70)]"
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>
                <p className="text-[14px] text-[var(--text-70)] leading-relaxed font-serif mb-4">
                  {step.description}
                </p>
                {isActive && (
                  <CodeBlock
                    code={step.code}
                    language="bash"
                    className="animate-in fade-in duration-300"
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
