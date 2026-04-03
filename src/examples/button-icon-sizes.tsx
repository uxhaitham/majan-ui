import { Button } from "@/components/ui/button"
import { useDir } from "@/hooks/use-dir"
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus, Settings } from "lucide-react"

export default function ButtonIconSizes() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="flex flex-col gap-6">
      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "أحجام الأيقونات" : "Icon button sizes"}
      </p>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon-sm">
          <Plus />
        </Button>
        <Button variant="outline" size="icon">
          <Plus />
        </Button>
      </div>

      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "إجراءات الصف" : "Row actions"}
      </p>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon-sm">
          <MoreHorizontal />
        </Button>
        <Button variant="ghost" size="icon-sm">
          <Settings />
        </Button>
      </div>

      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "التنقل بين الصفحات" : "Pagination"}
      </p>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon-sm">
          <ChevronLeft />
        </Button>
        <Button variant="outline" size="icon-sm">
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
