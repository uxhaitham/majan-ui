import { Button } from "@/components/ui/button"
import { useDir } from "@/hooks/use-dir"
import { ArrowLeft, ArrowRight, Mail } from "lucide-react"

export default function ButtonDemo() {
  const { ref, isRtl } = useDir()

  const t = {
    default: isRtl ? "افتراضي" : "Default",
    secondary: isRtl ? "ثانوي" : "Secondary",
    outline: isRtl ? "محدد" : "Outline",
    ghost: isRtl ? "شبح" : "Ghost",
    destructive: isRtl ? "حذف" : "Destructive",
    link: isRtl ? "رابط" : "Link",
    submit: isRtl ? "إرسال" : "Submit",
    mail: isRtl ? "بريد" : "Mail",
    xs: isRtl ? "صغير جدا" : "Extra Small",
    sm: isRtl ? "صغير" : "Small",
    md: isRtl ? "متوسط" : "Default",
    lg: isRtl ? "كبير" : "Large",
    withIcon: isRtl ? "مع أيقونة" : "With Icon",
    iconOnly: isRtl ? "أيقونة فقط" : "Icon Only",
  }

  const TrailingArrow = isRtl ? ArrowLeft : ArrowRight

  return (
    <div ref={ref} className="space-y-8">
      {/* Variants × Sizes */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">{t.xs}</p>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="xs">{t.default}</Button>
          <Button size="xs" variant="secondary">{t.secondary}</Button>
          <Button size="xs" variant="outline">{t.outline}</Button>
          <Button size="xs" variant="ghost">{t.ghost}</Button>
          <Button size="xs" variant="destructive">{t.destructive}</Button>
          <Button size="xs" variant="link">{t.link}</Button>
        </div>
        <p className="text-xs font-medium text-muted-foreground">{t.sm}</p>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm">{t.default}</Button>
          <Button size="sm" variant="secondary">{t.secondary}</Button>
          <Button size="sm" variant="outline">{t.outline}</Button>
          <Button size="sm" variant="ghost">{t.ghost}</Button>
          <Button size="sm" variant="destructive">{t.destructive}</Button>
          <Button size="sm" variant="link">{t.link}</Button>
        </div>
        <p className="text-xs font-medium text-muted-foreground">{t.md}</p>
        <div className="flex flex-wrap items-center gap-2">
          <Button>{t.default}</Button>
          <Button variant="secondary">{t.secondary}</Button>
          <Button variant="outline">{t.outline}</Button>
          <Button variant="ghost">{t.ghost}</Button>
          <Button variant="destructive">{t.destructive}</Button>
          <Button variant="link">{t.link}</Button>
        </div>
        <p className="text-xs font-medium text-muted-foreground">{t.lg}</p>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="lg">{t.default}</Button>
          <Button size="lg" variant="secondary">{t.secondary}</Button>
          <Button size="lg" variant="outline">{t.outline}</Button>
          <Button size="lg" variant="ghost">{t.ghost}</Button>
          <Button size="lg" variant="destructive">{t.destructive}</Button>
          <Button size="lg" variant="link">{t.link}</Button>
        </div>
      </div>

      {/* With Icons */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">{t.withIcon}</p>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="xs"><Mail /> {t.mail}</Button>
          <Button size="sm"><Mail /> {t.mail}</Button>
          <Button><Mail /> {t.mail}</Button>
          <Button size="lg"><Mail /> {t.mail}</Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="xs">{t.submit} <TrailingArrow /></Button>
          <Button variant="outline" size="sm">{t.submit} <TrailingArrow /></Button>
          <Button variant="outline">{t.submit} <TrailingArrow /></Button>
          <Button variant="outline" size="lg">{t.submit} <TrailingArrow /></Button>
        </div>
      </div>

      {/* Icon Only */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">{t.iconOnly}</p>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="icon" variant="outline"><Mail /></Button>
          <Button size="icon"><Mail /></Button>
          <Button size="icon" variant="secondary"><Mail /></Button>
          <Button size="icon" variant="ghost"><Mail /></Button>
          <Button size="icon" variant="destructive"><Mail /></Button>
        </div>
      </div>
    </div>
  )
}
