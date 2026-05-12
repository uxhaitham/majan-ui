import * as React from "react"
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

type StatHeroTrend = "up" | "down" | "flat"

function StatHeroLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-hero-label"
      className={cn(
        "text-xs font-medium uppercase tracking-wide text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function StatHeroValue({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-hero-value"
      className={cn(
        "text-3xl font-semibold leading-tight tracking-tight tabular-nums md:text-4xl",
        className
      )}
      {...props}
    />
  )
}

function StatHeroDelta({
  className,
  trend = "flat",
  children,
  ...props
}: React.ComponentProps<"div"> & { trend?: StatHeroTrend }) {
  const Icon =
    trend === "up" ? ArrowUpIcon : trend === "down" ? ArrowDownIcon : MinusIcon
  const tone =
    trend === "up"
      ? "text-emerald-600 dark:text-emerald-400"
      : trend === "down"
        ? "text-destructive"
        : "text-muted-foreground"
  return (
    <div
      data-slot="stat-hero-delta"
      data-trend={trend}
      className={cn(
        "inline-flex items-center gap-1 text-sm font-medium tabular-nums",
        tone,
        className
      )}
      {...props}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {children}
    </div>
  )
}

type StatHeroProps = React.ComponentProps<"div"> & {
  label: React.ReactNode
  value: React.ReactNode
  delta?: React.ReactNode
  trend?: StatHeroTrend
  badge?: React.ReactNode
  description?: React.ReactNode
}

function StatHero({
  label,
  value,
  delta,
  trend,
  badge,
  description,
  className,
  ...props
}: StatHeroProps) {
  return (
    <Card
      data-slot="stat-hero"
      className={cn("gap-3 p-6", className)}
      {...props}
    >
      <div className="flex items-start justify-between gap-2">
        <StatHeroLabel>{label}</StatHeroLabel>
        {badge ? <div data-slot="stat-hero-badge">{badge}</div> : null}
      </div>
      <StatHeroValue>{value}</StatHeroValue>
      {delta || description ? (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {delta ? (
            <StatHeroDelta trend={trend}>{delta}</StatHeroDelta>
          ) : null}
          {description ? (
            <div
              data-slot="stat-hero-description"
              className="text-sm text-muted-foreground"
            >
              {description}
            </div>
          ) : null}
        </div>
      ) : null}
    </Card>
  )
}

export { StatHero, StatHeroLabel, StatHeroValue, StatHeroDelta }
export type { StatHeroProps, StatHeroTrend }
