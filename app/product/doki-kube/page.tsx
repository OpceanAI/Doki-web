"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/doki/navigation"
import { Footer } from "@/components/doki/footer"

const features = [
  {
    title: "Full Kubernetes 1.32",
    desc: "API Server, Kubelet, Scheduler, 10 Controllers, Kube-proxy, CoreDNS. All built in — no external dependencies.",
  },
  {
    title: "80 K8s API types",
    desc: "Pods, Deployments, Services, ConfigMaps, Secrets, Ingress, CRDs, RBAC, and more. Full kubectl compatibility.",
  },
  {
    title: "Single binary control plane",
    desc: "doki-kube starts a complete K8s control plane in seconds. No etcd, no containerd, no CNI plugins required.",
  },
  {
    title: "Bundle kubectl",
    desc: "doki-kubectl is a bundled kubectl binary configured to talk to your local cluster. No version mismatches.",
  },
  {
    title: "Works on any device",
    desc: "Run a K8s cluster on your phone, laptop, or edge device. Same API, same manifests, same tooling.",
  },
  {
    title: "Minimal footprint",
    desc: "~15MB for the complete control plane + kubectl. Fraction of the memory and disk of a standard K8s deployment.",
  },
]

export default function DokiKubePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <main>
      <Navigation />

      <section className="relative min-h-[70dvh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className={`relative z-10 max-w-[var(--max-width)] mx-auto px-[var(--gutter)] w-full py-[var(--section-y)] transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="max-w-[var(--measure)]">
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)]">Doki Kube</span>
            <h1 className="font-sans font-semibold text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-0.02em] text-foreground mt-6 mb-6">
              Kubernetes
              <br />
              <span className="text-[var(--clay)]">in your pocket</span>
            </h1>
            <p className="text-[clamp(17px,1.6vw,19px)] text-[var(--text-70)] leading-relaxed font-serif max-w-[520px] mb-8">
              A full Kubernetes cluster in a ~15MB binary. Run K8s on your Android phone, Raspberry Pi, or macOS laptop.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/install" className="btn btn-primary">Install Doki</Link>
              <Link href="/docs/home" className="btn btn-secondary">Read the docs</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band-surface" style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}>
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <div className="surface-card p-6 md:p-8 mb-12">
            <code className="text-[13px] font-mono text-[var(--clay)] block whitespace-pre-wrap">$ doki-kube init
✓ API Server started (127.0.0.1:6443)
✓ Kubelet registered
✓ CoreDNS ready
✓ 3 nodes ready

$ kubectl get nodes
NAME       STATUS   ROLES          AGE
doki-k8s   Ready    control-plane  12s</code>
          </div>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)] mb-4">Features</p>
          <h2 className="font-sans font-semibold text-[clamp(28px,3.5vw,40px)] tracking-[-0.02em] text-foreground mb-12">
            The full K8s API. No infrastructure required.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="surface-card p-6">
                <h3 className="font-sans font-semibold text-[15px] text-foreground mb-2">{f.title}</h3>
                <p className="text-[14px] text-[var(--text-70)] leading-relaxed font-serif">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}>
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
          <div className="max-w-[var(--measure)] mx-auto">
            <h2 className="font-sans font-semibold text-[clamp(28px,3.5vw,40px)] tracking-[-0.02em] text-foreground mb-6 text-center">
              Perfect for
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ["Development", "Test K8s manifests locally without minikube or kind."],
                ["CI/CD pipelines", "Spin up ephemeral K8s clusters in CI runners."],
                ["Edge computing", "Run lightweight K8s on ARM devices at the edge."],
                ["Education", "Learn Kubernetes on any device you already own."],
                ["IoT", "Container orchestration for IoT gateways and devices."],
                ["Demo / POC", "Quickly demo K8s-native apps on any hardware."],
              ].map(([title, desc]) => (
                <div key={title} className="surface-card p-5">
                  <h3 className="font-sans font-semibold text-[14px] text-foreground mb-1">{title}</h3>
                  <p className="text-[13px] text-[var(--text-70)] font-serif">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
