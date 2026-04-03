import { Button } from "@/components/ui/button"
import { Toaster, toast } from "@/components/ui/sonner"
import { useDir } from "@/hooks/use-dir"

export default function SonnerDemo() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="flex flex-wrap items-center gap-2">
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast(isRtl ? "تم الحفظ" : "Event has been created", {
            description: isRtl
              ? "الجمعة، ١٠ أبريل ٢٠٢٦ الساعة ٩:٠٠ صباحاً"
              : "Friday, April 10, 2026 at 9:00 AM",
          })
        }
      >
        {isRtl ? "افتراضي" : "Default"}
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.success(isRtl ? "تمت العملية بنجاح" : "Successfully saved!")
        }
      >
        {isRtl ? "نجاح" : "Success"}
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.error(isRtl ? "حدث خطأ" : "Something went wrong")
        }
      >
        {isRtl ? "خطأ" : "Error"}
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning(
            isRtl ? "يرجى التحقق من المدخلات" : "Please check your input"
          )
        }
      >
        {isRtl ? "تحذير" : "Warning"}
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.info(
            isRtl ? "تم التحديث" : "A new version is available"
          )
        }
      >
        {isRtl ? "معلومات" : "Info"}
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
              loading: isRtl ? "جاري الحفظ..." : "Saving changes...",
              success: isRtl ? "تم الحفظ" : "Changes saved",
              error: isRtl ? "فشل الحفظ" : "Failed to save",
            }
          )
        }
      >
        {isRtl ? "وعد" : "Promise"}
      </Button>
    </div>
  )
}
