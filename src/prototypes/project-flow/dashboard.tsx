import { IconTrendingUp } from "@tabler/icons-react"
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

const stats = [
  { label: "Active Projects", value: "7", detail: "2 due this week" },
  { label: "Open Tasks", value: "34", detail: "12 in progress" },
  { label: "Completed", value: "128", detail: "This quarter" },
  { label: "Team Members", value: "5", detail: "All active" },
]

const recentActivity = [
  { user: "HA", action: "completed", target: "Set up CI pipeline", project: "Majan UI", time: "5m ago" },
  { user: "HA", action: "created", target: "Design token audit", project: "Khawarizmi", time: "20m ago" },
  { user: "HA", action: "moved", target: "Auth middleware refactor", project: "Khawarizmi", time: "1h ago" },
  { user: "HA", action: "commented on", target: "Mobile nav breakpoints", project: "Pulse", time: "2h ago" },
  { user: "HA", action: "completed", target: "RTL support for data table", project: "Majan UI", time: "3h ago" },
]

const projects = [
  { name: "Majan UI", tasks: 8, completed: 5, color: "bg-blue-500" },
  { name: "Khawarizmi", tasks: 14, completed: 9, color: "bg-teal-500" },
  { name: "Pulse", tasks: 12, completed: 7, color: "bg-amber-500" },
]

export default function ProjectFlowDashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
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
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>What&apos;s been happening across projects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-0">
              {recentActivity.map((item, i) => (
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
              <CardTitle>Projects</CardTitle>
              <CardDescription>Task progress by project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {projects.map((project) => (
                <div key={project.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{project.name}</span>
                    <span className="text-muted-foreground">
                      {project.completed}/{project.tasks}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className={`h-2 rounded-full ${project.color}`}
                      style={{ width: `${(project.completed / project.tasks) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
