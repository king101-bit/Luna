import { createClient } from "@root/utils/supabase/client"
import { useQuery } from "@tanstack/react-query"

const supabase = createClient()

const fetchCourses = async () => {
  const { data, error } = await supabase
    .from("courses")
    .select(
      `
          *,
          course_tags (
            tag_id,
            tags (
              id,
              name
            )
          ),
          category:categories (
            name
          )
        `
    )
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
    staleTime: 1000 * 60 * 5,
  })
}
