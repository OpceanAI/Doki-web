'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from "next-intl"

interface Heading {
  id: string
  text: string
  level: number
}

export function DocToc({ headings }: { headings: Heading[] }) {
  const t = useTranslations('docs')
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px' }
    )
    for (const { id } of headings) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <div>
      <h4 className="meta-label mb-3">
        {t('onThisPage')}
      </h4>
      <nav className="space-y-1">
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={`block text-xs leading-relaxed transition-colors duration-150 border-l-2 py-1 ${
              activeId === h.id
                ? 'text-[var(--clay)] font-medium border-[var(--clay)]'
                : 'text-[var(--text-secondary)] border-transparent hover:text-foreground hover:border-[var(--text-secondary)]'
            } ${h.level === 3 ? 'pl-5' : h.level === 4 ? 'pl-7' : 'pl-3'}`}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </div>
  )
}