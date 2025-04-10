type Courses = {
  id: string
  title: string
  description: string
  price: number
  category: string
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
