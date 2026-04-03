import { Skeleton } from "@/components/ui/skeleton"
import { useDir } from "@/hooks/use-dir"

export default function SkeletonText() {
  const { ref } = useDir()

  return (
    <div ref={ref} className="flex w-full max-w-xs flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}
