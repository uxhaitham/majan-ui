import { Link } from "react-router-dom"
import { getComponentGroups } from "@/lib/registry-config"
import { formatComponentName } from "@/lib/format"

export function ComponentsIndex() {
  const groups = getComponentGroups("components")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Components</h1>
        <p className="mt-1 text-muted-foreground">
          Reusable UI components built with Tailwind CSS and OKLCH design tokens.
        </p>
      </div>

      {Object.entries(groups).map(([group, items]) => (
        <div key={group}>
          <h2 className="mb-3 text-lg font-semibold">{group}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Link
                key={item.name}
                to={`/components/${item.name}`}
                className="rounded-lg border p-4 transition-colors hover:bg-accent/50"
              >
                <h3 className="font-medium">
                  {formatComponentName(item.name)}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
