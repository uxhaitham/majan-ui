import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { formatComponentName } from "@/lib/format"
import { getComponentGroups, type ComponentMeta } from "@/lib/registry-config"

interface SidebarProps {
  category: ComponentMeta["category"]
}

export function Sidebar({ category }: SidebarProps) {
  const location = useLocation()
  const groups = getComponentGroups(category)

  return (
    <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto border-e py-6 pe-4 ps-6">
      <nav className="space-y-6">
        {Object.entries(groups).map(([group, items]) => (
          <div key={group}>
            <h4 className="mb-2 px-2 text-xs font-medium text-muted-foreground">
              {group}
            </h4>
            <ul className="space-y-0.5">
              {items.map((item) => {
                const path = `/${category}/${item.name}`
                const isActive = location.pathname === path
                return (
                  <li key={item.name}>
                    <Link
                      to={path}
                      className={cn(
                        "block rounded-md px-2 py-1 text-sm transition-colors",
                        isActive
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-foreground hover:bg-accent/50"
                      )}
                    >
                      {formatComponentName(item.name)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
