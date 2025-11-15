import CourseForm from "@/components/admin/CourseForm"
import { createClient } from "@root/utils/supabase/server"
export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()

  const { data: course } = await supabase
    .from("courses")
    .select(
      `
      *,
      course_modules (
        *,
        course_lessons (*)
      ),
      course_tags (
        tags (*)
      )
    `
    )
    .eq("id", id)
    .single()

  if (!course) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-semibold">Course not found</h1>
      </div>
    )
  }

  // map data to form shape
  const formattedData = {
    id: course.id,
    title: course.title,
    description: course.description,
    category: course.category_id,
    level: course.level,
    hours: course.hours,
    price: course.price,
    instructor: course.instructor,
    thumbnail: course.thumbnail,
    isPublished: course.is_published,
    requiresPrerequisites: course.requires_prerequisites,
    allowComments: course.allow_comments,
    certificateEnabled: course.certificate_enabled,
    tags: (course.course_tags ?? []).map((t: any) => ({
      id: t.tags?.id,
      name: t.tags?.name,
    })),
    modules: (course.course_modules ?? []).map((m: any) => ({
      order_index: m.order_index,
      title: m.title,
      description: m.description,
      lessons: (m.course_lessons ?? []).map((l: any) => ({
        order_index: l.order_index,
        title: l.title,
        type: l.type,
        duration: `${l.duration}:00`,
        description: l.description,
        content: l.content,
        required: l.required,
        visibility: l.visibility,
        submissionType: l.submission_type,
        video_url: l.video_url,
        instructions: l.instructions,
        points: l.points,
      })),
    })),
  }

  // get categories
  const { data: categories } = await supabase.from("categories").select("*")

  return (
    <div className="container py-10">
      <h1 className="mb-6 text-2xl font-semibold">Edit Course</h1>
      <CourseForm
        categories={categories}
        loading={false}
        initialData={formattedData}
        mode="edit"
      />
    </div>
  )
}
