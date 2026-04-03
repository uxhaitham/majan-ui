import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useDir } from "@/hooks/use-dir"

export default function TabsResponsiveSelect() {
  const { ref, dir, isRtl } = useDir()
  const [value, setValue] = useState("overview")

  return (
    <div ref={ref} className="w-full max-w-lg @container/tabs-demo">
      <Tabs value={value} onValueChange={setValue} dir={dir}>
        <div className="flex items-center">
          {/* Select on small screens */}
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger size="sm" className="flex w-44 @[480px]/tabs-demo:hidden">
              <SelectValue />
            </SelectTrigger>
            <SelectContent dir={dir}>
              <SelectItem value="overview">
                {isRtl ? "نظرة عامة" : "Overview"}
              </SelectItem>
              <SelectItem value="analytics">
                {isRtl ? "التحليلات" : "Analytics"}
              </SelectItem>
              <SelectItem value="reports">
                {isRtl ? "التقارير" : "Reports"}
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Tabs on large screens */}
          <TabsList className="hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @[480px]/tabs-demo:flex">
            <TabsTrigger value="overview">
              {isRtl ? "نظرة عامة" : "Overview"}
            </TabsTrigger>
            <TabsTrigger value="analytics">
              {isRtl ? "التحليلات" : "Analytics"}{" "}
              <Badge variant="secondary">5</Badge>
            </TabsTrigger>
            <TabsTrigger value="reports">
              {isRtl ? "التقارير" : "Reports"}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview">
          <p className="p-4 text-sm text-muted-foreground">
            {isRtl ? "محتوى النظرة العامة." : "Overview content."}
          </p>
        </TabsContent>
        <TabsContent value="analytics">
          <p className="p-4 text-sm text-muted-foreground">
            {isRtl ? "محتوى التحليلات." : "Analytics content."}
          </p>
        </TabsContent>
        <TabsContent value="reports">
          <p className="p-4 text-sm text-muted-foreground">
            {isRtl ? "محتوى التقارير." : "Reports content."}
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
