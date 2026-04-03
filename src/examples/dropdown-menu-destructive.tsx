import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDir } from "@/hooks/use-dir"
import { Archive, MoreHorizontal, Pencil, Share2, Trash2 } from "lucide-react"

export default function DropdownMenuDestructive() {
  const { ref, dir, isRtl } = useDir()

  return (
    <div ref={ref}>
      <DropdownMenu dir={dir}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal />
            <span className="sr-only">{isRtl ? "المزيد" : "More"}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="start">
          <DropdownMenuItem>
            <Pencil />
            {isRtl ? "تعديل" : "Edit"}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Share2 />
            {isRtl ? "مشاركة" : "Share"}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Archive />
            {isRtl ? "أرشفة" : "Archive"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Trash2 />
            {isRtl ? "حذف" : "Delete"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
