import { Badge } from "@/components/ui/badge"
import { useDir } from "@/hooks/use-dir"
import { CheckCircle, Circle, Clock, Loader2 } from "lucide-react"

export default function BadgeMutedLabel() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="flex flex-col gap-6">
      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "تسميات حالة خفيفة" : "Muted status labels"}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="outline" className="px-1.5 text-muted-foreground">
          <CheckCircle className="fill-green-500 text-white dark:fill-green-400" />
          {isRtl ? "مكتمل" : "Done"}
        </Badge>
        <Badge variant="outline" className="px-1.5 text-muted-foreground">
          <Loader2 className="animate-spin" />
          {isRtl ? "قيد التنفيذ" : "In Progress"}
        </Badge>
        <Badge variant="outline" className="px-1.5 text-muted-foreground">
          <Clock />
          {isRtl ? "مجدول" : "Scheduled"}
        </Badge>
        <Badge variant="outline" className="px-1.5 text-muted-foreground">
          <Circle />
          {isRtl ? "مسودة" : "Draft"}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground">
        {isRtl
          ? "شارات خفيفة كتسميات حالة في خلايا الجدول."
          : "Subtle badges used as status labels in table cells."}
      </p>
    </div>
  )
}
