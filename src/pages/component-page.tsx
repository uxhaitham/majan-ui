import { useParams, Navigate } from "react-router-dom"
import { lazy, Suspense } from "react"
import { ComponentPreview } from "@/components/component-preview"
import { components } from "@/lib/registry-config"
import { formatComponentName } from "@/lib/format"

// Lazy-load example demos via glob — no manual map needed
const demoModules = import.meta.glob<{ default: React.ComponentType }>(
  "@/examples/*-demo.tsx"
)

// Pre-build a map of name → lazy component so we never call lazy() during render
const demoComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {}
for (const key of Object.keys(demoModules)) {
  const name = key.split("/").pop()!.replace("-demo.tsx", "")
  demoComponents[name] = lazy(() => demoModules[key]())
}

// Source code loaded via Vite ?raw imports
const sources: Record<string, string> = {}

const rawImports = import.meta.glob("@/examples/*-demo.tsx", {
  query: "?raw",
  eager: true,
}) as Record<string, { default: string }>

for (const [path, mod] of Object.entries(rawImports)) {
  const name = path.split("/").pop()!.replace("-demo.tsx", "")
  sources[name] = mod.default
}

export function ComponentPage() {
  const { name } = useParams<{ name: string }>()

  if (!name) return <Navigate to="/components" replace />

  const meta = components.find((c) => c.name === name)
  const DemoComponent = demoComponents[name]
  const source = sources[name]

  if (!meta || !DemoComponent) {
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

      {/* Preview */}
      <ComponentPreview
        code={source || "// Source not available"}
        installCommand={installCommand}
      >
        <Suspense
          fallback={
            <div className="text-sm text-muted-foreground">Loading...</div>
          }
        >
          <DemoComponent />
        </Suspense>
      </ComponentPreview>
    </div>
  )
}
