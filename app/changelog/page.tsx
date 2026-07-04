import Link from "next/link"
import { Navigation } from "@/components/doki/navigation"
import { Footer } from "@/components/doki/footer"
import { getTranslations } from "next-intl/server"

interface GitHubRelease {
  id: number
  tag_name: string
  name: string
  published_at: string
  body: string
  html_url: string
  prerelease: boolean
  draft: boolean
}

async function getReleases(): Promise<GitHubRelease[]> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/OpceanAI/Doki/releases?per_page=10",
      { next: { revalidate: 3600 }, headers: { Accept: "application/vnd.github+json" } }
    )
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

function parseHighlights(body: string): string[] {
  const highlights: string[] = []
  const lines = body.split("\n")
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith("## What") || trimmed.startsWith("## Breaking") || trimmed.startsWith("## Bug")) continue
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const text = trimmed.replace(/^[-*]\s*/, "")
      if (text.length > 10 && text.length < 200) {
        highlights.push(text)
      }
    }
    if (highlights.length >= 5) break
  }
  return highlights
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default async function ChangelogPage() {
  const t = await getTranslations("changelog")
  const releases = await getReleases()
  const latest = releases[0]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-40 pb-16">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--text-70)] hover:text-foreground transition-colors text-sm mb-10 font-serif"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t("backToHome")}
          </Link>

          <div className="inline-flex items-center gap-2 mb-6">
            <span className="status-dot" />
            <span className="text-[var(--text-70)] font-mono text-sm">
              {latest ? `${t("latest")}: ${latest.tag_name}` : t("title")}
            </span>
          </div>

          <h1 className="font-sans font-semibold text-[clamp(36px,5vw,56px)] tracking-[-0.02em] text-foreground mb-4">
            {t("title")}
          </h1>
          <p className="max-w-lg mx-auto text-[17px] text-[var(--text-70)] leading-relaxed font-serif">
            Every release of Doki. From container engine to Kubernetes on your phone.
            Latest: v0.11.0 with NAT traversal, DHT, and 100% Kubernetes.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-32">
        {releases.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[var(--text-70)] font-serif">{t("noReleases")}</p>
            <Link
              href="https://github.com/OpceanAI/Doki/releases"
              target="_blank"
              className="text-[var(--clay)] hover:underline text-sm mt-2 inline-block"
            >
              {t("viewOnGitHub")}
            </Link>
          </div>
        ) : (
          <div className="relative">
            {/* Vertical line — only on md+ */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[var(--border-subtle)]" />

            {releases.map((release, i) => {
              const highlights = parseHighlights(release.body)
              const isLatest = i === 0
              return (
                <div
                  key={release.id}
                  className={`relative flex items-start gap-6 mb-16 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 z-10 mt-5 ${
                      isLatest
                        ? "bg-[var(--clay)] border-[var(--clay)]"
                        : "bg-background border-[var(--border-subtle)]"
                    }`}
                  />

                  {/* Card */}
                  <div
                    className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                      i % 2 === 0 ? "md:pr-8" : "md:pl-8"
                    }`}
                  >
                    <div className="surface-card p-6">
                      {/* Tags */}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span
                          className={`font-mono text-[14px] font-semibold ${
                            isLatest ? "text-[var(--clay)]" : "text-foreground"
                          }`}
                        >
                          {release.tag_name}
                        </span>
                        {isLatest && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--clay)]/10 text-[var(--clay)] font-mono uppercase">
                            {t("latest")}
                          </span>
                        )}
                        {release.prerelease && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--fig)]/10 text-[var(--fig)] font-mono uppercase">
                            {t("preRelease")}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-sans font-semibold text-foreground text-[15px] mb-1 leading-snug">
                        {release.name}
                      </h3>

                      {/* Date */}
                      <p className="text-[12px] text-[var(--text-70)] font-mono mb-4">
                        {formatDate(release.published_at)}
                      </p>

                      {/* Highlights */}
                      {highlights.length > 0 && (
                        <ul className="space-y-1.5 mb-5">
                          {highlights.map((h, j) => (
                            <li
                              key={j}
                              className="text-[13px] text-[var(--text-70)] leading-relaxed font-serif flex items-start gap-2"
                            >
                              <span className="text-[var(--clay)] mt-1 shrink-0" aria-hidden>
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 8 8">
                                  <circle cx="4" cy="4" r="2" />
                                </svg>
                              </span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}

                      <a
                        href={release.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[13px] text-[var(--clay)] hover:underline font-serif"
                      >
                        {t("viewOnGitHub")}
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Footer CTA */}
        <div className="text-center pt-8 hairline-top">
          <p className="text-[15px] text-[var(--text-70)] mb-5 font-serif">{t("wantOlder")}</p>
          <Link
            href="https://github.com/OpceanAI/Doki/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            {t("allReleases")}
          </Link>
        </div>
      </div>

      <div className="section-band-dark">
        <Footer />
      </div>
    </main>
  )
}
