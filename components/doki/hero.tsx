"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { MeshGradient } from "./mesh-gradient"
import { MagneticButton } from "@/components/ui/magnetic-button"

const installCommand = "curl -sL doki.opceanai.com | sh"

export function Hero() {
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const copyCommand = useCallback(async () => {
    await navigator.clipboard.writeText(installCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden" aria-label="Hero">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[var(--bg-000)]" />
      <MeshGradient />
      
      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="orb orb-1 top-[-10%] left-[10%]" />
        <div className="orb orb-2 top-[20%] right-[5%]" />
        <div className="orb orb-3 bottom-[10%] left-[30%]" />
      </div>

      {/* Star field */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              "--duration": `${2 + Math.random() * 4}s`,
              "--delay": `${Math.random() * 3}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20" aria-hidden="true" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[var(--accent-cyan)] opacity-[0.03] blur-[120px] rounded-full animate-pulse" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-[var(--max-width)] mx-auto px-4 sm:px-6 py-32 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 badge-enhanced mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="status-dot" />
          <span className="text-[var(--text-300)] font-mono">v0.9.1</span>
          <span className="text-[var(--text-600)]">|</span>
          <span className="text-[var(--text-400)]">OCI push support</span>
        </div>

        {/* Headline */}
        <h1
          className={`font-display text-[clamp(40px,8vw,72px)] font-bold leading-[1.05] tracking-[-0.04em] text-[var(--text-100)] mb-6 transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Container engine
          <br />
          <span className="gradient-text-animated">for Android</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`max-w-[520px] mx-auto text-lg text-[var(--text-400)] leading-relaxed mb-10 text-balance transition-all duration-700 delay-150 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Run Docker containers on your phone. One binary, zero dependencies, no root required.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-wrap items-center justify-center gap-3 mb-12 transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <MagneticButton>
            <Link href="#install" className="cta-pill">
              Get Started
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="https://github.com/OpceanAI/Doki"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-pill-secondary"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </Link>
          </MagneticButton>
        </div>

        {/* Install command */}
        <div
          className={`inline-flex items-center gap-3 code-block px-4 py-3 transition-all duration-700 delay-250 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-[var(--text-500)] select-none">$</span>
          <code className="text-[var(--text-200)]">{installCommand}</code>
          <button
            onClick={copyCommand}
            className="ml-2 p-1.5 rounded hover:bg-[var(--bg-300)] text-[var(--text-500)] hover:text-[var(--text-200)] transition-colors tap-feedback"
            aria-label={copied ? "Copied" : "Copy command"}
          >
            {copied ? (
              <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>

        {/* Stats */}
        <div
          className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mt-16 pt-10 border-t border-[var(--border-100)] transition-all duration-700 delay-300 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-center">
            <div className="text-2xl font-semibold text-[var(--text-100)] font-mono counter-animated">6.6MB</div>
            <div className="text-xs text-[var(--text-500)] mt-1">Binary size</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-[var(--border-100)]" />
          <div className="text-center">
            <div className="text-2xl font-semibold text-[var(--text-100)] font-mono counter-animated">12MB</div>
            <div className="text-xs text-[var(--text-500)] mt-1">Memory idle</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-[var(--border-100)]" />
          <div className="text-center">
            <div className="text-2xl font-semibold text-[var(--accent-cyan)] font-mono counter-animated">&lt;15ms</div>
            <div className="text-xs text-[var(--text-500)] mt-1">Cold start</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-[var(--border-100)]" />
          <div className="text-center">
            <div className="text-2xl font-semibold text-[var(--text-100)] font-mono counter-animated">0</div>
            <div className="text-xs text-[var(--text-500)] mt-1">Dependencies</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
          <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-600)] mb-2">Scroll</div>
          <div className="w-5 h-8 border border-[var(--border-200)] rounded-full mx-auto flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-[var(--text-400)] rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
