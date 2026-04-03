# Prototyping Section Design

## Purpose

Add a "Prototyping" section to the majan-ui docs site where full application views are composed from existing majan-ui components. Prototypes serve as a design sandbox — validate layouts, flows, and interactions before implementing real data, state, and logic in the actual apps.

Initial projects: **Pulse** and **Project Flow**. More will be added over time.

## Core Rule

Every component used in a prototype must exist in the majan-ui component registry (`src/components/ui/`) with a corresponding demo (`src/examples/`). If a prototype needs a new component, add it to the registry first, then use it in the prototype. Prototypes are compositions, not a place to introduce unregistered primitives.

## Navbar

Add a "Prototyping" dropdown to the header navbar, next to the existing Components/Blocks/Charts links. Uses the existing `DropdownMenu` component. Each item navigates to `/prototyping/:project`.

```
Prototyping (dropdown)
  +-- Pulse
  +-- Project Flow
```

Adding a new project later: add an entry to the dropdown list and create its prototype folder.

## Routing

```
/prototyping/:project                  -- sidebar + first view in iframe
/prototyping/:project/:view            -- sidebar + selected view in iframe
/prototyping/:project/:view/preview    -- standalone route (iframe src, no docs shell)
```

The `/preview` route is loaded as the iframe `src`. It runs the prototype view in isolation, free from the docs header and sidebar. This is the same pattern used by the Blocks section (`/blocks/:name/preview`).

## Layout

- **Docs sidebar**: Lists all views for the selected project, grouped by the project's `views.ts` registry. Reuses the existing `Sidebar` component pattern.
- **Main area**: An iframe rendering the selected view's `/preview` route. Iframe is full-width within the main content area.
- **Theme/mode/dir sync**: The iframe's `MutationObserver` watches `window.parent.document.documentElement` for `class`, `data-theme`, and `dir` attribute changes — identical to the existing block preview system in `block-page.tsx`.
- **RTL toggle**: Same per-page toggle button as `BlockPage`, controlling the iframe's `dir` query parameter.

## File Structure

```
src/prototypes/
  pulse/
    views.ts                -- view registry: [{ name, title, description }]
    dashboard.tsx            -- placeholder view (initial)
  project-flow/
    views.ts                -- view registry
    dashboard.tsx            -- placeholder view (initial)
src/pages/
  prototype-page.tsx         -- sidebar + iframe preview (like block-page.tsx)
```

### View Registry Format (`views.ts`)

Each project exports an array of view metadata:

```ts
export const views = [
  { name: "dashboard", title: "Dashboard", description: "Main dashboard view" },
]
```

### Prototype Page (`prototype-page.tsx`)

Exports two components:
- `PrototypePage` — docs layout with sidebar + iframe, RTL toggle, full-screen link. Reads `:project` and `:view` from URL params.
- `PrototypePreviewPage` — standalone route for iframe src. Lazy-loads the view component from `src/prototypes/:project/:view.tsx`.

### Placeholder Views

Each initial placeholder is a simple composition using existing majan-ui components (Card, Badge) showing the project name and view title. Enough to prove routing and navigation work end to end.

## Sidebar Integration

`prototype-page.tsx` renders its own sidebar inline, reading from each project's `views.ts`. Prototype views have a different structure (grouped by project, not by component type), so they use their own sidebar rather than the shared `Sidebar` component from the docs site. This keeps the shared component simple.

## Discovery Pattern for View Components

Use `import.meta.glob` to auto-discover prototype view files:

```ts
const viewModules = import.meta.glob<{ default: React.ComponentType }>(
  "@/prototypes/*/!(views).tsx"
)
```

This matches all `.tsx` files in prototype folders except `views.ts`, making it zero-config to add new views — just drop a file and add the entry to `views.ts`.

## Adding New Projects

1. Create `src/prototypes/<project-name>/views.ts` with the view registry
2. Create view files (e.g., `dashboard.tsx`)
3. Add the project to the dropdown list in `header.tsx`
4. No routing changes needed — `:project` param handles it dynamically

## Adding New Views to Existing Projects

1. Create the view file in `src/prototypes/<project>/`
2. Add the entry to that project's `views.ts`
3. The sidebar and routing pick it up automatically via `import.meta.glob`

## Out of Scope

- Real data, API calls, or state management — prototypes are static UI compositions
- Authentication or user flows — just visual layouts
- Deployment — prototyping section is part of the docs site dev server only
