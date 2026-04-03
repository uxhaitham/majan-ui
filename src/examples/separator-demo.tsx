import { Separator } from "@/components/ui/separator"
import { useDir } from "@/hooks/use-dir"

export default function SeparatorDemo() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="flex max-w-sm flex-col gap-4 text-sm">
      <div className="flex flex-col gap-1.5">
        <div className="leading-none font-medium">
          {isRtl ? "ماجان يو آي" : "Majan UI"}
        </div>
        <div className="text-muted-foreground">
          {isRtl
            ? "مكتبة مكونات متوافقة مع shadcn مع دعم السمات المتعددة."
            : "A shadcn-compatible component library with multi-theme support."}
        </div>
      </div>
      <Separator />
      <div>
        {isRtl
          ? "مجموعة مكونات يمكنك تخصيصها وتوسيعها والبناء عليها."
          : "A set of components you can customize, extend, and build on."}
      </div>
    </div>
  )
}
