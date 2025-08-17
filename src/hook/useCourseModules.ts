import { createClient } from "@root/utils/supabase/client"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"

const supabase = createClient()

const fetchCourseModules = async (courseId: string) => {
  const { data, error } = await supabase
    .from("course_modules")
    .select(
      `
      *,
      course_lessons (
        *
      )
    `
    )
    .eq("course_id", courseId)
    .order("order_index", { ascending: true })

  if (error) throw new Error(error.message)
  return data
}

export const useCourseModules = (
  courseId: string | undefined,
  options?: Omit<UseQueryOptions<any[]>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["course_modules", courseId],
    queryFn: () => fetchCourseModules(courseId!),
    enabled: !!courseId,
    staleTime: 1000 * 60 * 5,
    ...options,
  })
}
