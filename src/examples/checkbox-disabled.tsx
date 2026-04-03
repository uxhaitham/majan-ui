import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useDir } from "@/hooks/use-dir"

export default function CheckboxDisabled() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="flex items-center gap-2">
      <Checkbox id="disabled" disabled />
      <Label htmlFor="disabled" className="opacity-50">
        {isRtl ? "تفعيل الإشعارات" : "Enable notifications"}
      </Label>
    </div>
  )
}
