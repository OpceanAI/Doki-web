'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, ChevronRight } from 'lucide-react'
import { type SidebarCategory } from '@/lib/docs'
import { DocSearch } from '@/components/docs/search-dialog'
import { ThemeToggle } from '@/components/docs/theme-toggle'

export function DocsShell({
  sidebar,
  children,
}: {
  sidebar: SidebarCategory[]
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const slug = pathname.replace('/docs/', '')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <DocSearch open={searchOpen} onOpenChange={setSearchOpen} />

      <header className="sticky top-0 z-50 hairline-bottom bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-[var(--surface)] md:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link href="/docs/home" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-[var(--clay)] text-xs font-bold text-[var(--paper)]">
                D
              </div>
              <span className="text-sm font-medium text-foreground">Docs</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-md hairline-all px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:border-[var(--text-secondary)] transition-colors duration-150"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search docs...</span>
              <span className="hidden sm:inline text-[10px] hairline-all rounded px-1 py-0.5" style={{ background: 'color-mix(in srgb, var(--surface) 50%, transparent)' }}>⌘K</span>
            </button>
            <Link
              href="/"
              className="text-xs text-[var(--text-secondary)] hover:text-foreground transition-colors duration-150"
            >
              Home
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1440px]">
        <aside className={`fixed inset-y-14 left-0 z-40 w-64 hairline-right bg-background transition-transform duration-200 lg:sticky lg:block ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <nav className="h-full overflow-y-auto p-4" aria-label="Documentation navigation">
            {sidebar.map((cat) => (
              <div key={cat.category} className="mb-6">
                <h3 className="meta-label mb-2 px-2">
                  {cat.category}
                </h3>
                <ul className="flex flex-col gap-0.5">
                  {cat.pages.map((page) => {
                    const active = slug === page.slug || (slug === '' && page.slug === 'home')
                    return (
                      <li key={page.slug}>
                        <Link
                          href={`/docs/${page.slug}`}
                          className={`flex items-center h-8 px-2 text-sm rounded-md transition-colors duration-150 ${
                            active
                              ? 'bg-[var(--clay)]/10 text-[var(--clay)] font-medium'
                              : 'text-foreground/70 hover:bg-[var(--surface)] hover:text-foreground'
                          }`}
                        >
                          <span className="truncate min-w-0">{page.title}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <div className="flex-1 min-w-0">
          {mobileOpen && (
            <div
              className="fixed inset-0 z-30 bg-foreground/10 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
          )}
          <div className="px-4 py-8 md:px-10 md:py-12 lg:px-16">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}