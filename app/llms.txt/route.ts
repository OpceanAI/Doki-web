import { getSidebar } from '@/lib/docs'

export const dynamic = 'force-static'

export async function GET() {
  const sidebar = await getSidebar()
  const lines: string[] = []

  lines.push('# Doki Documentation')
  lines.push('> Container Engine for Android')
  lines.push(`> Last updated: ${new Date().toISOString().split('T')[0]}`)
  lines.push('')
  lines.push('## Overview')
  lines.push('')
  lines.push('Doki is a universal container engine that runs Docker-compatible containers')
  lines.push('on Android, Linux, and other platforms. Rootless by default. OCI-compliant.')
  lines.push('')
  lines.push('## Documentation')
  lines.push('')

  for (const cat of sidebar) {
    lines.push(`### ${cat.category}`)
    lines.push('')
    for (const page of cat.pages) {
      lines.push(`- [${page.title}](https://dok1.xyz/docs/${page.slug})`)
    }
    lines.push('')
  }

  lines.push('## Resources')
  lines.push('')
  lines.push('- [Homepage](https://dok1.xyz)')
  lines.push('- [GitHub](https://github.com/OpceanAI/Doki)')
  lines.push('- [Install](https://dok1.xyz/install)')
  lines.push('- [Changelog](https://dok1.xyz/changelog)')

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
