// LessonCompleteButton.tsx
"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@root/utils/supabase/client"

type LessonCompleteButtonProps = {
  courseId: string
  lessonId: string
  onProgressUpdate?: () => void // Add this prop
}

export function LessonCompleteButton({
  courseId,
  lessonId,
  onProgressUpdate, // Add this
}: LessonCompleteButtonProps) {
  const supabase = createClient()
  const [completed, setCompleted] = useState<boolean | null>(null) // null = loading

  // Fetch initial completion state
  useEffect(() => {
    const fetchCompletion = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from("lesson_progress")
        .select("completed")
        .eq("user_id", user.id)
        .eq("lesson_id", lessonId)
        .single()

      setCompleted(data?.completed ?? false)
    }

    fetchCompletion()
  }, [lessonId])

  const toggleCompletion = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error("No authenticated user")
      return
    }

    const { error } = await supabase.from("lesson_progress").upsert(
      {
        user_id: user.id,
        course_id: courseId,
        lesson_id: lessonId,
        completed: !completed,
        completed_at: new Date(),
      },
      { onConflict: "user_id,lesson_id" }
    )

    if (!error) {
      setCompleted(!completed)
      // Refresh progress after successful update
      if (onProgressUpdate) {
        onProgressUpdate()
      }
    }
  }

  // While loading
  if (completed === null) {
    return <Button disabled>Loading...</Button>
  }

  return (
    <Button
      variant={completed ? "secondary" : "default"}
      onClick={toggleCompletion}
    >
      {completed ? "Completed ✅" : "Mark as Complete"}
    </Button>
  )
}
