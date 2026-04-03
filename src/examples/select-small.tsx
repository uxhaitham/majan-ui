import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDir } from "@/hooks/use-dir"

export default function SelectSmall() {
  const { ref, dir, isRtl } = useDir()

  return (
    <div ref={ref} className="flex flex-wrap items-center gap-4">
      <Select defaultValue="10">
        <SelectTrigger size="sm" className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent dir={dir}>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
      <span className="text-sm text-muted-foreground">
        {isRtl ? "صفوف لكل صفحة" : "rows per page"}
      </span>

      <Select defaultValue="90d">
        <SelectTrigger size="sm" className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent dir={dir}>
          <SelectItem value="7d">
            {isRtl ? "آخر 7 أيام" : "Last 7 days"}
          </SelectItem>
          <SelectItem value="30d">
            {isRtl ? "آخر 30 يوم" : "Last 30 days"}
          </SelectItem>
          <SelectItem value="90d">
            {isRtl ? "آخر 3 أشهر" : "Last 3 months"}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
