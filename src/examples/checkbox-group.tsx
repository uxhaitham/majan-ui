"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useDir } from "@/hooks/use-dir"

export default function CheckboxGroup() {
  const { ref, isRtl } = useDir()

  const items = isRtl
    ? [
        { id: "hard-disks", label: "الأقراص الصلبة", checked: true },
        { id: "external-disks", label: "الأقراص الخارجية", checked: true },
        { id: "cds", label: "الأقراص المدمجة", checked: false },
        { id: "servers", label: "الخوادم المتصلة", checked: false },
      ]
    : [
        { id: "hard-disks", label: "Hard disks", checked: true },
        { id: "external-disks", label: "External disks", checked: true },
        { id: "cds", label: "CDs, DVDs, and iPods", checked: false },
        { id: "servers", label: "Connected servers", checked: false },
      ]

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">
          {isRtl
            ? "إظهار هذه العناصر على سطح المكتب:"
            : "Show these items on the desktop:"}
        </p>
        <p className="text-sm text-muted-foreground">
          {isRtl
            ? "حدد العناصر التي تريد إظهارها."
            : "Select the items you want to show."}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <Checkbox id={item.id} defaultChecked={item.checked} />
            <Label htmlFor={item.id} className="font-normal">
              {item.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
