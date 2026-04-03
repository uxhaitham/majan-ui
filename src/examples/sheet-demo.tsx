import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { useDir } from "@/hooks/use-dir"

export default function SheetDemo() {
  const { ref, dir, isRtl } = useDir()

  return (
    <div ref={ref} className="flex gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            {isRtl ? "افتح يمين" : "Open right"}
          </Button>
        </SheetTrigger>
        <SheetContent dir={dir}>
          <SheetHeader>
            <SheetTitle>
              {isRtl ? "تعديل الملف الشخصي" : "Edit profile"}
            </SheetTitle>
            <SheetDescription>
              {isRtl
                ? "قم بإجراء تغييرات على ملفك الشخصي هنا."
                : "Make changes to your profile here."}
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 px-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{isRtl ? "الاسم" : "Name"}</Label>
              <Input
                id="name"
                defaultValue={isRtl ? "هيثم الراوحي" : "Haitham Al Rawahi"}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">
                {isRtl ? "البريد الإلكتروني" : "Email"}
              </Label>
              <Input id="email" defaultValue="haitham@example.com" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">
                {isRtl ? "إلغاء" : "Cancel"}
              </Button>
            </SheetClose>
            <Button>{isRtl ? "حفظ التغييرات" : "Save changes"}</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            {isRtl ? "افتح يسار" : "Open left"}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" dir={dir}>
          <SheetHeader>
            <SheetTitle>{isRtl ? "التنقل" : "Navigation"}</SheetTitle>
            <SheetDescription>
              {isRtl ? "تصفح التطبيق." : "Browse the application."}
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-2 px-4 text-sm">
            <p className="text-muted-foreground">
              {isRtl ? "لوحة التحكم" : "Dashboard"}
            </p>
            <p className="text-muted-foreground">
              {isRtl ? "الإعدادات" : "Settings"}
            </p>
            <p className="text-muted-foreground">
              {isRtl ? "الملف الشخصي" : "Profile"}
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
