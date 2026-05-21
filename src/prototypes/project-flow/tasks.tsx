import { useState } from "react"
import { MoreHorizontalIcon, PencilIcon, CopyIcon, TrashIcon } from "lucide-react"
import { useDir } from "@/hooks/use-dir"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { TaskDrawer } from "./task-drawer"

const tasks = {
  en: [
    { id: "TASK-001", title: "Design token audit", status: "In Progress", priority: "High", project: "Khawarizmi" },
    { id: "TASK-002", title: "Set up CI pipeline", status: "Done", priority: "Medium", project: "Majan UI" },
    { id: "TASK-003", title: "Auth middleware refactor", status: "In Progress", priority: "High", project: "Khawarizmi" },
    { id: "TASK-004", title: "Mobile nav breakpoints", status: "Todo", priority: "Medium", project: "Pulse" },
    { id: "TASK-005", title: "RTL support for select", status: "Done", priority: "Low", project: "Majan UI" },
    { id: "TASK-006", title: "Pipeline error handling", status: "Todo", priority: "High", project: "Pulse" },
    { id: "TASK-007", title: "Gateway rate limiting", status: "In Progress", priority: "Medium", project: "Khawarizmi" },
    { id: "TASK-008", title: "Dashboard chart RTL", status: "Done", priority: "Low", project: "Majan UI" },
  ],
  ar: [
    { id: "TASK-001", title: "تدقيق رموز التصميم", status: "قيد التنفيذ", priority: "عالي", project: "Khawarizmi" },
    { id: "TASK-002", title: "إعداد خط أنابيب CI", status: "مكتمل", priority: "متوسط", project: "Majan UI" },
    { id: "TASK-003", title: "إعادة هيكلة وسيط المصادقة", status: "قيد التنفيذ", priority: "عالي", project: "Khawarizmi" },
    { id: "TASK-004", title: "نقاط توقف التنقل للجوال", status: "للتنفيذ", priority: "متوسط", project: "Pulse" },
    { id: "TASK-005", title: "دعم RTL لعنصر الاختيار", status: "مكتمل", priority: "منخفض", project: "Majan UI" },
    { id: "TASK-006", title: "معالجة أخطاء المعالجة", status: "للتنفيذ", priority: "عالي", project: "Pulse" },
    { id: "TASK-007", title: "تحديد معدل البوابة", status: "قيد التنفيذ", priority: "متوسط", project: "Khawarizmi" },
    { id: "TASK-008", title: "RTL لرسوم لوحة المعلومات", status: "مكتمل", priority: "منخفض", project: "Majan UI" },
  ],
}

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  "In Progress": "default",
  Done: "secondary",
  Todo: "outline",
  "قيد التنفيذ": "default",
  "مكتمل": "secondary",
  "للتنفيذ": "outline",
}

const priorityVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  High: "destructive",
  Medium: "default",
  Low: "secondary",
  "عالي": "destructive",
  "متوسط": "default",
  "منخفض": "secondary",
}

export default function ProjectFlowTasks() {
  const { ref, dir, isRtl } = useDir()
  const lang = isRtl ? "ar" : "en"
  const [selectedTask, setSelectedTask] = useState<typeof tasks.en[number] | null>(null)

  return (
    <div ref={ref} className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {isRtl ? "للتنفيذ" : "Todo"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tabular-nums">
                {tasks.en.filter((t) => t.status === "Todo").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {isRtl ? "قيد التنفيذ" : "In Progress"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tabular-nums">
                {tasks.en.filter((t) => t.status === "In Progress").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {isRtl ? "مكتمل" : "Done"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tabular-nums">
                {tasks.en.filter((t) => t.status === "Done").length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Toolbar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">{isRtl ? "الكل" : "All"}</TabsTrigger>
              <TabsTrigger value="active">{isRtl ? "نشط" : "Active"}</TabsTrigger>
              <TabsTrigger value="done">{isRtl ? "مكتمل" : "Done"}</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <Input placeholder={isRtl ? "بحث في المهام..." : "Search tasks..."} className="w-48" />
            <Select defaultValue="all-projects">
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-projects">{isRtl ? "كل المشاريع" : "All Projects"}</SelectItem>
                <SelectItem value="majan-ui">Majan UI</SelectItem>
                <SelectItem value="khawarizmi">Khawarizmi</SelectItem>
                <SelectItem value="pulse">Pulse</SelectItem>
              </SelectContent>
            </Select>
            <Button>{isRtl ? "مهمة جديدة" : "New Task"}</Button>
          </div>
        </div>

        {/* Task table */}
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="w-10">
                  <div className="flex items-center justify-center">
                    <Checkbox aria-label={isRtl ? "تحديد الكل" : "Select all"} />
                  </div>
                </TableHead>
                <TableHead>{isRtl ? "المهمة" : "Task"}</TableHead>
                <TableHead>{isRtl ? "الحالة" : "Status"}</TableHead>
                <TableHead>{isRtl ? "الأولوية" : "Priority"}</TableHead>
                <TableHead>{isRtl ? "المشروع" : "Project"}</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks[lang].map((task, i) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <Checkbox checked={tasks.en[i].status === "Done"} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <button
                        className="text-sm font-medium text-start hover:underline"
                        onClick={() => setSelectedTask(tasks.en[i])}
                      >
                        {task.title}
                      </button>
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
                  <TableCell>
                    <DropdownMenu dir={dir}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm">
                          <MoreHorizontalIcon className="size-4" />
                          <span className="sr-only">{isRtl ? "فتح القائمة" : "Open menu"}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <PencilIcon />
                          {isRtl ? "تعديل" : "Edit"}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CopyIcon />
                          {isRtl ? "نسخ" : "Duplicate"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          <TrashIcon />
                          {isRtl ? "حذف" : "Delete"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <TaskDrawer
        open={!!selectedTask}
        onOpenChange={(open) => { if (!open) setSelectedTask(null) }}
        task={selectedTask}
        isRtl={isRtl}
        dir={dir}
      />
    </div>
  )
}
