"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EnrollmentConfirmation } from "@/components/ui/enrollment-confirmation"
import { PaymentForm } from "@/components/ui/PaymentForm"
import { formatNaira } from "@root/utils/formatCurrency"
import { createClient } from "@root/utils/supabase/client"
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Globe,
  MessageSquare,
  Play,
  Shield,
  Smartphone,
  Star,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
type Lesson = {
  id: string
  title: string
  type: string
  duration: number
  module_id: string
}

type Module = {
  id: string
  course_id: string
  title: string
  description?: string
  order_index: number
  lessons: Lesson[]
}
type Course = {
  id: string
  title: string
  features: string[]
}

function enrollment() {
  const [user, setUser] = useState<any>(null)
  const [course, setCourse] = useState<any>(null)
  const [modulesWithLessons, setModulesWithLessons] = useState<any[]>([])
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [lessonTypeCount, setLessonTypeCount] = useState<
    Record<string, number>
  >({})
  const [enrollmentStep, setEnrollmentStep] = useState<
    "details" | "payment" | "confirmation"
  >("details")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card")
  const [isFree, setIsFree] = useState(false)
  const [loading, setLoading] = useState(true)
  const { slug } = useParams() as { slug: string }

  const supabase = createClient()

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

  const fixedCourse = {
    ...course,
    category: course.categories?.name || "Uncategorized",
    features: [
      ...(course.certificate_enabled ? ["Certificate of completion"] : []),
      ...(course.requires_prerequisites ? ["Requires prerequisites"] : []),
      "Hands-on projects",
      "Quizzes and exercises",
    ],
    modules: modulesWithLessons,
  }
  const moduleDuration = modulesWithLessons.reduce(
    (sum, lesson: Lesson) => sum + (lesson.duration || 0),
    0
  )

  const totalCourseDuration = modulesWithLessons.reduce(
    (sum: number, module: Module) => {
      return (
        sum +
        module.lessons.reduce(
          (lessonSum: number, lesson: Lesson) =>
            lessonSum + (lesson.duration || 0),
          0
        )
      )
    },
    0
  )
  function formatDuration(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  const allLessons = modulesWithLessons.flatMap((m) => m.lessons)

  const handleEnrollment = () => {
    if (course.price === 0) {
      // Free course - skip payment
      setEnrollmentStep("confirmation")
    } else {
      setEnrollmentStep("payment")
    }
  }

  const handlePaymentSuccess = () => {
    setEnrollmentStep("confirmation")
  }

  if (enrollmentStep === "confirmation") {
    return <EnrollmentConfirmation course={course} fixedCourse={fixedCourse} />
  }

  if (enrollmentStep === "payment") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="container mx-auto px-6 py-8">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-8">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="mb-4 dark:text-gray-300 dark:hover:text-white"
              >
                <Link href={`/courses/${course.id}`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Course
                </Link>
              </Button>
              <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                Complete Your Enrollment
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                You're one step away from starting your learning journey
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Payment Form */}
              <div className="lg:col-span-2">
                <PaymentForm
                  course={course}
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={setPaymentMethod}
                  onSuccess={handlePaymentSuccess}
                  onBack={() => setEnrollmentStep("details")}
                />
              </div>

              {/* Course Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8 border-0 bg-white/90 shadow-xl backdrop-blur-sm dark:bg-gray-800/90">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg dark:text-white">
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="line-clamp-2 text-sm font-semibold dark:text-white">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          by {course.instructor}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 border-t pt-4 dark:border-gray-700">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">
                          Course Price
                        </span>
                        <span className="font-semibold dark:text-white">
                          {formatNaira(course.price)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">
                          VAT
                        </span>
                        <span className="font-semibold dark:text-white">
                          {formatNaira(course.price * 0.075)}
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2 dark:border-gray-700">
                        <span className="font-semibold dark:text-white">
                          Total
                        </span>
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {formatNaira(course.price * 1.075)}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-900/20">
                      <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                        <Shield className="h-4 w-4" />
                        <span className="font-medium">
                          30-day money-back guarantee
                        </span>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container mx-auto px-6 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mb-4 dark:text-gray-300 dark:hover:text-white"
            >
              <Link href={`/courses/${course.id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Course
              </Link>
            </Button>
            <div className="text-center">
              <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                {course.price === 0 ? "Enroll for Free" : "Enroll in Course"}
              </h1>
              <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
                Join thousands of students learning {course.title}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-8 lg:col-span-2">
              {/* Course Overview */}
              <Card className="border-0 bg-white/90 shadow-xl backdrop-blur-sm dark:bg-gray-800/90">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                        {course.title}
                      </h2>
                      <p className="mb-3 text-gray-600 dark:text-gray-300">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">4.5</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>200 students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.hours}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* What's Included */}
              <Card className="border-0 bg-white/90 shadow-xl backdrop-blur-sm dark:bg-gray-800/90">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    What's Included
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {fixedCourse.features.map(
                      (feature: string, index: number) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Course Content Preview */}
              <Card className="border-0 bg-white/90 shadow-xl backdrop-blur-sm dark:bg-gray-800/90">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <Play className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Course Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {modulesWithLessons.slice(0, 2).map((module, index) => (
                      <div
                        key={module.id}
                        className="rounded-lg border p-4 dark:border-gray-700"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {module.title}
                          </h3>
                          <Badge
                            variant="outline"
                            className="dark:border-gray-600 dark:text-gray-300"
                          >
                            {formatDuration(totalCourseDuration)}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          {modulesWithLessons
                            .flatMap((m) => m.lessons)
                            .slice(0, 3)
                            .map((lesson) => (
                              <div
                                key={lesson.id}
                                className="flex items-center gap-3 text-sm"
                              >
                                <Play className="h-3 w-3 text-gray-400" />
                                <span className="flex-1 text-gray-600 dark:text-gray-300">
                                  {lesson.title}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400">
                                  {lesson.duration} mins
                                </span>
                              </div>
                            ))}

                          {allLessons.length > 3 && (
                            <div className="ml-6 text-sm text-gray-500 dark:text-gray-400">
                              +{allLessons.length - 3} more lessons
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8 border-0 bg-white/90 shadow-xl backdrop-blur-sm dark:bg-gray-800/90">
                <CardContent className="p-6">
                  {/* Price */}
                  <div className="mb-6 text-center">
                    {course.price === 0 ? (
                      <div className="mb-2 text-3xl font-bold text-green-600 dark:text-green-400">
                        Free
                      </div>
                    ) : (
                      <div className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                        {formatNaira(course.price)}
                      </div>
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      One-time payment
                    </p>
                  </div>

                  {/* Enroll Button */}
                  <Button
                    className="mb-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-lg font-semibold text-white hover:from-blue-700 hover:to-purple-700"
                    onClick={handleEnrollment}
                  >
                    {course.price === 0 ? "Enroll for Free" : "Enroll Now"}
                  </Button>

                  {/* Features */}
                  <div className="mb-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Mobile and desktop access
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Certificate of completion
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Lifetime access
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Community support
                      </span>
                    </div>
                  </div>

                  {/* Guarantee */}
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center dark:border-green-800 dark:bg-green-900/20">
                    <Shield className="mx-auto mb-2 h-6 w-6 text-green-600 dark:text-green-400" />
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">
                      30-day money-back guarantee
                    </p>
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

export default enrollment
