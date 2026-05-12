import * as React from "react"

import { cn } from "@/lib/utils"

function Timeline({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="timeline"
      className={cn(
        "relative flex flex-col gap-0 border-s border-border ps-6",
        className
      )}
      {...props}
    />
  )
}

type TimelineItemProps = React.ComponentProps<"li"> & {
  time: React.ReactNode
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
}

function TimelineItem({
  time,
  icon,
  title,
  description,
  className,
  ...props
}: TimelineItemProps) {
  return (
    <li
      data-slot="timeline-item"
      className={cn("relative pb-6 last:pb-0", className)}
      {...props}
    >
      <span
        aria-hidden="true"
        data-slot="timeline-dot"
        className={cn(
          "absolute -start-[calc(0.25rem+1px+1.5rem)] top-1 flex size-3.5 items-center justify-center rounded-full border-2 border-background bg-muted-foreground text-background [&_svg]:size-2.5"
        )}
      >
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <time
          data-slot="timeline-time"
          className="text-xs tabular-nums text-muted-foreground"
        >
          {time}
        </time>
        <div
          data-slot="timeline-title"
          className="text-sm font-medium leading-snug text-foreground"
        >
          {title}
        </div>
        {description ? (
          <div
            data-slot="timeline-description"
            className="text-sm leading-relaxed text-muted-foreground"
          >
            {description}
          </div>
        ) : null}
      </div>
    </li>
  )
}

function TimelineConnector({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      data-slot="timeline-connector"
      className={cn(
        "absolute -start-px top-0 bottom-0 w-px bg-border",
        className
      )}
      {...props}
    />
  )
}

export { Timeline, TimelineItem, TimelineConnector }
export type { TimelineItemProps }
