"use client"
import { Button } from "@/components/ui/button"
import {
  Award,
  BookOpen,
  ChevronLeft,
  Clock,
  FileText,
  Play,
  Star,
  Terminal,
  Users,
} from "lucide-react"
import Link from "next/link"
import { redirect, useParams } from "next/navigation"

import { createClient } from "@root/utils/supabase/client"
import PreviewCard from "@/components/PreviewPage/PreviewCard"
import PreviewTabs from "@/components/PreviewPage/PreviewTabs"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MainNavbar } from "@/components/ui/MainNavbar"
import { Progress } from "@/components/ui/progress"
import EnrollmentButton from "@/components/ui/EnrollmentButton"
import { useEffect, useState } from "react"
import { CourseTag, Lesson, Tag } from "@root/global"

export default function PreviewPage() {
  const supabase = createClient()
  const { slug } = useParams() as { slug: string }

  const [user, setUser] = useState<any>(null)
  const [course, setCourse] = useState<any>(null)
  const [modulesWithLessons, setModulesWithLessons] = useState<any[]>([])
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [lessonTypeCount, setLessonTypeCount] = useState<
    Record<string, number>
  >({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      // Get user
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      // Fetch course
      const { data: course, error } = await supabase
        .from("courses")
        .select(
          `
    id,
    title,
    description,
    slug,
    price,
    level,
    instructor,
    hours,
    thumbnail,
    certificate_enabled,
    requires_prerequisites,
    categories!courses_category_id_fkey(name),
    course_tags (
      tag_id,
      tags ( id, name )
    )
  `
        )
        .eq("slug", slug)
        .single()

      setLoading(false)
      if (error || !course) {
        console.error(error || "Course not found")
        setLoading(false)
        return
      }

      // Enrollment check
      const { data: userEnrollment } = await supabase
        .from("enrollments")
        .select("id, enrolled_at")
        .eq("course_id", course.id)
        .eq("user_id", user?.id)
        .maybeSingle()

      setIsEnrolled(!!userEnrollment)

      // Fetch modules
      const { data: fullModules, error: fullModulesError } = await supabase
        .from("course_modules")
        .select(`id, course_id, title, description, order_index`)
        .eq("course_id", course.id)
        .order("order_index", { ascending: true })

      if (fullModulesError || !fullModules) {
        console.error(fullModulesError || "No modules found")
        setCourse(course)
        setLoading(false)
        return
      }

      const moduleIds = fullModules.map((m) => m.id)

      // Fetch lessons
      const { data: lessons, error: lessonsError } = await supabase
        .from("course_lessons")
        .select("id, title, type, duration, module_id")
        .in("module_id", moduleIds)

      if (lessonsError || !lessons) {
        console.error(lessonsError || "No lessons found")
        setCourse(course)
        setLoading(false)
        return
      }

      // Attach lessons to modules
      const modulesWithLessons = fullModules.map((module) => ({
        ...module,
        lessons: lessons.filter((lesson) => lesson.module_id === module.id),
      }))

      // Count lesson types
      const lessonTypeCount: Record<string, number> = {}
      for (const lesson of lessons) {
        const normalized = normalizeLessonType(lesson.type || "unknown")
        lessonTypeCount[normalized] = (lessonTypeCount[normalized] || 0) + 1
      }

      setLessonTypeCount(lessonTypeCount)
      setCourse(course)
      setModulesWithLessons(modulesWithLessons)
      setLoading(false)
    }

    fetchData()
  }, [slug])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Course not found</p>
      </div>
    )
  }

  // Helpers
  function getLessonIcon(type: string) {
    switch (normalizeLessonType(type)) {
      case "video":
        return <Play className="h-4 w-4 text-blue-600" />
      case "text":
        return <FileText className="h-4 w-4 text-green-600" />
      case "terminal":
        return <Terminal className="h-4 w-4 text-purple-600" />
      case "quiz":
        return <Award className="h-4 w-4 text-orange-600" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300" />
    }
  }

  function normalizeLessonType(type: string): string {
    switch (type.toUpperCase()) {
      case "VIDEO":
        return "video"
      case "TEXT":
        return "text"
      case "TERMINAL":
        return "terminal"
      case "QUIZ":
        return "quiz"
      default:
        return "unknown"
    }
  }

  const lessonCount = modulesWithLessons.reduce(
    (sum, module) => sum + module.lessons.length,
    0
  )
  const moduleCount = modulesWithLessons.length
  const totalMinutes = modulesWithLessons.reduce(
    (sum: number, module) =>
      sum +
      module.lessons.reduce(
        (lsum: number, l: { duration?: number }) => lsum + (l.duration || 0),
        0
      ),
    0
  )

  function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formattedDuration = formatDuration(totalMinutes)

  // fixedCourse for features
  const fixedCourse = {
    ...course,
    category: course.categories?.name || "Uncategorized",
    features: [
      ...(course.certificate_enabled ? ["Certificate of completion"] : []),
      ...(course.requires_prerequisites ? ["Requires prerequisites"] : []),
      "Hands-on projects",
      "Quizzes and exercises",
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MainNavbar />
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-2">
                <Badge className="border-white/30 bg-white/20 text-white">
                  {course.categories?.name}
                </Badge>
                <Badge
                  className={`${
                    course.level === "Beginner"
                      ? "bg-green-500"
                      : course.level === "Intermediate"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  } text-white`}
                >
                  {course.level}
                </Badge>
                {/* {isEnrolled && (
                  <Badge className="bg-white/20 border-white/30 text-white">
                    Enrolled
                  </Badge>
                )} */}
              </div>
              <h1 className="mb-4 text-4xl font-bold">{course.title}</h1>
              <p className="mb-6 text-xl text-blue-100">{course.description}</p>

              <div className="flex items-center gap-6 text-blue-100">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(4.5)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">4.5</span>
                  <span>(2,000 students)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.hours} hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>By {course.instructor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What you'll learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {modulesWithLessons.map((module, moduleIndex) =>
                        module.lessons.map(
                          (lesson: Lesson, lessonIndex: number) => (
                            <div
                              key={`${moduleIndex}-${lessonIndex}`}
                              className="flex items-start gap-2"
                            >
                              <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {lesson.title}
                              </span>
                            </div>
                          )
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Course Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {fixedCourse.features.map(
                        (feature: string, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="text-sm">
                        {course.requires_prerequisites
                          ? "This course requires prerequisites"
                          : "No prerequisites required"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Course Curriculum</h3>
                  <div className="text-sm text-gray-600">
                    {moduleCount} modules • {lessonCount} lessons •{" "}
                    {course.hours} hours
                  </div>
                </div>

                <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="rounded-lg bg-blue-50 p-3 text-center">
                    <Play className="mx-auto mb-1 h-6 w-6 text-blue-600" />
                    <div className="text-sm font-medium text-black">
                      {lessonTypeCount.video || 0} Videos
                    </div>
                  </div>

                  <div className="rounded-lg bg-green-50 p-3 text-center">
                    <FileText className="mx-auto mb-1 h-6 w-6 text-green-600" />
                    <div className="text-sm font-medium text-black">
                      {lessonTypeCount.text || 0} Text Lessons
                    </div>
                  </div>

                  <div className="rounded-lg bg-purple-50 p-3 text-center">
                    <Terminal className="mx-auto mb-1 h-6 w-6 text-purple-600" />
                    <div className="text-sm font-medium text-black">
                      {lessonTypeCount.terminal || 0} Terminal Lessons
                    </div>
                  </div>

                  <div className="rounded-lg bg-orange-50 p-3 text-center">
                    <Award className="mx-auto mb-1 h-6 w-6 text-orange-600" />
                    <div className="text-sm font-medium text-black">
                      {lessonTypeCount.quiz || 0} Quizzes
                    </div>
                  </div>
                </div>

                <Accordion type="multiple">
                  {modulesWithLessons.map((module, moduleIndex) => {
                    // Calculate module duration
                    const moduleDuration = module.lessons.reduce(
                      (sum: number, lesson: Lesson) =>
                        sum + Number(lesson.duration || 0),
                      0
                    )

                    return (
                      <AccordionItem key={module.id} value={module.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="mr-4 flex w-full items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                                {moduleIndex + 1}
                              </div>
                              <div className="text-left">
                                <h4 className="font-medium text-black">
                                  {module.title}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {module.lessons.length} lessons •{" "}
                                  {moduleDuration} mins
                                </p>
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent>
                          <div className="space-y-2 pl-11">
                            {module.lessons.map((lesson: Lesson) => (
                              <div
                                key={lesson.id}
                                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                              >
                                <div className="flex items-center gap-3">
                                  {getLessonIcon(lesson.type)}
                                  <div>
                                    <h5 className="text-sm font-medium text-black">
                                      {lesson.title}
                                    </h5>
                                    <p className="text-xs text-gray-500">
                                      {lesson.type} • {lesson.duration} mins
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Student Reviews</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(4.5)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">4.5</span>
                    <span className="text-gray-500">(20 reviews)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-500">
                    No reviews yet. Be the first to review this course!
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar with enrollment logic */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex aspect-video items-center justify-center rounded-lg bg-gray-100">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="ml-2 text-2xl font-bold text-blue-600">
                          {course.price === 0 ? "Free" : `$${course.price}`}
                        </span>
                      </div>
                    </div>

                    {/* Enrollment Logic */}
                    {/* {isEnrolled ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        {fixedCourse.lastAccessed && (
                          <p className="text-sm text-gray-600">
                            Last accessed: {fixedCourse.lastAccessed}
                          </p>
                        )}
                        <Link href={`/courses/${course.slug}/learn`}>
                          <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                            Continue Learning
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <EnrollmentButton 
                          courseId={course.id}
                          coursePrice={course.price}
                          userId={user?.id}
                          isAuthenticated={!!user}
                        />
                      </div>
                    )} */}
                    <div className="space-y-3">
                      {isEnrolled ? (
                        <Link href={`/courses/${course.slug}/learn`}>
                          <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                            Continue Learning
                          </Button>
                        </Link>
                      ) : (
                        <Link href={`/courses/${course.slug}/enrollment`}>
                          <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                            Start Now
                          </Button>
                        </Link>
                      )}
                    </div>

                    <div className="space-y-3 border-t pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Duration</span>
                        <span className="font-medium">
                          {course.hours} hours
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Lessons</span>
                        <span className="font-medium">{lessonCount}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Level</span>
                        <span className="font-medium">{course.level}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Students</span>
                        <span className="font-medium">2,000</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Certificate</span>
                        <span className="font-medium">
                          {course.certificate_enabled ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="mb-2 font-medium">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {course?.course_tags
                          ?.flatMap((ct: CourseTag) => ct.tags || [])
                          .map((tag: Tag) => (
                            <Badge
                              key={tag.id}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag.name}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
