import * as React from "react"

import { cn } from "@/lib/utils"

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-6 text-center text-balance md:p-12",
        className
      )}
      {...props}
    />
  )
}

function EmptyIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-icon"
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6",
        className
      )}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn("text-lg font-medium tracking-tight", className)}
      {...props}
    />
  )
}

function EmptyDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-description"
      className={cn(
        "max-w-sm text-sm/relaxed text-muted-foreground [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function EmptyAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-action"
      className={cn("mt-2 flex items-center justify-center gap-2", className)}
      {...props}
    />
  )
}

export { Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyAction }
