import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDir } from "@/hooks/use-dir"

export default function CardDemo() {
  const { ref, isRtl } = useDir()

  return (
    <Card ref={ref} className="w-[350px]">
      <CardHeader>
        <CardTitle>{isRtl ? "إنشاء مشروع" : "Create project"}</CardTitle>
        <CardDescription>
          {isRtl
            ? "انشر مشروعك الجديد بنقرة واحدة."
            : "Deploy your new project in one click."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {isRtl
            ? "اختر إطار عمل وقالب للبدء بمشروعك الجديد."
            : "Choose a framework and template to get started with your new project."}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">{isRtl ? "إلغاء" : "Cancel"}</Button>
        <Button>{isRtl ? "نشر" : "Deploy"}</Button>
      </CardFooter>
    </Card>
  )
}
