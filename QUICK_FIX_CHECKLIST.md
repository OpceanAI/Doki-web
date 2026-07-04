# Quick Fix Checklist - Doki Web Security Vulnerabilities

## ⏱️ Quick Start (45 minutes)

### Phase 1: Dependencies (15 minutes)

```bash
# Navigate to project
cd /vercel/share/v0-project

# 1. Audit current state
npm audit

# 2. Fix vulnerable packages
npm install react@latest react-dom@latest
npm install next-intl@^4.9.2
npm install tailwindcss@latest @tailwindcss/postcss@latest
npm audit fix

# 3. Verify fixes
npm audit
```

**Expected output:** `0 vulnerabilities`

---

### Phase 2: Code Updates (20 minutes)

#### Step 1: Remove dangerous Markdown rendering

**File:** `/lib/render-docs.ts`

Find and **REMOVE**:
```typescript
.use(remarkRehype, { allowDangerousHtml: true })      // DELETE THIS
.use(rehypeStringify, { allowDangerousHtml: true })   // DELETE THIS
```

Replace with:
```typescript
.use(remarkRehype)  // ✓ Safe
.use(rehypeStringify)  // ✓ Safe
```

**Time:** 2 minutes  
**Criticality:** 🔴 CRITICAL

---

#### Step 2: Add HTML sanitization

**File:** `/components/docs/docs-content.tsx`

```bash
# Install DOMPurify
npm install isomorphic-dompurify
npm install --save-dev @types/dompurify
```

Replace the component:
```typescript
// BEFORE:
return (
  <div dangerouslySetInnerHTML={{ __html: html }} />
)

// AFTER:
import DOMPurify from 'isomorphic-dompurify'

const sanitizedHtml = useMemo(() => {
  return DOMPurify.sanitize(html)
}, [html])

return (
  <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
)
```

**Time:** 3 minutes  
**Criticality:** 🔴 CRITICAL

---

#### Step 3: Validate language switcher

**File:** `/components/doki/language-switcher.tsx`

Add validation before reload:
```typescript
const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const newLocale = e.target.value
  // ✓ ADD THIS VALIDATION:
  if (!locales.some(l => l.code === newLocale)) {
    console.error('Invalid locale')
    return
  }
  startTransition(() => {
    setCookie("NEXT_LOCALE", newLocale, { path: "/", maxAge: 31536000 })
    window.location.reload()
  })
}
```

**Time:** 2 minutes  
**Criticality:** 🟡 MEDIUM

---

#### Step 4: Secure API endpoint

**File:** `/app/api/newsletter/route.ts`

Add at the top:
```typescript
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  // ✓ ADD THIS:
  const origin = request.headers.get('origin')
  const allowedOrigin = process.env.ALLOWED_ORIGIN || 'https://dok1.xyz'
  
  if (origin && !origin.includes(allowedOrigin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  // ... rest of code
}
```

**Time:** 2 minutes  
**Criticality:** 🟡 MEDIUM

---

#### Step 5: Add security headers

**File:** Create or update `next.config.ts`

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}
export default nextConfig
```

**Time:** 3 minutes  
**Criticality:** 🟠 HIGH

---

#### Step 6: Fix performance page HTML

**File:** `/app/performance/page.tsx`

Find:
```typescript
<td dangerouslySetInnerHTML={{ __html: b.doki }} />
<td dangerouslySetInnerHTML={{ __html: b.docker }} />
```

Replace with (simpler):
```typescript
<td>{b.doki}</td>
<td>{b.docker}</td>
```

Or if HTML needed, sanitize:
```typescript
<td>{DOMPurify.sanitize(b.doki)}</td>
<td>{DOMPurify.sanitize(b.docker)}</td>
```

**Time:** 2 minutes  
**Criticality:** 🟡 MEDIUM

---

### Phase 3: Testing (10 minutes)

```bash
# 1. Verify no build errors
npm run build

# 2. Check types
npx tsc --noEmit

# 3. Run linter
npm run lint

