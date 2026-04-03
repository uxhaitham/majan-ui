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

export default function PulseSettings() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your display name and email for notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input id="name" defaultValue="Haitham" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="haitham@example.com" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>

        {/* Feed preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Feed Preferences</CardTitle>
            <CardDescription>Customize your briefing feed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default Sort</Label>
              <Select defaultValue="latest">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="relevant">Most Relevant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Briefing Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="space-y-3">
              <Label>Categories</Label>
              <div className="space-y-2">
                {["Business", "Tech", "Politics", "Infrastructure", "Energy", "Tourism"].map(
                  (cat) => (
                    <div key={cat} className="flex items-center gap-2">
                      <Checkbox id={cat} defaultChecked />
                      <Label htmlFor={cat} className="font-normal">
                        {cat}
                      </Label>
                    </div>
                  )
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Preferences</Button>
          </CardFooter>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Control how you receive updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox id="email-notif" defaultChecked />
              <Label htmlFor="email-notif" className="font-normal">
                Email notifications
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="breaking" defaultChecked />
              <Label htmlFor="breaking" className="font-normal">
                Breaking news alerts
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="weekly" />
              <Label htmlFor="weekly" className="font-normal">
                Weekly summary
              </Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Notifications</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
