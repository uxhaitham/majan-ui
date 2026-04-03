import { Badge } from "@/components/ui/badge"
import { useDir } from "@/hooks/use-dir"

export default function BadgeDemo() {
  const { ref, isRtl } = useDir()

  const t = {
    default: isRtl ? "افتراضي" : "Default",
    secondary: isRtl ? "ثانوي" : "Secondary",
    outline: isRtl ? "محدد" : "Outline",
    destructive: isRtl ? "حذف" : "Destructive",
  }

  return (
    <div ref={ref} className="flex flex-wrap items-center gap-3">
      <Badge>{t.default}</Badge>
      <Badge variant="secondary">{t.secondary}</Badge>
      <Badge variant="outline">{t.outline}</Badge>
      <Badge variant="destructive">{t.destructive}</Badge>
    </div>
  )
}
