"use client"

import { useEffect, useRef, useState } from "react"

const features = [
  {
    title: "Zero Dependencies",
    description: "Single static binary. No containerd, no runc, no libseccomp, no systemd. Just copy and run. Ships everything you need in one ~8.5MB executable.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    large: true,
  },
  {
    title: "OCI + Podman API v5",
    description: "Full Docker Hub support. 39 Podman API v5 endpoints. Same API as Docker Engine v1.54. Your docker-compose files work out of the box.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    title: "Kubernetes 1.32",
    description: "6 components: API Server, Kubelet, Scheduler, 10 Controllers, Kube-proxy, CoreDNS. 80 K8s API types. Full kubectl client.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
  },
  {
    title: "9 Binaries, 8.56MB",
    description: "doki, dokid, doki-compose, doki-init, doki-kube, doki-kubectl. All in one package. ARM64, ARMv7, macOS native.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
      </svg>
    ),
    wide: true,
  },
  {
    title: "macOS Native VZ",
    description: "Apple Virtualization.framework for macOS 11+. QEMU fallback for Intel Macs. Sandbox backend for lightweight isolation.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
  {
    title: "DokiLink Mesh",
    description: "Peer-to-peer container networking. mDNS auto-discovery. Encrypted with TLS 1.3 + secretbox. Zero config.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    title: "Landlock Sandbox",
    description: "Linux 5.13+ ABI v9 support. Filesystem, network, scope rules. Auto-detection with fallback. Secure by default.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "100% Rootless",
    description: "Runs as unprivileged user on Android. No root, no namespace tricks. Just works.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
  },
]

export function Features() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="features"
      ref={ref}
      className="relative"
      style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}
    >
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
        {/* Header */}
        <div
          className={`mb-16 max-w-[var(--measure)] transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)] mb-4">
            Features
          </p>
          <h2 className="font-sans font-semibold text-[clamp(32px,4.5vw,48px)] tracking-[-0.02em] text-foreground mb-4 leading-tight">
            Everything Docker has.
            <br />
            <span className="text-[var(--text-70)] font-normal">Without the overhead.</span>
          </h2>
          <p className="text-[17px] text-[var(--text-70)] leading-relaxed font-serif">
            Docker cannot run on Android. Doki can. Same OCI images, same workflow, fraction of the resources.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => {
            const isLarge = feature.large
            const isWide = feature.wide
            const colSpan = isLarge
              ? "md:col-span-2 md:row-span-2"
              : isWide
                ? "md:col-span-2"
                : "md:col-span-1"

            return (
              <div
                key={feature.title}
                className={`surface-card group transition-all duration-500 ${colSpan} ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: visible ? `${i * 60}ms` : "0ms",
                  padding: isLarge ? "40px" : "32px",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[var(--mist)] group-hover:text-[var(--clay)] transition-colors duration-200">
                    {feature.icon}
                  </span>
                  <h3
                    className={`font-sans font-semibold text-foreground ${
                      isLarge ? "text-[20px]" : "text-[15px]"
                    }`}
                  >
                    {feature.title}
                  </h3>
                </div>
                <p
                  className={`text-[var(--text-70)] leading-relaxed font-serif ${
                    isLarge ? "text-[15px]" : "text-[14px]"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
