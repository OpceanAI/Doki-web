"use client"

import { useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"

type Platform = "termux" | "linux" | "macos"

const VERSION = "v0.11.1"

const platforms: { id: Platform; icon: string }[] = [
  { id: "termux", icon: "📱" },
  { id: "linux", icon: "🐧" },
  { id: "macos", icon: "🍎" },
]

const installCommands: Record<Platform, { titleKey: string; code: string }[]> = {
  termux: [
    { titleKey: "stepInstallDoki", code: "curl -sL dok1.xyz | bash" },
    { titleKey: "stepStartDaemon", code: "dokid &" },
    { titleKey: "stepPullImage", code: "doki pull alpine" },
    { titleKey: "stepRunContainer", code: 'doki run alpine echo "Hello from Doki"' },
  ],
  linux: [
    {
      titleKey: "stepDownload",
      code: `curl -L https://github.com/OpceanAI/Doki/releases/download/${VERSION}/doki-${VERSION}-linux-arm64.tar.gz | tar -xz\ncd doki-${VERSION}-linux-arm64\n./install.sh`,
    },
    {
      titleKey: "stepX86",
      code: `curl -L https://github.com/OpceanAI/Doki/releases/download/${VERSION}/doki-${VERSION}-linux-amd64.tar.gz | tar -xz\ncd doki-${VERSION}-linux-amd64\n./install.sh`,
    },
    { titleKey: "stepVerify", code: "doki version" },
  ],
  macos: [
    {
      titleKey: "stepAppleSilicon",
      code: `curl -L https://github.com/OpceanAI/Doki/releases/download/${VERSION}/doki-${VERSION}-darwin-arm64.tar.gz | tar -xz\ncd doki-${VERSION}-darwin-arm64\n./install.sh`,
    },
    {
      titleKey: "stepIntel",
      code: `curl -L https://github.com/OpceanAI/Doki/releases/download/${VERSION}/doki-${VERSION}-darwin-amd64.tar.gz | tar -xz\ncd doki-${VERSION}-darwin-amd64\n./install.sh`,
    },
    { titleKey: "stepVerify", code: "doki version" },
  ],
}

const prereqKeys: Record<Platform, string[]> = {
  termux: ["prereqTermux", "prereqCurl", "prereqRam", "prereqAndroid"],
  linux: ["prereqCurl", "prereqTar", "prereqKernel", "prereqArch"],
  macos: ["prereqCurl", "prereqTar", "prereqMacos", "prereqSilicon"],
}

export default function InstallPage() {
  const t = useTranslations("install")
  const [platform, setPlatform] = useState<Platform>("termux")
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyCode = async (code: string, index: number) => {
    await navigator.clipboard.writeText(code)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const currentInstall = installCommands[platform]
  const currentPrereqs = prereqKeys[platform]

  const platformLabels: Record<Platform, string> = {
    termux: "Termux / Android",
    linux: "Linux",
    macos: "macOS",
  }

  return (
    <main className="min-h-screen bg-[var(--bg-000)]">
      <div className="max-w-[var(--max-width)] mx-auto px-4 sm:px-6 pt-32 pb-16">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[var(--text-500)] hover:text-[var(--text-300)] transition-colors text-sm mb-8">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t("backToHome")}
          </Link>

          <h1 className="font-display text-[clamp(40px,7vw,64px)] font-bold tracking-[-0.03em] text-[var(--text-100)] mb-4">
            {t("title")}
          </h1>
          <p className="max-w-md mx-auto text-lg text-[var(--text-400)] leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-32">
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlatform(p.id)}
              className={`px-3 sm:px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                platform === p.id
                  ? "bg-[var(--accent-cyan-muted)] text-[var(--accent-cyan)]"
                  : "text-[var(--text-500)] hover:text-[var(--text-200)] hover:bg-[var(--bg-300)]"
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{p.icon}</span>
                {platformLabels[p.id]}
              </span>
            </button>
          ))}
        </div>

        <div className="mb-8 p-4 bg-[var(--bg-100)] border border-[var(--border-100)] rounded-xl">
          <h3 className="text-sm font-medium text-[var(--text-200)] mb-3">{t("prereqs")}</h3>
          <ul className="space-y-1.5">
            {currentPrereqs.map((key) => (
              <li key={key} className="flex items-center gap-2 text-sm text-[var(--text-400)]">
                <svg className="w-4 h-4 text-[var(--accent-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {t(key)}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          {currentInstall.map((step, i) => (
            <div key={i}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-[var(--bg-300)] text-[var(--text-300)] text-xs flex items-center justify-center font-mono">
                  {i + 1}
                </span>
                <h3 className="text-sm font-medium text-[var(--text-200)]">{t(step.titleKey)}</h3>
              </div>
              <div className="relative group">
                <pre className="p-4 bg-[var(--bg-100)] border border-[var(--border-100)] rounded-lg font-mono text-sm text-[var(--text-300)] overflow-x-auto">
                  {step.code}
                </pre>
                <button
                  onClick={() => copyCode(step.code, i)}
                  className="absolute top-3 right-3 p-1.5 rounded bg-[var(--bg-300)] text-[var(--text-500)] hover:text-[var(--text-200)] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={t("copy")}
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

        <div className="mt-12 p-6 bg-[var(--bg-100)] border border-[var(--border-100)] rounded-xl">
          <h3 className="text-sm font-medium text-[var(--text-200)] mb-4">{t("whatsNext")}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link href="/changelog" className="p-3 bg-[var(--bg-200)] border border-[var(--border-100)] rounded-lg hover:border-[var(--border-200)] transition-colors">
              <div className="text-sm font-medium text-[var(--text-100)] mb-1">{t("whatsNextChangelog")}</div>
              <div className="text-xs text-[var(--text-500)]">{t("whatsNextChangelogDesc")}</div>
            </Link>
            <Link href="/docs/home" className="p-3 bg-[var(--bg-200)] border border-[var(--border-100)] rounded-lg hover:border-[var(--border-200)] transition-colors">
              <div className="text-sm font-medium text-[var(--text-100)] mb-1">{t("whatsNextDocs")}</div>
              <div className="text-xs text-[var(--text-500)]">{t("whatsNextDocsDesc")}</div>
            </Link>
            <a href="https://github.com/OpceanAI/Doki" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--bg-200)] border border-[var(--border-100)] rounded-lg hover:border-[var(--border-200)] transition-colors">
              <div className="text-sm font-medium text-[var(--text-100)] mb-1">{t("whatsNextGithub")}</div>
              <div className="text-xs text-[var(--text-500)]">{t("whatsNextGithubDesc")}</div>
            </a>
            <a href="https://reddit.com/r/termux" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--bg-200)] border border-[var(--border-100)] rounded-lg hover:border-[var(--border-200)] transition-colors">
              <div className="text-sm font-medium text-[var(--text-100)] mb-1">{t("whatsNextCommunity")}</div>
              <div className="text-xs text-[var(--text-500)]">{t("whatsNextCommunityDesc")}</div>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
