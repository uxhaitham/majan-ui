"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

export type StatHeroField = {
  label: React.ReactNode
  value: React.ReactNode
}

export type StatHeroProps = {
  /** Primary title — large, bold (e.g., "مخالفة #2026-0034") */
  title: React.ReactNode
  /** Optional one-liner under the title */
  subtitle?: React.ReactNode
  /** Optional badges row (renders below title block) */
  badges?: React.ReactNode
  /** 2- or 4-column metadata grid */
  fields?: StatHeroField[]
  /** Action bar pinned opposite the titles */
  actions?: React.ReactNode
  className?: string
}

export function StatHero({
  title,
  subtitle,
  badges,
  fields,
  actions,
  className,
}: StatHeroProps) {
  return (
    <Card
      data-slot="stat-hero"
      className={cn("p-6 md:p-7 gap-0", className)}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex flex-col gap-2">
          <h1
            data-slot="stat-hero-title"
            className="text-2xl md:text-[28px] font-semibold tracking-tight leading-tight tabular-nums"
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              data-slot="stat-hero-subtitle"
              className="text-sm text-muted-foreground"
            >
              {subtitle}
            </p>
          ) : null}
          {badges ? (
            <div
              data-slot="stat-hero-badges"
              className="flex flex-wrap gap-1.5 mt-1"
            >
              {badges}
            </div>
          ) : null}
        </div>
        {actions ? (
          <div
            data-slot="stat-hero-actions"
            className="flex items-center gap-2 shrink-0"
          >
            {actions}
          </div>
        ) : null}
      </div>
      {fields && fields.length > 0 ? (
        <div
          data-slot="stat-hero-fields"
          className="mt-6 pt-5 border-t border-border grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {fields.map((field, i) => (
            <div key={i} className="min-w-0 flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {field.label}
              </span>
              <span className="text-sm font-semibold leading-snug tabular-nums break-words">
                {field.value}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </Card>
  )
}
