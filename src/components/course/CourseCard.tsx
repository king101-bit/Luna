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
import { Clock, GlobeIcon, Users } from "lucide-react"
import { Progress } from "../ui/progress"
import Link from "next/link"
import { Button } from "../ui/button"

const CourseCard = ({ course, index, setSelectedCategory }) => {
  return (
    <>
      <Card
        key={course.id}
        className="overflow-hidden rounded-2xl border shadow-md transition hover:shadow-lg"
      >
        <div
          className="relative h-24 bg-cover bg-center transition-transform duration-300 hover:scale-105"
          style={{
            backgroundImage: "url(/jero)",
          }}
        >
          {/* Category Badge */}
          <Badge
            className="absolute left-4 top-4 bg-white/15 text-black backdrop-blur-sm hover:bg-white/30"
            onClick={() => setSelectedCategory("frontend")}
          >
            Frontend
          </Badge>

          {/* Overlay & Icon */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <GlobeIcon className="h-10 w-10 text-white opacity-90" />
          </div>
        </div>

        {/* Course Info */}
        <CardHeader className="px-6 pb-4 pt-6 text-start">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              {course.title}
            </CardTitle>
            <Badge
              className="ml-2 bg-green-100 text-green-700 hover:bg-green-100/80"
              variant="secondary"
            >
              Beginner
            </Badge>
          </div>

          <CardDescription className="mt-2 line-clamp-3 text-sm">
            {course.description}
          </CardDescription>

          {/* Stats */}
          <div className="mt-4 flex items-start justify-start gap-4 text-sm">
            <Clock className="h-4 w-4" />
            <span>40 hours</span>
            <Users className="h-4 w-4" />
            <span>1,245 students</span>
          </div>

          {/* Rating */}
          <div className="mt-2 flex items-start justify-start gap-1 text-sm">
            <div className="flex text-yellow-400">
              {"★".repeat(4)}
              <span className="text-yellow-400/50">☆</span>
            </div>
            <span className="font-medium">4.8</span>
            <span className="">• {course.instructor_name}</span>
          </div>
        </CardHeader>

        {/* Progress */}
        <CardContent className="px-6 pb-4 pt-0">
          <div className="mb-1 flex justify-between text-xs text-gray-500">
            <span>In progress</span>
            <span>60% complete</span>
          </div>
          <Progress value={60} className="h-2" />

          {/* Tags */}
          <div className="mt-4 flex flex-wrap justify-start gap-2 text-xs">
            <Badge variant="outline" className="bg-gray-450 text-xs">
              HTML
            </Badge>
            <Badge variant="outline" className="bg-gray-450 text-xs">
              CSS
            </Badge>
            <Badge variant="outline" className="bg-gray-450 text-xs">
              Responsive
            </Badge>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-6 pt-0">
          <Link
            key={index}
            className="w-full"
            href={`/courses/${encodeURIComponent(course.title.toLowerCase().replace(/\s+/g, "-"))}/preview`}
          >
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
              Continue Course
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  )
}

export default CourseCard
