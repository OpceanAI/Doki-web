# Guía Completa de Remediación de Vulnerabilidades

## Paso 1: Actualizar Dependencias Vulnerables

### 1.1 Actualizar React y Next.js

```bash
# Actualizar React 19 a versión 19.2.6+
npm install react@latest react-dom@latest

# Actualizar Next.js a 16.3.0+ (cuando esté disponible)
npm install next@latest

# Actualizar next-intl para parches de seguridad
npm install next-intl@^4.9.2

# Arreglar vulnerabilidad PostCSS
npm audit fix

# Instalar Tailwind CSS actualizado
npm install tailwindcss@4.3.0 @tailwindcss/postcss@latest
```

### 1.2 Verificar que todo está actualizado

```bash
npm audit
# Debería mostrar: "0 vulnerabilities"
```

---

## Paso 2: Implementar Sanitización HTML (CRÍTICO)

### 2.1 Instalar DOMPurify

```bash
npm install isomorphic-dompurify
npm install --save-dev @types/dompurify
```

### 2.2 Actualizar `/components/docs/docs-content.tsx`

**ANTES (Vulnerable):**
```typescript
'use client'

import { useEffect, useRef } from 'react'

export function DocsContentHtml({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.classList.contains('copy-btn')) {
        const encoded = target.getAttribute('data-copy')
        if (encoded) {
          const code = decodeURIComponent(encoded)
          navigator.clipboard.writeText(code).then(() => {
            target.textContent = 'Copied!'
            setTimeout(() => { target.textContent = 'Copy' }, 2000)
          })
        }
      }
    }

    el.addEventListener('click', handler)
    return () => el.removeEventListener('click', handler)
  }, [])

  return (
    <div
      ref={ref}
      className="docs-content"
      dangerouslySetInnerHTML={{ __html: html }}  // ❌ SIN SANITIZACIÓN
    />
  )
}
```

**DESPUÉS (Seguro):**
```typescript
'use client'

import { useEffect, useRef, useMemo } from 'react'
import DOMPurify from 'isomorphic-dompurify'

export function DocsContentHtml({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null)
  
  // Sanitizar HTML una sola vez (memoizado)
  const sanitizedHtml = useMemo(() => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'h2', 'h3', 'h4', 'p', 'br', 'strong', 'em', 'u', 'a', 'img',
        'ul', 'ol', 'li', 'code', 'pre', 'blockquote', 'hr', 'table',
        'thead', 'tbody', 'tr', 'th', 'td', 'div', 'span', 'small', 'kbd'
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'data-copy', 'id'],
      ALLOW_DATA_ATTR: true,
      KEEP_CONTENT: true,
    })
  }, [html])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.classList.contains('copy-btn')) {
        const encoded = target.getAttribute('data-copy')
        if (encoded) {
          try {
            const code = decodeURIComponent(encoded)
            navigator.clipboard.writeText(code).then(() => {
              target.textContent = 'Copied!'
              setTimeout(() => { target.textContent = 'Copy' }, 2000)
            })
          } catch (error) {
            console.error('Failed to copy:', error)
            target.textContent = 'Error'
          }
        }
      }
    }

    el.addEventListener('click', handler)
    return () => el.removeEventListener('click', handler)
  }, [])

  return (
    <div
      ref={ref}
      className="docs-content"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}  // ✓ SANITIZADO
    />
  )
}
```

---

## Paso 3: Corregir Render Markdown (CRÍTICO)

### 3.1 Actualizar `/lib/render-docs.ts`

**ANTES (Vulnerable):**
```typescript
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
    .use(remarkRehype, { allowDangerousHtml: true })  // ❌ PELIGROSO
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeStringify, { allowDangerousHtml: true })  // ❌ PELIGROSO
    .process(content)

  return String(result)
}
```

**DESPUÉS (Seguro):**
```typescript
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'

const MAX_CONTENT_SIZE = 5 * 1024 * 1024 // 5MB

export async function renderMarkdown(content: string): Promise<string> {
  // Validar tamaño
  if (content.length > MAX_CONTENT_SIZE) {
    throw new Error(`Content exceeds maximum size of ${MAX_CONTENT_SIZE} bytes`)
  }

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { 
      allowDangerousHtml: false  // ✓ SEGURO - Sin HTML sin procesar
    })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeHighlight, { detect: true, aliases: { text: [] } })
    .use(rehypeStringify, { 
      allowDangerousHtml: false  // ✓ SEGURO
    })
    .process(content)

  return String(result)
}
```

