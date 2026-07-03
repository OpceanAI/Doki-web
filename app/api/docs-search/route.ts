import { NextResponse } from 'next/server'
import { getAllDocs, generateSearchIndex } from '@/lib/docs'

export const dynamic = 'force-static'

export async function GET() {
  const docs = await getAllDocs()
  const index = generateSearchIndex(docs)
  return NextResponse.json(index)
}
