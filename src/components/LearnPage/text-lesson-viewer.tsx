"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lesson } from "@root/global"
import { Clock, FileText } from "lucide-react"
import DOMPurify from "dompurify"

interface TextLessonViewerProps {
  lesson: Lesson
}

export default function TextLessonViewer({ lesson }: TextLessonViewerProps) {
  const sanitizedContent = DOMPurify.sanitize(lesson.content || "")
  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-6 w-6 text-blue-500" />
              {lesson.title}
            </CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {lesson.duration} Mins
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
