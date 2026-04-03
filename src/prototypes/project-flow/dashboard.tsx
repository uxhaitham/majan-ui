import { IconTrendingUp } from "@tabler/icons-react"
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const stats = {
  en: [
    { label: "Active Projects", value: "7", detail: "2 due this week" },
    { label: "Open Tasks", value: "34", detail: "12 in progress" },
    { label: "Completed", value: "128", detail: "This quarter" },
    { label: "Team Members", value: "5", detail: "All active" },
  ],
  ar: [
    { label: "المشاريع النشطة", value: "٧", detail: "٢ مستحقة هذا الأسبوع" },
    { label: "المهام المفتوحة", value: "٣٤", detail: "١٢ قيد التنفيذ" },
    { label: "المكتملة", value: "١٢٨", detail: "هذا الربع" },
    { label: "أعضاء الفريق", value: "٥", detail: "الكل نشط" },
  ],
}

const recentActivity = {
  en: [
    { user: "HA", action: "completed", target: "Set up CI pipeline", project: "Majan UI", time: "5m ago" },
    { user: "HA", action: "created", target: "Design token audit", project: "Khawarizmi", time: "20m ago" },
    { user: "HA", action: "moved", target: "Auth middleware refactor", project: "Khawarizmi", time: "1h ago" },
    { user: "HA", action: "commented on", target: "Mobile nav breakpoints", project: "Pulse", time: "2h ago" },
    { user: "HA", action: "completed", target: "RTL support for data table", project: "Majan UI", time: "3h ago" },
  ],
  ar: [
    { user: "هـ", action: "أكمل", target: "إعداد خط أنابيب CI", project: "Majan UI", time: "قبل 5 د" },
    { user: "هـ", action: "أنشأ", target: "تدقيق رموز التصميم", project: "Khawarizmi", time: "قبل 20 د" },
    { user: "هـ", action: "نقل", target: "إعادة هيكلة وسيط المصادقة", project: "Khawarizmi", time: "قبل ساعة" },
    { user: "هـ", action: "علّق على", target: "نقاط توقف التنقل للجوال", project: "Pulse", time: "قبل ساعتين" },
    { user: "هـ", action: "أكمل", target: "دعم RTL لجدول البيانات", project: "Majan UI", time: "قبل 3 ساعات" },
  ],
}

const projects = [
  { name: "Majan UI", tasks: 8, completed: 5, color: "bg-chart-1" },
  { name: "Khawarizmi", tasks: 14, completed: 9, color: "bg-chart-2" },
  { name: "Pulse", tasks: 12, completed: 7, color: "bg-chart-4" },
]

export default function ProjectFlowDashboard() {
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
                    <IconTrendingUp />
                    Active
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter>
                <p className="text-xs text-muted-foreground">{stat.detail}</p>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{isRtl ? "النشاط الأخير" : "Recent Activity"}</CardTitle>
              <CardDescription>{isRtl ? "ما يحدث عبر المشاريع" : "What's been happening across projects"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-0">
              {recentActivity[lang].map((item, i) => (
                <div key={`${item.target}-${item.time}`}>
                  {i > 0 && <Separator className="my-3" />}
                  <div className="flex items-start gap-3">
                    <Avatar className="mt-0.5 size-7">
                      <AvatarFallback className="text-[10px]">{item.user}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-0.5">
                      <p className="text-sm">
                        <span className="font-medium">{item.action}</span>{" "}
                        {item.target}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.project} &middot; {item.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Projects summary */}
          <Card>
            <CardHeader>
              <CardTitle>{isRtl ? "المشاريع" : "Projects"}</CardTitle>
              <CardDescription>{isRtl ? "تقدم المهام حسب المشروع" : "Task progress by project"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {projects.map((project) => (
                <div key={project.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${project.color}`} />
                    <span className="text-sm font-medium">{project.name}</span>
                  </div>
                  <Badge variant="secondary">
                    {project.completed}/{project.tasks}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
