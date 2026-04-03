import { useParams, Navigate, Link } from "react-router-dom"
import { lazy, Suspense, useEffect } from "react"
import { useState } from "react"
import { Maximize, Languages } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatComponentName } from "@/lib/format"
import { useTheme } from "@/hooks/use-theme"

// Auto-discover all prototype view files (excludes views.ts)
const viewModules = import.meta.glob<{ default: React.ComponentType }>(
  "@/prototypes/*/!(views).tsx"
)

const viewComponents: Record<
  string,
  React.LazyExoticComponent<React.ComponentType>
> = {}
for (const key of Object.keys(viewModules)) {
  // key: /src/prototypes/pulse/dashboard.tsx → "pulse/dashboard"
  const parts = key.split("/")
  const project = parts[parts.length - 2]
  const view = parts[parts.length - 1].replace(".tsx", "")
  viewComponents[`${project}/${view}`] = lazy(() => viewModules[key]())
}

// Import all project view registries
const registryModules = import.meta.glob<{
  views: Array<{ name: string; title: string; description: string }>
}>("@/prototypes/*/views.ts", { eager: true })

const projectRegistries: Record<
  string,
  Array<{ name: string; title: string; description: string }>
> = {}
for (const key of Object.keys(registryModules)) {
  const parts = key.split("/")
  const project = parts[parts.length - 2]
  projectRegistries[project] = registryModules[key].views
}

export function PrototypePage() {
  const { project, view } = useParams<{ project: string; view: string }>()
  const { theme, mode } = useTheme()
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  if (!project) return <Navigate to="/components" replace />

  const views = projectRegistries[project]

  if (!views) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <p>Project &ldquo;{project}&rdquo; not found.</p>
      </div>
    )
  }

  // Default to first view if none selected
  const activeView = view ?? views[0]?.name
  if (!view && activeView) {
    return <Navigate to={`/prototyping/${project}/${activeView}`} replace />
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto border-e py-6 pe-4 ps-6">
        <nav className="space-y-6">
          <div>
            <h4 className="mb-2 px-2 text-xs font-medium text-muted-foreground">
              {formatComponentName(project)}
            </h4>
            <ul className="space-y-0.5">
              {views.map((v) => {
                const path = `/prototyping/${project}/${v.name}`
                const isActive = activeView === v.name
                return (
                  <li key={v.name}>
                    <Link
                      to={path}
                      className={cn(
                        "block rounded-md px-2 py-1 text-sm transition-colors",
                        isActive
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-foreground hover:bg-accent/50"
                      )}
                    >
                      {v.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main area */}
      <main className="flex-1 overflow-auto px-8 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {views.find((v) => v.name === activeView)?.title ?? activeView}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {views.find((v) => v.name === activeView)?.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDir(dir === "ltr" ? "rtl" : "ltr")}
              className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label={`Switch to ${dir === "ltr" ? "RTL" : "LTR"} direction`}
            >
              <Languages className="h-3.5 w-3.5" />
              {dir.toUpperCase()}
            </button>
            <Link
              to={`/prototyping/${project}/${activeView}/preview`}
              className="inline-flex items-center justify-center rounded-md border p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label="Full-screen preview"
            >
              <Maximize className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border bg-background">
          <iframe
            src={`/prototyping/${project}/${activeView}/preview?theme=${theme}&mode=${mode}&dir=${dir}`}
            className="h-[800px] w-full border-0"
            title={`${formatComponentName(project)} — ${activeView} preview`}
          />
        </div>
      </main>
    </div>
  )
}

export function PrototypePreviewPage() {
  const { project, view } = useParams<{ project: string; view: string }>()

  // Sync theme with parent window (same-origin iframe)
  useEffect(() => {
    if (window === window.parent) return

    const parentRoot = window.parent.document.documentElement
    const root = document.documentElement

    function sync() {
      const theme = parentRoot.getAttribute("data-theme")
      const isDark = parentRoot.classList.contains("dark")
      const dir = parentRoot.getAttribute("dir")

      if (theme) {
        root.setAttribute("data-theme", theme)
      } else {
        root.removeAttribute("data-theme")
      }
      root.classList.toggle("dark", isDark)

      if (dir) {
        root.setAttribute("dir", dir)
      } else {
        root.removeAttribute("dir")
      }
    }

    sync()

    const observer = new MutationObserver(sync)
    observer.observe(parentRoot, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "dir"],
    })

    return () => observer.disconnect()
  }, [])

  if (!project || !view) return <Navigate to="/components" replace />

  const key = `${project}/${view}`
  const ViewComponent = viewComponents[key]

  if (!ViewComponent) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <p>
          View &ldquo;{view}&rdquo; not found in project &ldquo;{project}
          &rdquo;.
        </p>
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
      <ViewComponent />
    </Suspense>
  )
}
