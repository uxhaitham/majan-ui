# CLAUDE.md — Majan UI

A shadcn/ui-compatible component library with OKLCH color tokens, multi-theme support, and per-theme style overrides. Built with React 19, Tailwind CSS v4, Radix UI, and Vite.

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
src/components/ui/    # 22 shadcn v4 components (Radix-based)
src/lib/utils.ts      # cn() utility (shipped via registry)
```

**UI Components**: avatar, badge, breadcrumb, button, card, chart, checkbox, drawer, dropdown-menu, input, label, select, separator, sheet, sidebar, skeleton, sonner, table, tabs, toggle, toggle-group, tooltip

### Block Components (dashboard compositions)

```
src/components/app-sidebar.tsx         # Navigation sidebar
src/components/chart-area-interactive.tsx  # Area chart with date range
src/components/data-table.tsx          # Full data table with sort/filter/drag
src/components/nav-documents.tsx       # Document list nav
src/components/nav-main.tsx            # Main navigation
src/components/nav-secondary.tsx       # Secondary links
src/components/nav-user.tsx            # User avatar + dropdown
src/components/section-cards.tsx       # Stat cards with trends
src/components/site-header.tsx         # Top bar with sidebar trigger
src/app/dashboard/data.json            # Sample data for dashboard block
```

### Docs Site (not shipped)

```
src/App.tsx                    # React Router: /components (constrained width), /blocks, /charts
src/components/header.tsx      # Theme switcher + mode toggle
src/components/sidebar.tsx     # Component navigation
src/components/component-preview.tsx  # Preview + code + install command
src/pages/component-page.tsx   # Multi-example support via import.meta.glob
src/pages/block-page.tsx       # Block preview (iframe-isolated) + full-screen preview route
src/pages/components-index.tsx # Component listing
src/pages/placeholder-page.tsx # Coming soon pages
src/examples/*-demo.tsx        # Default demo per component
src/examples/*-{variant}.tsx   # Additional examples (e.g., separator-vertical.tsx)
src/examples/blocks/*-demo.tsx # Block demos (e.g., dashboard-01-demo.tsx)
src/hooks/use-theme.ts         # Theme + dark/light mode (localStorage)
src/hooks/use-dir.ts           # RTL detection from nearest [dir] ancestor
src/hooks/use-mobile.ts        # Mobile breakpoint detection
src/lib/format.ts              # formatComponentName (docs-only, NOT in registry)
src/lib/registry-config.ts     # Component metadata with categories and groups
```

### Registry

```
registry.json         # Source of truth: components, dependencies, file paths
scripts/build-registry.ts  # Generates public/r/*.json (runs as prebuild)
public/r/*.json        # Generated registry items (gitignored)
components.json        # shadcn CLI config (aliases, style, paths)
```

### Theming

```
src/index.css          # Color tokens + style overrides per theme
```

## Component Patterns

All components follow shadcn v4 with Radix primitives:
- Function components (no `forwardRef`)
- `React.ComponentProps<"element">` or `React.ComponentProps<typeof RadixPrimitive.Root>` for prop types
- `data-slot="component-name"` on root element
- `data-variant={variant}` on components with CVA variants (Button, Badge)
- `data-size={size}` on components with CVA size variants (Button, Avatar)
- CVA for variant management, `cn()` for class merging
- `asChild` prop via Radix `Slot` for polymorphic rendering (Button, Badge)
- No explicit prop type exports (consumers use `React.ComponentProps<typeof Button>`)

## Demo Patterns

- Each component has a default demo: `src/examples/{name}-demo.tsx`
- Additional examples use: `src/examples/{name}-{variant}.tsx` (e.g., `separator-vertical.tsx`)
- `component-page.tsx` auto-discovers all examples via `import.meta.glob` and renders each in its own preview container
- All demos use `useDir()` hook for RTL support — swap text to Arabic when `isRtl` is true
- Attach `ref` from `useDir()` to the demo root element

## Blocks System

- Blocks render in iframes to isolate their layouts (sidebars, providers) from the docs site
- `/blocks/:name` — embedded iframe preview within docs layout
- `/blocks/:name/preview` — standalone route (no docs header/sidebar), used as iframe src
- Theme sync: iframe's `BlockPreviewPage` uses `MutationObserver` on `window.parent.document.documentElement` to mirror `data-theme` and `.dark` class changes from parent
- Dashboard block sets `--header-height` and `--sidebar-width` via inline styles on `SidebarProvider`

## Theming System

**Two axes, one switcher:**
1. **Color tokens** — OKLCH CSS variables per theme (`:root`, `.dark`, `[data-theme]`)
2. **Style overrides** — CSS rules targeting `[data-theme][data-slot]` for shape, spacing, shadows

4 themes: `default` (neutral), `khawarizmi` (teal/government), `project-flow` (indigo/productivity), `pulse` (amber/editorial).

Theme switching: `data-theme` attribute on `<html>`, dark mode via `.dark` class. Flash prevented by inline script in `index.html` (reads query params first, then localStorage).

## File Conventions

- `src/lib/utils.ts` — ONLY contains `cn()`. Do not add docs-site helpers here (they leak into the registry).
- `src/lib/format.ts` — Docs-site-only utilities (formatComponentName, etc.)
- `public/r/` — Generated files, gitignored. Rebuilt on every `pnpm build`.
- Placeholder domain: `majan-ui.example` used consistently across registry.json, component pages, and README.

## Key Dependencies

- **Radix UI** (`radix-ui`) — accessible primitives for all interactive components
- **Recharts** — charts (used by chart component and dashboard block)
- **TanStack Table** — data table
- **dnd-kit** — drag and drop (data table row reordering)
- **Sonner** — toast notifications
- **Vaul** — drawer (mobile bottom sheet)
- **Tabler Icons** — icons in dashboard block components

## Gotchas

- **Radix data attributes**: Radix sets `data-orientation="horizontal"`, NOT `data-horizontal`. Use `data-[orientation=horizontal]:` in Tailwind, not `data-horizontal:` (the latter checks for a boolean attribute that doesn't exist)
- **Portal components and RTL**: Sheet, Drawer, Select render outside the `[dir]` wrapper. Pass `dir={dir}` explicitly on the portal content (e.g., `SheetContent`, `DrawerContent`, `SelectContent`) for RTL to work. Exception: `DropdownMenu` propagates `dir` through Radix context — pass `dir` on the `<DropdownMenu>` root, not on `DropdownMenuContent`
- **Portal components and RTL positioning**: Use logical properties (`end-3`) instead of physical (`right-3`) for elements inside portals that need RTL flipping
- **Vertical separators**: Use `self-stretch` (not `h-full`) for vertical separators in flex containers — `h-full` requires an explicit parent height
- **Iframe theme sync**: Don't use `postMessage` — use `MutationObserver` on `window.parent.document.documentElement` (same-origin iframe)
- **`index.html` flash prevention**: The inline script reads `?mode=` and `?theme=` query params before localStorage, so iframe embeds get the correct initial theme

## Design Specs

- Style system: `docs/superpowers/specs/2026-04-03-majan-ui-style-system-design.md`
