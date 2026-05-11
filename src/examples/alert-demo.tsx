import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useDir } from "@/hooks/use-dir"
import { IconAlertCircle, IconInfoCircle } from "@tabler/icons-react"

export default function AlertDemo() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="grid w-full max-w-md gap-3">
      <Alert>
        <IconInfoCircle />
        <AlertTitle>{isRtl ? "معلومة" : "Heads up"}</AlertTitle>
        <AlertDescription>
          {isRtl
            ? "هذا تنبيه افتراضي لإيصال معلومة عامة."
            : "This is a default alert for general information."}
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <IconAlertCircle />
        <AlertTitle>{isRtl ? "خطأ" : "Error"}</AlertTitle>
        <AlertDescription>
          {isRtl
            ? "تعذّر حفظ التغييرات. حاول مرة أخرى."
            : "Could not save changes. Please try again."}
        </AlertDescription>
      </Alert>
    </div>
  )
}