# 4. Final audit
npm audit
```

**Expected:** All checks pass

---

## ✅ Complete Checklist

### Dependencies (Required)
- [ ] `npm audit` shows 0 vulnerabilities
- [ ] React updated to 19.2.6+
- [ ] Next.js updated to 16.3.0 (when available)
- [ ] next-intl updated to 4.9.2+
- [ ] Tailwind CSS updated to 4.3.0+

### Code Changes (Required)
- [ ] `lib/render-docs.ts` - `allowDangerousHtml` removed
- [ ] `components/docs/docs-content.tsx` - DOMPurify sanitization added
- [ ] `components/doki/language-switcher.tsx` - locale validation added
- [ ] `app/api/newsletter/route.ts` - CORS validation added
- [ ] `app/performance/page.tsx` - Dangerous HTML removed or sanitized
- [ ] `next.config.ts` - Security headers added

### Security Enhancements (Recommended)
- [ ] Environment variables set (ALLOWED_ORIGIN, etc.)
- [ ] Build passes without warnings
- [ ] No TypeScript errors
- [ ] Tests pass

---

## 🚨 Before Deploy Checklist

- [ ] npm audit returns `0 vulnerabilities`
- [ ] npm run build completes successfully
- [ ] npm run lint passes
- [ ] No console errors in browser DevTools
- [ ] XSS test: HTML tags in docs are escaped (not rendered)
- [ ] CORS test: Test request from wrong origin fails with 403
- [ ] Locale test: Invalid locale rejected
- [ ] Security headers visible in browser DevTools (Network tab)

---

## 📋 Testing Each Fix

### Test 1: XSS Protection

```bash
# 1. Create a test doc with script tag
# content/docs/test.md:
# ---
# title: Test
# ---
# <script>alert('xss')</script>

# 2. Visit http://localhost:3000/docs/test
# 3. Script should NOT execute
# 4. HTML should be escaped as text
```

**Pass:** Script tag visible as text, not executed ✓

---

### Test 2: CORS Protection

```bash
# From browser console on different origin:
fetch('http://localhost:3000/api/newsletter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@test.com' })
})
```

**Pass:** Returns 403 Forbidden ✓

---

### Test 3: Security Headers

```bash
# Check headers:
curl -i http://localhost:3000/

# Look for:
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# X-XSS-Protection: 1; mode=block
```

**Pass:** All headers present ✓

---

## 🔗 Resources

**More details:**
- Full audit: `SECURITY_AUDIT_2026.md`
- Step-by-step guide: `REMEDIATION_GUIDE.md`
- Dependency info: `JUNE_2026_DEPENDENCY_STATUS.md`

**External references:**
- OWASP Top 10: https://owasp.org/Top10/
- CVE Database: https://nvd.nist.gov/
- Snyk: https://snyk.io/

---

## ⏱️ Time Estimate

| Task | Time | Priority |
|------|------|----------|
| Dependency updates | 15 min | 🔴 CRITICAL |
| Remove allowDangerousHtml | 2 min | 🔴 CRITICAL |
| Add DOMPurify sanitization | 3 min | 🔴 CRITICAL |
| Validate locale switcher | 2 min | 🟠 HIGH |
| Add CORS validation | 2 min | 🟠 HIGH |
| Add security headers | 3 min | 🟠 HIGH |
| Fix performance page | 2 min | 🟡 MEDIUM |
| Testing & verification | 10 min | ✓ Required |
| **TOTAL** | **39 min** | |

---

## 📞 Support

Need help?
1. Check `REMEDIATION_GUIDE.md` for detailed code examples
2. Review `SECURITY_AUDIT_2026.md` for full vulnerability details
3. Consult `JUNE_2026_DEPENDENCY_STATUS.md` for dependency info

---

**Status:** Ready for implementation  
**Complexity:** Low-Medium  
**Risk:** Low (straightforward fixes)  
**Estimated completion:** 45 minutes - 2 hours  

**DO NOT skip any steps**. All fixes are required for production safety.

---

*Last updated: June 2026*  
*Next review: July 2026*
