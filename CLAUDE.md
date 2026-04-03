# CLAUDE.md — Majan UI

A shadcn/ui-compatible component library with OKLCH color tokens, multi-theme support, and per-theme style overrides. Built with React 19, Tailwind CSS v4, and Vite.

## Commands

```bash
pnpm dev              # Vite dev server (docs site)
pnpm build            # TypeScript check + Vite build (runs registry:build via prebuild)
pnpm lint             # ESLint
pnpm registry:build   # Generate public/r/*.json from registry.json + source files
```

## Architecture

### Component Library (what consumers install)

```
src/components/ui/    # shadcn v4 components — Button, Badge, Card, Input, Label
src/lib/utils.ts      # cn() utility (shipped via registry)
```

### Docs Site (not shipped)

```
src/App.tsx                    # React Router: /components, /blocks, /charts
src/components/header.tsx      # Theme switcher + mode toggle
src/components/sidebar.tsx     # Component navigation
src/components/component-preview.tsx  # Preview + code + install command
src/examples/*-demo.tsx        # Per-component demo (lazy loaded)
src/pages/component-page.tsx   # Reads demos via import.meta.glob
src/hooks/use-theme.ts         # Theme + dark/light mode (localStorage)
src/lib/format.ts              # formatComponentName (docs-only, NOT in registry)
src/lib/registry-config.ts     # Component metadata
```

### Registry

```
registry.json         # Source of truth: components, dependencies, file paths
scripts/build-registry.ts  # Generates public/r/*.json (runs as prebuild)
public/r/*.json        # Generated registry items (gitignored)
```

### Theming

```
src/index.css          # Color tokens + style overrides per theme
```

## Component Patterns

All components follow shadcn v4:
- Function components (no `forwardRef`)
- `React.ComponentProps<"element">` for prop types
- `data-slot="component-name"` on root element
- `data-variant={variant}` on components with CVA variants (Button, Badge)
- `data-size={size}` on components with CVA size variants (Button)
- CVA for variant management, `cn()` for class merging
- No explicit prop type exports (consumers use `React.ComponentProps<typeof Button>`)

## Theming System

**Two axes, one switcher:**
1. **Color tokens** — OKLCH CSS variables per theme (`:root`, `.dark`, `[data-theme]`)
2. **Style overrides** — CSS rules targeting `[data-theme][data-slot]` for shape, spacing, shadows

4 themes: `default` (neutral), `khawarizmi` (teal/government), `project-flow` (indigo/productivity), `pulse` (amber/editorial).

Theme switching: `data-theme` attribute on `<html>`, dark mode via `.dark` class. Flash prevented by inline script in `index.html`.

## File Conventions

- `src/lib/utils.ts` — ONLY contains `cn()`. Do not add docs-site helpers here (they leak into the registry).
- `src/lib/format.ts` — Docs-site-only utilities (formatComponentName, etc.)
- `public/r/` — Generated files, gitignored. Rebuilt on every `pnpm build`.
- Placeholder domain: `majan-ui.example` used consistently across registry.json, component pages, and README.

## Key Decisions

- **No Radix dependency** — components use native HTML elements, not Radix primitives (no `asChild`/`Slot`)
- **Registry ships base components only** — style overrides are in theme CSS, not baked into component source
- **ESLint warnings for co-exported variants** (`buttonVariants`, `badgeVariants`) are expected and intentional

## Design Specs

- Style system: `docs/superpowers/specs/2026-04-03-majan-ui-style-system-design.md`
