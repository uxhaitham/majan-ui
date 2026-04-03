import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useDir } from "@/hooks/use-dir"

export default function AvatarSquare() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="flex flex-col gap-6">
      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "مستدير الزوايا" : "Rounded square"}
      </p>
      <div className="flex items-center gap-4">
        <Avatar size="sm" className="rounded-lg">
          <AvatarImage src="https://github.com/shadcn.png" alt={isRtl ? "مستخدم" : "User"} />
          <AvatarFallback className="rounded-lg">{isRtl ? "ص" : "SM"}</AvatarFallback>
        </Avatar>
        <Avatar className="rounded-lg">
          <AvatarImage src="https://github.com/shadcn.png" alt={isRtl ? "مستخدم" : "User"} />
          <AvatarFallback className="rounded-lg">{isRtl ? "عا" : "CN"}</AvatarFallback>
        </Avatar>
        <Avatar size="lg" className="rounded-lg">
          <AvatarImage src="https://github.com/shadcn.png" alt={isRtl ? "مستخدم" : "User"} />
          <AvatarFallback className="rounded-lg">{isRtl ? "ك" : "LG"}</AvatarFallback>
        </Avatar>
      </div>

      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "مرشح رمادي" : "Grayscale"}
      </p>
      <div className="flex items-center gap-4">
        <Avatar className="rounded-lg grayscale">
          <AvatarImage src="https://github.com/shadcn.png" alt={isRtl ? "مستخدم" : "User"} />
          <AvatarFallback className="rounded-lg">{isRtl ? "ر" : "GS"}</AvatarFallback>
        </Avatar>
        <Avatar className="grayscale">
          <AvatarImage src="https://github.com/shadcn.png" alt={isRtl ? "مستخدم" : "User"} />
          <AvatarFallback>{isRtl ? "ر" : "GS"}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
