# Análisis de Seguridad - Doki Web (Junio 2026)

## Resumen Ejecutivo

Se realizó un análisis exhaustivo del código base de **OpceanAI/Doki-web** en junio de 2026. Se identificaron **16 problemas críticos y de alto riesgo** que requieren atención inmediata, además de vulnerabilidades conocidas en dependencias.

---

## 🔴 VULNERABILIDADES CRÍTICAS - ACCIÓN INMEDIATA REQUERIDA

### 1. **CVE-2026-45109: Middleware Bypass en Next.js 16.2.6 (Turbopack)**
**Severidad:** CRÍTICA  
**Estado:** Parcialmente parcheado en 16.2.6  
**Impacto:** Bypass de autenticación, SSRF, cache poisoning  

**Problema:**
- El proyecto usa `next@16.2.6` pero aún hay un bypass incompleto en Turbopack
- Middleware puede ser eludido permitiendo acceso a rutas protegidas

**Ubicación:** `/middleware.ts`  
**Recomendación:** Actualizar a `next@16.3.0` o superior cuando esté disponible

---

### 2. **Vulnerabilidades de React 19 Server Components (CVE-2026-23864, CVE-2026-23870)**
**Severidad:** ALTA  
**Estado:** Afectado - Requiere React 19.2.6+  
**Impacto:** DoS, crash de servidor, consumo de memoria  

**Problema:**
```json
"react": "^19" // Instalado: 19.2.4
```
- El proyecto usa React 19.2.4 pero requiere 19.2.6 mínimo
- Server Components son vulnerables a requests especialmente crafteados

**Recomendación:** 
```bash
npm install react@latest react-dom@latest
```

---

### 3. **CVE-2026-41305: XSS en PostCSS vía Tailwind CSS**
**Severidad:** ALTA  
**Estado:** Detectado en npm audit  
**Impacto:** XSS, inyección de código  

**Problema:**
```
postcss <8.5.10 (Vulnerable)
@tailwindcss/postcss 4.2.0 tiene dependencia transitiva vulnerable
```

**Ubicación:** `package.json` devDependencies  
**Recomendación:** 
```bash
npm audit fix
npm install tailwindcss@4.3.0 @tailwindcss/postcss@latest
```

---

### 4. **next-intl CVE-2026-40299: Open Redirect Vulnerability**
**Severidad:** ALTA  
**Estado:** next-intl 4.13.1 es vulnerable (requiere 4.9.1+)  
**Impacto:** Redirecciones a sitios maliciosos  

**Problema:**
```typescript
// middleware.ts usa next-intl routing
export const routing = defineRouting({
  locales: ['en', 'es', 'ja', 'de', 'fr', 'ko', 'it'],
  localePrefix: 'never',  // VULNERABLE con rutas relativas
})
```
- Con `localePrefix: 'never'`, rutas relativas pueden resolverse a hosts externos

**Recomendación:** Actualizar a `next-intl@^4.9.2`

---

### 5. **next-intl: Prototype Pollution & DoS**
**Severidad:** ALTA  
**Estado:** 4.13.1 usa `experimental.messages.precompile` vulnerable  
**Impacto:** Inyección de propiedades, DoS en formatting ICU  

**Recomendación:** Actualizar `next-intl@^4.9.2`

---

## 🟠 VULNERABILIDADES DE ALTO RIESGO - CÓDIGO

### 6. **XSS via dangerouslySetInnerHTML sin sanitización**
**Severidad:** ALTA  
**Estado:** Múltiples ubicaciones sin validación  

**Problemas encontrados:**

#### a) `/components/docs/docs-content.tsx` (CRÍTICO)
```typescript
return (
  <div
    ref={ref}
    className="docs-content"
    dangerouslySetInnerHTML={{ __html: html }}  // ❌ SIN SANITIZACIÓN
  />
)
```
**Riesgo:** Si `html` viene de contenido de usuario sin validar, permite XSS  
**Origen del HTML:** `/lib/render-docs.ts` procesa markdown pero usa `allowDangerousHtml: true`

**Solución:**
```typescript
import DOMPurify from 'isomorphic-dompurify'

return (
  <div
    ref={ref}
    className="docs-content"
    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
  />
)
```

#### b) `/app/performance/page.tsx` 
```typescript
<td dangerouslySetInnerHTML={{ __html: b.doki }} />      // ❌
<td dangerouslySetInnerHTML={{ __html: b.docker }} />    // ❌
```
**Riesgo:** Aunque son datos estáticos, es mala práctica  
**Mejora:** Usar plain text o JSX:
```typescript
<td>{b.doki}</td>  // Si es HTML como `<15 ms`, usar entity encoding
<td>{'<15 ms'}</td>  // O esto
```

