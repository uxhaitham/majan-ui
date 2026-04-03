import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const tasks = [
  { id: "TASK-001", title: "Design token audit", status: "In Progress", priority: "High", project: "Khawarizmi", assignee: "HA" },
  { id: "TASK-002", title: "Set up CI pipeline", status: "Done", priority: "Medium", project: "Majan UI", assignee: "HA" },
  { id: "TASK-003", title: "Auth middleware refactor", status: "In Progress", priority: "High", project: "Khawarizmi", assignee: "HA" },
  { id: "TASK-004", title: "Mobile nav breakpoints", status: "Todo", priority: "Medium", project: "Pulse", assignee: "HA" },
  { id: "TASK-005", title: "RTL support for select", status: "Done", priority: "Low", project: "Majan UI", assignee: "HA" },
  { id: "TASK-006", title: "Pipeline error handling", status: "Todo", priority: "High", project: "Pulse", assignee: "HA" },
  { id: "TASK-007", title: "Gateway rate limiting", status: "In Progress", priority: "Medium", project: "Khawarizmi", assignee: "HA" },
  { id: "TASK-008", title: "Dashboard chart RTL", status: "Done", priority: "Low", project: "Majan UI", assignee: "HA" },
]

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  "In Progress": "default",
  Done: "secondary",
  Todo: "outline",
}

const priorityVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  High: "destructive",
  Medium: "default",
  Low: "secondary",
}

export default function ProjectFlowTasks() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="done">Done</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <Input placeholder="Search tasks..." className="w-48" />
            <Select defaultValue="all-projects">
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-projects">All Projects</SelectItem>
                <SelectItem value="majan-ui">Majan UI</SelectItem>
                <SelectItem value="khawarizmi">Khawarizmi</SelectItem>
                <SelectItem value="pulse">Pulse</SelectItem>
              </SelectContent>
            </Select>
            <Button>New Task</Button>
          </div>
        </div>

        <Separator />

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Todo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tabular-nums">
                {tasks.filter((t) => t.status === "Todo").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tabular-nums">
                {tasks.filter((t) => t.status === "In Progress").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Done
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tabular-nums">
                {tasks.filter((t) => t.status === "Done").length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Task table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10" />
                <TableHead>Task</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Project</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Checkbox checked={task.status === "Done"} />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[task.status]}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={priorityVariant[task.priority]}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {task.project}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}
