import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from "next-intl"
import type { SidebarPage } from '@/lib/docs'

export function DocPrevNext({
  prev,
  next,
}: {
  prev: SidebarPage | null
  next: SidebarPage | null
}) {
  const t = useTranslations('docs')
  if (!prev && !next) return null

  return (
    <div className="mt-16 hairline-top pt-8 flex items-center justify-between">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-foreground transition-colors duration-150"
        >
          <ChevronLeft className="h-4 w-4" />
          <div className="flex flex-col">
            <span className="text-xs text-[var(--text-tertiary)]">{t('previous')}</span>
            <span className="font-medium">{prev.title}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-foreground transition-colors duration-150 text-right"
        >
          <div className="flex flex-col">
            <span className="text-xs text-[var(--text-tertiary)]">{t('next')}</span>
            <span className="font-medium">{next.title}</span>
          </div>
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}