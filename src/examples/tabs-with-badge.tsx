import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useDir } from "@/hooks/use-dir"

export default function TabsWithBadge() {
  const { ref, dir, isRtl } = useDir()

  return (
    <div ref={ref} className="w-full max-w-md">
      <Tabs defaultValue="all" dir={dir}>
        <TabsList className="**:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1">
          <TabsTrigger value="all">
            {isRtl ? "الكل" : "All"}
          </TabsTrigger>
          <TabsTrigger value="active">
            {isRtl ? "نشط" : "Active"} <Badge variant="secondary">12</Badge>
          </TabsTrigger>
          <TabsTrigger value="draft">
            {isRtl ? "مسودة" : "Draft"} <Badge variant="secondary">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="archived">
            {isRtl ? "مؤرشف" : "Archived"}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <p className="p-4 text-sm text-muted-foreground">
            {isRtl ? "عرض جميع العناصر." : "Showing all items."}
          </p>
        </TabsContent>
        <TabsContent value="active">
          <p className="p-4 text-sm text-muted-foreground">
            {isRtl ? "١٢ عنصرًا نشطًا." : "12 active items."}
          </p>
        </TabsContent>
        <TabsContent value="draft">
          <p className="p-4 text-sm text-muted-foreground">
            {isRtl ? "٣ مسودات." : "3 drafts."}
          </p>
        </TabsContent>
        <TabsContent value="archived">
          <p className="p-4 text-sm text-muted-foreground">
            {isRtl ? "لا توجد عناصر مؤرشفة." : "No archived items."}
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
