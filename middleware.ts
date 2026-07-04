import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') || ''
  const isCli = /curl|wget/i.test(ua)

  if (isCli && request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/doki.sh', request.url))
  }

  const response = intlMiddleware(request)

  const localeFromCookie = request.cookies.get('NEXT_LOCALE')?.value
  if (localeFromCookie && routing.locales.includes(localeFromCookie as any)) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('X-NEXT-INTL-LOCALE', localeFromCookie)
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
