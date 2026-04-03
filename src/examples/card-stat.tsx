import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useDir } from "@/hooks/use-dir"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

export default function CardStat() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>
            {isRtl ? "إجمالي الإيرادات" : "Total Revenue"}
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $1,250.00
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <ArrowUpRight />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            {isRtl ? "ارتفاع هذا الشهر" : "Trending up this month"}{" "}
            <ArrowUpRight className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {isRtl ? "آخر 6 أشهر" : "Last 6 months"}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>
            {isRtl ? "عملاء جدد" : "New Customers"}
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,234
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <ArrowDownRight />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            {isRtl ? "انخفاض هذه الفترة" : "Down this period"}{" "}
            <ArrowDownRight className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {isRtl ? "الاستحواذ يحتاج اهتمام" : "Acquisition needs attention"}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
