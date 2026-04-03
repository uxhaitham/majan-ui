import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useDir } from "@/hooks/use-dir"

export default function TabsViewSwitcher() {
  const { ref, dir, isRtl } = useDir()

  return (
    <div ref={ref}>
      <Tabs defaultValue="outline" dir={dir}>
        <TabsList className="**:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1">
          <TabsTrigger value="outline">
            {isRtl ? "المخطط" : "Outline"}
          </TabsTrigger>
          <TabsTrigger value="performance">
            {isRtl ? "الأداء" : "Past Performance"}{" "}
            <Badge variant="secondary">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="personnel">
            {isRtl ? "الموظفون" : "Key Personnel"}{" "}
            <Badge variant="secondary">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="documents">
            {isRtl ? "المستندات" : "Focus Documents"}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <p className="mt-4 text-xs text-muted-foreground">
        {isRtl
          ? "علامات تبويب بدون محتوى — تستخدم كمبدل للعرض."
          : "Content-less tabs — used as a toolbar-level view switcher."}
      </p>
    </div>
  )
}
