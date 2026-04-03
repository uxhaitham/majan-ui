import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useDir } from "@/hooks/use-dir"

export default function CardResponsive() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="w-full max-w-md">
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-2xl @[250px]/card:text-3xl @[400px]/card:text-4xl">
            45,678
          </CardTitle>
          <CardDescription>
            <span className="hidden @[300px]/card:inline">
              {isRtl
                ? "إجمالي الزوار خلال الثلاثين يوم الماضية"
                : "Total visitors over the last 30 days"}
            </span>
            <span className="@[300px]/card:hidden">
              {isRtl ? "آخر 30 يوم" : "Last 30 days"}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {isRtl
            ? "يتكيف حجم العنوان والوصف مع عرض البطاقة."
            : "Title size and description adapt to the card width."}
        </CardContent>
      </Card>
    </div>
  )
}
