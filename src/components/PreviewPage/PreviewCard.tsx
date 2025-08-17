"use client"
import { BarChart2, BookOpen, Clock, User } from "lucide-react"
import { useState } from "react"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import Link from "next/link"
import { Button } from "../ui/button"
import { createClient } from "@root/utils/supabase/server"
import { on } from "events"

interface PreviewPageProps {
  CourseTitle: string
  CourseDescription: string
  course: {
    id: string
    title: string
    description: string
    thumbnail: string
    price: number
    category: {
      name: string
    }
    level: string
    instructor: string
    slug: string
    hours?: number
  }
  lessonCount: number
}

const PreviewCard = ({
  CourseTitle,
  CourseDescription,
  course,
  lessonCount,
}: PreviewPageProps) => {
  const [imageError, setImageError] = useState(false)

  return (
    <>
      <div className="md:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            {course.thumbnail && !imageError ? (
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-t-lg">
                <img
                  src={course.thumbnail}
                  alt={CourseTitle}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    console.error("Failed to load thumbnail:", course.thumbnail)
                    console.error("Error details:", e)
                    setImageError(true)
                  }}
                  onLoad={() => {
                    console.log(
                      "Thumbnail loaded successfully:",
                      course.thumbnail
                    )
                  }}
                />
              </div>
            ) : (
              <div className="mb-4 flex h-48 w-full items-center justify-center rounded-t-lg bg-gradient-to-r from-blue-500 to-blue-600">
                <BookOpen className="h-20 w-20 text-white" />
                {imageError && (
                  <div className="absolute bottom-2 right-2 text-xs text-white opacity-75">
                    Image failed to load
                  </div>
                )}
              </div>
            )}
            <CardTitle className="text-2xl">{CourseTitle}</CardTitle>
            <CardDescription className="line-clamp-2">
              {CourseDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span className="text-sm">Instructor</span>
              </div>
              <span className="font-medium">{course.instructor}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span className="text-sm">Duration</span>
              </div>
              <span className="font-medium">{course.hours} hours</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                <span className="text-sm">Lessons</span>
              </div>
              <span className="font-medium">{lessonCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart2 className="mr-2 h-4 w-4" />
                <span className="text-sm">Level</span>
              </div>
              <Badge variant="outline">{course.level}</Badge>
            </div>
            <div className="pt-4">
              <div className="mb-1 flex justify-between">
                <span className="text-sm font-medium">Course Progress</span>
                <span className="text-sm font-medium">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </CardContent>
          <CardFooter>
            <Link
              href={`/courses/${encodeURIComponent(CourseTitle.toLowerCase().replace(/\s+/g, "-"))}/learn`}
              className="w-full"
            >
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Start Course
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default PreviewCard
