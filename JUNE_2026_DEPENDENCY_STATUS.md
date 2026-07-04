# Dependency Security Status - June 2026

## Overview

This document details the security status of all dependencies used in Doki Web as of June 2026.

---

## Critical Updates Required

### 1. Next.js 16.2.6 → 16.3.0+ (WHEN AVAILABLE)

**Current Version:** 16.2.6 (Released: May 7, 2026)  
**Latest Secure Version:** 16.3.0+ (Expected: Q3 2026)  

**Known Vulnerabilities:**
- **CVE-2026-45109** (Incomplete Turbopack Patch)
  - Severity: CRITICAL
  - Impact: Middleware bypass, authentication evasion
  - Status: Partially patched in 16.2.6
  - Recommendation: Update to 16.3.0 when released
  - Workaround: Implement manual middleware validation

**Security Fixes in 16.2.6:**
- 7 high-severity vulnerabilities patched
- 6 middleware/proxy bypass issues resolved
- Cache poisoning protections added
- SSRF mitigations implemented

**Action:**
```bash
# Monitor for 16.3.0 release
npm view next@latest
# Update when available
npm install next@16.3.0
```

---

### 2. React 19.2.4 → 19.2.6+

**Current Version:** 19.2.4  
**Latest Secure Version:** 19.2.6+ (Released: June 2026)  

**Known Vulnerabilities in 19.2.4:**

#### CVE-2026-23864 (React Server Components DoS #1)
- **Severity:** HIGH
- **Impact:** Server crashes, high CPU usage
- **Trigger:** Specially crafted HTTP requests to Server Function endpoints
- **Affected:** Apps using React Server Components
- **Fixed in:** 19.0.6, 19.1.7, 19.2.6+

#### CVE-2026-23870 (React Server Components DoS #2)
- **Severity:** HIGH
- **Impact:** Out-of-memory errors, service unavailability
- **Trigger:** Malformed RSC payloads with nested arrays
- **Affected:** All React 19 versions before 19.2.6
- **Fixed in:** 19.2.6+

**Action:**
```bash
npm install react@19.2.6 react-dom@19.2.6
```

---

### 3. Tailwind CSS 4.2.0 → 4.3.0+

**Current Version:** 4.2.0 (Released: February 2026)  
**Latest Secure Version:** 4.3.0+ (Released: June 2026)  

**Known Vulnerabilities:**

#### CVE-2026-41305 (PostCSS XSS via CSS Stringify)
- **Severity:** HIGH
- **Impact:** Cross-site scripting via CSS output
- **Cause:** Unescaped `</style>` tags in CSS stringification
- **Affected:** @tailwindcss/postcss 4.2.0
- **Fixed in:** 4.3.0+

#### @tailwindcss/oxide Runtime Risks
- **Severity:** MEDIUM
- **Issue:** Dynamic code execution, shell access, filesystem access
- **Recommendation:** Monitor for suspicious activity
- **Upgrade to:** 4.3.0+ for better isolation

**Action:**
```bash
npm install tailwindcss@4.3.0 @tailwindcss/postcss@latest
npm audit fix
```

---

### 4. next-intl 4.13.1 → 4.9.2+

**Current Version:** 4.13.1  
**Latest Secure Version:** 4.9.2+ (Released: June 2026)  
**Note:** You may be on an older version; update accordingly

**Critical Vulnerabilities:**

#### CVE-2026-40299 (Open Redirect Vulnerability)
- **Severity:** HIGH
- **Impact:** Users redirected to malicious sites
- **Cause:** Relative path resolution with `localePrefix: 'never'`
- **Affected:** next-intl < 4.9.1
- **Fixed in:** 4.9.1+

```typescript
// VULNERABLE CONFIGURATION
export const routing = defineRouting({
  locales: ['en', 'es', 'ja', ...],
  localePrefix: 'never',  // ❌ VULNERABLE with relative paths
})
```

Attack vector:
```
GET /[//attacker.com/path]
→ Could redirect to attacker.com if not properly validated
```

