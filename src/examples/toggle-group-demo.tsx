import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useDir } from "@/hooks/use-dir"
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from "lucide-react"

export default function ToggleGroupDemo() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="flex flex-col gap-6">
      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "فردي" : "Single"}
      </p>
      <div className="inline-flex w-fit rounded-lg bg-muted/50">
        <ToggleGroup type="single" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRight />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "متعدد" : "Multiple"}
      </p>
      <div className="inline-flex w-fit rounded-lg bg-muted/50">
        <ToggleGroup type="multiple" defaultValue={["bold"]}>
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "محدد" : "Outline"}
      </p>
      <ToggleGroup type="single" variant="outline" defaultValue="center">
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight />
        </ToggleGroupItem>
      </ToggleGroup>

      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "مع نص" : "With text"}
      </p>
      <ToggleGroup type="single" variant="outline" defaultValue="90d">
        <ToggleGroupItem value="90d">
          {isRtl ? "آخر 3 أشهر" : "Last 3 months"}
        </ToggleGroupItem>
        <ToggleGroupItem value="30d">
          {isRtl ? "آخر 30 يوم" : "Last 30 days"}
        </ToggleGroupItem>
        <ToggleGroupItem value="7d">
          {isRtl ? "آخر 7 أيام" : "Last 7 days"}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
