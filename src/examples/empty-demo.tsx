import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { useDir } from "@/hooks/use-dir"
import { IconInbox } from "@tabler/icons-react"

export default function EmptyDemo() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="w-full max-w-md">
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconInbox />
          </EmptyMedia>
          <EmptyTitle>
            {isRtl ? "لا توجد إشعارات بعد" : "No notifications yet"}
          </EmptyTitle>
          <EmptyDescription>
            {isRtl
              ? "سيظهر هنا أي إشعار جديد."
              : "Anything new will show up here."}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline">{isRtl ? "تحديث" : "Refresh"}</Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
