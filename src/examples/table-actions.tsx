import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  MoreHorizontalIcon,
  PencilIcon,
  StarIcon,
  TrashIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDir } from "@/hooks/use-dir"

type Order = {
  id: string
  customer: string
  product: string
  amount: number
  status: "fulfilled" | "processing" | "refunded" | "pending"
  date: string
}

const orders: Order[] = [
  { id: "ORD-001", customer: "Fatima Al Rashidi", product: "Pro Plan", amount: 250, status: "fulfilled", date: "2024-03-15" },
  { id: "ORD-002", customer: "Omar Hassan", product: "Starter Plan", amount: 49, status: "processing", date: "2024-03-14" },
  { id: "ORD-003", customer: "Layla Noor", product: "Enterprise Plan", amount: 999, status: "fulfilled", date: "2024-03-13" },
  { id: "ORD-004", customer: "Hassan Al Balushi", product: "Pro Plan", amount: 250, status: "refunded", date: "2024-03-12" },
  { id: "ORD-005", customer: "Noor Al Kindi", product: "Starter Plan", amount: 49, status: "pending", date: "2024-03-11" },
  { id: "ORD-006", customer: "Ahmed Said", product: "Pro Plan", amount: 250, status: "fulfilled", date: "2024-03-10" },
  { id: "ORD-007", customer: "Maryam Al Habsi", product: "Enterprise Plan", amount: 999, status: "processing", date: "2024-03-09" },
  { id: "ORD-008", customer: "Ali Al Lawati", product: "Starter Plan", amount: 49, status: "fulfilled", date: "2024-03-08" },
  { id: "ORD-009", customer: "Sara Al Hinai", product: "Pro Plan", amount: 250, status: "pending", date: "2024-03-07" },
  { id: "ORD-010", customer: "Khalid Al Busaidi", product: "Enterprise Plan", amount: 999, status: "fulfilled", date: "2024-03-06" },
  { id: "ORD-011", customer: "Huda Al Maskari", product: "Starter Plan", amount: 49, status: "refunded", date: "2024-03-05" },
  { id: "ORD-012", customer: "Yousuf Al Farsi", product: "Pro Plan", amount: 250, status: "fulfilled", date: "2024-03-04" },
]

const ordersAr: Order[] = [
  { id: "ORD-001", customer: "فاطمة الراشدي", product: "الخطة المتقدمة", amount: 250, status: "fulfilled", date: "2024-03-15" },
  { id: "ORD-002", customer: "عمر حسن", product: "الخطة الأساسية", amount: 49, status: "processing", date: "2024-03-14" },
  { id: "ORD-003", customer: "ليلى نور", product: "خطة المؤسسات", amount: 999, status: "fulfilled", date: "2024-03-13" },
  { id: "ORD-004", customer: "حسن البلوشي", product: "الخطة المتقدمة", amount: 250, status: "refunded", date: "2024-03-12" },
  { id: "ORD-005", customer: "نور الكندي", product: "الخطة الأساسية", amount: 49, status: "pending", date: "2024-03-11" },
  { id: "ORD-006", customer: "أحمد سعيد", product: "الخطة المتقدمة", amount: 250, status: "fulfilled", date: "2024-03-10" },
  { id: "ORD-007", customer: "مريم الحبسي", product: "خطة المؤسسات", amount: 999, status: "processing", date: "2024-03-09" },
  { id: "ORD-008", customer: "علي اللواتي", product: "الخطة الأساسية", amount: 49, status: "fulfilled", date: "2024-03-08" },
  { id: "ORD-009", customer: "سارة الهنائي", product: "الخطة المتقدمة", amount: 250, status: "pending", date: "2024-03-07" },
  { id: "ORD-010", customer: "خالد البوسعيدي", product: "خطة المؤسسات", amount: 999, status: "fulfilled", date: "2024-03-06" },
  { id: "ORD-011", customer: "هدى المسكري", product: "الخطة الأساسية", amount: 49, status: "refunded", date: "2024-03-05" },
  { id: "ORD-012", customer: "يوسف الفارسي", product: "الخطة المتقدمة", amount: 250, status: "fulfilled", date: "2024-03-04" },
]

