import { useParams, Navigate, Link } from "react-router-dom"
import { lazy, Suspense, useEffect, useState } from "react"
import { Maximize, Languages } from "lucide-react"
import { components } from "@/lib/registry-config"
import { formatComponentName } from "@/lib/format"
import { useTheme } from "@/hooks/use-theme"

const blockModules = import.meta.glob<{ default: React.ComponentType }>(
  "@/examples/blocks/*-demo.tsx"
)

const blockComponents: Record<
  string,
  React.LazyExoticComponent<React.ComponentType>
> = {}
for (const key of Object.keys(blockModules)) {
  const name = key.split("/").pop()!.replace("-demo.tsx", "")
  blockComponents[name] = lazy(() => blockModules[key]())
}

export function BlockPage() {
  const { name } = useParams<{ name: string }>()
  const { theme, mode } = useTheme()
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  if (!name) return <Navigate to="/blocks" replace />

  const meta = components.find((c) => c.name === name && c.category === "blocks")

  if (!meta || !blockComponents[name]) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <p>Block "{name}" not found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {formatComponentName(name)}
          </h1>
          <p className="mt-1 text-muted-foreground">{meta.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDir(dir === "ltr" ? "rtl" : "ltr")}
            className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label={`Switch to ${dir === "ltr" ? "RTL" : "LTR"} direction`}
          >
            <Languages className="h-3.5 w-3.5" />
            {dir === "ltr" ? "RTL" : "LTR"}
          </button>
          <Link
            to={`/blocks/${name}/preview`}
            className="inline-flex items-center justify-center rounded-md border p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="Full-screen preview"
          >
            <Maximize className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border bg-background">
        <iframe
          src={`/blocks/${name}/preview?theme=${theme}&mode=${mode}&dir=${dir}`}
          className="h-[800px] w-full border-0"
          title={`${formatComponentName(name)} preview`}
        />
      </div>
    </div>
  )
}

export function BlockPreviewPage() {
  const { name } = useParams<{ name: string }>()

  // dir is handled by the inline script in index.html (runs before React mounts)

  // Sync theme with parent window (same-origin iframe)
  useEffect(() => {
    // Not in an iframe — standalone preview, use localStorage via useTheme
    if (window === window.parent) return

    const parentRoot = window.parent.document.documentElement
    const root = document.documentElement

    function sync() {
      const theme = parentRoot.getAttribute("data-theme")
      const isDark = parentRoot.classList.contains("dark")

      if (theme) {
        root.setAttribute("data-theme", theme)
      } else {
        root.removeAttribute("data-theme")
      }
      root.classList.toggle("dark", isDark)
    }

    // Sync immediately
    sync()

    // Watch parent <html> for class/attribute changes
    const observer = new MutationObserver(sync)
    observer.observe(parentRoot, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    })

    return () => observer.disconnect()
  }, [])

  if (!name) return <Navigate to="/blocks" replace />

  const DemoComponent = blockComponents[name]

  if (!DemoComponent) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <p>Block "{name}" not found.</p>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center text-sm text-muted-foreground">
          Loading...
        </div>
      }
    >
      <DemoComponent />
    </Suspense>
  )
}
