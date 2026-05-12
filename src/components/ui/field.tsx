"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

function Field({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      data-slot="field"
      className={cn("flex w-full flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:gap-4 [&>[data-slot=field]]:flex-1",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  required,
  children,
  ...props
}: React.ComponentProps<typeof Label> & { required?: boolean }) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "text-sm font-medium leading-snug group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      {required ? (
        <span
          aria-hidden="true"
          className="text-muted-foreground/70"
        >
          *
        </span>
      ) : null}
    </Label>
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-sm leading-normal text-muted-foreground [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function FieldError({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  if (!children) {
    return null
  }
  return (
    <p
      role="alert"
      data-slot="field-error"
      className={cn("text-sm font-normal text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  )
}

export { Field, FieldGroup, FieldLabel, FieldDescription, FieldError }
