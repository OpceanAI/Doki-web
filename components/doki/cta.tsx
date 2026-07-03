"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

const installCommand = "curl -sL dok1.xyz | bash"

export function CTA() {
  const [copied, setCopied] = useState(false)

  const copyCommand = useCallback(async () => {
    await navigator.clipboard.writeText(installCommand)
    setCopied(true)
    toast({ title: "Copied!", description: "Command copied to clipboard" })
    setTimeout(() => setCopied(false), 2000)
  }, [])

  return (
    <section
      id="install"
      style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}
    >
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
        <div className="max-w-[var(--measure)] mx-auto text-center">
          {/* Headline */}
          <h2 className="font-sans font-semibold text-[clamp(32px,5vw,56px)] tracking-[-0.02em] text-foreground mb-4 leading-tight">
            Run containers on your phone.
          </h2>
          <p className="text-[17px] text-[var(--text-70)] leading-relaxed font-serif mb-10">
            One binary. Zero dependencies. No root.
          </p>

          {/* Install command */}
          <div className="inline-flex items-center gap-3 bg-[var(--ink)] rounded-[var(--radius-3xl)] px-5 py-3 mb-8">
            <span className="text-[var(--clay)] font-mono text-[14px] select-none">$</span>
            <code className="text-[var(--paper)] font-mono text-[14px]">{installCommand}</code>
            <button
              onClick={copyCommand}
              className="ml-1 p-1.5 rounded hover:bg-[rgba(255,255,255,0.08)] text-[var(--mist)] hover:text-[var(--paper)] transition-colors tap-feedback"
              aria-label={copied ? "Copied" : "Copy command"}
            >
              {copied ? (
                <svg className="w-4 h-4 text-[var(--green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="https://github.com/OpceanAI/Doki" target="_blank" rel="noopener noreferrer" className="btn-primary tap-feedback">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </Link>
            <Link href="/changelog" className="btn-secondary tap-feedback">
              Read the changelog
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
