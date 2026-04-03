import { Separator } from "@/components/ui/separator"
import { useDir } from "@/hooks/use-dir"

export default function SeparatorMenu() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="flex items-center gap-4 text-sm">
      <div className="flex flex-col gap-1">
        <span className="font-medium">
          {isRtl ? "الإعدادات" : "Settings"}
        </span>
        <span className="text-xs text-muted-foreground">
          {isRtl ? "إدارة التفضيلات" : "Manage preferences"}
        </span>
      </div>
      <Separator orientation="vertical" className="self-stretch" />
      <div className="flex flex-col gap-1">
        <span className="font-medium">
          {isRtl ? "الحساب" : "Account"}
        </span>
        <span className="text-xs text-muted-foreground">
          {isRtl ? "الملف الشخصي والأمان" : "Profile & security"}
        </span>
      </div>
      <Separator orientation="vertical" className="self-stretch" />
      <div className="flex flex-col gap-1">
        <span className="font-medium">
          {isRtl ? "المساعدة" : "Help"}
        </span>
        <span className="text-xs text-muted-foreground">
          {isRtl ? "الدعم والتوثيق" : "Support & docs"}
        </span>
      </div>
    </div>
  )
}
