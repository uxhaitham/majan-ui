import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { SearchIcon, SlidersHorizontalIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDir } from "@/hooks/use-dir"

type Task = {
  id: string
  title: string
  status: "todo" | "in-progress" | "done" | "cancelled"
  priority: "low" | "medium" | "high"
}

const tasks: Task[] = [
  { id: "TASK-8782", title: "Implement user authentication flow", status: "in-progress", priority: "high" },
  { id: "TASK-7878", title: "Design new landing page mockups", status: "done", priority: "medium" },
  { id: "TASK-1234", title: "Fix pagination bug on mobile", status: "todo", priority: "high" },
  { id: "TASK-5678", title: "Write API documentation", status: "in-progress", priority: "low" },
  { id: "TASK-9012", title: "Set up CI/CD pipeline", status: "done", priority: "medium" },
  { id: "TASK-3456", title: "Optimize database queries", status: "todo", priority: "high" },
  { id: "TASK-7890", title: "Add dark mode support", status: "done", priority: "low" },
  { id: "TASK-2345", title: "Refactor state management", status: "cancelled", priority: "medium" },
  { id: "TASK-6789", title: "Create onboarding tutorial", status: "todo", priority: "low" },
  { id: "TASK-4321", title: "Migrate to TypeScript 5.5", status: "in-progress", priority: "medium" },
]

const tasksAr: Task[] = [
  { id: "TASK-8782", title: "تنفيذ تدفق مصادقة المستخدم", status: "in-progress", priority: "high" },
  { id: "TASK-7878", title: "تصميم نماذج صفحة الهبوط الجديدة", status: "done", priority: "medium" },
  { id: "TASK-1234", title: "إصلاح خطأ التصفح في الهاتف", status: "todo", priority: "high" },
  { id: "TASK-5678", title: "كتابة وثائق واجهة البرمجة", status: "in-progress", priority: "low" },
  { id: "TASK-9012", title: "إعداد خط أنابيب النشر", status: "done", priority: "medium" },
  { id: "TASK-3456", title: "تحسين استعلامات قاعدة البيانات", status: "todo", priority: "high" },
  { id: "TASK-7890", title: "إضافة دعم الوضع الداكن", status: "done", priority: "low" },
  { id: "TASK-2345", title: "إعادة هيكلة إدارة الحالة", status: "cancelled", priority: "medium" },
  { id: "TASK-6789", title: "إنشاء دليل البدء السريع", status: "todo", priority: "low" },
  { id: "TASK-4321", title: "الترقية إلى تايبسكريبت 5.5", status: "in-progress", priority: "medium" },
]

const statusConfig: Record<string, { label: string; labelAr: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  "todo": { label: "Todo", labelAr: "مهمة", variant: "outline" },
  "in-progress": { label: "In Progress", labelAr: "قيد التنفيذ", variant: "default" },
  "done": { label: "Done", labelAr: "مكتمل", variant: "secondary" },
  "cancelled": { label: "Cancelled", labelAr: "ملغاة", variant: "destructive" },
}

const priorityConfig: Record<string, { label: string; labelAr: string }> = {
  low: { label: "Low", labelAr: "منخفض" },
  medium: { label: "Medium", labelAr: "متوسط" },
  high: { label: "High", labelAr: "مرتفع" },
}

export default function TableFilterable() {
  const { ref, dir, isRtl } = useDir()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const data = isRtl ? tasksAr : tasks

  const columns = React.useMemo<ColumnDef<Task>[]>(
    () => [
      {
        accessorKey: "id",
        header: isRtl ? "المعرف" : "Task",
        cell: ({ row }) => (
          <span className="font-medium text-muted-foreground">{row.getValue("id")}</span>
        ),
        enableHiding: false,
      },
      {
        accessorKey: "title",
        header: isRtl ? "العنوان" : "Title",
        cell: ({ row }) => (
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("title")}
          </span>
        ),
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
        filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
      },
      {
        accessorKey: "priority",
        header: isRtl ? "الأولوية" : "Priority",
        cell: ({ row }) => {
          const priority = row.getValue("priority") as string
          const config = priorityConfig[priority]
          return <span>{isRtl ? config.labelAr : config.label}</span>
        },
        filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
      },
    ],
    [isRtl]
  )

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, columnVisibility },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute start-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder={isRtl ? "تصفية المهام..." : "Filter tasks..."}
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="ps-8"
          />
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="px-2 lg:px-3"
          >
            {isRtl ? "إعادة تعيين" : "Reset"}
          </Button>
        )}
        <DropdownMenu dir={dir}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <SlidersHorizontalIcon className="size-4" />
              <span className="hidden sm:inline">
                {isRtl ? "عرض الأعمدة" : "View"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>{isRtl ? "تبديل الأعمدة" : "Toggle columns"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
      <div className="text-sm text-muted-foreground">
        {isRtl
          ? `عرض ${table.getFilteredRowModel().rows.length} من ${data.length} مهام`
          : `Showing ${table.getFilteredRowModel().rows.length} of ${data.length} tasks`}
      </div>
    </div>
  )
}
