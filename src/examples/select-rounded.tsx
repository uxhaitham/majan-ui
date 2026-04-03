import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDir } from "@/hooks/use-dir"

export default function SelectRounded() {
  const { ref, dir, isRtl } = useDir()

  return (
    <div ref={ref}>
      <Select defaultValue="90d">
        <SelectTrigger className="w-44 rounded-xl">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-xl" dir={dir}>
          <SelectItem value="7d" className="rounded-lg">
            {isRtl ? "آخر 7 أيام" : "Last 7 days"}
          </SelectItem>
          <SelectItem value="30d" className="rounded-lg">
            {isRtl ? "آخر 30 يوم" : "Last 30 days"}
          </SelectItem>
          <SelectItem value="90d" className="rounded-lg">
            {isRtl ? "آخر 3 أشهر" : "Last 3 months"}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
