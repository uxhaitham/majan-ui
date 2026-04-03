import { Separator } from "@/components/ui/separator"
import { useDir } from "@/hooks/use-dir"

export default function SeparatorVertical() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="flex h-5 items-center gap-4 text-sm">
      <div>{isRtl ? "المكونات" : "Components"}</div>
      <Separator orientation="vertical" />
      <div>{isRtl ? "القوالب" : "Blocks"}</div>
      <Separator orientation="vertical" />
      <div>{isRtl ? "الرسوم البيانية" : "Charts"}</div>
    </div>
  )
}