---

## Paso 4: Corregir Manejo de Cookies (ALTA PRIORIDAD)

### 4.1 Actualizar `/lib/cookies.ts` - Usar para client-side solo

**ANTES:**
```typescript
export function setCookie(name: string, value: string, options: { path?: string; maxAge?: number } = {}) {
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
  if (options.path) cookie += `; path=${options.path}`
  if (options.maxAge) cookie += `; max-age=${options.maxAge}`
  document.cookie = cookie
}
```

**DESPUÉS (Usar solo para non-sensitive data):**
```typescript
export function setCookie(
  name: string, 
  value: string, 
  options: { 
    path?: string
    maxAge?: number
    sameSite?: 'strict' | 'lax' | 'none'
    secure?: boolean
  } = {}
) {
  // Validar inputs
  if (!name || name.length === 0) {
    console.error('Invalid cookie name')
    return
  }

  if (name.includes('LOCALE')) {
    // Para NEXT_LOCALE, dejar que middleware lo maneje
    console.warn('Use middleware to set NEXT_LOCALE')
    return
  }

  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
  
  if (options.path) {
    cookie += `; path=${options.path}`
  }
  if (options.maxAge) {
    cookie += `; max-age=${options.maxAge}`
  }
  if (options.sameSite) {
    cookie += `; SameSite=${options.sameSite}`
  }
  if (options.secure) {
    cookie += '; Secure'
  }

  document.cookie = cookie
}
```

### 4.2 Crear `/middleware.ts` mejorado (CRÍTICO)

**ACTUALIZAR middleware.ts:**
```typescript
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

  // ✓ SEGURO: Establecer NEXT_LOCALE desde middleware
  const localeFromCookie = request.cookies.get('NEXT_LOCALE')?.value
  if (localeFromCookie && routing.locales.includes(localeFromCookie as any)) {
    // Validar locale
    const validLocales = routing.locales
    if (validLocales.includes(localeFromCookie as any)) {
      response.cookies.set('NEXT_LOCALE', localeFromCookie, {
        path: '/',
        maxAge: 31536000, // 1 año
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        // httpOnly: true // No se puede usar aquí para Next.js cookie API
      })
    }
  }

  // ✓ Agregar security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
```

### 4.3 Actualizar Language Switcher

**ANTES:**
```typescript
const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const newLocale = e.target.value
  startTransition(() => {
    setCookie("NEXT_LOCALE", newLocale, { path: "/", maxAge: 31536000 })
    window.location.reload()
  })
}
```

**DESPUÉS:**
```typescript
const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const newLocale = e.target.value
  
  // ✓ Validar que es un locale permitido
  if (!locales.some(l => l.code === newLocale)) {
    console.error('Invalid locale:', newLocale)
    return
  }

  startTransition(() => {
    // Usar router.push en lugar de reload si es posible
    // Pero por ahora, setear cookie y recargar
    setCookie("NEXT_LOCALE", newLocale, { 
      path: "/", 
      maxAge: 31536000,
      sameSite: 'strict'
    })
    // Esperar un poco para que la cookie se establezca
    setTimeout(() => {
      window.location.reload()
    }, 100)
  })
}
```

---

## Paso 5: Proteger API de Newsletter (ALTA PRIORIDAD)

### 5.1 Instalar Upstash para Rate Limiting

```bash
npm install @upstash/ratelimit @upstash/redis
```

### 5.2 Crear variables de entorno

```env
# .env.local
UPSTASH_REDIS_REST_URL=your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
RESEND_API_KEY=your-resend-key
NEWSLETTER_AUDIENCE_ID=your-audience-id
ALLOWED_ORIGIN=https://dok1.xyz
```

### 5.3 Actualizar `/app/api/newsletter/route.ts`

**ANTES:**
```typescript
import { NextResponse } from "next/server"
import { z } from "zod"

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = emailSchema.parse(body)

    const apiKey = process.env.RESEND_API_KEY
    const audienceId = process.env.NEWSLETTER_AUDIENCE_ID

    if (!apiKey || !audienceId) {
      return NextResponse.json(
        { error: "Newsletter service not configured" },
        { status: 503 }
      )
    }

    const res = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        audience_id: audienceId,
      }),
    })

    if (!res.ok) {
      const error = await res.json()
      if (error.statusCode === 400 && error.message?.includes("already")) {
        return NextResponse.json({ success: true, message: "Already subscribed" })
      }
      return NextResponse.json(
        { error: "Failed to subscribe" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
```

