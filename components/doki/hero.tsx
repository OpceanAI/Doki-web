"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Globe } from "./globe"

const stats = [
  { value: "8.56MB", label: "Binary size" },
  { value: "12MB", label: "Memory idle" },
  { value: "<15ms", label: "Cold start" },
  { value: "0", label: "Dependencies" },
]

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 grid-bg pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[var(--max-width)] mx-auto px-[var(--gutter)] w-full py-[var(--section-y)]">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <div
              className={`transition-all duration-700 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)]">
                v0.11.0 · Podman API v5 · 8.56MB
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`font-sans font-semibold text-[clamp(40px,6.5vw,72px)] leading-[1.05] tracking-[-0.02em] text-foreground transition-all duration-700 delay-100 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Container engine
              <br />
              <span className="text-[var(--clay)]">for Android</span>
            </h1>

            {/* Tagline */}
            <p
              className={`max-w-[520px] text-[clamp(17px,1.6vw,19px)] text-[var(--text-70)] leading-relaxed font-serif transition-all duration-700 delay-150 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Run Docker containers on your phone. One binary, zero dependencies, no root required.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-wrap items-center gap-3 transition-all duration-700 delay-200 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Link href="#install" className="btn-primary tap-feedback">
                Get Started
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="https://github.com/OpceanAI/Doki"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary tap-feedback"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
              </Link>
            </div>

            {/* Stats row */}
            <div
              className={`flex flex-wrap items-center gap-x-8 gap-y-4 pt-8 border-t border-[var(--border-subtle)] transition-all duration-700 delay-300 ${
                mounted ? "opacity-100" : "opacity-0"
              }`}
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-8">
                  <div>
                    <div className="text-[20px] font-semibold font-mono text-foreground counter-value">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-[var(--mist)] mt-1 tracking-wide uppercase font-mono">
                      {stat.label}
                    </div>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="hidden sm:block w-px h-8 bg-[var(--border-subtle)]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Responsive Globe (only one rendered) */}
          <div
            className={`flex items-center justify-center transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ position: "relative", right: "0" }}
          >
            <div className="hidden lg:block">
                <Globe size={580} autoRotate interactive accent="#d97757" />
            </div>
            <div className="lg:hidden">
                <Globe size={320} autoRotate interactive accent="#d97757" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
