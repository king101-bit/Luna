"use client"

import Link from "next/link"
import {
  CheckCircle,
  Play,
  Download,
  MessageSquare,
  Award,
  Calendar,
  BookOpen,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Course } from "@root/global"

interface EnrollmentConfirmationProps {
  course: Course
  fixedCourse: Course
}

export function EnrollmentConfirmation({
  course,
  fixedCourse,
}: EnrollmentConfirmationProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-green-900/10 dark:to-blue-900/20">
      <div className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              🎉 Enrollment Successful!
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
              Welcome to{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {course.title}
              </span>
              ! You're now ready to start your learning journey.
            </p>
          </div>

          {/* Course Card */}
          <Card className="mb-8 border-0 bg-white/90 shadow-xl backdrop-blur-sm dark:bg-gray-800/90">
            <CardContent className="p-8">
              <div className="mb-6 flex items-center gap-6">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="h-24 w-24 rounded-lg object-cover"
                />
                <div className="flex-1 text-left">
                  <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                    {course.title}
                  </h2>
                  <p className="mb-3 text-gray-600 dark:text-gray-300">
                    by {course.instructor}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                      Enrolled
                    </Badge>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <BookOpen className="h-4 w-4" />
                      <span>{fixedCourse.modules?.length} modules</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4" />
                      <span>200 students</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Link href={`/courses/${course.slug}/learn`}>
                    <Play className="mr-2 h-5 w-5" />
                    Start Learning Now
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <Link href={`/courses/${course.slug}/preview`}>
                    <BookOpen className="mr-2 h-5 w-5" />
                    View Course Details
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
              <CardHeader className="pb-3">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Play className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg dark:text-white">
                  Start Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  Begin with the first lesson and track your progress as you
                  advance through the course.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="w-full bg-transparent dark:border-gray-600 dark:text-gray-300"
                >
                  <Link href={`/courses/${course.slug}/learn`}>
                    Go to Course
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
              <CardHeader className="pb-3">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-lg dark:text-white">
                  Join Discussions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  Connect with fellow students and get help from the community.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="w-full bg-transparent dark:border-gray-600 dark:text-gray-300"
                >
                  <Link href="/community">Join Community</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
              <CardHeader className="pb-3">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                  <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-lg dark:text-white">
                  Earn Certificate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  Complete all lessons to earn your certificate of completion.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="w-full bg-transparent opacity-50"
                >
                  Complete Course First
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Resources */}
          <Card className="border-0 bg-white/90 shadow-xl backdrop-blur-sm dark:bg-gray-800/90">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 dark:text-white">
                <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Additional Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="text-left">
                  <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                    What's Included:
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    {fixedCourse.features
                      ?.slice(0, 4)
                      .map((feature: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-400" />
                          {feature}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="text-left">
                  <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                    Quick Links:
                  </h3>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="w-full justify-start dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <Link href="/dashboard">
                        <Calendar className="mr-2 h-4 w-4" />
                        View Dashboard
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="w-full justify-start dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <Link href="/profile">
                        <Award className="mr-2 h-4 w-4" />
                        My Certificates
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="w-full justify-start dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <Link href="/courses">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Browse More Courses
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Message */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Need help getting started?
              <Link
                href="/support"
                className="ml-1 text-blue-600 hover:underline dark:text-blue-400"
              >
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
