import { createClient } from "@root/utils/supabase/client"
import { useQuery } from "@tanstack/react-query"

export function useCourseLessons(courseId?: string) {
  const supabase = createClient()

  return useQuery({
    queryKey: ["course-lessons", courseId],
    queryFn: async () => {
      if (!courseId) return []
      const { data, error } = await supabase
        .from("course_lessons")
        .select("*")
        .eq("course_id", courseId)

      if (error) throw error
      return data
    },
    enabled: !!courseId,
  })
}
