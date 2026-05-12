import * as React from "react"

import { cn } from "@/lib/utils"

type Bucket = "today" | "yesterday" | "thisWeek" | "earlier"

const BUCKET_ORDER: Bucket[] = ["today", "yesterday", "thisWeek", "earlier"]

const BUCKET_LABEL: Record<Bucket, string> = {
  today: "Today",
  yesterday: "Yesterday",
  thisWeek: "This week",
  earlier: "Earlier",
}

function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function bucketFor(itemDate: Date, now: Date): Bucket {
  const dayMs = 24 * 60 * 60 * 1000
  const today = startOfDay(now).getTime()
  const itemDay = startOfDay(itemDate).getTime()
  const diff = today - itemDay
  // Future dates fall into "today" — they're recent enough to be grouped with current activity
  if (diff <= 0) return "today"
  if (diff < dayMs) return "today"
  if (diff < 2 * dayMs) return "yesterday"
  if (diff < 7 * dayMs) return "thisWeek"
  return "earlier"
}

type TimeGroupedListProps<T> = {
  items: T[]
  getDate: (item: T) => Date
  renderItem: (item: T, index: number) => React.ReactNode
  now?: Date
  emptyLabel?: React.ReactNode
  className?: string
}

function TimeGroupedListSection({
  label,
  children,
  className,
}: {
  label: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      data-slot="time-grouped-list-section"
      className={cn("flex flex-col", className)}
    >
      <h3 className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </h3>
      <div className="flex flex-col">{children}</div>
    </section>
  )
}

function TimeGroupedList<T>({
  items,
  getDate,
  renderItem,
  now,
  emptyLabel,
  className,
}: TimeGroupedListProps<T>) {
  if (items.length === 0) {
    return emptyLabel ? <>{emptyLabel}</> : null
  }

  const reference = now ?? new Date()
  const groups: Record<Bucket, Array<{ item: T; index: number }>> = {
    today: [],
    yesterday: [],
    thisWeek: [],
    earlier: [],
  }

  items.forEach((item, index) => {
    const bucket = bucketFor(getDate(item), reference)
    groups[bucket].push({ item, index })
  })

  return (
    <div
      data-slot="time-grouped-list"
      className={cn("flex flex-col gap-2", className)}
    >
      {BUCKET_ORDER.map((bucket) => {
        const entries = groups[bucket]
        if (entries.length === 0) return null
        return (
          <TimeGroupedListSection key={bucket} label={BUCKET_LABEL[bucket]}>
            {entries.map(({ item, index }) => (
              <React.Fragment key={index}>
                {renderItem(item, index)}
              </React.Fragment>
            ))}
          </TimeGroupedListSection>
        )
      })}
    </div>
  )
}

export { TimeGroupedList, TimeGroupedListSection }
export type { TimeGroupedListProps }
