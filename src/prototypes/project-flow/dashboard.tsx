import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProjectFlowDashboard() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Project Flow</CardTitle>
            <Badge variant="secondary">Prototype</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Dashboard view — placeholder. Replace with actual UI composition.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
