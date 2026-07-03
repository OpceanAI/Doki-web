<p align="center">
  <img src="https://raw.githubusercontent.com/OpceanAI/Doki-web/main/.github/assets/banner.svg" alt="Doki Web Banner" width="680">
</p>

<p align="center">
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16-000?style=flat&logo=nextdotjs&logoColor=white" alt="Next.js"></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black" alt="React"></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind"></a>
  <a href="https://typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://github.com/OpceanAI/Doki-web/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-Apache_2.0-555?style=flat" alt="License"></a>
  <a href="https://vercel.com"><img src="https://img.shields.io/badge/Deployed_on-Vercel-000?style=flat&logo=vercel&logoColor=white" alt="Vercel"></a>
</p>

<p align="center">
  <a href="#features">Features</a> &middot;
  <a href="#tech-stack">Tech Stack</a> &middot;
  <a href="#quickstart">Quickstart</a> &middot;
  <a href="#project-structure">Structure</a> &middot;
  <a href="#deployment">Deployment</a> &middot;
  <a href="#contributing">Contributing</a>
</p>

<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/OpceanAI/Doki-web/main/.github/assets/wave.svg" alt="Wave Divider" width="600">
</p>

# The Official Website for Doki

<p align="center">
  Landing page and documentation site for <a href="https://github.com/OpceanAI/Doki">Doki</a> -- the universal container engine<br>
  that runs on Android, Linux, and macOS. Built with Next.js 16, React 19, and Tailwind CSS 4.<br>
  <a href="https://dok1.xyz">dok1.xyz</a> · v0.11.0
</p>

<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/OpceanAI/Doki-web/main/.github/assets/divider.svg" alt="Divider" width="600">
</p>

## Overview

Doki Web is the official marketing and documentation website for the Doki container engine project. Built with modern web technologies, it showcases Doki's capabilities with a fast, accessible, and visually polished experience.

| | |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **UI** | React 19 + shadcn/ui |
| **Styling** | Tailwind CSS 4 |
| **3D** | Three.js + React Three Fiber |
| **Charts** | Recharts |
| **Deploy** | Vercel |
| **Language** | TypeScript 5.7 |

<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/OpceanAI/Doki-web/main/.github/assets/divider.svg" alt="Divider" width="600">
</p>

## Features

| Feature | Description |
|:--------|:------------|
| **Hero Section** | Animated hero with 3D globe, call-to-action, and version badges |
| **Features Grid** | Showcases Doki's key capabilities with icons and descriptions |
| **Benchmarks** | Performance comparison charts and benchmarks |
| **Testimonials** | Community testimonials with globe visualization |
| **Tech Stack** | Visual display of supported technologies and platforms |
| **Responsive** | Fully responsive design for mobile, tablet, and desktop |
| **Dark Mode** | Dark-first design with automatic theme detection |
| **Analytics** | Vercel Analytics integration for production |

<br>

## Tech Stack

| Layer | Technology | Version |
|:------|:-----------|:--------|
| Framework | [Next.js](https://nextjs.org) | 16.2 |
| UI Library | [React](https://react.dev) | 19 |
| Styling | [Tailwind CSS](https://tailwindcss.com) | 4.2 |
| Components | [shadcn/ui](https://ui.shadcn.com) | Latest |
| 3D Graphics | [Three.js](https://threejs.org) + React Three Fiber | 0.184 |
| Charts | [Recharts](https://recharts.org) | 2.15 |
| Icons | [Lucide](https://lucide.dev) | 0.564 |
| Fonts | Inter, JetBrains Mono, Syne | Google Fonts |
| Analytics | [Vercel Analytics](https://vercel.com/analytics) | 1.6 |
| Language | [TypeScript](https://typescriptlang.org) | 5.7 |

<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/OpceanAI/Doki-web/main/.github/assets/wave.svg" alt="Wave Divider" width="600">
</p>

## Quickstart

### Prerequisites

- Node.js 20 or later
- pnpm (recommended) or npm

### Installation

```bash
git clone https://github.com/OpceanAI/Doki-web.git
cd Doki-web
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/OpceanAI/Doki-web/main/.github/assets/divider.svg" alt="Divider" width="600">
</p>

## Project Structure

```
Doki-web/
  app/                    Next.js App Router pages
    layout.tsx            Root layout with fonts and metadata
    page.tsx              Landing page composition
    globals.css           Global styles and Tailwind config
  components/
    doki/                 Site-specific components
      navigation.tsx      Header navigation
      hero.tsx            Hero section with 3D globe
      features.tsx        Features grid
      benchmarks.tsx      Performance charts
      testimonials-globe.tsx  Community testimonials
      tech-stack.tsx      Technology showcase
      cta.tsx             Call-to-action section
      footer.tsx          Site footer
    ui/                   shadcn/ui components
  hooks/                  React hooks
  lib/                    Utility functions
  public/                 Static assets
  styles/                 Additional styles
  next.config.mjs         Next.js configuration
  tailwind.config.ts      Tailwind configuration
  tsconfig.json           TypeScript configuration
  package.json
```

**8 page components. 30+ UI components. Zero backend dependencies.**

<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/OpceanAI/Doki-web/main/.github/assets/divider.svg" alt="Divider" width="600">
</p>

## Development

### Scripts

| Command | Description |
|:--------|:------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

### Adding Components

This project uses [shadcn/ui](https://ui.shadcn.com). To add a new component:

```bash
npx shadcn@latest add button
```

### Environment Variables

No environment variables are required for local development.

For production deployment on Vercel, analytics are automatically enabled.

<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/OpceanAI/Doki-web/main/.github/assets/wave.svg" alt="Wave Divider" width="600">
</p>

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/OpceanAI/Doki-web)

```bash
npx vercel
```

### Docker

```bash
docker build -t doki-web .
docker run -p 3000:3000 doki-web
```

### Static Export

```bash
pnpm build
# Output in .next/
```

<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/OpceanAI/Doki-web/main/.github/assets/divider.svg" alt="Divider" width="600">
</p>

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Areas for Contribution

| Area | Description |
|:-----|:------------|
| **Design** | UI/UX improvements, animations, accessibility |
| **Content** | Documentation, tutorials, translations |
| **Performance** | Image optimization, bundle size, loading speed |
| **Features** | New sections, interactive demos, playground |

<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/OpceanAI/Doki-web/main/.github/assets/divider.svg" alt="Divider" width="600">
</p>

## License

Doki Web is licensed under the Apache 2.0 License.

See [LICENSE](LICENSE) for details.

<br>

## Links

| Platform | Repository |
|:---------|:-----------|
| GitHub | [OpceanAI/Doki-web](https://github.com/OpceanAI/Doki-web) |
| GitLab | [aguitauwu/doki-web](https://gitlab.com/aguitauwu/doki-web) |

### Related

| Repository | Description |
|:-----------|:------------|
| [Doki](https://github.com/OpceanAI/Doki) | The Universal Container Engine |
| [Doki-proot](https://github.com/OpceanAI/Doki-proot) | Forked proot with JSON IPC daemon mode |

<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/OpceanAI/Doki-web/main/.github/assets/footer.svg" alt="Footer" width="400">
</p>

<p align="center">
  <a href="https://github.com/OpceanAI">
    <img src="https://img.shields.io/badge/Made_by_OpceanAI-2026-000?style=flat" alt="OpceanAI">
  </a>
</p>
