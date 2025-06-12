import { BookOpen, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Badge } from "./badge"
import { Button } from "./button"

interface CoursePreviewProps {
  titleText: string
  descriptionText: string
  thumbnailPreview: string | null
}

export default function CoursePreview({
  titleText,
  descriptionText,
  thumbnailPreview,
}: CoursePreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-lg shadow-sm">
          {/* Thumbnail Section */}
          {thumbnailPreview ? (
            <div className="relative h-36">
              <img
                src={thumbnailPreview}
                alt="Thumbnail preview"
                className="h-full w-full object-cover"
              />
              <div className="absolute left-4 top-4">
                <Badge className="bg-white/90 text-blue-700 backdrop-blur-sm hover:bg-white">
                  Category
                </Badge>
              </div>
            </div>
          ) : (
            <div className="relative flex h-36 items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 p-6">
              <BookOpen className="h-16 w-16 text-white/80" />
              <div className="absolute left-4 top-4">
                <Badge className="bg-white/90 text-blue-700 backdrop-blur-sm hover:bg-white">
                  Category
                </Badge>
              </div>
            </div>
          )}

          {/* Course Details Section */}
          <div className="p-4">
            <div className="flex items-start justify-between">
              <h3 className="text-base font-semibold">
                {titleText || "Course Title"}
              </h3>
              <Badge className="bg-white/90 text-blue-700 backdrop-blur-sm hover:bg-white">
                Difficulty
              </Badge>
            </div>

            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {descriptionText || "Course description will appear here"}
            </p>

            <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />0 hours
              </div>
              <span className="h-2 w-2 rounded-full bg-gray-200"></span>
              <div className="flex items-center">
                <span>User</span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap justify-between gap-1">
              <Badge variant="outline">Tag</Badge>
              <p className="text-md font-semibold">$0</p>
            </div>

            <Button className="mt-4 w-full" variant="outline" size="sm">
              Start Course
            </Button>
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>This is how your course will appear to students.</p>
        </div>
      </CardContent>
    </Card>
  )
}
