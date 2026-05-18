"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function CTA() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="install" ref={ref} className="relative py-[var(--section-padding)] bg-[var(--bg-000)] overflow-hidden">
      <div className="section-divider-enhanced absolute top-0 left-0 right-0" />
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-radial-center" aria-hidden="true" />
      <div className="absolute inset-0 bg-dot-pattern opacity-10" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--accent-cyan)] opacity-[0.02] blur-[150px] rounded-full" aria-hidden="true" />

      <div className="relative z-10 max-w-[var(--max-width)] mx-auto px-4 sm:px-6 text-center">
        <ScrollReveal>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 badge-enhanced mb-8">
            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-[var(--text-400)]">Open source and free forever</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          {/* Headline */}
          <h2 className="font-display text-[clamp(40px,7vw,64px)] font-bold tracking-[-0.03em] text-[var(--text-100)] mb-6">
            Ready to start?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          {/* Subtitle */}
          <p className="max-w-md mx-auto text-lg text-[var(--text-400)] leading-relaxed mb-10">
            One command transforms your Android device into a full container engine.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <MagneticButton>
              <Link
                href="https://github.com/OpceanAI/Doki"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-pill"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="https://github.com/OpceanAI/Doki/wiki"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-pill-secondary"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                Read the Docs
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={250}>
          {/* Links */}
          <div className="flex items-center justify-center gap-4 mt-12 pt-8 border-t border-[var(--border-100)]">
            <Link href="https://github.com/OpceanAI/Doki-proot" target="_blank" className="footer-link text-sm tap-feedback">
              Doki-proot
            </Link>
            <span className="text-[var(--text-600)]">|</span>
            <Link href="https://github.com/OpceanAI/Doki/wiki" target="_blank" className="footer-link text-sm tap-feedback">
              Wiki
            </Link>
            <span className="text-[var(--text-600)]">|</span>
            <Link href="https://reddit.com/r/termux" target="_blank" className="footer-link text-sm tap-feedback">
              r/termux
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
