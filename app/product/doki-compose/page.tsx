"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Navigation } from "@/components/doki/navigation"
import { Footer } from "@/components/doki/footer"

const featureKeys = ["feat1", "feat2", "feat3", "feat4", "feat5", "feat6"]

export default function DokiComposePage() {
  const t = useTranslations("product.dokiCompose")
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
              </Link>
              <Link href="/docs/quick-start" className="btn btn-secondary">
                {t("quickStart")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal demo + Features */}
      <section className="section-band-surface">
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <div className="surface-card p-6 md:p-8 mb-12 overflow-x-auto">
            <code className="text-[13px] font-mono text-[var(--clay)] block whitespace-pre leading-relaxed">
              {`$ doki compose up -d
[+] Running 3/3
 ✔ Container postgres   Started
 ✔ Container redis      Started
 ✔ Container app        Started`}
            </code>
          </div>
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

      {/* Why Doki Compose */}
      <section style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}>
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <div className="max-w-[var(--measure)] mx-auto text-center">
            <h2 className="font-sans font-semibold text-[clamp(28px,3.5vw,40px)] tracking-[-0.02em] text-foreground mb-8 text-pretty">
              Why Doki Compose?
            </h2>
            <div className="space-y-5 text-left font-serif text-[15px] text-[var(--text-70)] leading-relaxed">
              <p>
                Docker Compose is the standard way to define multi-container applications. But it requires
                Docker Engine — which means it does not run on Android and requires root on Linux.
              </p>
              <p>
                Doki Compose reads the same YAML files, supports the same CLI flags, and produces the same
                results. The difference: it works on phones, tablets, Chromebooks, and locked-down corporate
                laptops.
              </p>
              <p>No daemon requirement, no root, no systemd. Just one binary and your compose file.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-band-dark">
        <Footer />
      </div>
    </main>
  )
}
