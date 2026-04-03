import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDir } from "@/hooks/use-dir"

export default function SelectTop() {
  const { ref, dir, isRtl } = useDir()

  return (
    <div ref={ref} className="flex flex-col items-start justify-end pt-48">
      <Select defaultValue="10">
        <SelectTrigger className="w-24">
          <SelectValue />
        </SelectTrigger>
        <SelectContent side="top" dir={dir}>
          <SelectItem value="10">10 {isRtl ? "صفوف" : "rows"}</SelectItem>
          <SelectItem value="20">20 {isRtl ? "صفوف" : "rows"}</SelectItem>
          <SelectItem value="50">50 {isRtl ? "صفوف" : "rows"}</SelectItem>
        </SelectContent>
      </Select>
      <p className="mt-2 text-xs text-muted-foreground">
        {isRtl ? "يفتح للأعلى." : "Opens upward."}
      </p>
    </div>
  )
}
