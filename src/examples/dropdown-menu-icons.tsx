import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDir } from "@/hooks/use-dir"
import {
  Copy,
  Folder,
  LogOut,
  Pencil,
  Settings,
  Share2,
  Star,
  User,
} from "lucide-react"

export default function DropdownMenuIcons() {
  const { ref, dir, isRtl } = useDir()

  return (
    <div ref={ref}>
      <DropdownMenu dir={dir}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {isRtl ? "الإجراءات" : "Actions"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" align="start">
          <DropdownMenuLabel>
            {isRtl ? "الإجراءات" : "Actions"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Pencil />
              {isRtl ? "تعديل" : "Edit"}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy />
              {isRtl ? "نسخ" : "Duplicate"}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Star />
              {isRtl ? "مفضلة" : "Favorite"}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Folder />
              {isRtl ? "نقل إلى" : "Move to"}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 />
              {isRtl ? "مشاركة" : "Share"}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User />
              {isRtl ? "الملف الشخصي" : "Profile"}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              {isRtl ? "الإعدادات" : "Settings"}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut />
            {isRtl ? "تسجيل الخروج" : "Log out"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
