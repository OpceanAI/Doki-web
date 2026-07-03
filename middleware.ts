import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') || ''
  const isCli = /curl|wget/i.test(ua)

  if (isCli && request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/doki.sh', request.url))
  }
}

export const config = {
  matcher: '/',
}
