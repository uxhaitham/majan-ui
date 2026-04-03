import { Separator } from "@/components/ui/separator"
import { useDir } from "@/hooks/use-dir"

export default function SeparatorList() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="flex w-full max-w-sm flex-col gap-2 text-sm">
      <dl className="flex items-center justify-between">
        <dt>{isRtl ? "الحالة" : "Status"}</dt>
        <dd className="text-muted-foreground">{isRtl ? "نشط" : "Active"}</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>{isRtl ? "السمة" : "Theme"}</dt>
        <dd className="text-muted-foreground">{isRtl ? "الخوارزمي" : "Khawarizmi"}</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>{isRtl ? "المكونات" : "Components"}</dt>
        <dd className="text-muted-foreground">22</dd>
      </dl>
    </div>
  )
}