const statusConfig: Record<string, { label: string; labelAr: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  fulfilled: { label: "Fulfilled", labelAr: "مكتمل", variant: "default" },
  processing: { label: "Processing", labelAr: "قيد المعالجة", variant: "secondary" },
  refunded: { label: "Refunded", labelAr: "مسترد", variant: "destructive" },
  pending: { label: "Pending", labelAr: "معلّق", variant: "outline" },
}

export default function TableActions() {
  const { ref, dir, isRtl } = useDir()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 5 })
  const data = isRtl ? ordersAr : orders

  const columns = React.useMemo<ColumnDef<Order>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label={isRtl ? "تحديد الكل" : "Select all"}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label={isRtl ? "تحديد الصف" : "Select row"}
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "id",
        header: isRtl ? "الطلب" : "Order",
        cell: ({ row }) => (
          <span className="font-medium">{row.getValue("id")}</span>
        ),
      },
      {
        accessorKey: "customer",
        header: isRtl ? "العميل" : "Customer",
      },
      {
        accessorKey: "product",
        header: isRtl ? "المنتج" : "Product",
      },
      {
        accessorKey: "status",
        header: isRtl ? "الحالة" : "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string
          const config = statusConfig[status]
          return (
            <Badge variant={config.variant}>
              {isRtl ? config.labelAr : config.label}
            </Badge>
          )
        },
      },
      {
        accessorKey: "amount",
        header: () => (
          <div className="text-end">{isRtl ? "المبلغ" : "Amount"}</div>
        ),
        cell: ({ row }) => {
          const amount = row.getValue("amount") as number
          return (
            <div className="text-end font-medium tabular-nums">
              {isRtl
                ? `${amount.toLocaleString("ar-OM")} ر.ع`
                : amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </div>
          )
        },
      },
      {
        accessorKey: "date",
        header: isRtl ? "التاريخ" : "Date",
        cell: ({ row }) => {
          const date = new Date(row.getValue("date"))
          return (
            <span className="text-muted-foreground">
              {date.toLocaleDateString(isRtl ? "ar-OM" : "en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )
        },
      },
      {
        id: "actions",
        cell: () => (
          <DropdownMenu dir={dir}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <MoreHorizontalIcon className="size-4" />
                <span className="sr-only">{isRtl ? "فتح القائمة" : "Open menu"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <PencilIcon />
                {isRtl ? "تعديل" : "Edit"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CopyIcon />
                {isRtl ? "نسخ" : "Duplicate"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <StarIcon />
                {isRtl ? "مفضلة" : "Favorite"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <TrashIcon />
                {isRtl ? "حذف" : "Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [isRtl, dir]
  )

  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection, pagination },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div ref={ref} className="flex flex-col gap-4">
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
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {isRtl
            ? `${table.getFilteredSelectedRowModel().rows.length} من ${table.getFilteredRowModel().rows.length} صفوف محددة`
            : `${table.getFilteredSelectedRowModel().rows.length} of ${table.getFilteredRowModel().rows.length} row(s) selected`}
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-sm">
              {isRtl ? "صفوف لكل صفحة" : "Rows per page"}
            </span>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger size="sm" className="w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent dir={dir}>
                {[5, 10, 20].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span>
              {isRtl
                ? `${table.getState().pagination.pageIndex + 1} من ${table.getPageCount()}`
                : `${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="size-4 rtl:rotate-180" />
              <span className="sr-only">{isRtl ? "السابق" : "Previous"}</span>
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="size-4 rtl:rotate-180" />
              <span className="sr-only">{isRtl ? "التالي" : "Next"}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
