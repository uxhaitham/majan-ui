# Majan UI

A [shadcn/ui](https://ui.shadcn.com)-compatible component library with OKLCH color tokens and multi-theme support. Built with Tailwind CSS v4 and React 19.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Features

- **OKLCH design tokens** for perceptually uniform colors across themes
- **Multi-theme support** with 4 built-in themes (Default, Khawarizmi, Project Flow, Pulse)
- **Light and dark mode** with flash-free switching
- **RTL-ready** layout support
- **shadcn v4 patterns** (function components, `data-slot`, no `forwardRef`)
- **Self-hosted registry** for `shadcn` CLI installation

## Installation

Install individual components using the shadcn CLI:

```bash
pnpm dlx shadcn@latest add "https://majan-ui.example/r/button.json"
pnpm dlx shadcn@latest add "https://majan-ui.example/r/badge.json"
pnpm dlx shadcn@latest add "https://majan-ui.example/r/card.json"
pnpm dlx shadcn@latest add "https://majan-ui.example/r/input.json"
pnpm dlx shadcn@latest add "https://majan-ui.example/r/label.json"
```

> **Note:** `majan-ui.example` is a placeholder domain. Replace it with the actual deployment URL when hosted.

## Theming

Add a `data-theme` attribute to your root element and toggle the `dark` class for mode switching:

```html
<html data-theme="khawarizmi" class="dark">
```

Available themes: `default` (no attribute needed), `khawarizmi`, `project-flow`, `pulse`.

Copy the CSS custom properties from [`src/index.css`](src/index.css) into your project's global stylesheet.

## Components

| Component | Description |
|-----------|-------------|
| **Button** | Variants: default, secondary, outline, ghost, destructive, link. Sizes: default, sm, lg, icon. |
| **Badge** | Inline status indicator. Variants: default, secondary, outline, destructive. |
| **Card** | Composable card with Header, Title, Description, Action, Content, Footer. |
| **Input** | Form input with focus ring, error state (`aria-invalid`), and file input styling. |
| **Label** | Accessible form label with disabled state support. |

## Development

```bash
pnpm install
pnpm dev          # Start the docs site
pnpm build        # Build (auto-generates registry files)
pnpm lint         # Run ESLint
```

## License

[MIT](LICENSE)
