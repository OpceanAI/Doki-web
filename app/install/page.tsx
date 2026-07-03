"use client"

import { useState } from "react"
import Link from "next/link"

type Platform = "termux" | "linux" | "macos"

const platforms: { id: Platform; label: string; icon: string }[] = [
  { id: "termux", label: "Termux / Android", icon: "📱" },
  { id: "linux", label: "Linux", icon: "🐧" },
  { id: "macos", label: "macOS", icon: "🍎" },
]

const installCommands: Record<Platform, { steps: { title: string; code: string }[] }> = {
  termux: {
    steps: [
      {
        title: "Install Doki",
        code: "curl -sL dok1.xyz | bash",
      },
      {
        title: "Start the daemon",
        code: "dokid &",
      },
      {
        title: "Pull a base image",
        code: "doki pull alpine",
      },
      {
        title: "Run a container",
        code: 'doki run alpine echo "Hello from Doki"',
      },
    ],
  },
  linux: {
    steps: [
      {
        title: "Download for ARM64",
        code: `curl -L https://github.com/OpceanAI/Doki/releases/download/v0.11.0/doki-v0.11.0-linux-arm64.tar.gz | tar -xz\ncd doki-v0.11.0-linux-arm64\n./install.sh`,
      },
      {
        title: "Or for x86_64",
        code: `curl -L https://github.com/OpceanAI/Doki/releases/download/v0.11.0/doki-v0.11.0-linux-amd64.tar.gz | tar -xz\ncd doki-v0.11.0-linux-amd64\n./install.sh`,
      },
      {
        title: "Verify installation",
        code: "doki version",
      },
    ],
  },
  macos: {
    steps: [
      {
        title: "Download for Apple Silicon",
        code: `curl -L https://github.com/OpceanAI/Doki/releases/download/v0.11.0/doki-v0.11.0-darwin-arm64.tar.gz | tar -xz\ncd doki-v0.11.0-darwin-arm64\n./install.sh`,
      },
      {
        title: "Or for Intel Macs",
        code: `curl -L https://github.com/OpceanAI/Doki/releases/download/v0.11.0/doki-v0.11.0-darwin-amd64.tar.gz | tar -xz\ncd doki-v0.11.0-darwin-amd64\n./install.sh`,
      },
      {
        title: "Verify installation",
        code: "doki version",
      },
    ],
  },
}

const prerequisites: Record<Platform, string[]> = {
  termux: ["Termux app installed", "curl or wget", "4GB+ RAM recommended", "Android 7.0+"],
  linux: ["curl or wget", "tar", "Linux kernel 4.0+", "ARM64 or x86_64"],
  macos: ["curl or wget", "tar", "macOS 11+ for VZ backend", "Apple Silicon or Intel"],
}

export default function InstallPage() {
  const [platform, setPlatform] = useState<Platform>("termux")
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyCode = async (code: string, index: number) => {
    await navigator.clipboard.writeText(code)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const currentInstall = installCommands[platform]
  const currentPrereqs = prerequisites[platform]

  return (
    <main className="min-h-screen bg-[var(--bg-000)]">
      {/* Header */}
      <div className="max-w-[var(--max-width)] mx-auto px-4 sm:px-6 pt-32 pb-16">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[var(--text-500)] hover:text-[var(--text-300)] transition-colors text-sm mb-8">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>

          <h1 className="font-display text-[clamp(40px,7vw,64px)] font-bold tracking-[-0.03em] text-[var(--text-100)] mb-4">
            Install Doki
          </h1>
          <p className="max-w-md mx-auto text-lg text-[var(--text-400)] leading-relaxed">
            One command. Zero dependencies. Running in seconds.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-32">
        {/* Platform tabs */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlatform(p.id)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 tap-feedback ${
                platform === p.id
                  ? "bg-[var(--accent-cyan-muted)] text-[var(--accent-cyan)] shadow-[0_0_20px_rgba(0,212,255,0.1)]"
                  : "text-[var(--text-500)] hover:text-[var(--text-200)] hover:bg-[var(--bg-300)]"
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{p.icon}</span>
                {p.label}
              </span>
            </button>
          ))}
        </div>

        {/* Prerequisites */}
        <div className="mb-8 p-4 bg-[var(--bg-100)] border border-[var(--border-100)] rounded-xl">
          <h3 className="text-sm font-medium text-[var(--text-200)] mb-3">Prerequisites</h3>
          <ul className="space-y-1.5">
            {currentPrereqs.map((prereq) => (
              <li key={prereq} className="flex items-center gap-2 text-sm text-[var(--text-400)]">
                <svg className="w-4 h-4 text-[var(--accent-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {prereq}
              </li>
            ))}
          </ul>
        </div>

        {/* Install steps */}
        <div className="space-y-6">
          {currentInstall.steps.map((step, i) => (
            <div key={i}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-[var(--bg-300)] text-[var(--text-300)] text-xs flex items-center justify-center font-mono">
                  {i + 1}
                </span>
                <h3 className="text-sm font-medium text-[var(--text-200)]">{step.title}</h3>
              </div>
              <div className="relative group">
                <pre className="p-4 bg-[var(--bg-100)] border border-[var(--border-100)] rounded-lg font-mono text-sm text-[var(--text-300)] overflow-x-auto">
                  {step.code}
                </pre>
                <button
                  onClick={() => copyCode(step.code, i)}
                  className="absolute top-3 right-3 p-1.5 rounded bg-[var(--bg-300)] text-[var(--text-500)] hover:text-[var(--text-200)] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Copy"
                >
                  {copiedIndex === i ? (
                    <svg className="w-4 h-4 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Post-install */}
        <div className="mt-12 p-6 bg-[var(--bg-100)] border border-[var(--border-100)] rounded-xl">
          <h3 className="text-sm font-medium text-[var(--text-200)] mb-4">What&apos;s next?</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link href="/changelog" className="p-3 bg-[var(--bg-200)] border border-[var(--border-100)] rounded-lg hover:border-[var(--border-200)] transition-colors">
              <div className="text-sm font-medium text-[var(--text-100)] mb-1">View changelog</div>
              <div className="text-xs text-[var(--text-500)]">See what&apos;s new in v0.11.0</div>
            </Link>
            <Link href="/docs/home" className="p-3 bg-[var(--bg-200)] border border-[var(--border-100)] rounded-lg hover:border-[var(--border-200)] transition-colors">
              <div className="text-sm font-medium text-[var(--text-100)] mb-1">Read the docs</div>
              <div className="text-xs text-[var(--text-500)]">Full documentation</div>
            </Link>
            <a href="https://github.com/OpceanAI/Doki" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--bg-200)] border border-[var(--border-100)] rounded-lg hover:border-[var(--border-200)] transition-colors">
              <div className="text-sm font-medium text-[var(--text-100)] mb-1">Star on GitHub</div>
              <div className="text-xs text-[var(--text-500)]">Support the project</div>
            </a>
            <a href="https://reddit.com/r/termux" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--bg-200)] border border-[var(--border-100)] rounded-lg hover:border-[var(--border-200)] transition-colors">
              <div className="text-sm font-medium text-[var(--text-100)] mb-1">Join community</div>
              <div className="text-xs text-[var(--text-500)]">r/termux on Reddit</div>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
