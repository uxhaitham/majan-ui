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

export default function PulseSettings() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle>{isRtl ? "الملف الشخصي" : "Profile"}</CardTitle>
            <CardDescription>{isRtl ? "اسمك وبريدك الإلكتروني للإشعارات" : "Your display name and email for notifications"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{isRtl ? "الاسم المعروض" : "Display Name"}</Label>
              <Input id="name" defaultValue={isRtl ? "هيثم" : "Haitham"} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{isRtl ? "البريد الإلكتروني" : "Email"}</Label>
              <Input id="email" type="email" defaultValue="haitham@example.com" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>{isRtl ? "حفظ التغييرات" : "Save Changes"}</Button>
          </CardFooter>
        </Card>

        {/* Feed preferences */}
        <Card>
          <CardHeader>
            <CardTitle>{isRtl ? "تفضيلات الموجز" : "Feed Preferences"}</CardTitle>
            <CardDescription>{isRtl ? "خصّص موجز الأخبار الخاص بك" : "Customize your briefing feed"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{isRtl ? "الترتيب الافتراضي" : "Default Sort"}</Label>
              <Select defaultValue="latest">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">{isRtl ? "الأحدث أولاً" : "Latest First"}</SelectItem>
                  <SelectItem value="popular">{isRtl ? "الأكثر شعبية" : "Most Popular"}</SelectItem>
                  <SelectItem value="relevant">{isRtl ? "الأكثر صلة" : "Most Relevant"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{isRtl ? "تكرار الموجز" : "Briefing Frequency"}</Label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">{isRtl ? "فوري" : "Real-time"}</SelectItem>
                  <SelectItem value="hourly">{isRtl ? "كل ساعة" : "Hourly"}</SelectItem>
                  <SelectItem value="daily">{isRtl ? "ملخص يومي" : "Daily Digest"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="space-y-3">
              <Label>{isRtl ? "الفئات" : "Categories"}</Label>
              <div className="space-y-2">
                {(isRtl
                  ? ["أعمال", "تقنية", "سياسة", "بنية تحتية", "طاقة", "سياحة"]
                  : ["Business", "Tech", "Politics", "Infrastructure", "Energy", "Tourism"]
                ).map(
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
            <Button>{isRtl ? "حفظ التفضيلات" : "Save Preferences"}</Button>
          </CardFooter>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>{isRtl ? "الإشعارات" : "Notifications"}</CardTitle>
            <CardDescription>{isRtl ? "تحكم في كيفية تلقي التحديثات" : "Control how you receive updates"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox id="email-notif" defaultChecked />
              <Label htmlFor="email-notif" className="font-normal">
                {isRtl ? "إشعارات البريد الإلكتروني" : "Email notifications"}
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="breaking" defaultChecked />
              <Label htmlFor="breaking" className="font-normal">
                {isRtl ? "تنبيهات الأخبار العاجلة" : "Breaking news alerts"}
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="weekly" />
              <Label htmlFor="weekly" className="font-normal">
                {isRtl ? "ملخص أسبوعي" : "Weekly summary"}
              </Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button>{isRtl ? "حفظ الإشعارات" : "Save Notifications"}</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
