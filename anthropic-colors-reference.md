# Anthropic Color System — Complete Reference

## Swatch Palette (20 named tokens on :root)

### Core Warm Neutrals
- **Ivory Light** `#FAF9F5` — Primary page bg, button text on dark fills
- **Ivory Medium** `#F0EEE6` — Secondary bg, banner fills, card bg
- **Ivory Dark** `#E8E6DC` — Card fill (alt), section bg, hover surface
- **Oat** `#E3DACC` — Footer surface accents, illustration warm

### Cloud Neutrals
- **Cloud Light** `#D1CFC5` — Hairline dividers, illustration mid-tone
- **Cloud Medium** `#B0AEA5` — Subtle borders, secondary UI dividers
- **Cloud Dark** `#87867F` — Tertiary text, captions, metadata

### Slate Neutrals
- **Slate Light** `#5E5D59` — Secondary text, muted links
- **Slate Medium** `#3D3D3A` — Dark borders, mid text, elevated dark surface
- **Slate Dark** `#141413` — Primary text, headings, dark bg, footer bg

### Accent
- **Clay** `#D97757` — Primary accent terracotta
- **Accent/Ember** `#C6613F` — Hover/pressed clay

### Muted Secondary
- **Olive** `#788C5D` — Success, tag labels
- **Cactus** `#BCD1CA` — Pale sage, dark success
- **Sky** `#6A9BCC` — Mid blue secondary
- **Fig** `#C46686` — Error/destructive (muted rose)
- **Heather** `#CBCADB` — Pale lavender
- **Coral** `#EBCECE` — Pale pink, pairs with clay

### Surface Extras
- **Manilla** `#EBDBBC` — Dark warning
- **Kraft** `#D4A27F` — Light warning

### Pure Anchors
- **Black** `#000000` — Button press, logos
- **White** `#FFFFFF` — Text on dark fills

## Light Mode Semantic Roles
| Role | Swatch | Hex |
|---|---|---|
| background | Ivory Light | #FAF9F5 |
| surface | Ivory Medium | #F0EEE6 |
| surface-elevated | Ivory Light | #FAF9F5 |
| text-primary | Slate Dark | #141413 |
| text-secondary | Slate Medium | #3D3D3A |
| text-tertiary | Slate Light | #5E5D59 |
| primary | Clay | #D97757 |
| primary-hover | Accent | #C6613F |
| warning | Kraft | #D4A27F |
| error | Fig | #C46686 |
| success | Olive | #788C5D |
| border | Ivory Dark | #E8E6DC |

## Dark Mode Semantic Roles
| Role | Swatch | Hex |
|---|---|---|
| background | Slate Dark | #141413 |
| surface | Slate Medium | #3D3D3A |
| surface-elevated | Slate Light | #5E5D59 |
| text-primary | Ivory Light | #FAF9F5 |
| text-secondary | Cloud Medium | #B0AEA5 |
| text-tertiary | Cloud Dark | #87867F |
| primary | Clay | #D97757 |
| primary-hover | Accent | #C6613F |
| warning | Manilla | #EBDBBC |
| error | Fig | #C46686 |
| success | Cactus | #BCD1CA |
| border | Slate Light | #5E5D59 |

## Additional Duply Token Names
- Ink `#141413`, Ink Soft `#3D3D3A`, Body `#3D3D3A`
- Muted `#5E5D59`, Muted Strong `#666666`, Muted Soft `#87867F`
- Neutral `#B0AEA5`, Neutral Soft `#9C9A92`, Neutral Warm `#AEACA0`
- Hairline `#D1CFC5`, Hairline Soft `#DEDCD1`
- Surface Muted `#EFEFEF`, Surface Dark `#141413`
- On Primary / On Dark `#FFFFFF`, On Dark Soft `#CCCCCC`
- Link `#0000EE`

## Overlay / Shadow
- Modal backdrop: `color-mix(in srgb, #141413 80%, transparent)`
- Soft shadow: `rgba(0,0,0,0.01) 0 2px 2px, rgba(0,0,0,0.02) 0 4px 4px, rgba(0,0,0,0.04) 0 16px 24px`

## Claude Product Cousin Palette
- Primary: Coral `#CC785C`, Active: `#A9583E`, Disabled: `#E6DFD8`
- Canvas: `#F5F4ED`, Surface Card: `#FAF9F5`/`#FFFFFF`
- Dark: `#181715`, Dark Elevated: `#252320`, Dark Soft: `#1F1E1B`
- Syntax: Blue `#3F9FFF`, Green `#6A8759`, Red `#CC6666`, Steel `#A9B7C6`
