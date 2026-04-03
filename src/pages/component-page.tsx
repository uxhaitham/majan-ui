import { useParams, Navigate } from "react-router-dom"
import { lazy, Suspense } from "react"
import { ComponentPreview } from "@/components/component-preview"
import { components } from "@/lib/registry-config"
import { formatComponentName } from "@/lib/format"

// Lazy-load all example files: both {name}-demo.tsx and {name}-{variant}.tsx
const allDemoModules = import.meta.glob<{ default: React.ComponentType }>(
  "@/examples/*.tsx"
)

// Raw source for code view
const allRawImports = import.meta.glob("@/examples/*.tsx", {
  query: "?raw",
  eager: true,
}) as Record<string, { default: string }>

interface DemoEntry {
  label: string
  Component: React.LazyExoticComponent<React.ComponentType>
  source: string
}

// Build a map of componentName → [{ label, Component, source }, ...]
const demosByComponent: Record<string, DemoEntry[]> = {}

for (const key of Object.keys(allDemoModules)) {
  const filename = key.split("/").pop()!.replace(".tsx", "")

  // Find which component this belongs to by matching the longest registered name prefix
  const matchedComponent = components
    .filter((c) => c.category === "components" && filename.startsWith(c.name + "-"))
    .sort((a, b) => b.name.length - a.name.length)[0]

  if (!matchedComponent) continue

  const suffix = filename.slice(matchedComponent.name.length + 1) // "demo", "vertical", etc.
  const label = suffix === "demo" ? "Default" : formatComponentName(suffix)

  if (!demosByComponent[matchedComponent.name]) {
    demosByComponent[matchedComponent.name] = []
  }

  demosByComponent[matchedComponent.name].push({
    label,
    Component: lazy(() => allDemoModules[key]()),
    source: allRawImports[key]?.default || "// Source not available",
  })
}

// Sort so "Default" (demo) always comes first
for (const demos of Object.values(demosByComponent)) {
  demos.sort((a, b) => (a.label === "Default" ? -1 : b.label === "Default" ? 1 : 0))
}

export function ComponentPage() {
  const { name } = useParams<{ name: string }>()

  if (!name) return <Navigate to="/components" replace />

  const meta = components.find((c) => c.name === name)
  const demos = demosByComponent[name]

  if (!meta || !demos?.length) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <p>Component "{name}" not found.</p>
      </div>
    )
  }

  const installCommand = `pnpm dlx shadcn@latest add "https://majan-ui.example/r/${name}.json"`

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {formatComponentName(name)}
        </h1>
        <p className="mt-1 text-muted-foreground">{meta.description}</p>
      </div>

      {/* Examples — each in its own preview container */}
      {demos.map((demo) => (
        <div key={demo.label} className="space-y-2">
          {demos.length > 1 && (
            <h2 className="text-sm font-medium text-muted-foreground">
              {demo.label}
            </h2>
          )}
          <ComponentPreview
            code={demo.source}
            installCommand={demo.label === "Default" ? installCommand : undefined}
          >
            <Suspense
              fallback={
                <div className="text-sm text-muted-foreground">Loading...</div>
              }
            >
              <demo.Component />
            </Suspense>
          </ComponentPreview>
        </div>
      ))}
    </div>
  )
}
