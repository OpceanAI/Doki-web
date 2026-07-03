# Contributing to Doki Web

Thank you for your interest in contributing to Doki Web!

## Build Instructions

### Prerequisites

- Node.js 20 or later
- pnpm (recommended) or npm

### Building

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start
```

### Testing

```bash
# Run linter
pnpm lint

# Type checking
npx tsc --noEmit
```

## Code Style

- Follow the existing code conventions
- Use Prettier for formatting (auto-format on save)
- Use ESLint with the project's configuration
- Use Tailwind CSS for styling
- Use TypeScript for all new code
- Use `cn()` utility for conditional class merging
- Keep components small and focused

## Project Structure

```
app/              - Next.js App Router pages and layouts
components/
  doki/           - Site-specific components (hero, features, etc.)
  ui/             - shadcn/ui reusable components
hooks/            - Custom React hooks
lib/              - Utility functions and shared code
public/           - Static assets (images, fonts)
styles/           - Global styles and CSS
```

## Adding Components

This project uses [shadcn/ui](https://ui.shadcn.com). To add a new component:

```bash
npx shadcn@latest add button
```

## Pull Request Process

1. Fork the repository and create your branch from `main`
2. Run `pnpm install` to install dependencies
3. Make your changes
4. Ensure `pnpm lint` passes
5. Ensure `npx tsc --noEmit` passes (no type errors)
6. Ensure `pnpm build` succeeds
7. Test on mobile, tablet, and desktop viewports
8. Open a pull request with a clear description

## Areas for Contribution

- **Design**: UI/UX improvements, animations, accessibility
- **Content**: Documentation, tutorials, translations
- **Performance**: Image optimization, bundle size, loading speed
- **Features**: New sections, interactive demos, playground

## Commit Style

- Use imperative mood ("Add feature" not "Added feature")
- Keep the first line under 72 characters
- Reference issues when applicable
- Example: `Add benchmark comparison chart component`
