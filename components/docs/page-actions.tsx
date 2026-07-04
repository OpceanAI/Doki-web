'use client'

import { useState } from 'react'
import { useTranslations } from "next-intl"
import { Copy, Check, ExternalLink } from 'lucide-react'

function getWikiFilename(slug: string): string {
  const parts = slug.split('/')
  return parts[parts.length - 1] + '.md'
}

export function DocPageActions({ slug }: { slug: string }) {
  const t = useTranslations('docs')
  const [copiedPage, setCopiedPage] = useState(false)
  const [copiedMd, setCopiedMd] = useState(false)

  const handleCopyPage = async () => {
    const content = document.querySelector('.docs-content')
    if (!content) return
    const text = content.textContent || ''
    await navigator.clipboard.writeText(text)
    setCopiedPage(true)
    setTimeout(() => setCopiedPage(false), 2000)
  }

  const handleCopyMarkdown = async () => {
    try {
      const res = await fetch(`/api/docs-raw?slug=${slug}`)
      const data = await res.json()
      await navigator.clipboard.writeText(data.content)
      setCopiedMd(true)
      setTimeout(() => setCopiedMd(false), 2000)
    } catch {
      
    }
  }

  return (
    <div className="flex items-center gap-1 shrink-0">
      <button
        onClick={handleCopyPage}
        className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-foreground transition-colors duration-150"
        aria-label="Copy page content"
      >
        {copiedPage ? <Check className="h-3.5 w-3.5 text-[var(--green)]" /> : <Copy className="h-3.5 w-3.5" />}
        <span className="hidden sm:inline">{copiedPage ? t('copied') : t('copyPage')}</span>
      </button>
      <button
        onClick={handleCopyMarkdown}
        className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-foreground transition-colors duration-150"
        aria-label="Copy as Markdown"
      >
        {copiedMd ? <Check className="h-3.5 w-3.5 text-[var(--green)]" /> : <Copy className="h-3.5 w-3.5" />}
        <span className="hidden sm:inline">{copiedMd ? t('copied') : t('copyMd')}</span>
      </button>
      <a
        href={`https://github.com/OpceanAI/doki-wiki/blob/main/${getWikiFilename(slug)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-foreground transition-colors duration-150"
        aria-label="Edit this page on GitHub"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{t('editOnGitHub')}</span>
      </a>
    </div>
  )
}