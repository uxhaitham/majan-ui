import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useDir } from "@/hooks/use-dir"

export default function TooltipDemo() {
  const { ref, isRtl } = useDir()

  return (
    <TooltipProvider>
      <div ref={ref} className="flex items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">
              {isRtl ? "حوّم هنا" : "Hover me"}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isRtl ? "هذا تلميح" : "This is a tooltip"}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary">
              {isRtl ? "أعلى" : "Top"}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{isRtl ? "يظهر في الأعلى" : "Appears on top"}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              {isRtl ? "يمين" : "Right"}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{isRtl ? "يظهر على اليمين" : "Appears on the right"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
