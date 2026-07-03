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
      return `<div class="code-block group relative my-4 rounded-lg bg-[var(--ink)] overflow-hidden">
  <div class="flex items-center justify-between px-4 py-2 border-b border-white/10">
    <span class="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-mono">${language}</span>
    <button data-copy="${encodeURIComponent(escaped)}" class="copy-btn text-xs text-[var(--text-secondary)] hover:text-[var(--paper)] transition-colors duration-150" aria-label="Copy code">Copy</button>
  </div>
  <div class="overflow-x-auto p-4">
    <pre class="text-sm leading-relaxed"><code class="text-[var(--paper)] font-mono">${escaped}</code></pre>
  </div>
</div>`
    }
  )
}

export function renderInlineCode(html: string): string {
  return html.replace(
    /<code>([^<]+)<\/code>/g,
    '<code class="rounded bg-[var(--surface)] px-1.5 py-0.5 text-sm font-mono text-[var(--text)]">$1</code>'
  )
}

export function renderTables(html: string): string {
  return html
    .replace(/<table>/g, '<div class="overflow-x-auto my-4"><table class="min-w-full border-collapse text-sm">')
    .replace(/<\/table>/g, '</table></div>')
    .replace(/<thead>/g, '<thead class="border-b border-[var(--border-subtle)]">')
    .replace(/<th>/g, '<th class="px-3 py-2 text-left font-medium text-[var(--text)]">')
    .replace(/<td>/g, '<td class="px-3 py-2 border-b border-[var(--border-subtle)] text-[var(--text-80)]">')
}

export function renderBlockquotes(html: string): string {
  return html.replace(
    /<blockquote>/g,
    '<blockquote class="border-l-4 border-[var(--clay)] pl-4 italic text-[var(--text-70)] my-4">'
  )
}
