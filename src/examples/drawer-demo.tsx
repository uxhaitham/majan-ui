"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"

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

export default function DrawerDemo() {
  const { ref, dir, isRtl } = useDir()
  const [goal, setGoal] = React.useState(350)

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <div ref={ref}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
            {isRtl ? "افتح الدرج" : "Open Drawer"}
          </Button>
        </DrawerTrigger>
        <DrawerContent dir={dir}>
          <div className="mx-auto w-full max-w-sm">
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
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => onClick(-10)}
                  disabled={goal <= 200}
                >
                  <Minus />
                  <span className="sr-only">
                    {isRtl ? "إنقاص" : "Decrease"}
                  </span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">
                    {goal}
                  </div>
                  <div className="text-[0.70rem] text-muted-foreground uppercase">
                    {isRtl ? "سعرة/يوم" : "Calories/day"}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => onClick(10)}
                  disabled={goal >= 400}
                >
                  <Plus />
                  <span className="sr-only">
                    {isRtl ? "زيادة" : "Increase"}
                  </span>
                </Button>
              </div>
            </div>
            <DrawerFooter>
              <Button>{isRtl ? "إرسال" : "Submit"}</Button>
              <DrawerClose asChild>
                <Button variant="outline">
                  {isRtl ? "إلغاء" : "Cancel"}
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
