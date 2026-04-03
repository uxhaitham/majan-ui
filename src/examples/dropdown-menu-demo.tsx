import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDir } from "@/hooks/use-dir"

export default function DropdownMenuDemo() {
  const { ref, dir, isRtl } = useDir()

  return (
    <div ref={ref}>
      <DropdownMenu dir={dir}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{isRtl ? "افتح" : "Open"}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="start">
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              {isRtl ? "حسابي" : "My Account"}
            </DropdownMenuLabel>
            <DropdownMenuItem>
              {isRtl ? "الملف الشخصي" : "Profile"}
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {isRtl ? "الفواتير" : "Billing"}
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {isRtl ? "الإعدادات" : "Settings"}
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>{isRtl ? "الفريق" : "Team"}</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {isRtl ? "دعوة مستخدمين" : "Invite users"}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    {isRtl ? "بريد إلكتروني" : "Email"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {isRtl ? "رسالة" : "Message"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    {isRtl ? "المزيد..." : "More..."}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              {isRtl ? "فريق جديد" : "New Team"}
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>GitHub</DropdownMenuItem>
            <DropdownMenuItem>
              {isRtl ? "الدعم" : "Support"}
            </DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              {isRtl ? "تسجيل الخروج" : "Log out"}
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
