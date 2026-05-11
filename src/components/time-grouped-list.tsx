"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type TimeGroupedListProps<T> = {
  items: T[]
  /** Returns ISO timestamp for grouping */
  getDate: (item: T) => string
  /** Renders a single item */
  renderItem: (item: T) => React.ReactNode
  /** UI locale for section labels */
  locale: "ar" | "en"
  /** Reference "now" for bucketing; defaults to new Date() */
  now?: Date
  className?: string
}

type Bucket = "today" | "yesterday" | "thisWeek" | "older"

const labels: Record<Bucket, { ar: string; en: string }> = {
  today: { ar: "اليوم", en: "Today" },
  yesterday: { ar: "أمس", en: "Yesterday" },
  thisWeek: { ar: "هذا الأسبوع", en: "This week" },
  older: { ar: "أقدم", en: "Older" },
}

const order: Bucket[] = ["today", "yesterday", "thisWeek", "older"]

/** Calendar-day key in Asia/Muscat timezone. Format: YYYY-MM-DD. */
function omanDateKey(d: Date): string {
  // en-CA returns YYYY-MM-DD which is sortable + comparable as a string.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Muscat",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d)
}

/** Date-string offset by n days from a reference key. */
function shiftDay(key: string, n: number): string {
  const [y, m, d] = key.split("-").map(Number)
  const date = new Date(Date.UTC(y, m - 1, d))
  date.setUTCDate(date.getUTCDate() + n)
  return date.toISOString().slice(0, 10)
}

function bucketFor(itemKey: string, today: string, yesterday: string, weekStart: string): Bucket {
  if (itemKey === today) return "today"
  if (itemKey === yesterday) return "yesterday"
  if (itemKey >= weekStart && itemKey < yesterday) return "thisWeek"
  return "older"
}

export function TimeGroupedList<T>({
  items,
  getDate,
  renderItem,
  locale,
  now,
  className,
}: TimeGroupedListProps<T>) {
  const reference = now ?? new Date()
  const todayKey = omanDateKey(reference)
  const yesterdayKey = shiftDay(todayKey, -1)
  const weekStartKey = shiftDay(todayKey, -6)

  const groups: Record<Bucket, T[]> = {
    today: [],
    yesterday: [],
    thisWeek: [],
    older: [],
  }

  for (const item of items) {
    const key = omanDateKey(new Date(getDate(item)))
    groups[bucketFor(key, todayKey, yesterdayKey, weekStartKey)].push(item)
  }

  return (
    <div data-slot="time-grouped-list" className={cn("flex flex-col", className)}>
      {order.map((bucket) => {
        const list = groups[bucket]
        if (list.length === 0) return null
        return (
          <section key={bucket} data-bucket={bucket}>
            <h3
              className={cn(
                "text-xs uppercase tracking-wide text-muted-foreground",
                "px-3 py-2"
              )}
            >
              {labels[bucket][locale]}
            </h3>
            <div>
              {list.map((item, i) => (
                <React.Fragment key={i}>{renderItem(item)}</React.Fragment>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
