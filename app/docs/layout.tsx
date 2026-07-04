import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { getSidebar } from '@/lib/docs'
import { DocsShell } from './docs-shell'

export const metadata: Metadata = {
  title: {
    template: '%s — Doki Docs',
    default: 'Documentation — Doki',
  },
  description: 'Doki documentation: container engine for Android',
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const sidebar = await getSidebar(locale)
  return <DocsShell sidebar={sidebar}>{children}</DocsShell>
}
