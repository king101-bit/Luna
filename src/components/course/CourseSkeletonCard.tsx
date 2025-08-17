import React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { Badge } from "../ui/badge"

const CourseSkeletonCard = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <Card
          key={index}
          className="max-w-sm overflow-hidden rounded-2xl border shadow-md transition hover:shadow-lg"
        >
          {/* Thumbnail + Level Badge */}
          <div className="relative h-36 w-full overflow-hidden rounded-t-2xl bg-gray-200">
            <Skeleton className="absolute inset-0 h-full w-full" />
            <Badge className="absolute right-3 top-3">
              <Skeleton className="h-4 w-16 rounded" />
            </Badge>
          </div>

          {/* Header */}
          <CardHeader className="p-6 pb-3">
            <Badge variant="outline" className="mb-2 w-fit">
              <Skeleton className="h-4 w-20 rounded" />
            </Badge>
            <Skeleton className="h-6 w-3/4 rounded" /> {/* Title */}
            <Skeleton className="mt-2 h-4 w-1/2 rounded" /> {/* Instructor */}
            <Skeleton className="mt-2 h-4 w-full rounded" /> {/* Desc line 1 */}
            <Skeleton className="h-4 w-5/6 rounded" /> {/* Desc line 2 */}
          </CardHeader>

          {/* Tags + Stats */}
          <CardContent className="px-6 pb-4 pt-0">
            <div className="mb-4 flex flex-wrap gap-1">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>

            <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
              <Skeleton className="h-4 w-24 rounded" /> {/* Rating */}
              <Skeleton className="h-4 w-20 rounded" /> {/* Hours */}
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex items-center justify-between p-6 pt-0">
            <Skeleton className="h-6 w-16 rounded" /> {/* Price */}
            <Skeleton className="h-10 w-24 rounded-md" /> {/* Button */}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default CourseSkeletonCard
