"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/docs/theme-toggle"

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#performance", label: "Performance" },
  { href: "#community", label: "Community" },
  { href: "/changelog", label: "Changelog" },
  { href: "/install", label: "Install" },
  { href: "/docs/home", label: "Docs" },
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
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const sheetRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)

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
      .filter((item) => item.href.startsWith("#"))
      .forEach((item) => {
        const el = document.querySelector(item.href)
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

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const deltaY = e.touches[0].clientY - touchStartY.current
    if (deltaY > 50) setMobileOpen(false)
  }, [])

  const closeSheet = useCallback(() => setMobileOpen(false), [])

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
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group tap-feedback"
            aria-label="Doki home"
          >
            <DokiLogo size={32} />
            <span className="font-sans font-semibold text-foreground text-[15px] tracking-[-0.01em]">
              Doki
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={`nav-link text-[13px] ${
                  activeSection === item.href.slice(1) ? "active" : ""
                }`}
              >
                {item.label}
                {item.external && (
                  <svg
                    className="inline w-3 h-3 ml-1 opacity-40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Link href="#install" className="btn-primary !py-2 !px-4 !text-[13px] tap-feedback">
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 -mr-2 tap-feedback"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`h-0.5 w-full bg-foreground transition-all duration-300 origin-center ${
                   mobileOpen ? "rotate-45 translate-y-[7px]" : ""
                 }`}
              />
              <span
                className={`h-0.5 w-full bg-foreground transition-all duration-300 ${
                   mobileOpen ? "opacity-0 scale-0" : ""
                 }`}
              />
              <span
                className={`h-0.5 w-full bg-foreground transition-all duration-300 origin-center ${
                   mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
                 }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/10 backdrop-blur-sm md:hidden"
          onClick={closeSheet}
          aria-hidden="true"
        />
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
        aria-label="Navigation menu"
      >
        <div className="w-9 h-1 bg-[var(--mist)] rounded-full mx-auto mt-3 mb-2" aria-hidden="true" />

        <nav className="px-6 pb-8 pt-2">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSheet}
                className={`py-4 text-[16px] font-medium border-b border-[var(--border-subtle)] transition-colors tap-feedback font-serif ${
                  activeSection === item.href.slice(1)
                    ? "text-foreground"
                    : "text-[var(--text-70)] hover:text-foreground"
                }`}
              >
                <span className="flex items-center justify-between">
                  {item.label}
                  {item.external && (
                    <svg className="w-4 h-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  )}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-[var(--border-subtle)] flex items-center gap-3">
            <ThemeToggle className="shrink-0" />
            <Link href="#install" onClick={closeSheet} className="btn-primary w-full justify-center tap-feedback">
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
