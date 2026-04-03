import { useDir } from "@/hooks/use-dir"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const articles = {
  en: [
    { title: "Oman launches national AI strategy with $500M investment", summary: "The Ministry of Transport, Communications and IT unveiled a five-year plan to position Oman as a regional AI hub, focusing on government services and healthcare.", source: "Times of Oman", sourceInitial: "TO", time: "12 min ago", category: "Tech", readTime: "4 min read" },
    { title: "New metro system approved for Muscat Greater Area", summary: "The cabinet approved the first phase of the Muscat Metro connecting the airport to Muttrah, with construction starting Q1 2027.", source: "Muscat Daily", sourceInitial: "MD", time: "45 min ago", category: "Infrastructure", readTime: "3 min read" },
    { title: "Central Bank of Oman holds interest rates steady", summary: "The CBO maintained its benchmark rate at 6.0%, citing stable inflation and positive GDP growth forecasts for the remainder of 2026.", source: "Gulf News", sourceInitial: "GN", time: "1h ago", category: "Business", readTime: "2 min read" },
    { title: "Sur hosts international renewable energy conference", summary: "Over 400 delegates from 30 countries gathered to discuss solar and hydrogen energy potential in the Gulf region.", source: "ONA", sourceInitial: "ON", time: "2h ago", category: "Energy", readTime: "5 min read" },
    { title: "Dhofar tourism numbers surge ahead of Khareef season", summary: "Early bookings for the monsoon season show a 35% increase over last year, driven by new hotel openings and improved road infrastructure.", source: "Times of Oman", sourceInitial: "TO", time: "3h ago", category: "Tourism", readTime: "3 min read" },
  ],
  ar: [
    { title: "عُمان تطلق استراتيجية وطنية للذكاء الاصطناعي باستثمار 500 مليون دولار", summary: "كشفت وزارة النقل والاتصالات وتقنية المعلومات عن خطة خمسية لجعل عُمان مركزاً إقليمياً للذكاء الاصطناعي، مع التركيز على الخدمات الحكومية والرعاية الصحية.", source: "تايمز أوف عُمان", sourceInitial: "تع", time: "قبل 12 د", category: "تقنية", readTime: "4 د قراءة" },
    { title: "الموافقة على نظام مترو جديد لمنطقة مسقط الكبرى", summary: "وافق مجلس الوزراء على المرحلة الأولى من مترو مسقط الذي يربط المطار بمطرح، مع بدء الإنشاء في الربع الأول من 2027.", source: "مسقط ديلي", sourceInitial: "مد", time: "قبل 45 د", category: "بنية تحتية", readTime: "3 د قراءة" },
    { title: "البنك المركزي العُماني يبقي على أسعار الفائدة", summary: "أبقى البنك المركزي على سعر الفائدة الأساسي عند 6.0%، مشيراً إلى استقرار التضخم وتوقعات نمو إيجابية.", source: "جلف نيوز", sourceInitial: "جن", time: "قبل ساعة", category: "أعمال", readTime: "2 د قراءة" },
    { title: "صور تستضيف مؤتمراً دولياً للطاقة المتجددة", summary: "اجتمع أكثر من 400 مندوب من 30 دولة لمناقشة إمكانات الطاقة الشمسية والهيدروجينية في منطقة الخليج.", source: "وكالة الأنباء العُمانية", sourceInitial: "وأ", time: "قبل ساعتين", category: "طاقة", readTime: "5 د قراءة" },
    { title: "ارتفاع أعداد السياح في ظفار قبيل موسم الخريف", summary: "تُظهر الحجوزات المبكرة لموسم الأمطار زيادة بنسبة 35% مقارنة بالعام الماضي، مدفوعة بافتتاح فنادق جديدة وتحسين البنية التحتية.", source: "تايمز أوف عُمان", sourceInitial: "تع", time: "قبل 3 ساعات", category: "سياحة", readTime: "3 د قراءة" },
  ],
}

export default function PulseFeed() {
  const { ref, isRtl } = useDir()
  const lang = isRtl ? "ar" : "en"

  return (
    <div ref={ref} className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Filters bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">{isRtl ? "الكل" : "All"}</TabsTrigger>
              <TabsTrigger value="business">{isRtl ? "أعمال" : "Business"}</TabsTrigger>
              <TabsTrigger value="tech">{isRtl ? "تقنية" : "Tech"}</TabsTrigger>
              <TabsTrigger value="politics">{isRtl ? "سياسة" : "Politics"}</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <Input placeholder={isRtl ? "بحث في المقالات..." : "Search articles..."} className="w-48" />
            <Select defaultValue="latest">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">{isRtl ? "الأحدث" : "Latest"}</SelectItem>
                <SelectItem value="popular">{isRtl ? "الأكثر شعبية" : "Popular"}</SelectItem>
                <SelectItem value="longest">{isRtl ? "الأطول" : "Longest"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Article list */}
        <div className="space-y-4">
          {articles[lang].map((article) => (
            <Card key={article.title}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="mt-0.5 size-8">
                      <AvatarFallback className="text-[10px]">
                        {article.sourceInitial}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base leading-snug">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {article.source} &middot; {article.time}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    {article.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {article.summary}
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <span className="text-xs text-muted-foreground">
                  {article.readTime}
                </span>
                <span className="flex-1" />
                <Button variant="ghost" size="sm">
                  {isRtl ? "حفظ" : "Bookmark"}
                </Button>
                <Button variant="outline" size="sm">
                  {isRtl ? "اقرأ" : "Read"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
