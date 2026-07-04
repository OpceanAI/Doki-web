"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { ThemeToggle } from "@/components/docs/theme-toggle"

const navItems = [
  {
    key: "products",
    dropdown: true,
    links: [
      { href: "/product/doki-cli", key: "dokiCli", descKey: "dokiCliDesc" },
      { href: "/product/doki-compose", key: "dokiCompose", descKey: "dokiComposeDesc" },
      { href: "/product/doki-kube", key: "dokiKube", descKey: "dokiKubeDesc" },
      { href: "/product/dokid", key: "dokid", descKey: "dokidDesc" },
    ],
  },
  { href: "#features", key: "features" },
  { href: "#performance", key: "performance" },
  { href: "#community", key: "community" },
  { href: "/changelog", key: "changelog" },
  { href: "/install", key: "install" },
  { href: "/docs/home", key: "docs" },
]

function DokiLogo({ size = 32 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-md bg-[var(--clay)]"
      style={{ width: size, height: size }}
    >
      <span className="font-sans font-bold text-foreground" style={{ fontSize: size * 0.5 }}>
        D
      </span>
    </div>
  )
}

export function Navigation() {
  const t = useTranslations('nav')
  const tp = useTranslations('nav.product')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
    )
    navItems
      .filter((item) => "href" in item && item.href.startsWith("#"))
      .forEach((item) => {
        const el = document.querySelector((item as { href: string }).href)
        if (el) observer.observe(el)
      })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [mobileOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const deltaY = e.touches[0].clientY - touchStartY.current
    if (deltaY > 50) setMobileOpen(false)
  }, [])

  const closeSheet = useCallback(() => setMobileOpen(false), [])

  const isActive = (href: string) => {
    if (href.startsWith("#")) return activeSection === href.slice(1)
    return false
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-md border-b border-[var(--border-subtle)]"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <nav
          className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)] h-16 flex items-center justify-between"
          aria-label={t('mainNav')}
        >
          <Link href="/" className="flex items-center gap-2.5 group" aria-label={t('dokiHome')}>
            <DokiLogo size={32} />
            <span className="font-sans font-semibold text-foreground text-[15px] tracking-[-0.01em]">
              Doki
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-5" ref={dropdownRef}>
            {navItems.map((item) => {
              if ("dropdown" in item) {
                const isOpen = openDropdown === item.label
                return (
                  <div key={item.label} className="relative">
                    <button
                      onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                      className="nav-link text-[13px] flex items-center gap-1"
                      aria-expanded={isOpen}
                    >
                  {t(item.key)}
                  <svg className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg border border-[var(--border-subtle)] bg-background/95 backdrop-blur-md shadow-lg py-2">
                        {item.links.map((d: { href: string; key: string; descKey: string }) => (
                          <Link
                            key={d.href}
                            href={d.href}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-3 hover:bg-[var(--surface)] transition-colors"
                          >
                            <div className="text-[13px] font-sans font-medium text-foreground">{tp(d.key)}</div>
                            <div className="text-[11px] font-serif text-[var(--text-70)] mt-0.5">{tp(d.descKey)}</div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              return (
                <Link
                  key={(item as { href: string; key: string }).href}
                  href={(item as { href: string; key: string }).href}
                  className={`nav-link text-[13px] ${isActive((item as { href: string }).href) ? "active" : ""}`}
                >
                  {t((item as { key: string }).key)}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Link href="/install" className="btn-primary !py-2 !px-4 !text-[13px]">
              {t('getStarted')}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 -mr-2"
            aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={mobileOpen}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-foreground transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`h-0.5 w-full bg-foreground transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""}`} />
              <span className={`h-0.5 w-full bg-foreground transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/10 backdrop-blur-sm md:hidden" onClick={closeSheet} aria-hidden="true" />
      )}

      {/* Mobile bottom sheet */}
      <div
        ref={sheetRef}
        className={`fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-[var(--border-subtle)] rounded-t-[20px] transform transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-y-0" : "translate-y-full"
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        role="dialog"
        aria-modal="true"
        aria-label={t('navMenu')}
      >
        <div className="w-9 h-1 bg-[var(--mist)] rounded-full mx-auto mt-3 mb-2" aria-hidden="true" />
        <nav className="px-6 pb-8 pt-2 max-h-[70vh] overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              if ("dropdown" in item) {
                return (
                  <div key={item.key}>
                    <div className="py-3 text-[16px] font-medium border-b border-[var(--border-subtle)] font-serif">
                      <span className="text-[var(--text-70)] text-[13px] font-mono uppercase tracking-[0.14em]">{t(item.key)}</span>
                    </div>
                    <div className="ml-4 mt-1 mb-2">
                      {item.links.map((d: { href: string; key: string; descKey: string }) => (
                        <Link
                          key={d.href}
                          href={d.href}
                          onClick={closeSheet}
                          className="block py-3 text-[15px] font-medium border-b border-[var(--border-subtle)] font-serif"
                        >
                          {tp(d.key)}
                          <span className="block text-[12px] text-[var(--text-70)] font-normal">{tp(d.descKey)}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }
              const link = item as { href: string; key: string }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeSheet}
                  className={`py-4 text-[16px] font-medium border-b border-[var(--border-subtle)] transition-colors font-serif ${
                    isActive(link.href) ? "text-foreground" : "text-[var(--text-70)] hover:text-foreground"
                  }`}
                >
                  {t(link.key)}
                </Link>
              )
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-[var(--border-subtle)] flex items-center gap-3">
            <ThemeToggle className="shrink-0" />
            <Link href="/install" onClick={closeSheet} className="btn-primary w-full justify-center">
              {t('getStarted')}
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
