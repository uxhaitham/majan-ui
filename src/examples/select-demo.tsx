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

export default function SelectDemo() {
  const { ref, dir, isRtl } = useDir()

  return (
    <div ref={ref}>
      <Select dir={dir}>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue
            placeholder={isRtl ? "اختر فاكهة" : "Select a fruit"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{isRtl ? "الفواكه" : "Fruits"}</SelectLabel>
            <SelectItem value="apple">
              {isRtl ? "تفاح" : "Apple"}
            </SelectItem>
            <SelectItem value="banana">
              {isRtl ? "موز" : "Banana"}
            </SelectItem>
            <SelectItem value="blueberry">
              {isRtl ? "توت أزرق" : "Blueberry"}
            </SelectItem>
            <SelectItem value="grapes">
              {isRtl ? "عنب" : "Grapes"}
            </SelectItem>
            <SelectItem value="pineapple">
              {isRtl ? "أناناس" : "Pineapple"}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
