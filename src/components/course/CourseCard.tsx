import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Badge } from "../ui/badge"
import { Clock, GlobeIcon, Play, Star, Users } from "lucide-react"
import { Progress } from "../ui/progress"
import Link from "next/link"
import { Button } from "../ui/button"
import { formatNaira } from "@root/utils/formatCurrency"
type Course = {
  id: string
  title: string
  description: string
  price: number
  instructor?: string
  slug: string
  level?: string
  thumbnail?: string
  category: {
    name: string
  }
  hours?: number
  course_tags?: {
    tag_id: string
    name: string
    tags?: {
      name: string
    }
  }[]
}

const CourseCard = ({
  course,
  index,
  setSelectedCategory,
}: {
  course: Course
  index?: number
  setSelectedCategory?: (category: string) => void
}) => {
  const tags = course.course_tags ?? []
  const visibleTags = tags.slice(0, 3)
  const remainingCount = tags.length - visibleTags.length

  return (
    <>
      <Card
        key={course.id}
        className="max-w-sm overflow-hidden rounded-2xl border shadow-md transition hover:shadow-lg"
      >
        <div className="relative h-36 w-full overflow-hidden rounded-t-2xl">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
              <GlobeIcon className="h-10 w-10 text-gray-500 dark:text-gray-400" />
            </div>
          )}

          <Badge
            className="absolute right-3 top-3"
            variant={
              course.level === "Beginner"
                ? "secondary"
                : course.level === "Intermediate"
                  ? "default"
                  : "destructive"
            }
          >
            {course.level}
          </Badge>
        </div>
        <CardHeader className="p-6 pb-3">
          <Badge variant="outline" className="mb-2 w-fit">
            {course.category?.name}
          </Badge>
          <CardTitle className="line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
            {course.title}
          </CardTitle>

          {course.instructor && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              by {course.instructor}
            </p>
          )}
          <CardDescription className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {course.description}
          </CardDescription>
        </CardHeader>

        {/* Progress */}
        <CardContent className="px-6 pb-4 pt-0">
          {/* <div className="mb-1 flex justify-between text-xs text-gray-500">
            <span>In progress</span>
            <span>60% complete</span>
          </div>
          <Progress value={60} className="h-2" /> */}

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-1">
            {visibleTags.map((tag) => (
              <Badge key={tag.tag_id} variant="secondary" className="text-xs">
                {tag.tags?.name}
              </Badge>
            ))}
            {remainingCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                +{remainingCount} more
              </Badge>
            )}
          </div>

          <div className="mb-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">4.5</span>
              <span>(20)</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.hours} Hours</span>
            </div>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex items-center justify-between p-6 pt-0">
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {formatNaira(course.price)}
          </span>
          <Button
            asChild
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <Link href={`/courses/${course.slug}/preview`}>
              <Play className="h-4 w-4" />
              Continue
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default CourseCard