#### c) `/components/ui/chart.tsx` (Bajo Riesgo - Controlado)
```typescript
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  // CSS generado desde config controlado, pero aún es riesgoso
  dangerouslySetInnerHTML={{ __html: Object.entries(THEMES)... }}
```
**Riesgo:** Bajo porque los colores vienen de config tipado, pero vulnerable si config se puede inyectar

**Solución:** Usar `<style>` con content seguro sin HTML:
```typescript
const style = `${prefix} [data-chart=${id}] { ${colorConfig...} }`
```

---

### 7. **Inyección de Markdown con allowDangerousHtml: true**
**Severidad:** ALTA  
**Ubicación:** `/lib/render-docs.ts:11`  

```typescript
.use(remarkRehype, { allowDangerousHtml: true })      // ❌ PELIGROSO
.use(rehypeStringify, { allowDangerousHtml: true })   // ❌ PELIGROSO
```

**Problema:** 
- Permite que markdown contenga HTML/scripts directo
- Si documentación viene de fuente no confiable, permite XSS

**Solución:**
```typescript
.use(remarkRehype) // Sin allowDangerousHtml
.use(rehypeStringify)
```

---

### 8. **window.location.reload() sin validación en Language Switcher**
**Severidad:** MEDIA  
**Ubicación:** `/components/doki/language-switcher.tsx:29`  

```typescript
const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const newLocale = e.target.value
  startTransition(() => {
    setCookie("NEXT_LOCALE", newLocale, { path: "/", maxAge: 31536000 })
    window.location.reload()  // ❌ Sin validación
  })
}
```

**Problemas:**
1. No valida que `newLocale` sea un locale permitido
2. Si `newLocale` contiene valores inesperados, igual recarga
3. No hay protección contra cambios rápidos

**Solución:**
```typescript
const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const newLocale = e.target.value
  // Validar que es locale válido
  if (!locales.some(l => l.code === newLocale)) return
  
  startTransition(() => {
    setCookie("NEXT_LOCALE", newLocale, { path: "/", maxAge: 31536000 })
    window.location.reload()
  })
}
```

---

### 9. **Cookie sin SameSite y Secure flags**
**Severidad:** ALTA  
**Ubicación:** `/lib/cookies.ts`  

```typescript
export function setCookie(name: string, value: string, options: { path?: string; maxAge?: number } = {}) {
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
  if (options.path) cookie += `; path=${options.path}`
  if (options.maxAge) cookie += `; max-age=${options.maxAge}`
  // ❌ FALTA: SameSite, Secure, HttpOnly, Domain
  document.cookie = cookie
}
```

**Riesgos:**
- CSRF attacks posibles (sin SameSite)
- Interception en HTTP (sin Secure)
- Acceso desde JavaScript (sin HttpOnly)

**Solución (requiere servidor):**
```typescript
// El cliente NO PUEDE establecer estos flags
// Se debe mover a middleware.ts o route handler

// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  // Usar headers de respuesta, no document.cookie
  response.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 31536000,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  })
  return response
}
```

---

### 10. **Falta de rate limiting en API de newsletter**
**Severidad:** MEDIA  
**Ubicación:** `/app/api/newsletter/route.ts`  

```typescript
export async function POST(request: Request) {
  // ❌ SIN rate limiting
  // ❌ SIN CSRF protection
  // ❌ SIN verificación de origen
  const body = await request.json()
  // Cualquiera puede hacer spam
}
```

**Problema:** 
- Resend tiene límite de 10 req/s por API key
- Sin rate limiting cliente, se gastan rápido los límites
- Sin CSRF, formularios pueden ser explotados

**Solución:**
```typescript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 emails por hora por IP
})

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  const { success } = await ratelimit.limit(ip)
  
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    )
  }
  
  // Validar origin/referer
  const origin = request.headers.get('origin')
  if (origin && !origin.includes(process.env.ALLOWED_ORIGIN || 'dok1.xyz')) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  
  // ... resto del código
}
```

---

### 11. **Falta validación de método HTTP en docs API**
**Severidad:** BAJA  
**Ubicación:** `/app/api/docs-search/route.ts` y `/app/api/docs-raw/route.ts`  

```typescript
export async function GET() {
  const docs = await getAllDocs()
  // ❌ Si alguien hace POST, DELETE, etc, no hay respuesta clara
}
```

**Solución:**
```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Ya está bien, GET se maneja
}

// Rechazar otros métodos
export function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { Allow: 'GET' } }
  )
}
```

---

### 12. **Path traversal potencial en docs rendering**
**Severidad:** MEDIA  
**Ubicación:** `/lib/docs.ts` y `/app/docs/[slug]/page.tsx`  

