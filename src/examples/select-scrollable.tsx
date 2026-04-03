import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDir } from "@/hooks/use-dir"

export default function SelectScrollable() {
  const { ref, dir, isRtl } = useDir()

  return (
    <div ref={ref}>
      <Select dir={dir}>
        <SelectTrigger className="w-full max-w-64">
          <SelectValue
            placeholder={isRtl ? "اختر منطقة زمنية" : "Select a timezone"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>
              {isRtl ? "أمريكا الشمالية" : "North America"}
            </SelectLabel>
            <SelectItem value="est">Eastern Standard Time</SelectItem>
            <SelectItem value="cst">Central Standard Time</SelectItem>
            <SelectItem value="mst">Mountain Standard Time</SelectItem>
            <SelectItem value="pst">Pacific Standard Time</SelectItem>
            <SelectItem value="akst">Alaska Standard Time</SelectItem>
            <SelectItem value="hst">Hawaii Standard Time</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>
              {isRtl ? "أوروبا وأفريقيا" : "Europe & Africa"}
            </SelectLabel>
            <SelectItem value="gmt">Greenwich Mean Time</SelectItem>
            <SelectItem value="cet">Central European Time</SelectItem>
            <SelectItem value="eet">Eastern European Time</SelectItem>
            <SelectItem value="cat">Central Africa Time</SelectItem>
            <SelectItem value="eat">East Africa Time</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>{isRtl ? "آسيا" : "Asia"}</SelectLabel>
            <SelectItem value="msk">Moscow Time</SelectItem>
            <SelectItem value="gst">Gulf Standard Time</SelectItem>
            <SelectItem value="ist">India Standard Time</SelectItem>
            <SelectItem value="cst_china">China Standard Time</SelectItem>
            <SelectItem value="jst">Japan Standard Time</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
