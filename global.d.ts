type LessonType = "text" | "video" | "assignment"

export type Lesson = {
  id: string
  module_id: string
  title: string
  type: "video" | "text" | "assignment"
  duration?: number
  content?: string
  video_url?: string | null
  description?: string
}
type CourseTag = {
  id: string
  tags?: Tag[]
}

interface QuestionOption {
  id: string
  text: string
  isCorrect: boolean
}
interface Question {
  id: string
  text: string
  type: string
  points: number
  options: QuestionOption[]
  explanation?: string
}

interface QuizQuestionEditorProps {
  question: Question
  index: number
  onUpdate: (question: Question) => void
  onDelete: () => void
}
interface QuizSummaryProps {
  questionCount: number
  totalPoints: number
  timeLimit?: number
  passingScore?: number
  attempts?: number
}

interface CourseModule {
  id: string
  course_id: string
  title: string
  description: string
  order_index: number
  created_at: string | null
  updated_at: string | null
  lessons?: Lesson[]
}

type Course = {
  id: string
  title: string
  description: string
  thumbnail: string
  slug: string
  price: number
  isEnrolled?: boolean
  category: {
    name: string
  }
  instructor: string
  hours?: number
  certificate_enabled?: boolean
  features?: string[]
  modules: CourseModule[]
}

export type CourseFormData = {
  title: string
  description: string
  category: string
  level: string
  hours: number | string
  price: number | string
  instructor: string
  tags: string[]
  thumbnail?: File | null
  isPublished: boolean
  requiresPrerequisites: boolean
  allowComments: boolean
  certificateEnabled: boolean
  modules: Module[]
}

export type Module = {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

export type Category = {
  id: string
  name: string
}

type User = {
  id: string
  full_name?: string | null
  avatar_url?: string | null
}

type Tag = {
  id?: string
  name: string
  slug: string
}

type Discussion = {
  id: string
  title: string
  content: string
  created_at: string
  user: User
  tag: Tag | null
}

type Reply = {
  id: string
  content: string
  created_at: string
  updated_at?: string | null
  author_id: string
  user: User[] // Changed to array to match Supabase's response
}

type ReactionCounts = {
  likes: number
  dislikes: number
  userReaction: "like" | "dislike" | null
}

type AdminHeaderProps = {
  title?: string
  description?: string
  showBackButton?: boolean
  buttonText?: string
  buttonRoute?: string
  buttonIcon?: React.ReactNode // Custom icon override
  showActionButton?: boolean // New prop to control primary button
  actionButtonText?: string // Optional custom text
  actionButtonRoute?: string // Optional route
  showSearch?: boolean
  className?: string
}