**DESPUÉS (Seguro):**
```typescript
import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// Configurar rate limiting
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 h"), // 5 emails por hora por IP
})

// Lista de dominios desechables (simplificada)
const DISPOSABLE_DOMAINS = new Set([
  'tempmail.com', 'maildrop.cc', 'throwaway.email'
])

const emailSchema = z.object({
  email: z.string()
    .email("Invalid email address")
    .max(254, "Email too long")
    .refine(
      (email) => {
        const domain = email.split('@')[1]
        return !DISPOSABLE_DOMAINS.has(domain)
      },
      "Disposable email addresses not allowed"
    ),
  // Honeypot: campo que los bots llenarán pero los usuarios no
  website: z.string().max(0).optional(),
})

export async function POST(request: NextRequest) {
  try {
    // ✓ Validar origin/referer (CSRF)
    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')
    const allowedOrigin = process.env.ALLOWED_ORIGIN || 'https://dok1.xyz'
    
    if (origin && !origin.includes(allowedOrigin)) {
      console.warn(`CORS violation: ${origin}`)
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    // ✓ Rate limiting por IP
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    const { success } = await ratelimit.limit(ip)
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { 
          status: 429,
          headers: {
            'Retry-After': '3600'
          }
        }
      )
    }

    // ✓ Parsear y validar body
    const body = await request.json()
    const { email, website } = emailSchema.parse(body)

    // ✓ Honeypot check
    if (website && website.length > 0) {
      // Bot detectado, pero responder con éxito falso
      console.warn('Honeypot triggered')
      return NextResponse.json({ success: true })
    }

    const apiKey = process.env.RESEND_API_KEY
    const audienceId = process.env.NEWSLETTER_AUDIENCE_ID

    if (!apiKey || !audienceId) {
      console.error('Newsletter service not configured')
      return NextResponse.json(
        { error: "Newsletter service not configured" },
        { status: 503 }
      )
    }

    // ✓ Llamar a Resend con timeout
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    const res = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        audience_id: audienceId,
      }),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!res.ok) {
      const error = await res.json()
      
      // ✓ Manejo específico de errores
      if (error.statusCode === 400 && error.message?.includes("already")) {
        return NextResponse.json(
          { success: true, message: "Already subscribed" },
          { status: 200 }
        )
      }

      if (error.statusCode === 429) {
        // Resend rate limit
        return NextResponse.json(
          { error: "Service temporarily unavailable" },
          { status: 503 }
        )
      }

      console.error('Resend API error:', error)
      return NextResponse.json(
        { error: "Failed to subscribe" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    // ✓ Mejor manejo de errores
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    if (error instanceof TypeError && error.message.includes('aborted')) {
      return NextResponse.json(
        { error: "Request timeout" },
        { status: 504 }
      )
    }

    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// ✓ Rechazar otros métodos
export function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { 
      status: 405,
      headers: { 'Allow': 'POST' }
    }
  )
}

export function HEAD() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { 
      status: 405,
      headers: { 'Allow': 'POST' }
    }
  )
}
```

---

## Paso 6: Agregar Security Headers (RECOMENDADO)

### 6.1 Crear o actualizar `next.config.ts`

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.resend.com https://*.upstash.io; frame-ancestors 'none';",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
```

---

## Paso 7: Validar Paths en Docs

### 7.1 Actualizar `/lib/docs.ts`

```typescript
import { promises as fs } from 'fs'
import path from 'path'

// ✓ Validar que slug solo contiene caracteres seguros
const SAFE_SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function validateSlug(slug: string): boolean {
  return SAFE_SLUG_REGEX.test(slug) && slug.length < 100
}

const DOCS_DIR = path.join(process.cwd(), 'content/docs')

