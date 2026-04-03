# Changelog

## 0.1.0 (2026-04-03)

Initial release.

### Components

- **Button** with 6 variants (default, secondary, outline, ghost, destructive, link) and 4 sizes
- **Badge** with 4 variants, rendered as `<span>` with `data-slot`
- **Card** with composable sub-components (Header, Title, Description, Action, Content, Footer)
- **Input** with focus ring, `aria-invalid` error styling, and file input support
- **Label** with disabled state and peer-disabled support

### Theming

- OKLCH design tokens for all color primitives
- 4 built-in themes: Default (neutral), Khawarizmi (teal), Project Flow (indigo), Pulse (amber)
- Light and dark mode with localStorage persistence and flash-free initialization
- Tailwind CSS v4 `@theme inline` mapping

### Infrastructure

- Self-hosted shadcn registry (`public/r/*.json`) with automatic generation from `registry.json`
- Interactive docs site with live preview, code view, RTL toggle, and copy-to-clipboard
- shadcn v4 component patterns (function components, `data-slot`, `React.ComponentProps`)
