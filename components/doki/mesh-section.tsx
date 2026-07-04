"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { CodeBlock } from "./code-block"

type Tab = "mesh" | "k8s" | "macos"

const tabs: { id: Tab; label: string; badge: string }[] = [
  { id: "mesh",  label: "DokiLink Mesh",    badge: "P2P" },
  { id: "k8s",   label: "Kubernetes 1.32",  badge: "6 Components" },
  { id: "macos", label: "macOS Native",     badge: "VZ + QEMU" },
]

const tabContent: Record<Tab, {
  title: string
  description: string
  code: string
  stats: { label: string; value: string }[]
  note?: string
}> = {
  mesh: {
    title: "Distributed Container Mesh",
    description: "Peer-to-peer container networking with NAT traversal (STUN/TURN), Kademlia DHT for decentralized peer discovery, and mDNS auto-discovery. Encrypted with TLS 1.3 and secretbox payload encryption. Per-connection nonces and replay protection.",
    code: `$ doki link add peer.local
Discovering peer via DHT/mDNS...
NAT traversal: STUN binding...
Establishing encrypted channel (TLS 1.3)...
✓ Peer connected. Mesh: 2 nodes

$ doki mesh status
Peers: 2 (DHT: 8 nodes known)
  peer.local  [connected]  latency: 3ms
  phone-2     [connected]  latency: 12ms`,
    stats: [
      { label: "NAT Traversal", value: "STUN/TURN" },
      { label: "DHT",           value: "Kademlia" },
      { label: "Encryption",    value: "TLS 1.3" },
      { label: "Replay Guard",  value: "Nonce+Timestamp" },
    ],
    note: "Peers can connect across NAT boundaries without static config.",
  },
  k8s: {
    title: "Full Kubernetes on Your Phone",
    description: "100% Kubernetes implementation: real CRI gRPC (41 RPCs), Kubelet with CRI integration, Kube-proxy with iptables/nftables/userspace modes, functional controllers (Deployment, ReplicaSet, Job, Endpoint, Service, Namespace, GC), SQLiteStore for persistent state, and CoreDNS with SRV records.",
    code: `$ doki-kube version
Client: v0.11.0
Server: Kubernetes 1.32
CRI: gRPC (41 RPCs)

$ doki-kubectl get pods -A
NAMESPACE   NAME                   READY STATUS
default     web-6d4f7b8c9-x2k4p   1/1   Running
kube-system coredns-7b4f5c8d9-p2r 1/1   Running

$ doki-kubectl apply -f deployment.yaml
deployment.apps/web created`,
    stats: [
      { label: "CRI RPCs",    value: "41" },
      { label: "Controllers", value: "10" },
      { label: "Proxy Modes", value: "3" },
      { label: "State Store", value: "SQLite" },
    ],
  },
  macos: {
    title: "Native macOS Virtualization",
    description: "Apple Virtualization.framework via cgo+ObjC bridge (VZVirtualMachineConfiguration, VZLinuxBootLoader, VZVirtioFileSystemDevice). QEMU fallback for Intel Macs with arch-aware args. Sandbox backend using sandbox-exec with tightened profile.",
    code: `$ doki run --backend vz alpine sh
Starting Apple VZ VM (cgo bridge)...
✓ VM ready (128MB allocated)
  Boot: VZLinuxBootLoader
  FS: VZVirtioFileSystemDevice

$ doki-kube start
Starting Kubernetes cluster...
✓ 6 components running
  API Server, Kubelet, Scheduler
  10 Controllers, Kube-proxy, CoreDNS`,
    stats: [
      { label: "VZ Backend", value: "cgo+ObjC" },
      { label: "QEMU",       value: "Arch-aware" },
      { label: "Sandbox",    value: "Tightened" },
      { label: "Platforms",  value: "All" },
    ],
  },
}

export function MeshSection() {
  const t = useTranslations('mesh')
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>("mesh")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const content = tabContent[activeTab]

  return (
    <section
      ref={ref}
      style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}
    >
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
        {/* Header */}
        <div
          className={`mb-12 max-w-[var(--measure)] transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)] mb-4">
            {t('version')}
          </p>
          <h2 className="font-sans font-semibold text-[clamp(32px,4.5vw,48px)] tracking-[-0.02em] text-foreground mb-4 leading-tight">
            {t('headline1')}
            <br />
            <span className="text-[var(--text-70)] font-normal font-serif italic">
              {t('headline2')}
            </span>
          </h2>
          <p className="text-[17px] text-[var(--text-70)] leading-relaxed font-serif">
            {t('subtitle')}
          </p>
        </div>

        {/* Tabs */}
        <div
          className={`flex items-center gap-3 sm:gap-6 mb-10 border-b border-[var(--border-subtle)] overflow-x-auto transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-3 text-[13px] sm:text-[14px] font-medium transition-colors duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-[var(--mist)] hover:text-[var(--text-70)]"
              }`}
            >
              <span className="flex items-center gap-1.5 sm:gap-2">
                {t(tab.id + 'Label')}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    activeTab === tab.id
                      ? "bg-[var(--clay)]/10 text-[var(--clay)]"
                      : "bg-[var(--vellum)] text-[var(--mist)]"
                  }`}
                >
                  {t(tab.id + 'Badge')}
                </span>
              </span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--clay)]" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          className={`grid md:grid-cols-2 gap-8 items-start transition-all duration-500 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Left: info + stats */}
          <div>
            <h3 className="font-sans text-[20px] font-semibold text-foreground mb-4">
              {t(activeTab + 'Title')}
            </h3>
            <p className="text-[15px] text-[var(--text-70)] leading-relaxed font-serif mb-6">
              {t(activeTab + 'Desc')}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {content.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-3 rounded-lg bg-[var(--vellum)] border border-[var(--border-subtle)]"
                >
                  <div className="text-[11px] text-[var(--mist)] mb-1 font-mono uppercase tracking-wide">
                    {stat.label}
                  </div>
                  <div className="text-[14px] font-mono font-medium text-[var(--clay)]">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {content.note && (
              <div className="p-3 rounded-lg bg-[var(--vellum)] border border-[var(--border-subtle)]">
                  <p className="text-[12px] text-[var(--text-70)] leading-relaxed font-serif">
                  <span className="font-medium text-[var(--clay)]">{t('noteLabel')} </span>
                  {t(activeTab + 'Note')}
                </p>
              </div>
            )}
          </div>

          {/* Right: code terminal */}
          <CodeBlock
            code={content.code}
            language="bash"
            title={activeTab === "mesh" ? t('meshCodeTitle') : activeTab === "k8s" ? t('k8sCodeTitle') : t('macosCodeTitle')}
          />
        </div>
      </div>
    </section>
  )
}
