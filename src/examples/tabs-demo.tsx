import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useDir } from "@/hooks/use-dir"

export default function TabsDemo() {
  const { ref, dir, isRtl } = useDir()

  return (
    <div ref={ref} className="w-full max-w-md">
      <Tabs defaultValue="overview" dir={dir}>
        <TabsList>
          <TabsTrigger value="overview">
            {isRtl ? "نظرة عامة" : "Overview"}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {isRtl ? "التحليلات" : "Analytics"}
          </TabsTrigger>
          <TabsTrigger value="reports">
            {isRtl ? "التقارير" : "Reports"}
          </TabsTrigger>
          <TabsTrigger value="settings">
            {isRtl ? "الإعدادات" : "Settings"}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>{isRtl ? "نظرة عامة" : "Overview"}</CardTitle>
              <CardDescription>
                {isRtl
                  ? "عرض المقاييس الرئيسية ونشاط المشروع الأخير."
                  : "View your key metrics and recent project activity."}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {isRtl
                ? "لديك ١٢ مشروعًا نشطًا و٣ مهام معلّقة."
                : "You have 12 active projects and 3 pending tasks."}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>{isRtl ? "التحليلات" : "Analytics"}</CardTitle>
              <CardDescription>
                {isRtl
                  ? "تتبع الأداء ومقاييس تفاعل المستخدمين."
                  : "Track performance and user engagement metrics."}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {isRtl
                ? "زيارات الصفحة ارتفعت بنسبة ٢٥٪ مقارنة بالشهر الماضي."
                : "Page views are up 25% compared to last month."}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>{isRtl ? "التقارير" : "Reports"}</CardTitle>
              <CardDescription>
                {isRtl
                  ? "إنشاء وتحميل التقارير التفصيلية."
                  : "Generate and download your detailed reports."}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {isRtl
                ? "لديك ٥ تقارير جاهزة للتصدير."
                : "You have 5 reports ready and available to export."}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>{isRtl ? "الإعدادات" : "Settings"}</CardTitle>
              <CardDescription>
                {isRtl
                  ? "إدارة تفضيلات حسابك وخياراته."
                  : "Manage your account preferences and options."}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {isRtl
                ? "إعدادات الإشعارات والأمان والسمات."
                : "Configure notifications, security, and themes."}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
