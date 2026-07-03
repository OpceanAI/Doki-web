# Anthropic Loading, Skeleton & Placeholder Patterns — Complete Reference

> Research compiled from anthropic.com, claude.ai, Claude Code source (reverse-engineered), Claude Design system, API docs, GitHub issues, and design analysis articles. All values are exact or approximately reconstructed from observed behavior.

---

## 1. Page/Section Loading Skeletons

### Shimmer Skeleton (Claude.ai, Claude Design System)

**CSS:**
```css
.skeleton-shimmer {
  background: linear-gradient(90deg, #d9e0ea 25%, #edf1f7 37%, #d9e0ea 63%);
  background-size: 240% 100%;
  animation: skeleton-shimmer 1.4s ease-in-out infinite;
  border-radius: 8px;
}

@keyframes skeleton-shimmer {
  from { background-position: 120% 0; }
  to   { background-position: -120% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton-shimmer {
    animation: none;
    background: #d9e0ea;
  }
}
```

**Shape defaults:**
| Element | Size | Border-radius |
|---------|------|---------------|
| Text line | height: 16px | 8px |
| Media block | min-height: 148px | 8px |
| Avatar circle | 50×50px | 50% / 9999px |
| Card skeleton | min-height: 316px | 8px |

**Direction:** Left-to-right sweep (background-position: 120% → -120%)
**Duration:** 1.4s (standard), 2.0s (alternative), ease-in-out
**Gradient angle:** 90deg (horizontal) or 100deg (slightly tilted for dynamism)
**Skeleton base color:** `#d9e0ea` (light gray-blue)
**Shimmer highlight:** `#edf1f7` (near-white)

### Card Skeleton Layout

```css
.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.article-card {
  min-height: 316px;
  overflow: hidden;
  border: 1px solid #d7deea;
  border-radius: 8px;
  background: #ffffff;
}
```

- **Borders:** `#d7deea` (1px)
- **Gap:** 16px between skeleton cards
- **Card padding:** 18px body, 18px spacing

---

## 2. Streaming/Typing Indicators

### Claude Code Terminal Thinking Spinner

**Frame characters** (6 unique, cycling forward then backward = 12 total):
```
macOS/Linux:   ·  ✢  ✱  ✶  ✻  ✽
Ghostty:       ·  ✢  ✱  ✶  ✻  *
```
Unicode: `·` (U+00B7), `✢` (U+2722), `✱` (U+2731), `✶` (U+2736), `✻` (U+273B), `✽` (U+273D)

**Timing:**
- **Frame interval:** 120ms per frame (useAnimationFrame(120))
- **Full cycle:** 12 frames × 120ms = 1440ms
- **Reduced motion:** Static `●` (U+25CF) with 2000ms breathing cycle (1s bright, 1s dim)

**Stall detection:**
- Exponential moving average: `stalledIntensity += (target - stalledIntensity) * 0.1`
- Interpolates from theme color → `ERROR_RED = rgb(171, 43, 63)`
- No binary threshold — smooth color fade

### Spinner Modes (SSE-driven)

| Mode | Trigger | Frame rate | Visual |
|------|---------|-----------|--------|
| `requesting` | Waiting for first token | 50ms/frame (20fps) | Fast shimmer |
| `thinking` | Received `thinking_delta` | 200ms/frame (5fps) | Slow shimmer, sine-wave opacity |
| `responding` | Received `text_delta` | 120ms/frame(~8fps) | Spinning Unicode characters |
| `tool-input` | Received `input_json_delta` | 120ms/frame | Spinning characters (different color) |
| `tool-use` | Tool executing | 120ms/frame | Spinning + progress |

### Thinking Shimmer (Terminal)

```typescript
const THINKING_DELAY_MS = /* ~2000ms before shimmer starts */
const THINKING_GLOW_PERIOD_S = /* ~4s sine wave period */
const thinkingOpacity = time < THINKING_DELAY_MS
  ? 0
  : (Math.sin(thinkingElapsedSec * Math.PI * 2 / THINKING_GLOW_PERIOD_S) + 1) / 2;
```

