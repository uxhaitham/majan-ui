"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDir } from "@/hooks/use-dir"

export default function DropdownMenuCheckboxes() {
  const { ref, dir, isRtl } = useDir()
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)

  return (
    <div ref={ref}>
      <DropdownMenu dir={dir}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{isRtl ? "افتح" : "Open"}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              {isRtl ? "المظهر" : "Appearance"}
            </DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              {isRtl ? "شريط الحالة" : "Status Bar"}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
              disabled
            >
              {isRtl ? "شريط النشاط" : "Activity Bar"}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              {isRtl ? "اللوحة" : "Panel"}
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
