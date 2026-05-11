"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type TimelineTone = "default" | "success" | "warning" | "destructive" | "brand"
export type TimelineItemKind = "event" | "comment" | "status_change"

export type TimelineItem = {
  id: string
  timestamp: string
  type: TimelineItemKind
  /** Pre-rendered content for the item (use TimelineComment / TimelineStatusChange below as helpers, or your own) */
  content: React.ReactNode
  /** Optional icon shown inside the dot (16px). If omitted, a plain dot renders. */
  icon?: React.ReactNode
  /** Optional avatar (for comment items). Renders in place of the dot. */
  avatar?: React.ReactNode
  /** Visual tint applied to the dot border/background */
  tone?: TimelineTone
}

export type TimelineProps = {
  items: TimelineItem[]
  /** Forces the rail to a specific side regardless of parent direction. */
  orientation?: "rtl" | "ltr"
  /** Rendered when items.length === 0 */
  emptyState?: React.ReactNode
  /** Optional formatter for the timestamp shown above each item */
  formatTimestamp?: (iso: string) => string
  className?: string
}

const toneClass: Record<TimelineTone, string> = {
  default: "border-muted-foreground bg-card",
  success: "border-success bg-success/15",
  warning: "border-amber-500 bg-amber-50 dark:bg-amber-950/40",
  destructive: "border-destructive bg-destructive/10",
  brand: "border-primary bg-primary/10",
}

function defaultFormatTimestamp(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

export function Timeline({
  items,
  orientation,
  emptyState,
  formatTimestamp = defaultFormatTimestamp,
  className,
}: TimelineProps) {
  if (items.length === 0) {
    return <>{emptyState ?? null}</>
  }

  return (
    <div
      data-slot="timeline"
      dir={orientation}
      className={cn("relative", className)}
    >
      {/* rail */}
      <div
        aria-hidden
        className="absolute top-2 bottom-2 start-[19px] w-px bg-border"
      />
      <ol className="flex flex-col gap-0">
        {items.map((item) => {
          const tone = item.tone ?? "default"
          return (
            <li
              key={item.id}
              data-type={item.type}
              data-tone={tone}
              className="relative grid grid-cols-[40px_1fr] gap-3.5 py-2 pb-4"
            >
              {/* dot/avatar column */}
              <div className="col-start-1 flex items-start justify-center pt-1 relative z-10">
                {item.avatar ? (
                  <div className="size-7 rounded-full bg-card border-2 border-card shadow-sm overflow-hidden -mt-1.5 flex items-center justify-center">
                    {item.avatar}
                  </div>
                ) : (
                  <div
                    className={cn(
                      "size-3 rounded-full border-2 shadow-[0_0_0_4px_var(--card)] flex items-center justify-center",
                      toneClass[tone]
                    )}
                  >
                    {item.icon && (
                      <span className="text-[10px] leading-none">{item.icon}</span>
                    )}
                  </div>
                )}
              </div>
              {/* content column */}
              <div className="col-start-2 min-w-0">
                <div className="text-[11px] text-muted-foreground tabular-nums mb-1">
                  {formatTimestamp(item.timestamp)}
                </div>
                <div className="text-sm leading-relaxed">{item.content}</div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