- **Opacity:** Sine wave 0→1→0 over ~4s period
- **Color interpolation:** Between `THINKING_INACTIVE` and `THINKING_INACTIVE_SHIMMER`
- **Text display:** "Thinking…" (or 184 alternative verbs)

### Web UI Typewriter Effect

```typescript
// useTypewriter hook
// RAF-based character reveal
interface TypewriterOptions {
  baseRate: number;   // ~17ms per character (60 chars/sec default)
  maxLagMs: number;   // ~500ms max catch-up
  enabled: boolean;   // pause/resume
}
```

- **Character reveal rate:** ~17ms per character (adjustable)
- **Blinking caret:** CSS cursor animation
- **Reduced motion:** Full content revealed immediately, no caret
- **Multi-block streaming:** Text content blocks arrive via SSE `content_block_delta` with `delta.text`

### Extended Thinking Progressive Messages (Desktop App)

- Phase 1: "still thinking"
- Phase 2: "thinking more"
- Phase 3: "almost done thinking"

---

## 3. Spinner Styles

### CLI Terminal Spinner (Claude Code)

| Property | Value |
|----------|-------|
| Characters | `· ✢ ✱ ✶ ✻ ✽` (6 characters, forward+reverse loop) |
| Frame width | 2 characters (glyph + space) |
| Frame rate | 120ms (useAnimationFrame(120)) |
| Color | Theme color `claude` (warm orange-clay) |
| Shimmer color | `claudeShimmer` |
| Easing | Linear (frame stepping) |
| Reduced motion | `●` static dot, 2000ms dim/bright cycle |
| Stall color | Interpolates to `rgb(171, 43, 63)` |
| Verb rotation | 184 verbs, independent ~1800ms timer |
| Verb shimmer | Sine-wave opacity sweep, reverse-direction |

### Web Full-Page Loading Spinner (Claude Command Center style)

```css
.ccc-loading-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid rgba(88,166,255,0.18);
  border-top-color: var(--accent);        /* #C4673A clay */
  border-radius: 50%;
  animation: ccc-spin 0.8s linear infinite;
}
@keyframes ccc-spin {
  to { transform: rotate(360deg); }
}
```

But Anthropic's own spinner on claude.ai likely uses their branded clay accent:
```css
.anthropic-spinner {
  width: 20px;              /* small inline */
  height: 20px;
  border: 2px solid rgba(196, 103, 58, 0.2);  /* clay at 20% */
  border-top-color: #C4673A;                   /* full clay */
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
```

### Braille Dots Spinner (Browser Claude.ai alternative)

```
⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏
```
These are used in terminal tab titles and some web fallbacks. 10 frames, 80ms each, forward only.

---

## 4. Content Placeholders

### Text Line Placeholders

| Variation | Width | Height | Border-radius | Purpose |
|-----------|-------|--------|--------------|---------|
| Long | 90% | 16px | 8px | Title/content lines |
| Short | 60% | 16px | 8px | Subtitle/meta lines |
| Avatar | 50×50px | 50×50px | 50% | Circular avatar |
| Media | 100% | 148px | 8px | Image/video block |

**Line spacing:** 8px gap between lines in a group, 10px gap inside card body

### Card Placeholder Structure

```
┌─────────────────────────┐
│  ╭──────╮               │  ← Avatar (50×50, round)
│  ╰──────╯               │
│  ┌────────────────────┐ │  ← Title line (90% width, 16px height)
│  └────────────────────┘ │
│  ┌──────────────────┐   │  ← Body line 1 (80% width, 16px)
│  └──────────────────┘   │
│  ┌────────────┐         │  ← Body line 2 (60% width, 16px)
│  └────────────┘         │
└─────────────────────────┘
```

### List Skeleton

