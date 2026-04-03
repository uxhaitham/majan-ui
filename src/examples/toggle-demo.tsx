import { Toggle } from "@/components/ui/toggle"
import { useDir } from "@/hooks/use-dir"
import { Bold, Italic, Underline } from "lucide-react"

export default function ToggleDemo() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="flex flex-col gap-6">
      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "افتراضي" : "Default"}
      </p>
      <div className="flex items-center gap-2">
        <Toggle aria-label="Toggle bold">
          <Bold />
        </Toggle>
        <Toggle aria-label="Toggle italic">
          <Italic />
        </Toggle>
        <Toggle aria-label="Toggle underline">
          <Underline />
        </Toggle>
      </div>

      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "محدد" : "Outline"}
      </p>
      <div className="flex items-center gap-2">
        <Toggle variant="outline" aria-label="Toggle bold">
          <Bold />
        </Toggle>
        <Toggle variant="outline" aria-label="Toggle italic">
          <Italic />
        </Toggle>
        <Toggle variant="outline" aria-label="Toggle underline">
          <Underline />
        </Toggle>
      </div>

      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "مع نص" : "With text"}
      </p>
      <div className="flex items-center gap-2">
        <Toggle aria-label="Toggle bold">
          <Bold />
          {isRtl ? "عريض" : "Bold"}
        </Toggle>
        <Toggle aria-label="Toggle italic">
          <Italic />
          {isRtl ? "مائل" : "Italic"}
        </Toggle>
      </div>

      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "الأحجام" : "Sizes"}
      </p>
      <div className="flex items-center gap-2">
        <Toggle size="sm" aria-label="Toggle bold">
          <Bold />
        </Toggle>
        <Toggle aria-label="Toggle bold">
          <Bold />
        </Toggle>
        <Toggle size="lg" aria-label="Toggle bold">
          <Bold />
        </Toggle>
      </div>

      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "معطّل" : "Disabled"}
      </p>
      <div className="flex items-center gap-2">
        <Toggle disabled aria-label="Toggle bold">
          <Bold />
        </Toggle>
        <Toggle variant="outline" disabled aria-label="Toggle italic">
          <Italic />
        </Toggle>
      </div>
    </div>
  )
}
