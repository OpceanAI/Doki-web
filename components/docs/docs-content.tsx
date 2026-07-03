'use client'

import { useEffect, useRef } from 'react'

export function DocsContentHtml({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.classList.contains('copy-btn')) {
        const encoded = target.getAttribute('data-copy')
        if (encoded) {
          const code = decodeURIComponent(encoded)
          navigator.clipboard.writeText(code).then(() => {
            target.textContent = 'Copied!'
            setTimeout(() => { target.textContent = 'Copy' }, 2000)
          })
        }
      }
    }

    el.addEventListener('click', handler)
    return () => el.removeEventListener('click', handler)
  }, [])

  return (
    <div
      ref={ref}
      className="docs-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
