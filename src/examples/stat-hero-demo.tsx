import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StatHero } from "@/components/stat-hero"
import { useDir } from "@/hooks/use-dir"

export default function StatHeroDemo() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="w-full max-w-4xl">
      <StatHero
        title={
          isRtl ? (
            <>
              مخالفة <span className="font-medium text-muted-foreground">#2026-0034</span>
            </>
          ) : (
            <>
              Violation <span className="font-medium text-muted-foreground">#2026-0034</span>
            </>
          )
        }
        subtitle={
          isRtl
            ? "نورة الحجرية · انستغرام · @noura.alhajria"
            : "Noura Al-Hajria · Instagram · @noura.alhajria"
        }
        badges={
          <>
            <Badge variant="destructive">{isRtl ? "أولوية عالية" : "High priority"}</Badge>
            <Badge variant="outline">{isRtl ? "ظاهرة للجهة" : "Visible to tenant"}</Badge>
          </>
        }
        fields={[
          { label: isRtl ? "تاريخ الرفع" : "Logged at", value: "2026-05-10 20:12" },
          { label: isRtl ? "تاريخ الاعتماد" : "Approved at", value: "2026-05-11 10:24" },
          { label: isRtl ? "رقم الترخيص" : "License", value: "OM-INFL-2023-0147" },
          { label: isRtl ? "رمز المخالفة" : "Code", value: "9.2.أ" },
        ]}
        actions={
          <>
            <Button variant="outline">{isRtl ? "إضافة تعليق" : "Add comment"}</Button>
            <Button>{isRtl ? "تغيير الحالة" : "Change status"}</Button>
          </>
        }
      />
    </div>
  )
}
