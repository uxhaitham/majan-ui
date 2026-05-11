import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useDir } from "@/hooks/use-dir"

export default function TextareaDemo() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="message">
          {isRtl ? "رسالة" : "Message"}
        </Label>
        <Textarea
          id="message"
          placeholder={isRtl ? "اكتب رسالتك هنا…" : "Type your message here…"}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="message-disabled">
          {isRtl ? "معطّل" : "Disabled"}
        </Label>
        <Textarea
          id="message-disabled"
          disabled
          placeholder={isRtl ? "للقراءة فقط" : "Read only"}
        />
      </div>
    </div>
  )
}
