import { AuthLayout } from "@/components/auth-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDir } from "@/hooks/use-dir"

export default function AuthLayoutDemo() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="rounded-lg overflow-hidden border h-[640px]">
      <AuthLayout
        marketing={
          <div className="flex flex-col justify-between min-h-full">
            <div className="flex items-baseline gap-3">
              <span className="size-9 rounded-lg bg-primary text-primary-foreground grid place-items-center font-bold">
                {isRtl ? "م" : "M"}
              </span>
              <span className="text-xl font-bold tracking-tight">
                {isRtl ? "مرصد · Marsad" : "Marsad"}
              </span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight max-w-md leading-snug">
              {isRtl
                ? "منصة رصد امتثال المؤثرين في سلطنة عُمان."
                : "Influencer compliance monitoring for the Sultanate of Oman."}
            </h1>
            <p className="text-sm opacity-70">
              {isRtl ? "وزارة التجارة والصناعة وترويج الاستثمار" : "MoCIIP"}
            </p>
          </div>
        }
      >
        <form className="space-y-5">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {isRtl ? "تسجيل الدخول" : "Sign in"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              {isRtl
                ? "سنرسل لك رابط دخول لمرّة واحدة."
                : "We'll send you a one-time sign-in link."}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              {isRtl ? "البريد الإلكتروني" : "Email"}
            </Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <Button type="submit" className="w-full">
            {isRtl ? "إرسال رابط الدخول" : "Send sign-in link"}
          </Button>
        </form>
      </AuthLayout>
    </div>
  )
}
