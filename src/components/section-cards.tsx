import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards({ isRtl = false }: { isRtl?: boolean }) {
  const t = {
    totalRevenue: isRtl ? "إجمالي الإيرادات" : "Total Revenue",
    trendingUp: isRtl ? "ارتفاع هذا الشهر" : "Trending up this month",
    visitors: isRtl ? "الزوار خلال آخر 6 أشهر" : "Visitors for the last 6 months",
    newCustomers: isRtl ? "عملاء جدد" : "New Customers",
    down20: isRtl ? "انخفاض 20% هذه الفترة" : "Down 20% this period",
    acquisition: isRtl ? "الاستحواذ يحتاج اهتمام" : "Acquisition needs attention",
    activeAccounts: isRtl ? "الحسابات النشطة" : "Active Accounts",
    retention: isRtl ? "معدل احتفاظ قوي" : "Strong user retention",
    engagement: isRtl ? "التفاعل يتجاوز الأهداف" : "Engagement exceed targets",
    growthRate: isRtl ? "معدل النمو" : "Growth Rate",
    steadyGrowth: isRtl ? "زيادة مطردة في الأداء" : "Steady performance increase",
    meetsProjections: isRtl ? "يتوافق مع توقعات النمو" : "Meets growth projections",
  }

  return (
    <div data-slot="section-cards" className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t.totalRevenue}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $1,250.00
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {t.trendingUp} <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {t.visitors}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t.newCustomers}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,234
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {t.down20} <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {t.acquisition}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t.activeAccounts}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45,678
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {t.retention} <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">{t.engagement}</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t.growthRate}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {t.steadyGrowth} <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">{t.meetsProjections}</div>
        </CardFooter>
      </Card>
    </div>
  )
}
