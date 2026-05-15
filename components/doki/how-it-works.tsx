"use client"

import { useEffect, useRef, useState } from "react"
import { CodeBlock } from "./code-block"

const steps = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
    title: "Pull",
    description: "Download OCI images from any registry. Auto-detects your architecture and pulls the correct layers.",
    code: `doki pull alpine
Pulling ARM64 layers...
Downloaded 4.0 MB in 2.1s`,
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.38-3.19m0 0L11.42 8.8m0 6.37l5.38-3.19m0 0L11.42 8.8M12 2.25v2.25m0 15V17.25m9.75-9.75H19.5m-15 0H2.25" />
      </svg>
    ),
    title: "Build",
    description: "Build OCI images from Dokifiles. 18 instructions, multi-stage builds, build cache.",
    code: `doki build -t myapp .
[1/3] FROM alpine:latest
[2/3] RUN apk add --no-cache gcc
[3/3] COPY . /app
Built in 3.2s`,
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
      </svg>
    ),
    title: "Run",
    description: "Execute containers in proot, Linux namespaces, or microVM mode. Auto-selected at runtime.",
    code: `doki run --distro alpine echo hello
Hello from Doki
Started in 10ms`,
  },
]

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [visible])

  return (
    <section ref={ref} className="relative py-[var(--section-padding)] bg-[var(--bg-000)]">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[var(--max-width)] mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-500 ${visible ? "opacity-100" : "opacity-0 translate-y-4"}`}>
          <p className="text-[var(--accent-cyan)] text-sm font-mono mb-3">How it works</p>
          <h2 className="font-display text-[clamp(32px,5vw,48px)] font-bold tracking-[-0.03em] text-[var(--text-100)] mb-4">
            Three steps.
            <br />
            <span className="text-[var(--text-400)]">That&apos;s all it takes.</span>
          </h2>
          <p className="max-w-lg mx-auto text-[var(--text-400)] leading-relaxed">
            From pulling images to running containers. No daemon, no config, no overhead.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px">
            <div className="w-full h-full bg-[var(--border-100)] relative">
              <div
                className="absolute top-0 left-0 h-full bg-[var(--accent-cyan)] transition-all duration-700 ease-out"
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {steps.map((step, i) => {
            const isActive = i <= activeStep
            const isCurrent = i === activeStep
            return (
              <div
                key={step.title}
                className={`relative transition-all duration-500 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: visible ? `${i * 150}ms` : "0ms" }}
              >
                {/* Step number / icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 mx-auto transition-all duration-500 ${
                  isCurrent
                    ? "bg-[var(--accent-cyan-muted)] text-[var(--accent-cyan)] shadow-[0_0_20px_rgba(0,212,255,0.15)]"
                    : isActive
                      ? "bg-[var(--bg-300)] text-[var(--text-200)]"
                      : "bg-[var(--bg-200)] text-[var(--text-500)]"
                }`}>
                  {step.icon}
                </div>

                {/* Arrow connector (mobile) */}
                {i < steps.length - 1 && (
                  <div className="md:hidden flex justify-center py-2">
                    <svg
                      className={`w-5 h-5 transition-colors duration-500 ${
                        isActive ? "text-[var(--accent-cyan)]" : "text-[var(--text-600)]"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg>
                  </div>
                )}

                {/* Content */}
                <div className="text-center">
                  <h3 className="font-display text-xl font-semibold text-[var(--text-100)] mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--text-400)] leading-relaxed mb-6">{step.description}</p>
                </div>

                {/* Code block */}
                <CodeBlock
                  code={step.code}
                  language="bash"
                  className={`transition-all duration-500 ${
                    isCurrent ? "opacity-100 scale-100" : "opacity-60 scale-[0.98]"
                  }`}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
