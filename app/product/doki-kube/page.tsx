"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Navigation } from "@/components/doki/navigation"
import { Footer } from "@/components/doki/footer"

const featureKeys = ["feat1", "feat2", "feat3", "feat4", "feat5", "feat6"]

const useCaseKeys = [
  ["development", "Test K8s manifests locally without minikube or kind."],
  ["ciCdPipelines", "Spin up ephemeral K8s clusters in CI runners."],
  ["edgeComputing", "Run lightweight K8s on ARM devices at the edge."],
  ["education", "Learn Kubernetes on any device you already own."],
  ["iot", "Container orchestration for IoT gateways and devices."],
  ["demoPoc", "Quickly demo K8s-native apps on any hardware."],
]

export default function DokiKubePage() {
  const t = useTranslations("product.dokiKube")
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
              <Link href="/docs/home" className="btn btn-secondary">
                {t("readDocs")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal + Features */}
      <section className="section-band-surface">
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <div className="surface-card p-6 md:p-8 mb-12 overflow-x-auto">
            <code className="text-[13px] font-mono text-[var(--clay)] block whitespace-pre leading-relaxed">
              {`$ doki-kube init
✓ API Server started (127.0.0.1:6443)
✓ Kubelet registered
✓ CoreDNS ready
✓ 3 nodes ready

$ kubectl get nodes
NAME       STATUS   ROLES          AGE
doki-k8s   Ready    control-plane  12s`}
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

      {/* Perfect for */}
      <section style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}>
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <div className="max-w-[var(--measure)] mx-auto">
            <h2 className="font-sans font-semibold text-[clamp(28px,3.5vw,40px)] tracking-[-0.02em] text-foreground mb-8 text-center text-pretty">
              Perfect for
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {useCaseKeys.map(([key, desc]) => (
                <div key={key} className="surface-card p-5">
                  <h3 className="font-sans font-semibold text-[14px] text-foreground mb-1">{key}</h3>
                  <p className="text-[13px] text-[var(--text-70)] font-serif leading-relaxed">{desc}</p>
                </div>
              ))}
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
