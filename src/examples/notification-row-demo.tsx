import { NotificationRow } from "@/components/notification-row"
import { useDir } from "@/hooks/use-dir"

export default function NotificationRowDemo() {
  const { ref, isRtl } = useDir()
  const locale = isRtl ? "ar" : "en"

  return (
    <div
      ref={ref}
      className="w-full max-w-md rounded-md border bg-card overflow-hidden"
    >
      <NotificationRow
        id="1"
        priority="high"
        locale={locale}
        title={{
          ar: "مخالفة جديدة #2026-0034 · أولوية عالية",
          en: "New violation #2026-0034 · High priority",
        }}
        body={{
          ar: "نورة الحجرية · انستغرام · رمز 9.2.أ. تتطلب مراجعة فورية.",
          en: "Noura Al-Hajria · Instagram · code 9.2.A. Requires immediate review.",
        }}
        link_path="/tenant/violations/2026-0034"
        created_at={new Date().toISOString()}
        onSelect={(id) => console.log("selected", id)}
      />
      <NotificationRow
        id="2"
        priority="normal"
        locale={locale}
        title={{ ar: "تم اعتماد مخالفة #2026-0031", en: "Violation #2026-0031 approved" }}
        body={{
          ar: "سالم البلوشي · تيك توك · بواسطة مراجع ١",
          en: "Salim Al-Balushi · TikTok · by reviewer 1",
        }}
        created_at={new Date(Date.now() - 1000 * 60 * 30).toISOString()}
        onSelect={(id) => console.log("selected", id)}
      />
      <NotificationRow
        id="3"
        priority="normal"
        locale={locale}
        read_at={new Date().toISOString()}
        title={{ ar: "تعليق جديد على #2026-0029", en: "New comment on #2026-0029" }}
        body={{
          ar: "نعمل على المراجعة الداخلية. سنرد قبل نهاية اليوم. — تنفيذي تشغيلي",
          en: "We're reviewing internally and will respond by end of day. — Operator",
        }}
        created_at={new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString()}
        onSelect={(id) => console.log("selected", id)}
      />
    </div>
  )
}
