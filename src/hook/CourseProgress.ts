// Enhanced version with refresh capability
import { useState, useEffect, useCallback } from "react"
import { createClient } from "@root/utils/supabase/client"

export function useCourseProgress(courseId: string | undefined) {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()
  type CompletedLesson = {
    lesson_id: string
    course_lessons: {
      id: string
      module_id: string
      course_modules: {
        course_id: string
      }
    }
  }
  const calculateProgress = useCallback(async () => {
    if (!courseId) {
      setProgress(0)
      setIsLoading(false)
      return
    }

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        setProgress(0)
        setIsLoading(false)
        return
      }

      // Get total lessons count for this course
      const { data: lessons, error: lessonsError } = await supabase
        .from("course_lessons")
        .select("id, course_modules!inner(course_id)")
        .eq("course_modules.course_id", courseId)

      if (lessonsError) throw lessonsError

      const totalLessons = lessons?.length || 0

      if (totalLessons === 0) {
        setProgress(0)
        setIsLoading(false)
        return
      }

      const { data: completedLessons, error: progressError } = await supabase
        .from("lesson_progress")
        .select(
          "lesson_id, course_lessons!inner(id, module_id, course_modules!inner(course_id))"
        )
        .eq("user_id", user.id)
        .eq("completed", true)
        .eq("course_lessons.course_modules.course_id", courseId)
        .returns<CompletedLesson[]>() // 👈 forces array typing

      if (progressError) throw progressError

      const completedCount = completedLessons?.length || 0
      const progressPercent = Math.round((completedCount / totalLessons) * 100)

      setProgress(progressPercent)
    } catch (error) {
      console.error("Error calculating progress:", error)
      setProgress(0)
    } finally {
      setIsLoading(false)
    }
  }, [courseId])

  useEffect(() => {
    calculateProgress()
  }, [calculateProgress])

  // Return refresh function so progress can be updated when lessons are completed
  const refreshProgress = useCallback(() => {
    setIsLoading(true)
    calculateProgress()
  }, [calculateProgress])

  return { progress, isLoading, refreshProgress }
}