```typescript
const localePath = locale !== 'en' ? 
  path.join(DOCS_DIR, locale, `${slug}.md`) : ''  // ❌ slug no validado
```

**Problema:**
- `slug` viene de URL sin validación
- Un atacante podría hacer `../../etc/passwd.md`

**Solución:**
```typescript
// Validar que slug solo contiene caracteres seguros
const SAFE_SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export async function getDocPage(slug: string, locale = 'en'): Promise<DocPage | null> {
  if (!SAFE_SLUG_REGEX.test(slug)) {
    return null  // Slug inválido
  }
  
  // Normalizar path para evitar traversal
  const safePath = path.normalize(path.join(DOCS_DIR, locale, `${slug}.md`))
  if (!safePath.startsWith(DOCS_DIR)) {
    return null  // Intent traversal detectado
  }
  
  // Resto del código...
}
```

---

### 13. **Manejo de errores insuficiente**
**Severidad:** MEDIA  
**Ubicaciones:** Múltiples archivos  

Ejemplos:
```typescript
// ❌ docs.ts
try {
  const raw = await fs.readFile(localePath, 'utf-8')
  return JSON.parse(raw)
} catch {}  // Silencia TODOS los errores, incluyendo corrupción de datos
```

```typescript
// ❌ docs/[slug]/page.tsx línea 68-78
try {
  // ...
} catch {
  return {}  // Retorna metadata vacío, muy genérico
}
```

**Solución:**
```typescript
try {
  const raw = await fs.readFile(localePath, 'utf-8')
  return JSON.parse(raw)
} catch (error) {
  console.error('Failed to parse sidebar:', error)
  if (error instanceof SyntaxError) {
    throw new Error(`Invalid JSON in _sidebar.json: ${error.message}`)
  }
  // Continuar con fallback
}
```

---

### 14. **Falta de Content Security Policy (CSP)**
**Severidad:** ALTA  
**Ubicación:** Falta en todo el proyecto  

**Problema:**
- Sin CSP, XSS es más fácil de explotar
- No hay restricciones en scripts/estilos externos

**Solución (en next.config.ts):**
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ]
  }
}

export default nextConfig
```

---

### 15. **Falta validación de entrada en newsletter API**
**Severidad:** MEDIA  
**Ubicación:** `/app/api/newsletter/route.ts`  

```typescript
const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
})
// ✓ Esto está bien

// PERO falta:
// - No hay límite de longitud
// - No hay verificación de dominio
// - No hay honeypot para bots
```

**Mejora:**
```typescript
const emailSchema = z.object({
  email: z.string()
    .email("Invalid email address")
    .max(254, "Email too long")
    .refine(
      (email) => !DISPOSABLE_DOMAINS.has(email.split('@')[1]),
      "Disposable email addresses not allowed"
    ),
  // Honeypot
  website: z.string().max(0).optional(), // Bot campo oculto
})
```

---

### 16. **Falta manejo de CORS headers**
**Severidad:** MEDIA  
**Ubicación:** API routes  

**Problema:**
- No hay CORS headers configurados
- Cualquier origen puede hacer requests a `/api/newsletter`

**Solución:**
```typescript
export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  const allowedOrigins = ['https://dok1.xyz', 'http://localhost:3000']
  
  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json(
      { error: 'CORS policy violation' },
      { status: 403 }
    )
  }
  
  // ... resto
}
```

---

## 🟡 VULNERABILIDADES MENORES/WARNINGS

### 17. **Dependencia deprecada: @hookform/resolvers**
**Severidad:** BAJA  
**Info:** React hook form 7.71.1 espera React 18.3.1+ pero se usa con React 19  
**Solución:** `npm install @hookform/resolvers@latest`

---

### 18. **Falta de validación en renderMarkdown**
**Severidad:** MEDIA  
**Ubicación:** `/lib/render-docs.ts`  

```typescript
export async function renderMarkdown(content: string): Promise<string> {
  // ❌ No hay validación de tamaño de contenido
  // Un markdown de 100MB podría causar DoS
  const result = await unified()...
}
```

**Solución:**
```typescript
const MAX_CONTENT_SIZE = 5 * 1024 * 1024 // 5MB

