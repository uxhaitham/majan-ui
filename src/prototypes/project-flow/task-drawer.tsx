import { useState } from "react"
import {
  AlignLeftIcon,
  CalendarIcon,
  CircleDotIcon,
  CornerDownLeftIcon,
  FileTextIcon,
  FilterIcon,
  LinkIcon,
  MaximizeIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  PaperclipIcon,
  PlusIcon,
  SendIcon,
  SignalIcon,
  TagIcon,
  UserIcon,
  XIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

// ── Types ──

interface TaskDetail {
  id: string
  title: string
  status: string
  priority: string
  project: string
  description?: string
  dueDate?: string
  assignees?: Array<{ initials: string; name: string }>
  labels?: Array<{ name: string; color: string }>
  subtasks?: Array<{ title: string; done: boolean }>
  activity?: Array<{
    type: "event" | "comment"
    user: string
    userInitials: string
    action?: string
    detail?: string
    text?: string
    time: string
  }>
  resources?: Array<{ type: "doc" | "link"; title: string; detail: string }>
}

// ── Label Colors ──

const LABEL_COLORS = [
  "red", "orange", "amber", "yellow", "lime", "green", "teal", "cyan",
  "sky", "blue", "indigo", "violet", "purple", "pink", "rose",
] as const

type LabelColor = (typeof LABEL_COLORS)[number]

const presetColorRows: (LabelColor | null)[][] = [
  ["red", "orange", "amber", "yellow", "lime", "green", "teal", "cyan"],
  ["sky", "blue", "indigo", "violet", "purple", "pink", "rose", null],
]

const randomColor = (): LabelColor =>
  LABEL_COLORS[Math.floor(Math.random() * LABEL_COLORS.length)]

// Returns CSS variable references for a label color name.
// The actual values are defined in index.css under :root (light) and .dark.
function labelColorVars(color: string) {
  const c = LABEL_COLORS.includes(color as LabelColor) ? color : "purple"
  return {
    bg: `var(--pf-label-${c}-bg)`,
    text: `var(--pf-label-${c}-text)`,
    dot: `var(--pf-label-${c}-dot)`,
  }
}

// ── Label Chip ──

function LabelChip({
  name: initialName,
  color: initialColor,
  onRemove,
}: {
  name: string
  color: string
  onRemove?: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const [name, setName] = useState(initialName)
  const [color, setColor] = useState(initialColor)

  const cv = labelColorVars(color)
  const showActions = hovered

  return (
    <Popover
      onOpenChange={(open) => {
        if (!open) setHovered(false)
      }}
    >
      <span
        className="relative inline-flex items-center rounded-full text-xs cursor-default"
        style={{ background: cv.bg, color: cv.text, minWidth: "34px", height: "22px" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="px-2 truncate">{name}</span>

        {showActions && (
          <span
            className="absolute end-0 top-0 h-full flex items-center justify-end gap-px px-1 rounded-e-full"
            style={{
              background: cv.bg,
              paddingInlineStart: "4px",
            }}
          >
            <PopoverTrigger asChild>
              <button
                className="size-4 rounded-full flex items-center justify-center transition-colors hover:bg-foreground/10"
                style={{ color: cv.text }}
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontalIcon className="size-3" />
              </button>
            </PopoverTrigger>
            <button
              className="size-4 rounded-full flex items-center justify-center transition-colors hover:bg-foreground/10"
              style={{ color: cv.text }}
              onClick={(e) => { e.stopPropagation(); onRemove?.() }}
            >
              <XIcon className="size-3" />
            </button>
          </span>
        )}
      </span>

      <PopoverContent
        align="start"
        sideOffset={4}
        className="w-[220px] p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full text-sm px-2 py-1.5 rounded-md border border-border mb-3 bg-muted focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <div className="space-y-2">
          {presetColorRows.map((row, ri) => (
            <div key={ri} className="flex gap-1.5">
              {row.map((clr) => {
                if (clr === null) {
                  return (
                    <button
                      key="reset"
                      onClick={() => setColor("purple")}
                      className="size-5 rounded-full border border-border flex items-center justify-center transition-transform hover:scale-110 bg-muted"
                    >
                      <svg className="size-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" opacity={0.5}>
                        <line x1="3" y1="13" x2="13" y2="3" />
                      </svg>
                    </button>
                  )
                }
                const dotColor = labelColorVars(clr).dot
                return (
                  <button
                    key={clr}
                    onClick={() => setColor(clr)}
                    className="size-5 rounded-full transition-transform hover:scale-110"
                    style={{
                      background: dotColor,
                      outline: color === clr ? `2px solid ${dotColor}` : "none",
                      outlineOffset: "2px",
                    }}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

// ── Labels Field ──

function LabelsField({
  labels,
  isRtl,
}: {
  labels: Array<{ name: string; color: string }>
  isRtl: boolean
}) {
  const [allLabels, setAllLabels] = useState([
    { name: "enhancement", color: "purple" },
    { name: "frontend", color: "green" },
    { name: "bug", color: "red" },
    { name: "design", color: "pink" },
    { name: "backend", color: "orange" },
    { name: "docs", color: "cyan" },
    { name: "refactor", color: "amber" },
    { name: "testing", color: "teal" },
    { name: "urgent", color: "rose" },
    { name: "performance", color: "indigo" },
    { name: "security", color: "red" },
    { name: "accessibility", color: "violet" },
    { name: "mobile", color: "sky" },
    { name: "api", color: "lime" },
    { name: "database", color: "teal" },
    { name: "devops", color: "orange" },
    { name: "ux", color: "pink" },
    { name: "blocked", color: "rose" },
    { name: "needs-review", color: "amber" },
  ])

  const [selected, setSelected] = useState<string[]>(labels.map((l) => l.name))
  const [search, setSearch] = useState("")

  const selectedLabels = allLabels.filter((l) => selected.includes(l.name))
  const filteredLabels = allLabels.filter(
    (l) => !selected.includes(l.name) && l.name.toLowerCase().includes(search.toLowerCase())
  )
  const exactMatch = allLabels.some((l) => l.name.toLowerCase() === search.toLowerCase())
  const showCreate = search.trim() && !exactMatch

  const addLabel = (name: string) => {
    setSelected((prev) => [...prev, name])
  }

  const removeLabel = (name: string) => {
    setSelected((prev) => prev.filter((n) => n !== name))
  }

  const createAndAdd = () => {
    const name = search.trim()
    if (!name) return
    const color = randomColor()
    setAllLabels((prev) => [...prev, { name, color }])
    setSelected((prev) => [...prev, name])
    setSearch("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (showCreate) {
        createAndAdd()
      } else if (filteredLabels.length === 1) {
        addLabel(filteredLabels[0].name)
        setSearch("")
      }
    }
  }

  return (
    <div className="col-span-3">
      <Popover modal onOpenChange={(open) => { if (!open) setSearch("") }}>
        <div className="grid grid-cols-3 items-center py-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TagIcon className="size-3.5" />
            {isRtl ? "الوسوم" : "Labels"}
          </div>
          <div className="col-span-2 text-sm">
            <PopoverTrigger asChild>
              <button type="button" className="flex items-center gap-1.5 flex-wrap text-start">
                {selectedLabels.length > 0 ? (
                  selectedLabels.map((l) => (
                    <LabelChip key={l.name} name={l.name} color={l.color} onRemove={() => removeLabel(l.name)} />
                  ))
                ) : (
                  <span className="text-muted-foreground">{isRtl ? "إضافة وسوم..." : "Add labels..."}</span>
                )}
              </button>
            </PopoverTrigger>
          </div>
        </div>

        <PopoverContent
          align="start"
          sideOffset={4}
          className="flex w-[280px] max-h-(--radix-popover-content-available-height) flex-col p-0"
        >
          {/* Selected labels with X */}
          {selectedLabels.length > 0 && (
            <div className="shrink-0 p-2 flex flex-wrap gap-1.5">
              {selectedLabels.map((l) => {
                const cv = labelColorVars(l.color)
                return (
                  <span
                    key={l.name}
                    className="inline-flex items-center gap-1 rounded-full text-xs px-2 py-0.5"
                    style={{ background: cv.bg, color: cv.text }}
                  >
                    {l.name}
                    <button
                      className="hover:opacity-70"
                      onClick={() => removeLabel(l.name)}
                    >
                      <XIcon className="size-3" />
                    </button>
                  </span>
                )
              })}
            </div>
          )}

          {/* Search input */}
          <div className="shrink-0 px-2 pb-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isRtl ? "بحث أو إضافة وسوم..." : "Search or add labels..."}
              autoFocus
              className="w-full text-sm px-0 py-1.5 border-b border-border bg-transparent text-foreground focus:outline-none focus:border-ring"
            />
          </div>

          {/* Options header */}
          <div className="shrink-0 px-3 pt-1.5 pb-1">
            <span className="text-xs text-muted-foreground">{isRtl ? "اختر خياراً" : "Select an option"}</span>
          </div>

          {/* Options list */}
          <div
            className="px-3 pb-2 space-y-1.5 overscroll-contain"
            style={{ maxHeight: "240px", overflowY: "auto" }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {showCreate && (
              <div
                className="flex items-center justify-between cursor-pointer py-1 transition-colors rounded px-1 -mx-1 hover:bg-accent"
                onClick={createAndAdd}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{isRtl ? "إنشاء" : "Create"}</span>
                  <span className="inline-flex items-center rounded-full text-xs px-2.5 py-0.5 bg-muted text-muted-foreground">
                    {search.trim()}
                  </span>
                </div>
                <CornerDownLeftIcon className="size-4 text-muted-foreground/50" />
              </div>
            )}

            {filteredLabels.map((l) => {
              const cv = labelColorVars(l.color)
              return (
                <div
                  key={l.name}
                  className="flex items-center cursor-pointer py-0.5 transition-colors rounded px-1 -mx-1 hover:bg-accent"
                  onClick={() => { addLabel(l.name); setSearch("") }}
                >
                  <span
                    className="inline-flex items-center rounded-full text-xs px-2.5 py-1"
                    style={{ background: cv.bg, color: cv.text }}
                  >
                    {l.name}
                  </span>
                </div>
              )
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

// ── Sample data per task ──

const taskDetails: Record<string, { en: Omit<TaskDetail, "id" | "title" | "status" | "priority" | "project">; ar: Omit<TaskDetail, "id" | "title" | "status" | "priority" | "project"> }> = {
  "TASK-001": {
    en: {
      description: "Audit all design tokens to ensure they follow the OKLCH color space and are correctly mapped across light/dark modes.",
      dueDate: "Apr 15, 2026",
      assignees: [{ initials: "HA", name: "Haitham" }],
      labels: [{ name: "design", color: "pink" }, { name: "enhancement", color: "purple" }],
      subtasks: [
        { title: "Export current token map", done: true },
        { title: "Compare with Figma variables", done: false },
        { title: "Fix mismatched contrast ratios", done: false },
      ],
      activity: [
        { type: "event", user: "Haitham", userInitials: "HA", action: "created this task", time: "2 days ago" },
        { type: "event", user: "Haitham", userInitials: "HA", action: "changed status to", detail: "In Progress", time: "1 day ago" },
        { type: "comment", user: "Haitham", userInitials: "HA", text: "Found 12 tokens that don't convert cleanly to OKLCH", time: "3 hours ago" },
      ],
      resources: [
        { type: "doc", title: "Token migration guide", detail: "Markdown" },
        { type: "link", title: "OKLCH color picker", detail: "Link" },
      ],
    },
    ar: {
      description: "تدقيق جميع رموز التصميم للتأكد من أنها تتبع نظام ألوان OKLCH وتم تعيينها بشكل صحيح عبر الوضعين الفاتح والداكن.",
      dueDate: "١٥ أبريل ٢٠٢٦",
      assignees: [{ initials: "هـ", name: "هيثم" }],
      labels: [{ name: "تصميم", color: "pink" }, { name: "تحسين", color: "purple" }],
      subtasks: [
        { title: "تصدير خريطة الرموز الحالية", done: true },
        { title: "مقارنة مع متغيرات Figma", done: false },
        { title: "إصلاح نسب التباين غير المتطابقة", done: false },
      ],
      activity: [
        { type: "event", user: "هيثم", userInitials: "هـ", action: "أنشأ هذه المهمة", time: "قبل يومين" },
        { type: "event", user: "هيثم", userInitials: "هـ", action: "غيّر الحالة إلى", detail: "قيد التنفيذ", time: "قبل يوم" },
        { type: "comment", user: "هيثم", userInitials: "هـ", text: "وجدت 12 رمزاً لا يتحول بشكل نظيف إلى OKLCH", time: "قبل 3 ساعات" },
      ],
      resources: [
        { type: "doc", title: "دليل ترحيل الرموز", detail: "Markdown" },
        { type: "link", title: "منتقي ألوان OKLCH", detail: "رابط" },
      ],
    },
  },
  "TASK-003": {
    en: {
      description: "Refactor the auth middleware to use the new session token storage pattern required by compliance.",
      dueDate: "Apr 20, 2026",
      assignees: [{ initials: "HA", name: "Haitham" }, { initials: "AH", name: "Ahmed" }],
      labels: [{ name: "backend", color: "orange" }, { name: "security", color: "red" }],
      subtasks: [
        { title: "Map current middleware flow", done: true },
        { title: "Design new token storage", done: true },
        { title: "Implement session migration", done: false },
        { title: "Write integration tests", done: false },
      ],
      activity: [
        { type: "event", user: "Haitham", userInitials: "HA", action: "created this task", time: "5 days ago" },
        { type: "comment", user: "Ahmed", userInitials: "AH", text: "I'll handle the migration script — can start tomorrow", time: "1 day ago" },
        { type: "event", user: "Haitham", userInitials: "HA", action: "added label", detail: "security", time: "6 hours ago" },
      ],
      resources: [
        { type: "doc", title: "Auth middleware architecture", detail: "Markdown" },
        { type: "link", title: "Compliance requirements doc", detail: "Link" },
      ],
    },
    ar: {
      description: "إعادة هيكلة وسيط المصادقة لاستخدام نمط تخزين رمز الجلسة الجديد المطلوب للامتثال.",
      dueDate: "٢٠ أبريل ٢٠٢٦",
      assignees: [{ initials: "هـ", name: "هيثم" }, { initials: "أح", name: "أحمد" }],
      labels: [{ name: "خلفية", color: "orange" }, { name: "أمان", color: "red" }],
      subtasks: [
        { title: "رسم تدفق الوسيط الحالي", done: true },
        { title: "تصميم تخزين الرموز الجديد", done: true },
        { title: "تنفيذ ترحيل الجلسات", done: false },
        { title: "كتابة اختبارات التكامل", done: false },
      ],
      activity: [
        { type: "event", user: "هيثم", userInitials: "هـ", action: "أنشأ هذه المهمة", time: "قبل 5 أيام" },
        { type: "comment", user: "أحمد", userInitials: "أح", text: "سأتولى سكربت الترحيل — يمكنني البدء غداً", time: "قبل يوم" },
        { type: "event", user: "هيثم", userInitials: "هـ", action: "أضاف وسم", detail: "أمان", time: "قبل 6 ساعات" },
      ],
      resources: [
        { type: "doc", title: "هيكلة وسيط المصادقة", detail: "Markdown" },
        { type: "link", title: "مستند متطلبات الامتثال", detail: "رابط" },
      ],
    },
  },
}

// Fallback for tasks without detailed data
const fallbackDetail = {
  en: {
    assignees: [{ initials: "HA", name: "Haitham" }],
    labels: [],
    subtasks: [],
    activity: [
      { type: "event" as const, user: "Haitham", userInitials: "HA", action: "created this task", time: "1 day ago" },
    ],
    resources: [],
  },
  ar: {
    assignees: [{ initials: "هـ", name: "هيثم" }],
    labels: [],
    subtasks: [],
    activity: [
      { type: "event" as const, user: "هيثم", userInitials: "هـ", action: "أنشأ هذه المهمة", time: "قبل يوم" },
    ],
    resources: [],
  },
}

// ── Field Row ──

function FieldRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-3 items-center py-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </div>
      <div className="col-span-2 text-sm">{children}</div>
    </div>
  )
}

// ── Details Tab ──

function DetailsPanel({
  task,
  detail,
  isRtl,
}: {
  task: { id: string; title: string; status: string; priority: string; project: string }
  detail: Omit<TaskDetail, "id" | "title" | "status" | "priority" | "project">
  isRtl: boolean
}) {
  const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
    "In Progress": "default",
    Done: "secondary",
    Todo: "outline",
    "قيد التنفيذ": "default",
    "مكتمل": "secondary",
    "للتنفيذ": "outline",
  }

  const priorityVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    High: "destructive",
    Medium: "default",
    Low: "secondary",
    "عالي": "destructive",
    "متوسط": "default",
    "منخفض": "secondary",
  }

  return (
    <div className="flex-1 overflow-y-auto p-5">
      {/* Title */}
      <h2 className="text-lg font-semibold mb-1">{task.title}</h2>
      <p className="text-xs text-muted-foreground mb-5">{task.id}</p>

      {/* Fields */}
      <div className="mb-5">
        <FieldRow icon={CircleDotIcon} label={isRtl ? "الحالة" : "Status"}>
          <Badge variant={statusVariant[task.status]}>{task.status}</Badge>
        </FieldRow>
        <FieldRow icon={SignalIcon} label={isRtl ? "الأولوية" : "Priority"}>
          <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
        </FieldRow>
        <FieldRow icon={UserIcon} label={isRtl ? "المسؤول" : "Assignee"}>
          {detail.assignees && detail.assignees.length > 0 ? (
            <AvatarGroup>
              {detail.assignees.map((a) => (
                <Avatar key={a.initials} size="sm">
                  <AvatarFallback className="text-[10px]">{a.initials}</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
          ) : (
            <span className="text-muted-foreground">{isRtl ? "غير محدد" : "Unassigned"}</span>
          )}
        </FieldRow>
        <FieldRow icon={CalendarIcon} label={isRtl ? "تاريخ الاستحقاق" : "Due Date"}>
          {detail.dueDate ?? (
            <span className="text-muted-foreground">{isRtl ? "لم يُحدد" : "Not set"}</span>
          )}
        </FieldRow>
        <LabelsField labels={detail.labels ?? []} isRtl={isRtl} />
      </div>

      <Separator />

      {/* Description */}
      <div className="my-5">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          {isRtl ? "الوصف" : "Description"}
        </h3>
        {detail.description ? (
          <p className="text-sm leading-relaxed">{detail.description}</p>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            {isRtl ? "لا يوجد وصف" : "No description"}
          </p>
        )}
      </div>

      {/* Subtasks */}
      {detail.subtasks && detail.subtasks.length > 0 && (
        <>
          <Separator />
          <div className="mt-5">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              {isRtl ? "المهام الفرعية" : "Subtasks"}
              <span className="ms-2 text-xs">
                {detail.subtasks.filter((s) => s.done).length}/{detail.subtasks.length}
              </span>
            </h3>
            <div className="space-y-1">
              {detail.subtasks.map((st, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm hover:bg-accent/50"
                >
                  <Checkbox checked={st.done} />
                  <span className={st.done ? "line-through text-muted-foreground" : ""}>
                    {st.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ── Activity Tab ──

function ActivityPanel({
  activity,
  isRtl,
}: {
  activity: NonNullable<TaskDetail["activity"]>
  isRtl: boolean
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Content top bar */}
      <div className="flex h-[50px] min-h-[50px] items-center justify-between border-b px-5">
        <span className="text-base font-semibold">{isRtl ? "النشاط" : "Activity"}</span>
        <Button variant="ghost" size="icon-sm">
          <FilterIcon className="size-4" />
          <span className="sr-only">{isRtl ? "تصفية" : "Filter"}</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="space-y-4">
          {activity.map((item, i) => (
            <div key={i} className="flex gap-3">
              <Avatar size="sm" className="mt-0.5">
                <AvatarFallback className="text-[10px]">{item.userInitials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                {item.type === "comment" ? (
                  <>
                    <p className="text-sm font-medium">{item.user}</p>
                    <p className="text-sm mt-0.5 text-muted-foreground">{item.text}</p>
                  </>
                ) : (
                  <p className="text-sm">
                    <span className="font-medium">{item.user}</span>{" "}
                    <span className="text-muted-foreground">{item.action}</span>
                    {item.detail && (
                      <> <Badge variant="outline" className="ms-1">{item.detail}</Badge></>
                    )}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment input */}
      <div className="border-t p-3">
        <div className="flex gap-2">
          <Input
            placeholder={isRtl ? "اكتب تعليقاً..." : "Write a comment..."}
            className="flex-1"
          />
          <Button size="sm">
            <SendIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// ── Resources Tab ──

function ResourcesPanel({
  resources,
  isRtl,
}: {
  resources: NonNullable<TaskDetail["resources"]>
  isRtl: boolean
}) {
  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-2">
      {resources.map((r, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-md border px-3 py-2 hover:bg-accent/50"
        >
          {r.type === "doc" ? (
            <FileTextIcon className="size-4 text-muted-foreground shrink-0" />
          ) : (
            <LinkIcon className="size-4 text-muted-foreground shrink-0" />
          )}
          <div className="min-w-0">
            <p className="text-sm truncate">{r.title}</p>
            <p className="text-xs text-muted-foreground">{r.detail}</p>
          </div>
        </div>
      ))}
      {resources.length === 0 && (
        <p className="text-sm text-muted-foreground italic">
          {isRtl ? "لا توجد موارد" : "No resources"}
        </p>
      )}
      <Button variant="outline" className="w-full mt-2 border-dashed">
        <PlusIcon className="size-4" />
        {isRtl ? "إضافة مورد" : "Add resource"}
      </Button>
    </div>
  )
}

// ── Main Export ──

export function TaskDrawer({
  open,
  onOpenChange,
  task,
  isRtl,
  dir,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: { id: string; title: string; status: string; priority: string; project: string } | null
  isRtl: boolean
  dir: "ltr" | "rtl" | undefined
}) {
  const [activeTab, setActiveTab] = useState("details")
  const lang = isRtl ? "ar" : "en"

  if (!task) return null

  const detail = taskDetails[task.id]?.[lang] ?? fallbackDetail[lang]

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction={isRtl ? "left" : "right"}>
      <DrawerContent
        dir={dir}
        className="w-[665px] data-[vaul-drawer-direction=right]:sm:max-w-[665px] data-[vaul-drawer-direction=left]:sm:max-w-[665px] gap-0 p-0"
      >
        {/* Accessible title for screen readers */}
        <DrawerTitle className="sr-only">{task.title}</DrawerTitle>

        {/* Top bar */}
        <div className="flex h-[45px] min-h-[45px] items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onOpenChange(false)}
            >
              <XIcon className="size-4" />
              <span className="sr-only">{isRtl ? "إغلاق" : "Close"}</span>
            </Button>
            <span className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground">
              <span className="flex size-4 items-center justify-center rounded bg-muted text-[10px] font-medium">
                P
              </span>
              {task.project}
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon-sm">
              <MaximizeIcon className="size-4" />
              <span className="sr-only">{isRtl ? "توسيع" : "Expand"}</span>
            </Button>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontalIcon className="size-4" />
              <span className="sr-only">{isRtl ? "المزيد" : "More"}</span>
            </Button>
          </div>
        </div>

        {/* Body: main content + right tab toolbar */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          orientation="vertical"
          className="flex-1 min-h-0 flex-row"
        >
          {/* Main content area — 600px like prototype */}
          <div className="w-[600px] flex flex-col min-h-0">
            <TabsContent value="details" className="flex-1 min-h-0">
              <DetailsPanel task={task} detail={detail} isRtl={isRtl} />
            </TabsContent>
            <TabsContent value="activity" className="flex-1 min-h-0 flex flex-col">
              <ActivityPanel activity={detail.activity ?? []} isRtl={isRtl} />
            </TabsContent>
            <TabsContent value="resources" className="flex-1 min-h-0 flex flex-col">
              <ResourcesPanel resources={detail.resources ?? []} isRtl={isRtl} />
            </TabsContent>
          </div>

          {/* Right toolbar — 58px like prototype */}
          <TabsList
            className="w-[65px] min-w-[65px] flex-col items-center !justify-start border-s pt-2 gap-1 px-1.5 !h-auto self-stretch rounded-none !bg-transparent"
          >
            <TabsTrigger value="details" className="h-auto flex-none flex-col gap-1 px-0 py-2 w-full data-[state=active]:bg-accent">
              <AlignLeftIcon className="size-4" />
              <span className="text-[9px] leading-tight">{isRtl ? "تفاصيل" : "Details"}</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="h-auto flex-none flex-col gap-1 px-0 py-2 w-full data-[state=active]:bg-accent">
              <MessageSquareIcon className="size-4" />
              <span className="text-[9px] leading-tight">{isRtl ? "نشاط" : "Activity"}</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="h-auto flex-none flex-col gap-1 px-0 py-2 w-full data-[state=active]:bg-accent">
              <PaperclipIcon className="size-4" />
              <span className="text-[9px] leading-tight">{isRtl ? "موارد" : "Resources"}</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </DrawerContent>
    </Drawer>
  )
}
