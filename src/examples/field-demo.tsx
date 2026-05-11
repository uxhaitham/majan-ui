import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useDir } from "@/hooks/use-dir"

export default function FieldDemo() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="w-full max-w-md">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">
            {isRtl ? "البريد الإلكتروني" : "Email"}
          </FieldLabel>
          <Input id="email" type="email" placeholder="you@example.com" />
          <FieldDescription>
            {isRtl
              ? "سنرسل رابط الدخول إلى هذا البريد."
              : "We'll send a sign-in link to this address."}
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="email-err">
            {isRtl ? "البريد الإلكتروني (مع خطأ)" : "Email (with error)"}
          </FieldLabel>
          <Input id="email-err" aria-invalid defaultValue="not-an-email" />
          <FieldError>
            {isRtl ? "صيغة البريد غير صحيحة." : "Invalid email format."}
          </FieldError>
        </Field>
      </FieldGroup>
    </div>
  )
}
