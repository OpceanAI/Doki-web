import type { MetadataRoute } from 'next'
import { getSidebar } from '@/lib/docs'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sidebar = await getSidebar()
  const docSlugs = sidebar.flatMap(cat => cat.pages.map(p => p.slug))

  const docs = docSlugs.map(slug => ({
    url: `https://dok1.xyz/docs/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    { url: 'https://dok1.xyz', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://dok1.xyz/changelog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://dok1.xyz/install', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://dok1.xyz/docs/home', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...docs.filter(s => s.url !== 'https://dok1.xyz/docs/home'),
  ]
}