```css
.skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.skeleton-row {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
  align-items: center;
}
```

---

## 5. Button Loading State

### Claude Design System Buttons

**Default button:**
```css
.btn-primary {
  min-height: 40px;
  border: 1px solid #b8c2d6;
  border-radius: 8px;
  background: #ffffff;
  color: #18212f;
  padding: 0 14px;
  font-weight: 700;
}
```

**Loading state patterns:**
1. **Spinner replacement:** Button text hidden, spinner shown in center (20×20px, 2px border)
2. **Opacity reduction:** Button opacity drops to 0.6–0.7 during loading
3. **Disabled state:** `pointer-events: none`, `cursor: not-allowed`
4. **Width preservation:** Button maintains its original width to prevent layout shift

```css
.btn-loading {
  position: relative;
  pointer-events: none;
  color: transparent;           /* hide text */
}
.btn-loading::after {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: btn-spin 0.6s linear infinite;
}
@keyframes btn-spin { to { transform: rotate(360deg); } }
```

**Anthropic-branded primary button (Nav "Try Claude"):**
```css
.btn-main_wrap {
  /* Warm clay background */
  background: #C4673A;
  color: #FFFFFF;
  border-radius: 6px;           /* system radius */
}
```

---

## 6. Image Loading

### Claude.ai Image Loading

- **Blur-up:** Low-resolution base64 placeholder, blurred with `filter: blur(20px)`, transitions to sharp on load
- **Color placeholder:** Background color `#EDE8DF` (surface) while image loads
- **Aspect ratio:** Locked via `aspect-ratio` CSS or explicit `width`/`height` attributes to prevent CLS
- **Transition:** `opacity 0.3s ease-in-out` crossfade from placeholder to loaded image

```css
.image-placeholder {
  background: #EDE8DF;           /* surface color */
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
.image-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.image-placeholder img.loaded {
  opacity: 1;
}
```

---

## 7. Page Transition Loading

### Full-Page Overlay

```css
.page-loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: #F5F0E8;              /* warm ivory */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  transition: opacity 0.25s ease-out;
}
.page-loading-overlay.fade-out {
  opacity: 0;
  pointer-events: none;
}
```

- **Background:** Matches the page background color (`#F5F0E8` warm ivory)
- **Spinner:** Centered clay-colored spinner
- **Label:** "Loading…" in secondary color (`#6B5F4E`)
- **Detail text:** Smaller, lower opacity description of what's loading
- **Fade out:** 250ms ease-out, then `display: none`
- **Timing:** Shown for initial load + repo/context switches

---

## 8. Suspense Fallbacks

### React Suspense Boundaries

Anthropic's web apps (claude.ai) use React Suspense with skeleton fallbacks:

```tsx
// Pattern observed in Anthropic-adjacent code
<Suspense fallback={<CardSkeleton />}>
  <CardContent data={data} />
</Suspense>
```

**Key practices:**
- Skeleton geometry matches real component dimensions exactly (same CSS tokens)
- `aria-busy="true"` on the loading container
- Skeleton elements themselves are `aria-hidden="true"`
- A single `role="status"` element announces "Loading..." to screen readers
- Minimum display time ~300ms to avoid flash of skeleton
- Crossfade transition: 200ms between skeleton and content

### Accessibility Contract

```html
<div aria-busy="true" role="region" aria-label="Loading messages">
  <div aria-hidden="true">
    <!-- skeleton shapes -->
  </div>
  <div class="sr-only" role="status">Loading your messages</div>
</div>
```

---

## 9. Minimal Loading (Subtle Pulse)

### Pulsing Opacity

```css
.skeleton-pulse {
  background: #EDE8DF;              /* surface color */
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.5; }
}
```

### Color Pulse (on the element itself)

Anthropic's minimal loading pattern applies a subtle background color pulse directly to the actual component, not a skeleton replacement. This is used for inline elements where a skeleton would be too visually disruptive.

