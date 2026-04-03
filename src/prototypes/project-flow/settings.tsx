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
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Workspace */}
        <Card>
          <CardHeader>
            <CardTitle>Workspace</CardTitle>
            <CardDescription>General workspace settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ws-name">Workspace Name</Label>
              <Input id="ws-name" defaultValue="Haitham's Workspace" />
            </div>
            <div className="space-y-2">
              <Label>Default View</Label>
              <Select defaultValue="board">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="board">Board</SelectItem>
                  <SelectItem value="list">List</SelectItem>
                  <SelectItem value="table">Table</SelectItem>
                  <SelectItem value="calendar">Calendar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save</Button>
          </CardFooter>
        </Card>

        {/* Task defaults */}
        <Card>
          <CardHeader>
            <CardTitle>Task Defaults</CardTitle>
            <CardDescription>Default values for new tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default Priority</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Default Assignee</Label>
              <Select defaultValue="me">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="me">Me</SelectItem>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="space-y-3">
              <Label>Auto-actions</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="auto-assign" defaultChecked />
                  <Label htmlFor="auto-assign" className="font-normal">
                    Auto-assign tasks I create to myself
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="auto-close" />
                  <Label htmlFor="auto-close" className="font-normal">
                    Auto-close tasks when all subtasks are done
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="auto-notify" defaultChecked />
                  <Label htmlFor="auto-notify" className="font-normal">
                    Notify on task status changes
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Defaults</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
