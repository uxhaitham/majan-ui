import { useState, useEffect, useCallback } from "react"

export type Theme = "default" | "khawarizmi" | "project-flow" | "pulse"
export type Mode = "light" | "dark"

const THEME_KEY = "majan-theme"
const MODE_KEY = "majan-mode"

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem(THEME_KEY) as Theme) || "default"
  })

  const [mode, setModeState] = useState<Mode>(() => {
    return (localStorage.getItem(MODE_KEY) as Mode) || "dark"
  })

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    localStorage.setItem(THEME_KEY, t)
  }, [])

  const setMode = useCallback((m: Mode) => {
    setModeState(m)
    localStorage.setItem(MODE_KEY, m)
  }, [])

  const toggleMode = useCallback(() => {
    setMode(mode === "dark" ? "light" : "dark")
  }, [mode, setMode])

  useEffect(() => {
    const root = document.documentElement
    if (theme === "default") {
      root.removeAttribute("data-theme")
    } else {
      root.setAttribute("data-theme", theme)
    }
    root.classList.toggle("dark", mode === "dark")
  }, [theme, mode])

  return { theme, setTheme, mode, setMode, toggleMode }
}
