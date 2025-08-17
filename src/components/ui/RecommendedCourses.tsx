import {
  ChevronLeft,
  ChevronRight,
  Clock,
  GlobeIcon,
  Users,
} from "lucide-react"
import { Button } from "./button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import { Badge } from "./badge"
import { Progress } from "./progress"
import Link from "next/link"
import CourseCard from "../course/CourseCard"
import { useCourses } from "@/hook/useFetchCourse"
import CourseSkeletonCard from "../course/CourseSkeletonCard"

export default function RecommendedCourses() {
  const { data: courses, isLoading } = useCourses()
  if (isLoading) {
    return <CourseSkeletonCard />
  }
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        {/* Title + subtitle grouped together */}
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-white">
            Recommended for you
          </h1>
          <p className="text-sm text-muted-foreground">
            Courses picked based on your learning progress
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {courses?.map((course, index) => (
          <CourseCard
            key={course.id}
            course={course}
            index={index}
            setSelectedCategory={(category) => console.log(category)}
          />
        ))}
      </div>
    </>
  )
}
