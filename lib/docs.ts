import { promises as fs } from 'fs'
import path from 'path'

export interface SidebarPage {
  slug: string
  title: string
}

export interface SidebarCategory {
  category: string
  pages: SidebarPage[]
}

export interface DocFrontmatter {
  title: string
  description: string
  category: string
  order: number
}

export interface DocPage {
  slug: string
  frontmatter: DocFrontmatter
  content: string
}

const DOCS_DIR = path.join(process.cwd(), 'content/docs')

export async function getSidebar(locale = 'en'): Promise<SidebarCategory[]> {
  const localePath = locale !== 'en' ? path.join(DOCS_DIR, locale, '_sidebar.json') : ''
  const defaultPath = path.join(DOCS_DIR, '_sidebar.json')

  try {
    if (localePath) {
      const raw = await fs.readFile(localePath, 'utf-8')
      return JSON.parse(raw)
    }
  } catch {}

  const raw = await fs.readFile(defaultPath, 'utf-8')
  return JSON.parse(raw)
}

export async function getDocPage(slug: string, locale = 'en'): Promise<DocPage | null> {
  const localePath = locale !== 'en' ? path.join(DOCS_DIR, locale, `${slug}.md`) : ''
  const defaultPath = path.join(DOCS_DIR, `${slug}.md`)

  try {
    if (localePath) {
      const raw = await fs.readFile(localePath, 'utf-8')
      return parseDocFile(slug, raw)
    }
  } catch {}

  try {
    const raw = await fs.readFile(defaultPath, 'utf-8')
    return parseDocFile(slug, raw)
  } catch {
    return null
  }
}

export async function getAllDocSlugs(locale = 'en'): Promise<string[]> {
  const sidebar = await getSidebar(locale)
  return sidebar.flatMap(cat => cat.pages.map(p => p.slug))
}

export async function getAllDocs(locale = 'en'): Promise<DocPage[]> {
  const slugs = await getAllDocSlugs(locale)
  const docs: DocPage[] = []
  for (const slug of slugs) {
    const doc = await getDocPage(slug, locale)
    if (doc) docs.push(doc)
  }
  return docs
}

function parseDocFile(slug: string, raw: string): DocPage {
  const frontmatter: DocFrontmatter = {
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    description: '',
    category: 'Reference',
    order: 99,
  }

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
          else if (key === 'category') frontmatter.category = value
          else if (key === 'order') frontmatter.order = parseInt(value, 10) || 99
        }
      }
    }
  }

  return { slug, frontmatter, content }
}

export function getPrevNext(slug: string, sidebar: SidebarCategory[]): { prev: SidebarPage | null; next: SidebarPage | null } {
  const allPages = sidebar.flatMap(cat => cat.pages)
  const index = allPages.findIndex(p => p.slug === slug)
  return {
    prev: index > 0 ? allPages[index - 1] : null,
    next: index < allPages.length - 1 ? allPages[index + 1] : null,
  }
}

export function getCategoryForSlug(slug: string, sidebar: SidebarCategory[]): SidebarCategory | undefined {
  return sidebar.find(cat => cat.pages.some(p => p.slug === slug))
}

export function generateSearchIndex(docs: DocPage[]): SearchEntry[] {
  return docs.map(doc => ({
    slug: doc.slug,
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    category: doc.frontmatter.category,
    content: doc.content.replace(/[#*`\[\]]/g, '').slice(0, 500),
  }))
}

export interface SearchEntry {
  slug: string
  title: string
  description: string
  category: string
  content: string
}
