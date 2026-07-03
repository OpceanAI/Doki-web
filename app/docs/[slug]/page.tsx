import { promises as fs } from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { getSidebar, getPrevNext } from '@/lib/docs'
import { DocsContentHtml } from '@/components/docs/docs-content'
import { renderMarkdown, transformLinks, renderCodeBlocks, renderInlineCode, renderTables, renderBlockquotes } from '@/lib/render-docs'
import { DocBreadcrumb } from '@/components/docs/breadcrumb'
import { DocToc } from '@/components/docs/toc'
import { DocPrevNext } from '@/components/docs/prev-next'
import { DocPageActions } from '@/components/docs/page-actions'

interface Props {
  params: Promise<{ slug: string }>
}

interface DocData {
  frontmatter: {
    title: string
    description: string
  }
  raw: string
}

function parseFrontmatter(raw: string): DocData {
  const frontmatter = { title: '', description: '' }
  let content = raw
  if (raw.startsWith('---')) {
    const endIndex = raw.indexOf('---', 3)
    if (endIndex !== -1) {
      const fmRaw = raw.slice(3, endIndex).trim()
      content = raw.slice(endIndex + 3).trim()
      for (const line of fmRaw.split('\n')) {
        const colonIndex = line.indexOf(':')
        if (colonIndex !== -1) {
          const key = line.slice(0, colonIndex).trim()
          const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '')
          if (key === 'title') frontmatter.title = value
          else if (key === 'description') frontmatter.description = value
        }
      }
    }
  }
  if (!frontmatter.title) {
    const firstH1 = content.match(/^#\s+(.+)$/m)
    frontmatter.title = firstH1 ? firstH1[1].trim() : 'Untitled'
  }
  return { frontmatter, raw }
}

export async function generateStaticParams() {
  const sidebar = await getSidebar()
  return sidebar.flatMap(cat => cat.pages.map(p => ({ slug: p.slug })))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), 'content/docs', `${slug}.md`)
  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    const { frontmatter } = parseFrontmatter(raw)
    return {
      title: frontmatter.title,
      description: frontmatter.description || `Doki documentation: ${frontmatter.title}`,
    }
  } catch {
    return {}
  }
}

function extractMarkdownHeadings(raw: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = []
  const content = raw.replace(/^---[\s\S]*?---\n/, '')
  const regex = /^(#{2,4})\s+(.+)$/gm
  let match
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].replace(/[`*_]/g, '').trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
    headings.push({ id, text, level })
  }
  return headings
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), 'content/docs', `${slug}.md`)
  let raw: string
  try {
    raw = await fs.readFile(filePath, 'utf-8')
  } catch {
    notFound()
  }

  const { frontmatter } = parseFrontmatter(raw)
  const content = raw.replace(/^---[\s\S]*?---\n/, '')

  let html = await renderMarkdown(content)
  html = transformLinks(html)
  html = renderCodeBlocks(html)
  html = renderInlineCode(html)
  html = renderTables(html)
  html = renderBlockquotes(html)

  const sidebar = await getSidebar()
  const prevNext = getPrevNext(slug, sidebar)
  const headings = extractMarkdownHeadings(raw)

  const cat = sidebar.find(c => c.pages.some(p => p.slug === slug))
  const pageTitle = cat?.pages.find(p => p.slug === slug)?.title || null

  return (
    <div className="flex gap-12">
      <article className="flex-1 min-w-0 prose-container">
        <DocBreadcrumb
          category={cat?.category || null}
          pageTitle={pageTitle}
          categoryFirstSlug={cat?.pages[0]?.slug || null}
        />
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              {frontmatter.title}
            </h1>
            {frontmatter.description && (
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{frontmatter.description}</p>
            )}
          </div>
          <DocPageActions slug={slug} />
        </div>
        <DocsContentHtml html={html} />
        <DocPrevNext prev={prevNext.prev} next={prevNext.next} />
      </article>
      {headings.length > 0 && (
        <aside className="hidden xl:block w-56 shrink-0 self-start sticky top-20 pt-8 pb-8">
          <DocToc headings={headings} />
        </aside>
      )}
    </div>
  )
}