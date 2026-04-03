import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useDir } from "@/hooks/use-dir"

import data from "@/app/dashboard/data.json"

export default function Dashboard01Demo() {
  const { ref, isRtl } = useDir()

  return (
    <SidebarProvider
      ref={ref}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12 + 1px)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" isRtl={isRtl} />
      <SidebarInset>
        <SiteHeader isRtl={isRtl} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards isRtl={isRtl} />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive isRtl={isRtl} />
              </div>
              <DataTable data={data} isRtl={isRtl} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
