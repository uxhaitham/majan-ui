import { Timeline, type TimelineItem } from "@/components/timeline"
import { useDir } from "@/hooks/use-dir"

const HOUR = 1000 * 60 * 60
const now = Date.now()

function makeItems(isRtl: boolean): TimelineItem[] {
  return [
    {
      id: "1",
      type: "event",
      timestamp: new Date(now - 50 * HOUR).toISOString(),
      content: (
        <span>
          <strong className="font-semibold">
            {isRtl ? "تم رفع المخالفة" : "Violation logged"}
          </strong>
          {" "}
          {isRtl ? "بواسطة نظام الرصد الآلي" : "by automated monitor"}
        </span>
      ),
    },
    {
      id: "2",
      type: "event",
      tone: "success",
      timestamp: new Date(now - 28 * HOUR).toISOString(),
      content: (
        <span>
          <strong className="font-semibold">
            {isRtl ? "تم الاعتماد بواسطة المراجع" : "Approved by reviewer"}
          </strong>
          {" "}
          — {isRtl ? "أحمد البلوشي · مراجع تنفيذي" : "Ahmad Al-Balushi · Reviewer"}
        </span>
      ),
    },
    {
      id: "3",
      type: "comment",
      timestamp: new Date(now - 27 * HOUR).toISOString(),
      avatar: (
        <span className="size-full grid place-items-center bg-muted text-xs font-semibold">
          {isRtl ? "أ" : "A"}
        </span>
      ),
      content: (
        <div className="rounded-lg border bg-muted p-3">
          <div className="flex items-center gap-2 mb-1.5 text-xs">
            <span className="font-semibold">
              {isRtl ? "أحمد البلوشي" : "Ahmad Al-Balushi"}
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider bg-muted border">
              {isRtl ? "مراجع" : "Reviewer"}
            </span>
          </div>
          <p>
            {isRtl
              ? "المخالفة موثّقة بدليلين، يرجى مراجعة بند 9.2.أ والرد خلال 48 ساعة."
              : "Documented with two evidence items; please respond within 48 hours."}
          </p>
        </div>
      ),
    },
    {
      id: "4",
      type: "status_change",
      tone: "brand",
      timestamp: new Date(now - 4 * HOUR).toISOString(),
      content: (
        <span>
          <strong className="font-semibold">
            {isRtl ? "تغيير الحالة" : "Status changed"}
          </strong>
          {" — "}
          <span className="inline-block px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs">
            {isRtl ? "ظاهرة للجهة" : "Visible to tenant"}
          </span>
          {" → "}
          <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary text-xs border border-primary/30">
            {isRtl ? "قيد المراجعة الداخلية" : "Under internal review"}
          </span>
        </span>
      ),
    },
  ]
}

export default function TimelineDemo() {
  const { ref, isRtl } = useDir()
  return (
    <div ref={ref} className="w-full max-w-2xl rounded-lg border bg-card p-5">
      <Timeline items={makeItems(isRtl)} />
    </div>
  )
}
