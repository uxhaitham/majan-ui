import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useDir } from "@/hooks/use-dir"

export default function CheckboxDemo() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">
          {isRtl
            ? "أوافق على الشروط والأحكام"
            : "Accept terms and conditions"}
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="terms-checked" defaultChecked />
        <div className="flex flex-col gap-1">
          <Label htmlFor="terms-checked">
            {isRtl
              ? "أوافق على الشروط والأحكام"
              : "Accept terms and conditions"}
          </Label>
          <p className="text-sm text-muted-foreground">
            {isRtl
              ? "بالنقر على هذا المربع، فإنك توافق على الشروط."
              : "By clicking this checkbox, you agree to the terms."}
          </p>
        </div>
      </div>
    </div>
  )
}
