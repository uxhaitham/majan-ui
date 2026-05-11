import { NotificationRow } from "@/components/notification-row"
import { TimeGroupedList } from "@/components/time-grouped-list"
import { useDir } from "@/hooks/use-dir"

type Item = {
  id: string
  priority: "high" | "normal"
  title: { ar: string; en: string }
  body: { ar: string; en: string }
  created_at: string
  read_at?: string | null
}

const HOUR = 1000 * 60 * 60
const DAY = HOUR * 24
const now = new Date()

const items: Item[] = [
  {
    id: "1",
    priority: "high",
    title: { ar: "مخالفة جديدة #2026-0034", en: "New violation #2026-0034" },
    body: { ar: "نورة الحجرية · انستغرام · رمز 9.2.أ", en: "Noura · Instagram · code 9.2.A" },
    created_at: new Date(now.getTime() - 2 * HOUR).toISOString(),
  },
  {
    id: "2",
    priority: "normal",
    title: { ar: "تم اعتماد مخالفة #2026-0031", en: "Violation #2026-0031 approved" },
    body: { ar: "سالم البلوشي · تيك توك", en: "Salim · TikTok" },
    created_at: new Date(now.getTime() - 6 * HOUR).toISOString(),
  },
  {
    id: "3",
    priority: "normal",
    title: { ar: "تعليق جديد على #2026-0029", en: "New comment on #2026-0029" },
    body: { ar: "نعمل على المراجعة الداخلية…", en: "We're reviewing internally…" },
    created_at: new Date(now.getTime() - 30 * HOUR).toISOString(),
    read_at: new Date(now.getTime() - 25 * HOUR).toISOString(),
  },
  {
    id: "4",
    priority: "normal",
    title: { ar: "تنبيه: ٣ تراخيص تنتهي خلال أسبوع", en: "3 licenses expiring soon" },
    body: { ar: "OM-INFL-2023-0091 + 2 أخرى", en: "OM-INFL-2023-0091 + 2 more" },
    created_at: new Date(now.getTime() - 3 * DAY).toISOString(),
    read_at: new Date(now.getTime() - 2 * DAY).toISOString(),
  },
  {
    id: "5",
    priority: "normal",
    title: { ar: "تذكير: مراجعة شهرية", en: "Reminder: monthly review" },
    body: { ar: "موعد التقرير الشهري قريب.", en: "Monthly report deadline soon." },
    created_at: new Date(now.getTime() - 10 * DAY).toISOString(),
    read_at: new Date(now.getTime() - 9 * DAY).toISOString(),
  },
]

export default function TimeGroupedListDemo() {
  const { ref, isRtl } = useDir()
  const locale = isRtl ? "ar" : "en"

  return (
    <div ref={ref} className="w-full max-w-md rounded-md border bg-card overflow-hidden">
      <TimeGroupedList
        items={items}
        getDate={(item) => item.created_at}
        locale={locale}
        renderItem={(item) => (
          <NotificationRow
            id={item.id}
            priority={item.priority}
            locale={locale}
            title={item.title}
            body={item.body}
            created_at={item.created_at}
            read_at={item.read_at}
          />
        )}
      />
    </div>
  )
}
