import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useDir } from "@/hooks/use-dir"
import { MoreHorizontal, MessageSquare } from "lucide-react"

export default function TaskCardDemo() {
  const { ref, isRtl } = useDir()

  return (
    <Card ref={ref} className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-base">
          {isRtl ? "ترحيل رموز التصميم" : "Design token migration"}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {isRtl
            ? "ترحيل جميع رموز الألوان إلى صيغة OKLCH"
            : "Migrate all color tokens to OKLCH format"}
        </p>
        <CardAction>
          <Button variant="ghost" size="icon" className="size-8" aria-label={isRtl ? "خيارات إضافية" : "More options"}>
            <MoreHorizontal />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Badge>{isRtl ? "قيد التنفيذ" : "In Progress"}</Badge>
          <Badge variant="outline">{isRtl ? "نظام التصميم" : "Design System"}</Badge>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MessageSquare className="size-3.5" />
          <span>{isRtl ? "٣ تعليقات" : "3 comments"}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
