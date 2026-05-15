"use client"

import { useEffect, useRef, useState } from "react"

const features = [
  {
    title: "Zero Dependencies",
    description: "Single static binary compiled in Rust. No containerd, no runc, no libseccomp, no systemd. Just copy and run. Ships everything you need in one ~15MB executable.",
    longDescription: true,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    title: "OCI Compatible",
    description: "Full Docker Hub support. Pull, push, build. Same API as Docker Engine v1.44. Your docker-compose files work out of the box.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    title: "8 Linux Distros",
    description: "Alpine, Ubuntu, Debian, Arch, Fedora, Gentoo, OpenSUSE, Rocky. One command to bootstrap any distro.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
  },
  {
    title: "ARMv7 + ARM64",
    description: "Full feature parity for 32-bit ARM. Older phones, Raspberry Pi, embedded systems. No compromises.",
    wide: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
      </svg>
    ),
  },
  {
    title: "Port Forwarding",
    description: "Map host ports to containers. TCP and UDP. Works in proot mode without root.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    title: "100% Rootless",
    description: "Runs as unprivileged user on Android. No root, no namespace tricks. Just works.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
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
    <section id="features" ref={ref} className="relative py-[var(--section-padding)] bg-[var(--bg-000)]">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[var(--max-width)] mx-auto px-6">
        {/* Header */}
        <div className={`mb-16 transition-all duration-500 ${visible ? "opacity-100" : "opacity-0 translate-y-4"}`}>
          <p className="text-[var(--accent-cyan)] text-sm font-mono mb-3">Features</p>
          <h2 className="font-display text-[clamp(32px,5vw,48px)] font-bold tracking-[-0.03em] text-[var(--text-100)] mb-4">
            Everything Docker has.
            <br />
            <span className="text-[var(--text-400)]">Without the overhead.</span>
          </h2>
          <p className="max-w-lg text-[var(--text-400)] leading-relaxed">
            Docker cannot run on Android. Doki can. Same OCI images, same workflow, fraction of the resources.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {features.map((feature, i) => {
            const isLarge = feature.longDescription
            const isWide = feature.wide

            const colSpan = isLarge ? "md:col-span-2 md:row-span-2" : isWide ? "md:col-span-2" : "md:col-span-1"

            return (
              <div
                key={feature.title}
                className={`group gradient-border-animated rounded-xl bg-[var(--bg-100)] p-6 transition-all duration-300 ${colSpan} ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: visible ? `${i * 75}ms` : "0ms" }}
              >
                <div className={`rounded-lg bg-[var(--bg-300)] text-[var(--text-300)] flex items-center justify-center mb-4 group-hover:text-[var(--accent-cyan)] group-hover:bg-[var(--accent-cyan-muted)] transition-colors ${isLarge ? "w-12 h-12" : "w-10 h-10"}`}>
                  {feature.icon}
                </div>
                <h3 className={`font-semibold text-[var(--text-100)] mb-2 ${isLarge ? "text-xl" : "text-base"}`}>
                  {feature.title}
                </h3>
                <p className={`text-[var(--text-400)] leading-relaxed ${isLarge ? "text-sm max-w-md" : "text-sm"}`}>
                  {feature.description}
                </p>
                {isLarge && (
                  <div className="mt-4 flex gap-2 flex-wrap">
                    {["No containerd", "No runc", "No libseccomp", "~15MB"].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-[var(--bg-300)] text-[var(--text-500)] border border-[var(--border-100)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