```css
.minimal-loading {
  background: #EDE8DF;
  border-radius: 6px;
  animation: colorPulse 1.5s ease-in-out infinite;
}
@keyframes colorPulse {
  0%, 100% { background: #EDE8DF; }
  50%      { background: #E5DFD4; }
}
```

---

## Complete Color System Reference

### Warm Ivory Palette (Anthropic Brand)

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#F5F0E8` | Page background |
| `--surface` | `#EDE8DF` | Cards, panels |
| `--surface-raised` | `#E5DFD4` | Hovered/elevated surfaces |
| `--surface-overlay` | `#DDD6C8` | Modals, dropdowns |
| `--border` | `rgba(120, 100, 75, 0.12)` | Subtle borders |
| `--border-strong` | `rgba(120, 100, 75, 0.22)` | Emphasized borders |
| `--text-primary` | `#1A1612` | Body text |
| `--text-secondary` | `#6B5F4E` | Muted text |
| `--text-tertiary` | `#9C8E7A` | Placeholder/faint text |
| `--accent` | `#C4673A` | Primary accent (clay) |
| `--accent-hover` | `#D4733F` | Accent hover |
| `--accent-muted` | `rgba(196, 103, 58, 0.1)` | Subtle accent bg |

### Skeleton-Specific Colors (from Claude.ai ecosystem)

| Token | Hex | Usage |
|-------|-----|-------|
| Skeleton base | `#d9e0ea` | Skeleton fill |
| Skeleton shimmer | `#edf1f7` | Shimmer highlight |
| Card border | `#d7deea` | Skeleton card border |
| Card background | `#ffffff` | Skeleton card bg |

### Terminal Spinner Colors (Claude Code)

| Token | Value | Usage |
|-------|-------|-------|
| Default color | Theme `claude` | Spinner glyph |
| Shimmer color | Theme `claudeShimmer` | Verb shimmer sweep |
| Error/stall | `rgb(171, 43, 63)` | Stalled spinner interpolation |

---

## Animation Timing Reference

| Animation | Duration | Easing | Notes |
|-----------|----------|--------|-------|
| Shimmer sweep (skeleton) | 1.4s | ease-in-out | background-position sweep |
| Shimmer sweep (alt) | 2.0s | ease-out | Slower, more subtle |
| Spinner frame | 120ms | step | ~8.3fps effective |
| Fast shimmer (requesting) | 50ms | step | 20fps |
| Slow shimmer (thinking) | 200ms | step | 5fps |
| Thinking glow period | ~4s | sine | Opacity wave |
| Reduced-motion breathing | 2000ms | step | 1s on, 1s off |
| Overlay fade out | 250ms | ease-out | Opacity 1→0 |
| Content crossfade | 200ms | ease-out | Skeleton→content |
| Button spin | 0.6s | linear | Button loading spinner |
| Full-page spinner | 0.8s | linear | 36px spinner |
| Typewriter char rate | ~17ms | step | ~60 chars/sec |
| Verb rotation | ~1800ms | step | Independent timer |
| Pulse (minimal) | 1.5–2s | ease-in-out | Opacity pulse |

---

## Summary: When Anthropic Uses Each Pattern

| Pattern | Where | Why |
|---------|-------|-----|
| Shimmer skeleton | Cards, lists, page loads | Fast (<2s), layout known |
| Typewriter streaming | Chat responses | Text generation, real-time |
| Terminal spinner verbs | Claude Code CLI | Long operations, unknown duration |
| Full-page overlay | Initial load, context switch | Complete page rebuild |
| Thinking sine-wave | Extended thinking (models) | >2s, model reasoning |
| Three-dot indicator | Desktop app chat | Claude is generating |
| Pulse/minimal | Inline elements, small widgets | Subtle feedback |
| Button spinner | Form submit, actions | <2s operation |
| Color placeholder | Images | Reserve space, prevent CLS |
| Suspense fallback | React component boundaries | Async component loading |