export async function renderMarkdown(content: string): Promise<string> {
  if (content.length > MAX_CONTENT_SIZE) {
    throw new Error('Content exceeds maximum size')
  }
  // ...
}
```

---

## 📋 CHECKLIST DE REMEDIATION

### Immediatamente (Hoy)
- [ ] `npm audit fix` (PostCSS)
- [ ] Actualizar React: `npm install react@latest react-dom@latest`
- [ ] Actualizar next-intl: `npm install next-intl@latest`
- [ ] Revisar y comentar `allowDangerousHtml` en render-docs.ts

### Esta Semana
- [ ] Implementar sanitización DOMPurify en docs-content.tsx
- [ ] Mover setCookie a middleware.ts con flags seguros
- [ ] Agregar validación a language switcher
- [ ] Implementar rate limiting en newsletter API
- [ ] Agregar CSP headers

### Este Mes
- [ ] Validar slugs con regex en docs
- [ ] Mejorar manejo de errores
- [ ] Agregar CORS validation
- [ ] Agregar pruebas de seguridad
- [ ] Implementar OWASP security headers

---

## 📊 TABLA RESUMEN DE VULNERABILIDADES

| # | Problema | Severidad | Status | Ubicación | Remediación |
|---|----------|-----------|--------|-----------|-------------|
| 1 | CVE-2026-45109 Middleware Bypass | 🔴 CRÍTICA | Parcheado | middleware.ts | Actualizar Next.js 16.3+ |
| 2 | React 19 DoS | 🔴 CRÍTICA | Vulnerable | package.json | npm install react@latest |
| 3 | CVE-2026-41305 PostCSS XSS | 🔴 CRÍTICA | Vulnerable | package.json | npm audit fix |
| 4 | next-intl Open Redirect | 🟠 ALTA | Vulnerable | i18n/routing.ts | npm install next-intl@^4.9.2 |
| 5 | next-intl Prototype Pollution | 🟠 ALTA | Vulnerable | package.json | npm install next-intl@^4.9.2 |
| 6 | XSS dangerouslySetInnerHTML | 🟠 ALTA | Vulnerable | docs-content.tsx | Implementar DOMPurify |
| 7 | XSS allowDangerousHtml | 🟠 ALTA | Vulnerable | render-docs.ts | Remover flag peligroso |
| 8 | window.location sin validación | 🟡 MEDIA | Vulnerable | language-switcher.tsx | Validar locale |
| 9 | Cookie sin SameSite/Secure | 🟠 ALTA | Vulnerable | cookies.ts | Mover a middleware |
| 10 | Sin rate limiting API | 🟡 MEDIA | Vulnerable | api/newsletter/route.ts | Implementar Upstash |
| 11 | Sin CSP headers | 🟠 ALTA | Missing | next.config.ts | Agregar CSP |
| 12 | Path traversal en docs | 🟡 MEDIA | Vulnerable | lib/docs.ts | Validar slug con regex |
| 13 | Manejo errores pobre | 🟡 MEDIA | Vulnerable | Múltiple | Mejorar logging |
| 14 | Sin CORS validation | 🟡 MEDIA | Vulnerable | api/newsletter/route.ts | Validar origin |
| 15 | Sin validación email | 🟡 MEDIA | Parcial | api/newsletter/route.ts | Agregar honeypot |
| 16 | Sin límite tamaño content | 🟡 MEDIA | Vulnerable | render-docs.ts | Agregar límite |

---

## 🔗 REFERENCIAS Y ENLACES ÚTILES

**Vulnerabilidades CVE:**
- https://nvd.nist.gov/vuln/detail/CVE-2026-45109 (Next.js Middleware)
- https://nvd.nist.gov/vuln/detail/CVE-2026-23864 (React DoS)
- https://nvd.nist.gov/vuln/detail/CVE-2026-41305 (PostCSS XSS)
- https://nvd.nist.gov/vuln/detail/CVE-2026-40299 (next-intl Redirect)

**Security Best Practices:**
- OWASP Top 10 2021: https://owasp.org/Top10/
- Next.js Security: https://nextjs.org/docs/app/building-your-application/routing/middleware#security
- React Security: https://react.dev/reference/react-dom/dangerouslySetInnerHTML

**Herramientas Recomendadas:**
- DOMPurify: https://github.com/cure53/DOMPurify
- Upstash: https://upstash.com/ (Rate limiting)
- SNYK: https://snyk.io/ (Scanning continuo)

---

## 📝 Notas Finales

**Aplicación:** Doki Web - Container Engine para Android  
**Rama:** master (v0/katu-24b985e9)  
**Organización:** OpceanAI  
**Fecha de Análisis:** Junio 2026  

El código tiene buena estructura general, pero **necesita correcciones urgentes en seguridad** antes de desplegar a producción. Las vulnerabilidades identificadas son remediables siguiendo este documento.

**Prioridad 1 (Hoy):** CVE-2026-45109, React DoS, PostCSS XSS  
**Prioridad 2 (Esta semana):** XSS via HTML, Cookies, Rate Limiting  
**Prioridad 3 (Este mes):** Path Traversal, Error Handling, CORS, CSP
