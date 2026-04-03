import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { ArrowUpDownIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDir } from "@/hooks/use-dir"

type Employee = {
  name: string
  role: string
  department: string
  status: "Active" | "On Leave" | "Remote"
  salary: number
}

const employees: Employee[] = [
  { name: "Fatima Al Rashidi", role: "Lead Engineer", department: "Engineering", status: "Active", salary: 95000 },
  { name: "Omar Hassan", role: "Designer", department: "Design", status: "Remote", salary: 78000 },
  { name: "Layla Noor", role: "Product Manager", department: "Product", status: "Active", salary: 105000 },
  { name: "Hassan Al Balushi", role: "Data Analyst", department: "Engineering", status: "On Leave", salary: 72000 },
  { name: "Noor Al Kindi", role: "UX Researcher", department: "Design", status: "Active", salary: 82000 },
  { name: "Ahmed Said", role: "Backend Developer", department: "Engineering", status: "Remote", salary: 88000 },
  { name: "Maryam Al Habsi", role: "Marketing Lead", department: "Marketing", status: "Active", salary: 91000 },
]

const employeesAr: Employee[] = [
  { name: "فاطمة الراشدي", role: "مهندسة رئيسية", department: "الهندسة", status: "Active", salary: 95000 },
  { name: "عمر حسن", role: "مصمم", department: "التصميم", status: "Remote", salary: 78000 },
  { name: "ليلى نور", role: "مديرة منتجات", department: "المنتجات", status: "Active", salary: 105000 },
  { name: "حسن البلوشي", role: "محلل بيانات", department: "الهندسة", status: "On Leave", salary: 72000 },
  { name: "نور الكندي", role: "باحثة تجربة المستخدم", department: "التصميم", status: "Active", salary: 82000 },
  { name: "أحمد سعيد", role: "مطور خلفي", department: "الهندسة", status: "Remote", salary: 88000 },
  { name: "مريم الحبسي", role: "مسؤولة تسويق", department: "التسويق", status: "Active", salary: 91000 },
]

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  Active: "default",
  "On Leave": "secondary",
  Remote: "outline",
}

const statusLabelAr: Record<string, string> = {
  Active: "نشط",
  "On Leave": "في إجازة",
  Remote: "عن بُعد",
}

function SortableHeader({
  column,
  label,
}: {
  column: { getIsSorted: () => false | "asc" | "desc"; toggleSorting: (desc?: boolean) => void }
  label: string
}) {
  const sorted = column.getIsSorted()
  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ms-3 h-8"
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {label}
      {sorted === "asc" ? (
        <ArrowUpIcon className="ms-2 size-4" />
      ) : sorted === "desc" ? (
        <ArrowDownIcon className="ms-2 size-4" />
      ) : (
        <ArrowUpDownIcon className="ms-2 size-4" />
      )}
    </Button>
  )
}

export default function TableSortable() {
  const { ref, isRtl } = useDir()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const data = isRtl ? employeesAr : employees

  const columns = React.useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <SortableHeader column={column} label={isRtl ? "الاسم" : "Name"} />
        ),
        cell: ({ row }) => (
          <span className="font-medium">{row.getValue("name")}</span>
        ),
      },
      {
        accessorKey: "role",
        header: ({ column }) => (
          <SortableHeader column={column} label={isRtl ? "الدور" : "Role"} />
        ),
      },
      {
        accessorKey: "department",
        header: ({ column }) => (
          <SortableHeader column={column} label={isRtl ? "القسم" : "Department"} />
        ),
      },
      {
        accessorKey: "status",
        header: isRtl ? "الحالة" : "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string
          return (
            <Badge variant={statusVariant[status]}>
              {isRtl ? statusLabelAr[status] : status}
            </Badge>
          )
        },
      },
      {
        accessorKey: "salary",
        header: ({ column }) => (
          <div className="text-end">
            <SortableHeader column={column} label={isRtl ? "الراتب" : "Salary"} />
          </div>
        ),
        cell: ({ row }) => {
          const amount = row.getValue("salary") as number
          return (
            <div className="text-end font-medium tabular-nums">
              {isRtl
                ? `${amount.toLocaleString("ar-OM")} ر.ع`
                : amount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}
            </div>
          )
        },
      },
    ],
    [isRtl]
  )

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div ref={ref}>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {isRtl ? "لا توجد نتائج." : "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
