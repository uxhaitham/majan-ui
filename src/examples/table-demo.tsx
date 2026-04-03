import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDir } from "@/hooks/use-dir"

const invoices = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { invoice: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
  { invoice: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
  { invoice: "INV006", status: "Pending", method: "Bank Transfer", amount: "$200.00" },
  { invoice: "INV007", status: "Unpaid", method: "Credit Card", amount: "$300.00" },
]

const invoicesAr = [
  { invoice: "INV001", status: "مدفوع", method: "بطاقة ائتمان", amount: "٢٥٠٫٠٠ ر.ع" },
  { invoice: "INV002", status: "معلّق", method: "باي بال", amount: "١٥٠٫٠٠ ر.ع" },
  { invoice: "INV003", status: "غير مدفوع", method: "تحويل بنكي", amount: "٣٥٠٫٠٠ ر.ع" },
  { invoice: "INV004", status: "مدفوع", method: "بطاقة ائتمان", amount: "٤٥٠٫٠٠ ر.ع" },
  { invoice: "INV005", status: "مدفوع", method: "باي بال", amount: "٥٥٠٫٠٠ ر.ع" },
  { invoice: "INV006", status: "معلّق", method: "تحويل بنكي", amount: "٢٠٠٫٠٠ ر.ع" },
  { invoice: "INV007", status: "غير مدفوع", method: "بطاقة ائتمان", amount: "٣٠٠٫٠٠ ر.ع" },
]

export default function TableDemo() {
  const { ref, isRtl } = useDir()
  const data = isRtl ? invoicesAr : invoices

  return (
    <div ref={ref}>
      <Table>
        <TableCaption>
          {isRtl ? "قائمة بالفواتير الأخيرة." : "A list of your recent invoices."}
        </TableCaption>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="w-[100px]">
              {isRtl ? "الفاتورة" : "Invoice"}
            </TableHead>
            <TableHead>{isRtl ? "الحالة" : "Status"}</TableHead>
            <TableHead>{isRtl ? "الطريقة" : "Method"}</TableHead>
            <TableHead className="text-end">
              {isRtl ? "المبلغ" : "Amount"}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.invoice}>
              <TableCell className="font-medium">{row.invoice}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.method}</TableCell>
              <TableCell className="text-end">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>{isRtl ? "المجموع" : "Total"}</TableCell>
            <TableCell className="text-end">
              {isRtl ? "٢٬٢٥٠٫٠٠ ر.ع" : "$2,250.00"}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
