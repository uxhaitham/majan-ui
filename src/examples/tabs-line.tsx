import { AppWindowIcon, CodeIcon } from "lucide-react"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useDir } from "@/hooks/use-dir"

export default function TabsLine() {
  const { ref, dir, isRtl } = useDir()

  return (
    <div ref={ref}>
      <Tabs defaultValue="preview" dir={dir}>
        <TabsList variant="line">
          <TabsTrigger value="preview">
            <AppWindowIcon />
            {isRtl ? "معاينة" : "Preview"}
          </TabsTrigger>
          <TabsTrigger value="code">
            <CodeIcon />
            {isRtl ? "الكود" : "Code"}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
