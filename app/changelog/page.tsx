import Link from "next/link"

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
  const releases = await getReleases()
  const latest = releases[0]

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-16">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors text-sm mb-8">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>

          <div className="inline-flex items-center gap-2 mb-6">
            <span className="status-dot" />
            <span className="text-[var(--text-secondary)] font-mono text-sm">
              {latest ? `Latest: ${latest.tag_name}` : "Changelog"}
            </span>
          </div>

          <h1 className="font-sans font-semibold text-[clamp(32px,5vw,52px)] tracking-[-0.02em] text-foreground mb-4">
            Changelog
          </h1>
          <p className="max-w-md mx-auto text-[17px] text-[var(--text-secondary)] leading-relaxed font-serif">
            Every release of Doki. From container engine to Kubernetes on your phone. Latest: v0.11.0 with NAT traversal, DHT, and 100% Kubernetes.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-32">
        {releases.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[var(--text-secondary)]">No releases found.</p>
            <Link href="https://github.com/OpceanAI/Doki/releases" target="_blank" className="text-[var(--clay)] hover:underline text-sm mt-2 inline-block">
              View on GitHub
            </Link>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[var(--border-subtle)]" />

            {releases.map((release, i) => {
              const highlights = parseHighlights(release.body)
              const isLatest = i === 0
              return (
                <div key={release.id} className={`relative flex items-start gap-6 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 z-10 ${
                    isLatest ? "bg-[var(--clay)] border-[var(--clay)]" : "bg-background border-[var(--border-subtle)]"
                  }`} />

                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                    <div className="surface-card">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`font-mono text-sm font-medium ${isLatest ? "text-[var(--clay)]" : "text-foreground"}`}>
                          {release.tag_name}
                        </span>
                        {isLatest && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--clay)]/10 text-[var(--clay)] font-mono">
                            LATEST
                          </span>
                        )}
                        {release.prerelease && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--fig)]/10 text-[var(--fig)] font-mono">
                            PRE-RELEASE
                          </span>
                        )}
                      </div>

                      <h3 className="font-sans font-semibold text-foreground mb-1 text-sm">
                        {release.name}
                      </h3>

                      <p className="text-xs text-[var(--text-tertiary)] mb-3">
                        {formatDate(release.published_at)}
                      </p>

                      {highlights.length > 0 && (
                        <ul className={`space-y-1 mb-4 ${i % 2 === 0 ? "md:text-right" : ""}`}>
                          {highlights.map((h, j) => (
                            <li key={j} className="text-xs text-[var(--text-secondary)] leading-relaxed">
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}

                      <a
                        href={release.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[var(--clay)] hover:underline"
                      >
                        View on GitHub
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

        <div className="text-center pt-8 hairline-top">
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Want to see older releases?
          </p>
          <Link
            href="https://github.com/OpceanAI/Doki/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary text-sm"
          >
            All releases on GitHub
          </Link>
        </div>
      </div>
    </main>
  )
}