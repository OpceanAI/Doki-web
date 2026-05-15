<div align="center">

<img src="https://img.shields.io/badge/Doki_Web-1.0.0-6366F1?style=for-the-badge&labelColor=0A0A0A" alt="Doki Web v1.0.0">
<img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&labelColor=0A0A0A&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&labelColor=0A0A0A&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&labelColor=0A0A0A&logo=tailwindcss&logoColor=06B6D4">
<img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&labelColor=0A0A0A&logo=typescript&logoColor=3178C6">
<img src="https://img.shields.io/badge/License-MIT-6366F1?style=for-the-badge&labelColor=0A0A0A">
<img src="https://img.shields.io/badge/Mirrors-GitHub_|_GitLab-FCA121?style=for-the-badge&labelColor=0A0A0A">

<br><br>

# Doki Web

## The Official Website for Doki Container Engine

Landing page and documentation site for [Doki](https://github.com/OpceanAI/Doki) -- the universal container engine that runs on Android, Linux, and macOS.

<br>

---

**Doki Web** is the official marketing and documentation website for the Doki container engine project. Built with modern web technologies, it showcases Doki's capabilities with a fast, accessible, and visually polished experience.

One framework. One design system. Every device.

---

</div>

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quickstart](#quickstart)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

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

---

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

---

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

---

## Project Structure

```
Doki-web/
├── app/                    Next.js App Router pages
│   ├── layout.tsx          Root layout with fonts and metadata
│   ├── page.tsx            Landing page composition
│   └── globals.css         Global styles and Tailwind config
├── components/
│   ├── doki/               Site-specific components
│   │   ├── navigation.tsx  Header navigation
│   │   ├── hero.tsx        Hero section with 3D globe
│   │   ├── features.tsx    Features grid
│   │   ├── benchmarks.tsx  Performance charts
│   │   ├── testimonials-globe.tsx  Community testimonials
│   │   ├── tech-stack.tsx  Technology showcase
│   │   ├── cta.tsx         Call-to-action section
│   │   └── footer.tsx      Site footer
│   └── ui/                 shadcn/ui components
├── hooks/                  React hooks
├── lib/                    Utility functions
├── public/                 Static assets
├── styles/                 Additional styles
├── next.config.mjs         Next.js configuration
├── tailwind.config.ts      Tailwind configuration
├── tsconfig.json           TypeScript configuration
└── package.json
```

**Statistics:** 8 page components, 30+ UI components, zero backend dependencies.

---

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

---

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

---

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Areas for Contribution

- **Design**: UI/UX improvements, animations, accessibility
- **Content**: Documentation, tutorials, translations
- **Performance**: Image optimization, bundle size, loading speed
- **Features**: New sections, interactive demos, playground

---

## License

Doki Web is licensed under the MIT License.

See [LICENSE](LICENSE) for details.

---

## Mirrors

| Platform | Repository |
|:---------|:-----------|
| GitHub | [OpceanAI/Doki-web](https://github.com/OpceanAI/Doki-web) |
| GitLab | [aguitauwu/doki-web](https://gitlab.com/aguitauwu/doki-web) |

---

## Related Repos

| Repo | Description |
|:-----|:------------|
| [Doki](https://github.com/OpceanAI/Doki) | The Universal Container Engine |
| [Doki-proot](https://github.com/OpceanAI/Doki-proot) | Forked proot with JSON IPC daemon mode |

---

<div align="center">

### The website for the container engine for the other 3 billion devices.

<br>

[![OpceanAI](https://img.shields.io/badge/OpceanAI-2026-0D1117?style=for-the-badge)](https://github.com/OpceanAI)

</div>
