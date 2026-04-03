import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { useTheme } from "@/hooks/use-theme"
import { ComponentPage } from "@/pages/component-page"
import { ComponentsIndex } from "@/pages/components-index"
import { PlaceholderPage } from "@/pages/placeholder-page"
import type { ComponentMeta } from "@/lib/registry-config"

function SidebarLayout({ category }: { category: ComponentMeta["category"] }) {
  return (
    <div className="flex">
      <Sidebar category={category} />
      <main className="flex-1 overflow-auto px-8 py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  const { theme, setTheme, mode, toggleMode } = useTheme()

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Header
          theme={theme}
          mode={mode}
          onThemeChange={setTheme}
          onModeToggle={toggleMode}
        />
        <Routes>
          <Route path="/" element={<Navigate to="/components" replace />} />
          <Route
            path="/components"
            element={<SidebarLayout category="components" />}
          >
            <Route index element={<ComponentsIndex />} />
            <Route path=":name" element={<ComponentPage />} />
          </Route>
          <Route
            path="/blocks"
            element={<SidebarLayout category="blocks" />}
          >
            <Route
              index
              element={
                <PlaceholderPage
                  title="Blocks"
                  description="Full-page layouts and templates. Coming soon."
                />
              }
            />
          </Route>
          <Route
            path="/charts"
            element={<SidebarLayout category="charts" />}
          >
            <Route
              index
              element={
                <PlaceholderPage
                  title="Charts"
                  description="Data visualization components. Coming soon."
                />
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <PlaceholderPage
                title="404"
                description="Page not found."
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
