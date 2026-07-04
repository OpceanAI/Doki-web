"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Navigation } from "@/components/doki/navigation"
import { Footer } from "@/components/doki/footer"

const featureKeys = ["feat1", "feat2", "feat3", "feat4", "feat5", "feat6"]

export default function AndroidPage() {
  const t = useTranslations("solutions.android")
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[75dvh] flex items-center pt-24 overflow-hidden">
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
                {t("cta")}
              </Link>
              <Link href="/docs/installation" className="btn btn-secondary">
                {t("guide")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="section-band-surface">
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
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

      <div className="section-band-dark">
        <Footer />
      </div>
    </main>
  )
}
