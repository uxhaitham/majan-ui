import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useDir } from "@/hooks/use-dir"

const SIDES = ["top", "right", "bottom", "left"] as const
const SIDES_AR: Record<string, string> = {
  top: "أعلى",
  right: "يمين",
  bottom: "أسفل",
  left: "يسار",
}

export default function DrawerSides() {
  const { ref, dir, isRtl } = useDir()

  return (
    <div ref={ref} className="flex flex-wrap gap-2">
      {SIDES.map((side) => (
        <Drawer
          key={side}
          direction={side === "bottom" ? undefined : side}
        >
          <DrawerTrigger asChild>
            <Button variant="outline" className="capitalize">
              {isRtl ? SIDES_AR[side] : side}
            </Button>
          </DrawerTrigger>
          <DrawerContent
            dir={dir}
            className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]"
          >
            <DrawerHeader>
              <DrawerTitle>
                {isRtl ? "تحريك الهدف" : "Move Goal"}
              </DrawerTitle>
              <DrawerDescription>
                {isRtl
                  ? "حدد هدف نشاطك اليومي."
                  : "Set your daily activity goal."}
              </DrawerDescription>
            </DrawerHeader>
            <div className="overflow-y-auto px-4">
              <p className="mb-4 text-sm leading-normal text-muted-foreground">
                {isRtl
                  ? "هذا درج يفتح من الاتجاه المحدد. يمكنك استخدام الأدراج لعرض محتوى إضافي أو نماذج أو إجراءات سريعة."
                  : "This is a drawer that opens from the selected direction. You can use drawers to show additional content, forms, or quick actions."}
              </p>
            </div>
            <DrawerFooter>
              <Button>{isRtl ? "إرسال" : "Submit"}</Button>
              <DrawerClose asChild>
                <Button variant="outline">
                  {isRtl ? "إلغاء" : "Cancel"}
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  )
}
