"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDir } from "@/hooks/use-dir"

export default function DropdownMenuRadio() {
  const { ref, dir, isRtl } = useDir()
  const [position, setPosition] = React.useState("bottom")

  return (
    <div ref={ref}>
      <DropdownMenu dir={dir}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{isRtl ? "افتح" : "Open"}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32">
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              {isRtl ? "موضع اللوحة" : "Panel Position"}
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value="top">
                {isRtl ? "أعلى" : "Top"}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">
                {isRtl ? "أسفل" : "Bottom"}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">
                {isRtl ? "يمين" : "Right"}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
