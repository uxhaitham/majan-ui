"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type AuthLayoutProps = {
  /** Optional left-side marketing content (e.g., wordmark + tagline on a dark surface). */
  marketing?: React.ReactNode
  /** Right-side form content. */
  children: React.ReactNode
  /** Optional wordmark / logo slot pinned to the top of the form pane. */
  brand?: React.ReactNode
  className?: string
}

export function AuthLayout({
  marketing,
  children,
  brand,
  className,
}: AuthLayoutProps) {
  if (!marketing) {
    return (
      <main
        data-slot="auth-layout"
        data-variant="centered"
        className={cn("relative min-h-svh w-full bg-background", className)}
      >
        {brand ? (
          <div
            data-slot="auth-brand"
            className="absolute top-6 inset-x-6 flex items-center"
          >
            {brand}
          </div>
        ) : null}
        <div className="flex min-h-svh items-center justify-center p-6">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </main>
    )
  }

  return (
    <main
      data-slot="auth-layout"
      data-variant="split"
      className={cn(
        "relative min-h-svh w-full bg-background",
        "grid grid-cols-1 lg:grid-cols-[60%_40%]",
        className
      )}
    >
      <section
        data-slot="auth-marketing"
        className={cn(
          "relative bg-foreground text-background",
          "flex items-stretch p-10 lg:p-14"
        )}
      >
        {marketing}
      </section>
      <section
        data-slot="auth-form"
        className="relative flex items-center justify-center p-6 lg:p-10"
      >
        {brand ? (
          <div
            data-slot="auth-brand"
            className="absolute top-6 inset-x-6 flex items-center lg:hidden"
          >
            {brand}
          </div>
        ) : null}
        <div className="w-full max-w-md">{children}</div>
      </section>
    </main>
  )
}
