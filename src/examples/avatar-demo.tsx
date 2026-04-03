import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import { useDir } from "@/hooks/use-dir"

export default function AvatarDemo() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="flex flex-col gap-6">
      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "الأحجام" : "Sizes"}
      </p>
      <div className="flex items-center gap-4">
        <Avatar size="sm">
          <AvatarImage src="https://github.com/shadcn.png" alt={isRtl ? "مستخدم" : "User"} />
          <AvatarFallback>{isRtl ? "ص" : "SM"}</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt={isRtl ? "مستخدم" : "User"} />
          <AvatarFallback>{isRtl ? "عا" : "CN"}</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage src="https://github.com/shadcn.png" alt={isRtl ? "مستخدم" : "User"} />
          <AvatarFallback>{isRtl ? "ك" : "LG"}</AvatarFallback>
        </Avatar>
      </div>

      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "النص البديل" : "Fallback"}
      </p>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback>{isRtl ? "هـ" : "HA"}</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>{isRtl ? "ع" : "JD"}</AvatarFallback>
        </Avatar>
      </div>

      <p className="text-xs font-medium text-muted-foreground">
        {isRtl ? "مجموعة" : "Group"}
      </p>
      <AvatarGroup>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt={isRtl ? "مستخدم" : "User"} />
          <AvatarFallback>م١</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>م٢</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>م٣</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+٥</AvatarGroupCount>
      </AvatarGroup>
    </div>
  )
}
