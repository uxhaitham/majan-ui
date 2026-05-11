"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export type NotificationRowProps = {
  id: string
  title: { ar: string; en: string }
  body: { ar: string; en: string }
  link_path?: string | null
  priority: "high" | "normal"
  created_at: string
  read_at?: string | null
  locale: "ar" | "en"
  density?: "comfortable" | "compact"
  onSelect?: (id: string) => void
  className?: string
}

function formatTime(iso: string, locale: "ar" | "en"): string {
  const date = new Date(iso)
  const now = new Date()
  const sameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()

  if (sameDay) {
    return date.toLocaleTimeString(locale === "ar" ? "en-GB" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  })
}

export function NotificationRow({
  id,
  title,
  body,
  link_path,
  priority,
  created_at,
  read_at,
  locale,
  density = "comfortable",
  onSelect,
  className,
}: NotificationRowProps) {
  const unread = !read_at
  const isHighUnread = unread && priority === "high"
  const padding = density === "compact" ? "p-2.5" : "p-3"

  return (
    <button
      type="button"
      data-slot="notification-row"
      data-priority={priority}
      data-read={!unread}
      onClick={() => onSelect?.(id)}
      className={cn(
        "relative w-full text-start border-b border-border/40 transition-colors",
        "hover:bg-muted/60",
        padding,
        isHighUnread &&
          "bg-destructive/5 hover:bg-destructive/10",
        !unread && "opacity-70",
        className
      )}
    >
      {isHighUnread && (
        <span
          aria-hidden
          className="absolute inset-y-2 start-0 w-[3px] rounded-full bg-destructive"
        />
      )}
      <div className="flex items-start justify-between gap-2 ps-2">
        <span
          className={cn(
            "text-sm leading-tight",
            unread ? "font-semibold text-foreground" : "font-medium text-foreground"
          )}
        >
          {title[locale]}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          {priority === "high" && (
            <Badge variant="destructive" className="text-[10px] px-1.5 py-0 h-4">
              {locale === "ar" ? "عالية" : "High"}
            </Badge>
          )}
          <time
            dateTime={created_at}
            className="text-[10px] text-muted-foreground tabular-nums whitespace-nowrap pt-0.5"
          >
            {formatTime(created_at, locale)}
          </time>
        </div>
      </div>
      <p className="ps-2 mt-1 text-xs text-muted-foreground line-clamp-2 leading-snug">
        {body[locale]}
      </p>
      {link_path && (
        <span className="sr-only">{link_path}</span>
      )}
    </button>
  )
}
