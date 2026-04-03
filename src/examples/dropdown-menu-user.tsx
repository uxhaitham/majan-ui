import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
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
import { CreditCard, LogOut, Settings, User } from "lucide-react"

export default function DropdownMenuUser() {
  const { ref, dir, isRtl } = useDir()

  return (
    <div ref={ref}>
      <DropdownMenu dir={dir}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 px-2">
            <Avatar className="size-8 rounded-lg">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt={isRtl ? "مستخدم" : "User"}
              />
              <AvatarFallback className="rounded-lg">
                {isRtl ? "هـ" : "HA"}
              </AvatarFallback>
            </Avatar>
            <div className="grid text-start text-sm leading-tight">
              <span className="font-medium">
                {isRtl ? "هيثم الرواحي" : "Haitham Al Rawahi"}
              </span>
              <span className="text-xs text-muted-foreground">
                haitham@example.com
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-56 rounded-lg" align="start">
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
              <Avatar className="size-8 rounded-lg">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt={isRtl ? "مستخدم" : "User"}
                />
                <AvatarFallback className="rounded-lg">
                  {isRtl ? "هـ" : "HA"}
                </AvatarFallback>
              </Avatar>
              <div className="grid text-start text-sm leading-tight">
                <span className="font-medium">
                  {isRtl ? "هيثم الرواحي" : "Haitham Al Rawahi"}
                </span>
                <span className="text-xs text-muted-foreground">
                  haitham@example.com
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User />
              {isRtl ? "الحساب" : "Account"}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard />
              {isRtl ? "الفواتير" : "Billing"}
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
