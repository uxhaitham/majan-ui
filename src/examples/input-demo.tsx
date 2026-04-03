import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDir } from "@/hooks/use-dir"

export default function InputDemo() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="email">
          {isRtl ? "البريد الإلكتروني" : "Email"}
        </Label>
        <Input
          type="email"
          id="email"
          placeholder={isRtl ? "البريد الإلكتروني" : "Email"}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="disabled">
          {isRtl ? "معطّل" : "Disabled"}
        </Label>
        <Input
          disabled
          type="text"
          id="disabled"
          placeholder={isRtl ? "معطّل" : "Disabled"}
        />
      </div>
    </div>
  )
}
