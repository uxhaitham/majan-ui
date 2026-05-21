import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useDir } from "@/hooks/use-dir"

export default function DialogDemo() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            {isRtl ? "فتح الحوار" : "Open dialog"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isRtl ? "تأكيد الإجراء" : "Confirm action"}
            </DialogTitle>
            <DialogDescription>
              {isRtl
                ? "هل أنت متأكد من المتابعة؟ لا يمكن التراجع."
                : "Are you sure you want to continue? This can't be undone."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline">{isRtl ? "إلغاء" : "Cancel"}</Button>
            <Button>{isRtl ? "تأكيد" : "Confirm"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
