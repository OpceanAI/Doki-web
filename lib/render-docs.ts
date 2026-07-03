import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export async function renderMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  return String(result)
}

export function transformLinks(html: string): string {
  return html.replace(
    /href="([^"]+?)"/g,
    (match, href: string) => {
      if (href.startsWith('http') || href.startsWith('#') || href.startsWith('/')) {
        return match
      }
      const slug = href
        .replace(/\.md$/i, '')
        .replace(/\s+/g, '-')
        .toLowerCase()
      return `href="/docs/${slug}"`
    }
  )
}

export function renderCodeBlocks(html: string): string {
  return html.replace(
    /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
    (_, language: string, code: string) => {
      const escaped = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
      return `<div class="code-block group relative my-6 rounded-lg bg-[var(--ink)] overflow-hidden">
  <div class="flex items-center justify-between px-4 py-2 hairline-bottom" style="border-color: rgba(255,255,255,0.08)">
    <span class="text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-mono">${language}</span>
    <button data-copy="${encodeURIComponent(escaped)}" class="copy-btn text-xs text-[var(--text-secondary)] hover:text-[var(--paper)] transition-colors duration-150" aria-label="Copy code">Copy</button>
  </div>
  <div class="overflow-x-auto p-4">
    <pre class="text-sm leading-relaxed font-mono text-[var(--paper)]">${escaped}</pre>
  </div>
</div>`
    }
  )
}

export function renderInlineCode(html: string): string {
  return html.replace(
    /<code>([^<]+)<\/code>/g,
    '<code class="inline-code">$1</code>'
  )
}

export function renderTables(html: string): string {
  return html
    .replace(/<table>/g, '<div class="overflow-x-auto my-6"><table class="min-w-full border-collapse text-sm">')
    .replace(/<\/table>/g, '</table></div>')
    .replace(/<thead>/g, '<thead>')
    .replace(/<th>/g, '<th class="px-3 py-2 text-left font-medium text-foreground hairline-bottom">')
    .replace(/<td>/g, '<td class="px-3 py-2 hairline-bottom" style="border-color: var(--border-subtle)">')
}

export function renderBlockquotes(html: string): string {
  return html.replace(
    /<blockquote>/g,
    '<blockquote class="callout callout-note">'
  )
}