# Nextra Documentation Site

[한국어](README-ko.md) | English

A multilingual documentation site built with Next.js and Nextra, running in a Turborepo monorepo environment.

## Tech Stack

- Next.js 15.5.4
- Nextra 4.5.1
- React 19.1.1
- TypeScript 5.9.2
- Tailwind CSS 4.1.13
- Turbopack

## Features

- Multilingual Support: Korean, English
- Server Component Architecture
- Fast Development with Turbopack
- Dropdown Language Switcher
- Dark Mode Support
- Copy Page Feature

## Requirements

- Node.js 20.x or higher
- pnpm 9.x or higher

## Installation and Running

Run these commands from the project root:

```bash
# Install dependencies
pnpm install

# Run development server (Turbopack)
turbo dev --filter=docs
```

Open `http://localhost:7822` in your browser.

## Build

```bash
# Production build
turbo build --filter=docs

# Run production build
turbo start --filter=docs
```

## Cache Management

```bash
# Clean build cache
turbo clean --filter=docs
```

## Project Structure

```
apps/docs/
├── src/
│   ├── app/
│   │   └── [lang]/           # Language routing
│   ├── content/
│   │   ├── ko/               # Korean content
│   │   └── en/               # English content
│   ├── i18n/                 # i18n configuration
│   ├── widgets/              # UI components
│   └── components/           # Shadcn UI components
├── public/                   # Static files
└── next.config.ts            # Next.js configuration
```

## Content Writing

Write content in MDX format under `src/content/{lang}`.

```
src/content/
├── ko/
│   ├── _meta.tsx             # Navigation metadata
│   ├── index.mdx             # Homepage
│   └── docs/
│       ├── _meta.tsx
│       └── index.mdx
└── en/
    └── ...
```

## i18n Configuration

To add a new language, modify these files:

- `src/i18n/index.ts`: Add language to list
- `src/i18n/{lang}.ts`: Create translation file
- `src/content/{lang}/`: Create content folder
- `next.config.ts`: Add to locales array

## Using Shadcn UI

Add components using this command:

```bash
cd apps/docs
pnpm dlx shadcn@latest add {component-name}
```

## License

MIT License | Copyright © 2025
