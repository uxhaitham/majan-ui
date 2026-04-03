import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useDir } from "@/hooks/use-dir"

export default function TabsVertical() {
  const { ref, dir, isRtl } = useDir()

  return (
    <div ref={ref}>
      <Tabs defaultValue="account" orientation="vertical" dir={dir}>
        <TabsList>
          <TabsTrigger value="account">
            {isRtl ? "الحساب" : "Account"}
          </TabsTrigger>
          <TabsTrigger value="password">
            {isRtl ? "كلمة المرور" : "Password"}
          </TabsTrigger>
          <TabsTrigger value="notifications">
            {isRtl ? "الإشعارات" : "Notifications"}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
