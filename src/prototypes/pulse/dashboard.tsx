import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"
import { useDir } from "@/hooks/use-dir"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const stats = {
  en: [
    { label: "Articles Today", value: "24", change: "+8", up: true },
    { label: "Active Readers", value: "1,847", change: "+12%", up: true },
    { label: "Avg. Read Time", value: "3.2m", change: "-0.4m", up: false },
    { label: "Engagement", value: "68%", change: "+5%", up: true },
  ],
  ar: [
    { label: "مقالات اليوم", value: "24", change: "+8", up: true },
    { label: "القرّاء النشطون", value: "١٬٨٤٧", change: "+12%", up: true },
    { label: "متوسط وقت القراءة", value: "3.2د", change: "-0.4د", up: false },
    { label: "التفاعل", value: "68%", change: "+5%", up: true },
  ],
}

const recentArticles = {
  en: [
    { title: "Oman announces new tech investment fund", source: "Times of Oman", time: "12m ago", category: "Business" },
    { title: "Regional summit on climate action concludes", source: "Gulf News", time: "34m ago", category: "Politics" },
    { title: "New desalination plant breaks ground in Sur", source: "Muscat Daily", time: "1h ago", category: "Infrastructure" },
    { title: "Omani startup wins Arab innovation award", source: "ONA", time: "2h ago", category: "Tech" },
  ],
  ar: [
    { title: "عُمان تعلن عن صندوق استثمار تقني جديد", source: "تايمز أوف عُمان", time: "قبل 12 د", category: "أعمال" },
    { title: "اختتام القمة الإقليمية للعمل المناخي", source: "جلف نيوز", time: "قبل 34 د", category: "سياسة" },
    { title: "بدء إنشاء محطة تحلية جديدة في صور", source: "مسقط ديلي", time: "قبل ساعة", category: "بنية تحتية" },
    { title: "شركة عُمانية ناشئة تفوز بجائزة الابتكار العربي", source: "وكالة الأنباء العُمانية", time: "قبل ساعتين", category: "تقنية" },
  ],
}

export default function PulseDashboard() {
  const { ref, isRtl } = useDir()
  const lang = isRtl ? "ar" : "en"

  return (
    <div ref={ref} className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats[lang].map((stat) => (
            <Card key={stat.label}>
              <CardHeader>
                <CardDescription>{stat.label}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums">
                  {stat.value}
                </CardTitle>
                <CardAction>
                  <Badge variant="outline">
                    {stat.up ? <IconTrendingUp /> : <IconTrendingDown />}
                    {stat.change}
                  </Badge>
                </CardAction>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent articles — spans 2 cols */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{isRtl ? "آخر المقالات" : "Recent Articles"}</CardTitle>
              <CardDescription>{isRtl ? "آخر الموجزات من جميع المصادر" : "Latest briefings from all sources"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-0">
              {recentArticles[lang].map((article, i) => (
                <div key={article.title}>
                  {i > 0 && <Separator className="my-3" />}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-snug">
                        {article.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {article.source} &middot; {article.time}
                      </p>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {article.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Activity panel */}
          <Card>
            <CardHeader>
              <CardTitle>{isRtl ? "النشاط" : "Activity"}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="today">
                <TabsList className="w-full">
                  <TabsTrigger value="today" className="flex-1">{isRtl ? "اليوم" : "Today"}</TabsTrigger>
                  <TabsTrigger value="week" className="flex-1">{isRtl ? "هذا الأسبوع" : "This Week"}</TabsTrigger>
                </TabsList>
                <TabsContent value="today" className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{isRtl ? "المقالات المنشورة" : "Articles published"}</span>
                    <span className="font-medium">24</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{isRtl ? "المصادر النشطة" : "Sources active"}</span>
                    <span className="font-medium">8</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{isRtl ? "تشغيل المعالجة" : "Pipeline runs"}</span>
                    <span className="font-medium">3</span>
                  </div>
                </TabsContent>
                <TabsContent value="week" className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{isRtl ? "المقالات المنشورة" : "Articles published"}</span>
                    <span className="font-medium">156</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{isRtl ? "المصادر النشطة" : "Sources active"}</span>
                    <span className="font-medium">12</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{isRtl ? "تشغيل المعالجة" : "Pipeline runs"}</span>
                    <span className="font-medium">21</span>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">{isRtl ? "تم التحديث للتو" : "Updated just now"}</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