export async function getDocPage(slug: string, locale = 'en'): Promise<DocPage | null> {
  // ✓ Validar slug primero
  if (!validateSlug(slug)) {
    console.warn(`Invalid slug format: ${slug}`)
    return null
  }

  const localePath = locale !== 'en' ? path.join(DOCS_DIR, locale, `${slug}.md`) : ''
  const defaultPath = path.join(DOCS_DIR, `${slug}.md`)

  // ✓ Normalizar y validar path traversal
  const resolvePath = (filePath: string) => {
    const normalized = path.normalize(filePath)
    const resolved = path.resolve(normalized)
    
    // Verificar que el path resuelto está dentro de DOCS_DIR
    if (!resolved.startsWith(DOCS_DIR)) {
      throw new Error('Path traversal attempt detected')
    }
    
    return normalized
  }

  try {
    if (localePath && validateSlug(slug)) {
      const safePath = resolvePath(localePath)
      const raw = await fs.readFile(safePath, 'utf-8')
      return parseDocFile(slug, raw)
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('Path traversal')) {
      console.error('Security: Path traversal detected')
      return null
    }
    // Continuar con default
  }

  try {
    const safePath = resolvePath(defaultPath)
    const raw = await fs.readFile(safePath, 'utf-8')
    return parseDocFile(slug, raw)
  } catch (error) {
    console.error(`Failed to read doc ${slug}:`, error)
    return null
  }
}

// ... resto del código
```

---

## Paso 8: Mejorar Manejo de Errores

### 8.1 Crear `/lib/errors.ts`

```typescript
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: Record<string, any>
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super('VALIDATION_ERROR', message, 400, details)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Not found') {
    super('NOT_FOUND', message, 404)
    this.name = 'NotFoundError'
  }
}

export class SecurityError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super('SECURITY_ERROR', message, 403, details)
    this.name = 'SecurityError'
  }
}

export function logError(error: Error, context?: Record<string, any>) {
  if (process.env.NODE_ENV === 'production') {
    // Enviar a servicio de logging (Sentry, etc.)
    console.error({
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
    })
  } else {
    console.error(error, context)
  }
}
```

---

## Paso 9: Testing de Seguridad

### 9.1 Crear tests básicos

```typescript
// __tests__/security.test.ts

import { validateSlug } from '@/lib/docs'
import DOMPurify from 'isomorphic-dompurify'

describe('Security Tests', () => {
  describe('Path Validation', () => {
    it('accepts valid slugs', () => {
      expect(validateSlug('quick-start')).toBe(true)
      expect(validateSlug('cli-reference')).toBe(true)
    })

    it('rejects path traversal attempts', () => {
      expect(validateSlug('../../etc/passwd')).toBe(false)
      expect(validateSlug('../admin')).toBe(false)
      expect(validateSlug('..\\admin')).toBe(false)
    })

    it('rejects invalid characters', () => {
      expect(validateSlug('test<script>')).toBe(false)
      expect(validateSlug('test;rm -rf')).toBe(false)
    })
  })

  describe('HTML Sanitization', () => {
    it('removes script tags', () => {
      const dirty = '<p>Hello<script>alert("xss")</script></p>'
      const clean = DOMPurify.sanitize(dirty)
      expect(clean).not.toContain('<script>')
    })

    it('preserves safe HTML', () => {
      const safe = '<p>Hello <strong>world</strong></p>'
      const clean = DOMPurify.sanitize(safe)
      expect(clean).toContain('<strong>')
    })
  })
})
```

---

## Checklist Final

- [ ] `npm audit` muestra 0 vulnerabilidades
- [ ] React actualizado a 19.2.6+
- [ ] Next.js actualizado a 16.3.0+ (cuando esté disponible)
- [ ] next-intl actualizado a 4.9.2+
- [ ] DOMPurify instalado y usado en docs-content.tsx
- [ ] render-docs.ts sin `allowDangerousHtml`
- [ ] middleware.ts configurado correctamente para cookies
- [ ] language-switcher.tsx validando locales
- [ ] API newsletter con rate limiting y CORS
- [ ] Security headers agregados
- [ ] Slugs validados con regex
- [ ] Errores manejados correctamente
- [ ] Tests de seguridad ejecutándose

---

## Referencias

- [OWASP Top 10 2021](https://owasp.org/Top10/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/routing/middleware#security)
- [React Security](https://react.dev/reference/react-dom/dangerouslySetInnerHTML)
- [DOMPurify](https://github.com/cure53/DOMPurify)
- [Upstash Rate Limiting](https://upstash.com/docs/redis/features/ratelimiting)