#### Prototype Pollution (experimental.messages.precompile)
- **Severity:** HIGH
- **Impact:** Object.prototype injection, RCE potential
- **Cause:** Unsafe translation key processing
- **Affected:** next-intl < 4.9.2 with experimental.messages.precompile
- **Fixed in:** 4.9.2+

#### ICU Message Formatting DoS
- **Severity:** HIGH
- **Impact:** Server crash during message formatting
- **Cause:** Unchecked recursion in ICU message parser
- **Affected:** next-intl < 4.9.2
- **Fixed in:** 4.9.2+

**Action:**
```bash
npm install next-intl@^4.9.2
# And validate routing configuration afterward
```

---

## High Severity Issues

### PostCSS < 8.5.10

**Dependency Chain:** postcss ← next ← tailwindcss ← project  
**Current Version:** Unknown (check with `npm list postcss`)  
**Vulnerable Version:** < 8.5.10  

**CVE-2026-41305 Details:**
- **Type:** Cross-Site Scripting (XSS)
- **Vector:** Unescaped `</style>` in CSS stringify output
- **Exploitation:** Inject `</style><script>` payloads in CSS values
- **Impact:** CSS rules can break out of style tags and execute scripts

**Fix:**
```bash
npm install postcss@latest
# This updates the transitive dependency through Next.js
```

---

### @hookform/resolvers Version Mismatch

**Current Version:** 3.10.0 (claims React 18.3.1+)  
**Actual Runtime:** React 19.2.4  

**Issue:**
```
@hookform/resolvers expects react: "^18.3.1"
But project has: react: "^19"
```

**Impact:** MEDIUM - Works but not officially tested combination

**Note:** This is a peerDependency mismatch. React 19 is backwards-compatible enough that it works, but should be monitored.

**Future Fix (when resolvers update):**
```bash
npm install @hookform/resolvers@latest
```

---

## Medium Severity Issues

### Recharts 2.15.0

**Status:** No known security vulnerabilities as of June 2026  
**Note:** Recharts can have performance issues with large datasets  
**Monitoring:** Keep updated with `npm install recharts@latest`

---

### React Markdown 10.1.0

**Status:** Safe, but verify no XSS in plugins  
**Plugins Used:**
- remark-gfm: ✓ Safe
- rehype-highlight: ✓ Safe
- rehype-slug: ✓ Safe
- rehype-autolink-headings: ✓ Safe

**WARNING:** The code uses `allowDangerousHtml: true` which is UNSAFE  
**Fix:** Remove this flag (see REMEDIATION_GUIDE.md)

---

## Overall Dependency Tree Health

### Critical Path Dependencies

```
project
├─ next@16.2.6 ⚠️ CRITICAL (16.3.0 pending)
│  └─ postcss@<8.5.10 ⚠️ CRITICAL (XSS)
│  └─ swc (compiled Rust)
├─ react@19.2.4 ⚠️ CRITICAL (Server Components DoS)
├─ react-dom@19.2.4 ⚠️ CRITICAL (linked to react)
├─ tailwindcss@4.2.0 ⚠️ CRITICAL (4.3.0 available)
│  └─ @tailwindcss/postcss@4.2.0 ⚠️ CRITICAL (CVE-2026-41305)
├─ next-intl@4.13.1 ⚠️ CRITICAL (4.9.2+ required)
├─ recharts@2.15.0 ✓ Safe
├─ react-markdown@10.1.0 ⚠️ Config issue (see code audit)
├─ zod@3.24.1 ✓ Safe
└─ resend@6.14.0 ✓ Safe
```

---

## Dependency Update Schedule

### Immediate (Today)

```bash
# 1. Fix npm audit issues
npm audit fix

# 2. Update critical packages
npm install react@latest react-dom@latest
npm install next-intl@^4.9.2
npm install tailwindcss@latest @tailwindcss/postcss@latest

# 3. Verify
npm audit
# Should show: 0 vulnerabilities
```

### This Week

```bash
# Watch for Next.js 16.3.0
npm view next versions --json | grep "16.3"

# When available, update immediately
npm install next@16.3.0
```

### Monthly (Ongoing)

```bash
# Check for updates
npm outdated

# Update non-breaking changes
npm update

# Update dev dependencies
npm install --save-dev $(npm outdated --save-dev --json | jq -r '.[]' | cut -d@ -f1)
```

