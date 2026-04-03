import { Button } from "@/components/ui/button"
import { useDir } from "@/hooks/use-dir"

export default function ButtonLinkInline() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="flex flex-col gap-4 text-sm">
      <p className="text-muted-foreground">
        {isRtl ? "العنصر:" : "Item:"}{" "}
        <Button variant="link" className="h-auto px-0 text-foreground">
          {isRtl ? "ترحيل رموز التصميم" : "Design token migration"}
        </Button>
      </p>
      <p className="text-muted-foreground">
        {isRtl ? "المشروع:" : "Project:"}{" "}
        <Button variant="link" className="h-auto px-0 text-foreground">
          {isRtl ? "ماجان يو آي" : "Majan UI"}
        </Button>
      </p>
    </div>
  )
}
