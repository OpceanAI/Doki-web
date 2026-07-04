import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routing } from './i18n/routing'

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') || ''
  const isCli = /curl|wget/i.test(ua)

  if (isCli && request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/doki.sh', request.url))
  }

  // Validate and set locale cookie from Accept-Language if not already set
  const existingLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (!existingLocale || !routing.locales.includes(existingLocale as (typeof routing.locales)[number])) {
    const acceptLanguage = request.headers.get('accept-language') ?? ''
    const preferred = acceptLanguage
      .split(',')
      .map((s) => s.split(';')[0].trim().slice(0, 2))
      .find((lang) => routing.locales.includes(lang as (typeof routing.locales)[number]))

    const locale = preferred ?? routing.defaultLocale
    const response = NextResponse.next()
    response.cookies.set('NEXT_LOCALE', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