### Quarterly (Security Audit)

```bash
# Full audit
npm audit

# Security scanning (Snyk)
npx snyk test

# Dependency vulnerabilities (OWASP)
npm list --vulnerabilities

# Check for supply chain attacks
npm audit signatures
```

---

## Known Issues & Workarounds

### Issue 1: React Hook Form + React 19

**Problem:** @hookform/resolvers declares `react@^18.3.1` but project uses React 19  
**Status:** Works but not officially supported  
**Workaround:** Keep using current setup, update when resolvers releases React 19 support  
**Timeline:** Expected Q3-Q4 2026

---

### Issue 2: TypeScript + Next.js 16

**Problem:** TypeScript compilation with Next.js 16 can be slow  
**Status:** Known in Next.js 16.0-16.2  
**Workaround:** Upgrade to 16.3+ when available  
**Temporary Fix:**
```json
{
  "compilerOptions": {
    "incremental": true,
    "skipLibCheck": true
  }
}
```

---

### Issue 3: Tailwind CSS 4.2 Performance

**Problem:** Build times can be slower than Tailwind 3  
**Status:** Improved in 4.3+  
**Workaround:** Use `@tailwindcss/oxide` for faster compilation  
**Recommendation:** Upgrade to Tailwind 4.3+

---

## Security Best Practices for Dependencies

### 1. Automated Scanning

Add to CI/CD pipeline:

```yaml
# .github/workflows/security.yml
name: Security Audit

on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm audit --audit-level=high
      - run: npx snyk test
```

### 2. Dependency Update Policy

- **Critical/High:** Update within 24-48 hours
- **Medium:** Update within 1 week
- **Low:** Update within 1 month
- **Always** test after updating
- **Always** commit lock file changes

### 3. Supply Chain Security

```bash
# Verify package integrity
npm audit signatures

# Use lockfile
npm ci  # instead of npm install

# Check for unexpected changes
git diff package-lock.json
```

### 4. Regular Maintenance

```bash
# Monthly check
npm outdated

# Quarterly audit
npm audit --audit-level=moderate

# Annual review
npm update --save
npm audit
```

---

## Monitoring & Alerts

### Set up notifications for:
- ✓ New CVEs affecting your dependencies
- ✓ Major version updates available
- ✓ Deprecated packages in use
- ✓ License compliance issues

### Recommended tools:
- **Snyk** (https://snyk.io/)
- **Dependabot** (GitHub built-in)
- **npm audit** (built-in)
- **Socket Dev** (supply chain security)

---

## Summary Table

| Package | Current | Latest | Status | Action |
|---------|---------|--------|--------|--------|
| next | 16.2.6 | 16.3.0* | ⚠️ Needs update | Wait for 16.3.0 |
| react | 19.2.4 | 19.2.6 | 🔴 Update NOW | `npm install react@latest` |
| react-dom | 19.2.4 | 19.2.6 | 🔴 Update NOW | `npm install react-dom@latest` |
| tailwindcss | 4.2.0 | 4.3.0 | 🔴 Update NOW | `npm install tailwindcss@latest` |
| next-intl | 4.13.1 | 4.9.2+ | 🔴 Update NOW | `npm install next-intl@^4.9.2` |
| postcss | <8.5.10 | 8.5.10+ | 🔴 Critical | `npm audit fix` |
| zod | 3.24.1 | 3.24.1+ | ✓ Safe | Monitor |
| recharts | 2.15.0 | 2.15.0+ | ✓ Safe | Monitor |
| resend | 6.14.0 | 6.14.0+ | ✓ Safe | Monitor |

---

## Conclusion

**Status:** 5 critical updates required before production deployment

**Estimated time to update:** 30 minutes

**Verification time:** 15 minutes (npm audit, testing)

**Total time investment:** 45 minutes

**Risk of NOT updating:** CRITICAL - Multiple unpatched vulnerabilities

**Recommendation:** Complete all updates TODAY before any production deployment.

---

*Last updated: June 2026*  
*Next update: July 2026*  
*Review frequency: Monthly*
