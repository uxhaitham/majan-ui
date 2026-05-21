import { useDir } from "@/hooks/use-dir"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function ProjectFlowSettings() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Workspace */}
        <Card>
          <CardHeader>
            <CardTitle>{isRtl ? "مساحة العمل" : "Workspace"}</CardTitle>
            <CardDescription>{isRtl ? "إعدادات مساحة العمل العامة" : "General workspace settings"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ws-name">{isRtl ? "اسم مساحة العمل" : "Workspace Name"}</Label>
              <Input id="ws-name" defaultValue={isRtl ? "مساحة عمل هيثم" : "Haitham's Workspace"} />
            </div>
            <div className="space-y-2">
              <Label>{isRtl ? "العرض الافتراضي" : "Default View"}</Label>
              <Select defaultValue="board">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="board">{isRtl ? "لوحة" : "Board"}</SelectItem>
                  <SelectItem value="list">{isRtl ? "قائمة" : "List"}</SelectItem>
                  <SelectItem value="table">{isRtl ? "جدول" : "Table"}</SelectItem>
                  <SelectItem value="calendar">{isRtl ? "تقويم" : "Calendar"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button>{isRtl ? "حفظ" : "Save"}</Button>
          </CardFooter>
        </Card>

        {/* Task defaults */}
        <Card>
          <CardHeader>
            <CardTitle>{isRtl ? "إعدادات المهام الافتراضية" : "Task Defaults"}</CardTitle>
            <CardDescription>{isRtl ? "القيم الافتراضية للمهام الجديدة" : "Default values for new tasks"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{isRtl ? "الأولوية الافتراضية" : "Default Priority"}</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">{isRtl ? "منخفض" : "Low"}</SelectItem>
                  <SelectItem value="medium">{isRtl ? "متوسط" : "Medium"}</SelectItem>
                  <SelectItem value="high">{isRtl ? "عالي" : "High"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{isRtl ? "المسؤول الافتراضي" : "Default Assignee"}</Label>
              <Select defaultValue="me">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="me">{isRtl ? "أنا" : "Me"}</SelectItem>
                  <SelectItem value="unassigned">{isRtl ? "غير محدد" : "Unassigned"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="space-y-3">
              <Label>{isRtl ? "الإجراءات التلقائية" : "Auto-actions"}</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="auto-assign" defaultChecked />
                  <Label htmlFor="auto-assign" className="font-normal">
                    {isRtl ? "تعيين المهام التي أنشئها لنفسي تلقائياً" : "Auto-assign tasks I create to myself"}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="auto-close" />
                  <Label htmlFor="auto-close" className="font-normal">
                    {isRtl ? "إغلاق المهام تلقائياً عند اكتمال جميع المهام الفرعية" : "Auto-close tasks when all subtasks are done"}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="auto-notify" defaultChecked />
                  <Label htmlFor="auto-notify" className="font-normal">
                    {isRtl ? "إشعار عند تغيير حالة المهمة" : "Notify on task status changes"}
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>{isRtl ? "حفظ الإعدادات" : "Save Defaults"}</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
