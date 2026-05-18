"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#performance", label: "Performance" },
  { href: "#community", label: "Community" },
  { href: "https://github.com/OpceanAI/Doki/wiki", label: "Docs", external: true },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const sheetRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Active section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
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

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [mobileOpen])

  // Touch handling for bottom sheet
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const deltaY = e.touches[0].clientY - touchStartY.current
    if (deltaY > 50) {
      setMobileOpen(false)
    }
  }, [])

  const closeSheet = useCallback(() => setMobileOpen(false), [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--bg-000)]/80 backdrop-blur-xl border-b border-[var(--border-100)] shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <nav className="max-w-[var(--max-width)] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group tap-feedback" aria-label="Doki home">
            <div className="w-7 h-7 rounded-md bg-[var(--text-100)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <span className="font-display font-bold text-sm text-black">D</span>
            </div>
            <span className="font-medium text-[var(--text-100)]">Doki</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={`nav-link px-3 py-2 text-sm transition-colors ${
                  activeSection === item.href.slice(1)
                    ? "text-[var(--text-100)] active"
                    : "text-[var(--text-400)] hover:text-[var(--text-100)]"
                }`}
              >
                {item.label}
                {item.external && (
                  <svg className="inline w-3 h-3 ml-1 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="https://github.com/OpceanAI/Doki"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-400)] hover:text-[var(--text-100)] transition-colors tap-feedback"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </Link>
            <Link
              href="#install"
              className="px-4 py-2 text-sm font-medium text-black bg-[var(--text-100)] rounded-lg hover:bg-[var(--text-200)] transition-colors tap-feedback"
            >
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
              <span className={`h-0.5 w-full bg-[var(--text-100)] transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`h-0.5 w-full bg-[var(--text-100)] transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""}`} />
              <span className={`h-0.5 w-full bg-[var(--text-100)] transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={closeSheet}
          aria-hidden="true"
        />
      )}

      {/* Mobile bottom sheet */}
      <div
        ref={sheetRef}
        className={`bottom-sheet md:hidden ${mobileOpen ? "open" : ""}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="bottom-sheet-handle" aria-hidden="true" />
        
        <nav className="px-6 pb-8 pt-2">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSheet}
                className={`py-4 text-lg font-medium border-b border-[var(--border-100)] transition-colors tap-feedback ${
                  activeSection === item.href.slice(1)
                    ? "text-[var(--text-100)]"
                    : "text-[var(--text-300)] hover:text-[var(--text-100)]"
                }`}
              >
                <span className="flex items-center justify-between">
                  {item.label}
                  {item.external && (
                    <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  )}
                </span>
              </Link>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-[var(--border-100)] flex flex-col gap-3">
            <Link
              href="https://github.com/OpceanAI/Doki"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeSheet}
              className="btn-secondary w-full justify-center tap-feedback"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </Link>
            <Link href="#install" onClick={closeSheet} className="btn-primary w-full justify-center tap-feedback">
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
