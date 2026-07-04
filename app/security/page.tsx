"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Navigation } from "@/components/doki/navigation"
import { Footer } from "@/components/doki/footer"

const layerKeys = ["layer1", "layer2", "layer3", "layer4", "layer5", "layer6"]

export default function SecurityPage() {
  const t = useTranslations("security")
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[65dvh] flex items-center pt-24 overflow-hidden">
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
            <p className="text-[clamp(16px,1.4vw,18px)] text-[var(--text-70)] leading-relaxed font-serif max-w-[520px]">
              {t("subtext")}
            </p>
          </div>
        </div>
      </section>

      {/* Security layers */}
      <section className="section-band-surface">
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {layerKeys.map((key) => (
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

      {/* Rootless architecture */}
      <section style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}>
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <div className="max-w-[var(--measure)] mx-auto">
            <h2 className="font-sans font-semibold text-[clamp(24px,3vw,36px)] tracking-[-0.02em] text-foreground mb-6 text-pretty">
              {t("rootlessTitle")}
            </h2>
            <div className="space-y-5 font-serif text-[15px] text-[var(--text-70)] leading-relaxed">
              <p>{t("rootlessDesc1")}</p>
              <p>{t("rootlessDesc2")}</p>
              <p>
                {t("rootlessDesc3").replace("Security documentation", "")}{" "}
                <Link href="/docs/security" className="text-[var(--clay)] hover:underline">
                  Security documentation
                </Link>
                .
              </p>
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
