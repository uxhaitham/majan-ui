import { Link, useLocation } from "react-router-dom"
import { Sun, Moon, Search, Palette, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Theme, Mode } from "@/hooks/use-theme"

const NAV_ITEMS = [
  { label: "Components", path: "/components" },
  { label: "Blocks", path: "/blocks" },
  { label: "Charts", path: "/charts" },
]

const PROTOTYPE_PROJECTS = [
  { label: "Pulse", path: "/prototyping/pulse" },
  { label: "Project Flow", path: "/prototyping/project-flow" },
]

const THEMES: { value: Theme; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "khawarizmi", label: "Khawarizmi" },
  { value: "project-flow", label: "Project Flow" },
  { value: "pulse", label: "Pulse" },
]

interface HeaderProps {
  theme: Theme
  mode: Mode
  onThemeChange: (theme: Theme) => void
  onModeToggle: () => void
}

export function Header({
  theme,
  mode,
  onThemeChange,
  onModeToggle,
}: HeaderProps) {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-6">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
              M
            </div>
            <span>Majan UI</span>
          </Link>

          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  location.pathname.startsWith(item.path)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* Prototyping dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  location.pathname.startsWith("/prototyping")
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Prototyping
                <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {PROTOTYPE_PROJECTS.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        {/* Right: Search, Theme, Mode */}
        <div className="ms-auto flex items-center gap-2">
          {/* Search trigger */}
          <button className="inline-flex h-9 items-center gap-2 rounded-md border bg-muted/40 px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium sm:inline">
              ⌘K
            </kbd>
          </button>

          {/* Theme switcher */}
          <div className="relative inline-flex h-9 items-center gap-1.5 rounded-md border px-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
            <Palette className="h-4 w-4 pointer-events-none" />
            <select
              value={theme}
              onChange={(e) => onThemeChange(e.target.value as Theme)}
              aria-label="Select theme"
              className="cursor-pointer appearance-none border-none bg-transparent pe-1 text-sm outline-none"
            >
              {THEMES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dark/Light toggle */}
          <button
            onClick={onModeToggle}
            aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {mode === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
