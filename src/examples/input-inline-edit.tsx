import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDir } from "@/hooks/use-dir"

export default function InputInlineEdit() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="flex flex-col gap-6">
      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "تعديل مضمن" : "Inline edit"}
      </p>
      <div className="flex items-center gap-4">
        <Label className="text-sm text-muted-foreground">
          {isRtl ? "الهدف" : "Target"}
        </Label>
        <Input
          className="h-8 w-20 border-transparent bg-transparent text-end shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background"
          defaultValue="125"
        />
      </div>
      <div className="flex items-center gap-4">
        <Label className="text-sm text-muted-foreground">
          {isRtl ? "الحد" : "Limit"}
        </Label>
        <Input
          className="h-8 w-20 border-transparent bg-transparent text-end shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background"
          defaultValue="500"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {isRtl
          ? "حقول شفافة تظهر الحدود عند التفاعل."
          : "Transparent fields that reveal borders on hover and focus."}
      </p>
    </div>
  )
}
