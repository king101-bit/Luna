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
import PreviewCard from "@/components/PreviewPage/PreviewCard"
import PreviewTabs from "@/components/PreviewPage/PreviewTabs"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@root/utils/supabase/client"
import {
  Award,
  BarChart2,
  BookOpen,
  CheckCircle,
  ChevronLeft,
  Clock,
  FileText,
  Terminal,
  User,
  Video,
} from "lucide-react"
import Link from "next/link"
type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function PreviewPage({ params }: PageProps) {
  const { slug } = await params
  const titleFromSlug = decodeURIComponent(slug).replace(/-/g, " ")
  const supabase = createClient()

  try {
    const { data: course, error } = await supabase
      .from("courses")
      .select("*")
      .ilike("title", titleFromSlug)
      .single()

    if (error) throw error
    if (!course) throw new Error("Course not found")

    return (
      <div className="container mx-auto px-4 py-8">
        <Link href={`/courses`}>
          <Button variant="ghost" size="sm" className="mb-3">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left Sidebar Card */}
          <PreviewCard
            CourseTitle={course.title}
            CourseDescription={course.description}
          />
          {/* Main Content Area */}
          <PreviewTabs CourseDescription={course.description} />
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Course Not Found</h1>
        <p className="mt-2">
          We couldn&apos;t find &quot;{titleFromSlug}&quot;. Please check the
          URL or browse our courses.
        </p>
      </div>
    )
  }
}
