// Footer.tsx
"use client"
import { Button } from "@/components/ui/button"
import { LessonCompleteButton } from "../ui/LessonCompleteButton"

interface FooterProps {
  onPrevious?: () => void
  onNext?: () => void
  disablePrevious?: boolean
  disableNext?: boolean
  courseId: string
  lessonId?: string
  onProgressUpdate?: () => void
}

export function Footer({
  onPrevious,
  onNext,
  disablePrevious,
  disableNext,
  courseId,
  lessonId,
  onProgressUpdate,
}: FooterProps) {
  return (
    <div className="flex items-center justify-between border-t px-4 py-2">
      <div className="flex gap-2">
        {onPrevious && (
          <Button onClick={onPrevious} disabled={disablePrevious}>
            Previous
          </Button>
        )}
        {onNext && (
          <Button onClick={onNext} disabled={disableNext}>
            Next
          </Button>
        )}
      </div>
      {lessonId && (
        <LessonCompleteButton
          courseId={courseId}
          lessonId={lessonId}
          onProgressUpdate={onProgressUpdate} // Pass it down
        />
      )}
    </div>
  )
}
