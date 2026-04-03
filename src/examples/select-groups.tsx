import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDir } from "@/hooks/use-dir"

export default function SelectGroups() {
  const { ref, dir, isRtl } = useDir()

  return (
    <div ref={ref}>
      <Select>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue
            placeholder={isRtl ? "اختر فاكهة" : "Select a fruit"}
          />
        </SelectTrigger>
        <SelectContent dir={dir}>
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
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>{isRtl ? "الخضروات" : "Vegetables"}</SelectLabel>
            <SelectItem value="carrot">
              {isRtl ? "جزر" : "Carrot"}
            </SelectItem>
            <SelectItem value="broccoli">
              {isRtl ? "بروكلي" : "Broccoli"}
            </SelectItem>
            <SelectItem value="spinach">
              {isRtl ? "سبانخ" : "Spinach"}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
