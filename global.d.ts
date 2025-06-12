// Define this first since it's used in Lesson and possibly others
type LessonType =
  | "text"
  | "video"
  | "quiz"
  | "assignment"
  | "article"
  | "pdf"
  | "slide"
  | "code"
  | "demo"

export type Lesson = {
  id: string
  title: string
  content: string
  duration: number | string
}

// You can now safely define everything else below

interface PageProps {
  params: {
    slug: string
  }
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

type Course = {
  id: string
  title: string
  description: string
  price: number
  category: string
  instructor_name: string
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
