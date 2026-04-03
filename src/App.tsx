import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { useTheme } from "@/hooks/use-theme"
import { ComponentPage } from "@/pages/component-page"
import { ComponentsIndex } from "@/pages/components-index"
import { PlaceholderPage } from "@/pages/placeholder-page"
import { BlockPage, BlockPreviewPage } from "@/pages/block-page"
import type { ComponentMeta } from "@/lib/registry-config"

function SidebarLayout({
  category,
  constrained = false,
}: {
  category: ComponentMeta["category"]
  constrained?: boolean
}) {
  return (
    <div className="flex">
      <Sidebar category={category} />
      <main className="flex-1 overflow-auto px-8 py-6">
        {constrained ? (
          <div className="mx-auto w-full max-w-[40rem]">
            <Outlet />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  )
}

function DocsLayout() {
  const { theme, setTheme, mode, toggleMode } = useTheme()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        theme={theme}
        mode={mode}
        onThemeChange={setTheme}
        onModeToggle={toggleMode}
      />
      <Outlet />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone preview — no site header/sidebar */}
        <Route path="/blocks/:name/preview" element={<BlockPreviewPage />} />

        {/* Docs site shell */}
        <Route element={<DocsLayout />}>
          <Route path="/" element={<Navigate to="/components" replace />} />
          <Route
            path="/components"
            element={<SidebarLayout category="components" constrained />}
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
                  description="Full-page layouts and templates. Select a block from the sidebar."
                />
              }
            />
            <Route path=":name" element={<BlockPage />} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
