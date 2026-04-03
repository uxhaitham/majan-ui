import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useDir } from "@/hooks/use-dir"

export default function SeparatorFixedHeight() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="flex flex-col gap-6">
      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "شريط أدوات رأسي" : "Header toolbar"}
      </p>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          {isRtl ? "الرئيسية" : "Home"}
        </Button>
        <Separator
          orientation="vertical"
          className="mx-1 data-[orientation=vertical]:h-4"
        />
        <Button variant="ghost" size="sm">
          {isRtl ? "المستندات" : "Docs"}
        </Button>
        <Separator
          orientation="vertical"
          className="mx-1 data-[orientation=vertical]:h-4"
        />
        <Button variant="ghost" size="sm">
          {isRtl ? "المكونات" : "Components"}
        </Button>
      </div>
    </div>
  )
}
