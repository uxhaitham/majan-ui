import { Badge } from "@/components/ui/badge"
import { useDir } from "@/hooks/use-dir"
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle,
  Circle,
  Clock,
  XCircle,
} from "lucide-react"

export default function BadgeWithIcon() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="flex flex-col gap-6">
      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "مؤشرات الاتجاه" : "Trend indicators"}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="outline">
          <ArrowUpRight />
          +12.5%
        </Badge>
        <Badge variant="outline">
          <ArrowDownRight />
          -4.2%
        </Badge>
        <Badge variant="secondary">
          <ArrowUpRight />
          +8.1%
        </Badge>
      </div>

      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "مؤشرات الحالة" : "Status indicators"}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Badge>
          <CheckCircle />
          {isRtl ? "مكتمل" : "Complete"}
        </Badge>
        <Badge variant="secondary">
          <Clock />
          {isRtl ? "قيد الانتظار" : "Pending"}
        </Badge>
        <Badge variant="outline">
          <Circle />
          {isRtl ? "مسودة" : "Draft"}
        </Badge>
        <Badge variant="destructive">
          <XCircle />
          {isRtl ? "فشل" : "Failed"}
        </Badge>
      </div>
    </div>
  )
}
