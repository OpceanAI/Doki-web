import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
  }

  try {
    const filePath = path.join(process.cwd(), 'content/docs', `${slug}.md`)
    const raw = await fs.readFile(filePath, 'utf-8')
    const content = raw.replace(/^---[\s\S]*?---\n/, '').trim()
    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
