"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Navigation } from "@/components/doki/navigation"
import { Footer } from "@/components/doki/footer"

const quickCmds = [
  { cmd: "doki pull nginx:alpine", desc: "Pull an image" },
  { cmd: "doki run -d -p 8080:80 nginx:alpine", desc: "Run a container" },
  { cmd: "doki ps", desc: "List running containers" },
  { cmd: "doki logs -f <container>", desc: "Tail container logs" },
  { cmd: "doki exec -it <container> sh", desc: "Shell into a container" },
  { cmd: "doki compose up", desc: "Start compose services" },
]

const featureKeys = [
  "feat1",
  "feat2",
  "feat3",
  "feat4",
  "feat5",
  "feat6",
]

export default function DokiCliPage() {
  const t = useTranslations("product.dokiCli")
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[80dvh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div
          className={`relative z-10 max-w-[var(--max-width)] mx-auto px-[var(--gutter)] w-full py-[var(--section-y)] transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="max-w-[var(--measure)]">
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)]">
              {t("eyebrow")}
            </span>
            <h1 className="font-sans font-semibold text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-0.02em] text-foreground mt-6 mb-6 text-pretty">
              {t("headline1")}
              <br />
              <span className="text-[var(--clay)]">{t("headline2")}</span>
            </h1>
            <p className="text-[clamp(16px,1.4vw,18px)] text-[var(--text-70)] leading-relaxed font-serif max-w-[520px] mb-8">
              {t("subtext")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/install" className="btn btn-primary">
                {t("install")}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/docs/home" className="btn btn-secondary">
                {t("readDocs")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick start */}
      <section className="section-band-surface">
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)] mb-8">
            {t("quickStart")}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickCmds.map((item) => (
              <div key={item.cmd} className="surface-card p-5">
                <code className="text-[13px] font-mono text-[var(--clay)] block mb-2 break-all leading-relaxed">
                  {item.cmd}
                </code>
                <p className="text-[13px] text-[var(--text-70)] font-serif">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}>
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)] mb-4">
            {t("features")}
          </p>
          <h2 className="font-sans font-semibold text-[clamp(28px,3.5vw,40px)] tracking-[-0.02em] text-foreground mb-12 text-pretty">
            {t("featuresTitle")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureKeys.map((key) => (
              <div key={key} className="surface-card p-6">
                <h3 className="font-sans font-semibold text-[15px] text-foreground mb-2">
                  {t(`${key}Title`)}
                </h3>
                <p className="text-[14px] text-[var(--text-70)] leading-relaxed font-serif">
                  {t(`${key}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-band-cream text-center">
        <div className="max-w-[var(--measure)] mx-auto px-[var(--gutter)]">
          <h2 className="font-sans font-semibold text-[clamp(28px,3.5vw,40px)] tracking-[-0.02em] text-foreground mb-4 text-pretty">
            {t("ctaHeadline")}
          </h2>
          <p className="text-[17px] text-[var(--text-70)] font-serif mb-8">
            {t("ctaSubtext")}
          </p>
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <Link href="/install" className="btn btn-primary">{t("install")}</Link>
            <Link href="/docs/home" className="btn btn-secondary">{t("readDocs")}</Link>
          </div>
        </div>
      </section>

      <div className="section-band-dark">
        <Footer />
      </div>
    </main>
  )
}
