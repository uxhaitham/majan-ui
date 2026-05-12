"use client"

import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

type NotificationRowProps = React.ComponentProps<"div"> & {
  icon?: React.ReactNode
  avatar?: React.ReactNode
  actor: React.ReactNode
  verb: React.ReactNode
  target?: React.ReactNode
  timestamp: React.ReactNode
  unread?: boolean
  asChild?: boolean
}

function NotificationRow({
  icon,
  avatar,
  actor,
  verb,
  target,
  timestamp,
  unread = false,
  asChild = false,
  className,
  ...props
}: NotificationRowProps) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="notification-row"
      data-unread={unread}
      className={cn(
        "group/notification-row relative flex w-full items-start gap-3 border-b border-border/60 px-3 py-3 text-start transition-colors hover:bg-muted/60",
        unread && "bg-muted/30",
        className
      )}
      {...props}
    >
      {avatar ? (
        <div
          data-slot="notification-row-avatar"
          className="shrink-0"
        >
          {avatar}
        </div>
      ) : icon ? (
        <div
          data-slot="notification-row-icon"
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-4"
        >
          {icon}
        </div>
      ) : null}
      <div
        data-slot="notification-row-body"
        className="flex min-w-0 flex-1 flex-col gap-0.5"
      >
        <div className="text-sm leading-snug">
          <span
            data-slot="notification-row-actor"
            className={cn(
              "text-foreground",
              unread ? "font-semibold" : "font-medium"
            )}
          >
            {actor}
          </span>{" "}
          <span
            data-slot="notification-row-verb"
            className="text-muted-foreground"
          >
            {verb}
          </span>
          {target ? (
            <>
              {" "}
              <span
                data-slot="notification-row-target"
                className="font-medium text-foreground"
              >
                {target}
              </span>
            </>
          ) : null}
        </div>
        <time
          data-slot="notification-row-timestamp"
          className="text-xs tabular-nums text-muted-foreground"
        >
          {timestamp}
        </time>
      </div>
      {unread ? (
        <span
          aria-hidden="true"
          data-slot="notification-row-unread-dot"
          className="mt-2 size-2 shrink-0 rounded-full bg-primary"
        />
      ) : null}
    </Comp>
  )
}

export { NotificationRow }
export type { NotificationRowProps }
