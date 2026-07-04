"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"

interface TerminalLine {
  type: "prompt" | "output" | "success" | "error" | "info"
  text: string
}

interface TerminalCommand {
  prompt: string
  lines: TerminalLine[]
}

const commands: TerminalCommand[] = [
  {
    prompt: "$ curl -sL dok1.xyz | bash",
    lines: [
      { type: "info",    text: "==> Installing Doki CLI" },
      { type: "info",    text: "==> Detected platform: Android/Termux (ARM64)" },
      { type: "info",    text: "==> Version: v0.11.0" },
      { type: "info",    text: "==> Downloading binaries..." },
      { type: "success", text: "✓ Doki v0.11.0 installed successfully." },
    ],
  },
  {
    prompt: "$ doki pull alpine",
    lines: [
      { type: "info",    text: "Pulling alpine:latest..." },
      { type: "info",    text: "Resolving ARM64 manifest..." },
      { type: "info",    text: "Downloading 3 layers (4.0 MB)" },
      { type: "success", text: "✓ Pulled in 2.1s" },
    ],
  },
  {
    prompt: '$ doki run alpine echo "Hello from Doki"',
    lines: [
      { type: "output",  text: "Hello from Doki" },
      { type: "success", text: "✓ Started in 10ms" },
    ],
  },
  {
    prompt: "$ doki-kube version",
    lines: [
      { type: "output",  text: "Client: v0.11.0" },
      { type: "output",  text: "Server: Kubernetes 1.32" },
      { type: "success", text: "✓ 6 components running" },
    ],
  },
  {
    prompt: "$ doki link add peer.local",
    lines: [
      { type: "info",    text: "Discovering peer via mDNS..." },
      { type: "info",    text: "Establishing encrypted channel (TLS 1.3)..." },
      { type: "success", text: "✓ Peer connected. Mesh: 2 nodes" },
    ],
  },
  {
    prompt: "$ doki-compose up",
    lines: [
      { type: "info",    text: "Creating network doki_default" },
      { type: "info",    text: "Creating db ... done" },
      { type: "info",    text: "Creating redis ... done" },
      { type: "info",    text: "Creating web ... done" },
      { type: "success", text: "✓ 3 services running" },
    ],
  },
]

function lineColor(type: TerminalLine["type"]): string {
  switch (type) {
    case "success": return "text-[var(--green)]"
    case "error":   return "text-red-400"
    case "info":    return "text-[var(--mist)]"
    case "output":  return "text-[var(--paper)]"
    default:        return "text-[var(--paper)]"
  }
}

export function Terminal() {
  const t = useTranslations('terminal')
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [currentCommand, setCurrentCommand] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const cmd = commands[currentCommand]

  return (
    <section
      ref={ref}
      className="bg-[var(--ink)]"
      style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}
    >
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
        {}
        <div
          className={`mb-12 max-w-[var(--measure)] transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)] mb-4">
            {t('label')}
          </p>
          <h2 className="font-sans font-semibold text-[clamp(32px,4.5vw,48px)] tracking-[-0.02em] text-[var(--paper)] mb-4 leading-tight">
            {t('headline')}
          </h2>
          <p className="text-[17px] text-[rgba(250,249,245,0.7)] leading-relaxed font-[300] font-sans">
            {t('subtext')}
          </p>
        </div>

        {}
        <div
          className={`max-w-2xl transition-all duration-500 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="rounded-lg overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[var(--ink)]">
            {}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(255,255,255,0.08)]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs font-mono text-[var(--mist)]">
                  doki — zsh
                </span>
              </div>
              <div className="w-14" />
            </div>

            {}
            <div className="p-5 font-mono text-[13px] leading-relaxed min-h-[280px]">
              {}
              <div className="mb-3">
                <div className="text-[var(--clay)]">
                  {cmd.prompt}
                </div>
                {cmd.lines.map((line, i) => (
                  <div key={i} className={`pl-4 ${lineColor(line.type)}`}>
                    {line.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {}
          <div className="flex items-center justify-center gap-2 mt-6">
            {commands.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentCommand(i)}
                className="h-1.5 rounded-full transition-all duration-300 "
                style={{
                  width: i === currentCommand ? 24 : 6,
                  background: i === currentCommand ? "var(--clay)" : "var(--mist)",
                  opacity: i === currentCommand ? 1 : 0.4,
                }}
                aria-label={`Show command ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
