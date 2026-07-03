'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

export function DocToc({ headings }: { headings: Heading[] }) {
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
      <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--mist)] mb-3">
        On this page
      </h4>
      <nav className="space-y-1">
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={`block text-xs leading-relaxed transition-colors duration-150 ${
              h.level === 3 ? 'pl-3' : ''
            } ${
              activeId === h.id
                ? 'text-[var(--clay)] font-medium'
                : 'text-[var(--mist)] hover:text-foreground'
            }`}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </div>
  )
}
