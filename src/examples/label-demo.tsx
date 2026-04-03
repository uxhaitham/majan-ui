import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDir } from "@/hooks/use-dir"

export default function LabelDemo() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="name">
          {isRtl ? "الاسم" : "Name"}
        </Label>
        <Input
          type="text"
          id="name"
          placeholder={isRtl ? "أدخل اسمك" : "Enter your name"}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="disabled-field">
          {isRtl ? "معطّل" : "Disabled"}
        </Label>
        <Input
          disabled
          type="text"
          id="disabled-field"
          placeholder={isRtl ? "حقل معطّل" : "Disabled input"}
          className="peer"
        />
      </div>
    </div>
  )
}
