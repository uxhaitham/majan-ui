import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useDir } from "@/hooks/use-dir"

const schema = z.object({
  email: z.string().email("Invalid email"),
})

type FormValues = z.infer<typeof schema>

export default function FormDemo() {
  const { ref, isRtl } = useDir()
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  })

  function onSubmit(values: FormValues) {
    console.log(values)
  }

  return (
    <div ref={ref} className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {isRtl ? "البريد الإلكتروني" : "Email"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {isRtl
                    ? "سنرسل رابط الدخول إلى هذا البريد."
                    : "We'll send a sign-in link to this address."}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{isRtl ? "إرسال" : "Submit"}</Button>
        </form>
      </Form>
    </div>
  )
}
