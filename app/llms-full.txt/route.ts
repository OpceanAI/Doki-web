import { promises as fs } from 'fs'
import path from 'path'
import { getSidebar } from '@/lib/docs'

export const dynamic = 'force-static'

export async function GET() {
  const sidebar = await getSidebar()
  const lines: string[] = []

  lines.push('# Doki Documentation — Full Content')
  lines.push('> Container Engine for Android')
  lines.push('')
  lines.push('This file contains the complete documentation content for Doki.')
  lines.push('It is intended to be consumed by AI agents (Claude Code, etc.)')
  lines.push('')
  lines.push('---')
  lines.push('')

  const DOCS_DIR = path.join(process.cwd(), 'content/docs')

  for (const cat of sidebar) {
    lines.push(`# ${cat.category}`)
    lines.push('')

    for (const page of cat.pages) {
      try {
        const raw = await fs.readFile(path.join(DOCS_DIR, `${page.slug}.md`), 'utf-8')
        const content = raw.replace(/^---[\s\S]*?---\n/, '').trim()
        lines.push(`## ${page.title}`)
        lines.push('')
        lines.push(content)
        lines.push('')
        lines.push('---')
        lines.push('')
      } catch {
        
      }
    }
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
