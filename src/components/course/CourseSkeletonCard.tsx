import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { Badge } from "../ui/badge"

const CourseSkeletonCard = () => {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <Card
            key={index}
            className="overflow-hidden rounded-2xl border shadow-md transition hover:shadow-lg"
          >
            {/* Image Header */}
            <div className="relative h-24 bg-gray-200">
              <Skeleton className="absolute inset-0 h-full w-full" />
              {/* Category Badge */}
              <Badge className="absolute left-4 top-4 bg-white/30 text-white backdrop-blur-sm">
                <Skeleton className="h-4 w-14 rounded" />
              </Badge>
            </div>

            <CardHeader className="px-6 pb-4 pt-6 text-start">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <CardDescription className="mt-2 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardDescription>

              {/* Stats */}
              <div className="mt-4 flex gap-4 text-sm">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>

              {/* Rating */}
              <div className="mt-2 flex gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </CardHeader>

            <CardContent className="px-6 pb-4 pt-0">
              <div className="mb-1 flex justify-between text-xs text-gray-500">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-2 w-full rounded" />

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-0">
              <Skeleton className="h-10 w-full rounded-md" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}

export default CourseSkeletonCard
