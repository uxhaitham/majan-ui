import { Button } from "@/components/ui/button"
import { useDir } from "@/hooks/use-dir"
import { ExternalLink, Github } from "lucide-react"

export default function ButtonAsLink() {
  const { ref, isRtl } = useDir()

  return (
    <div ref={ref} className="flex flex-wrap items-center gap-3">
      <Button variant="ghost" asChild size="sm">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Github />
          GitHub
        </a>
      </Button>
      <Button variant="outline" asChild>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <ExternalLink />
          {isRtl ? "التوثيق" : "Documentation"}
        </a>
      </Button>
      <Button asChild>
        <a href="#">
          {isRtl ? "ابدأ الآن" : "Get Started"}
        </a>
      </Button>
    </div>
  )
}
