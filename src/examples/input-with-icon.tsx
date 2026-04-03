import { Input } from "@/components/ui/input"
import { useDir } from "@/hooks/use-dir"
import { Mail, Search } from "lucide-react"

export default function InputWithIcon() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="grid w-full max-w-sm gap-4">
      <div className="relative">
        <Search className="absolute start-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          className="ps-8"
          placeholder={isRtl ? "بحث..." : "Search..."}
        />
      </div>
      <div className="relative">
        <Mail className="absolute start-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          type="email"
          className="ps-8"
          placeholder={isRtl ? "البريد الإلكتروني" : "Email address"}
        />
      </div>
    </div>
  )
}
