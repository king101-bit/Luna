"use client"
import { MessageCircle, ThumbsUp } from "lucide-react"
import Link from "next/link"
import { UserAvatar } from "./UserAvatar"
import { createClient } from "@root/utils/supabase/client"
import { useEffect, useState } from "react"

export const DiscussionCard = () => {
  const supabase = createClient()
  const [discussions, setDiscussions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("discussion")
          .select(
            "id, slug, title, content, created_at, likes, replies(id), users(full_name, avatar_url)"
          )
          .order("created_at", { ascending: false })
          .limit(10)

        if (error) throw error

        // Count replies manually
        const formattedDiscussions = data.map((d) => ({
          ...d,
          comments: d.replies ? d.replies.length : 0,
        }))

        setDiscussions(formattedDiscussions || [])
      } catch (error) {
        console.error("Error fetching discussions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDiscussions()
  }, [])

  if (loading) {
    return null
  }

  if (!discussions.length) {
    return (
      <div className="py-8 text-center text-gray-500">
        No discussions found. Be the first to start one!
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {discussions.map((discussion) => (
        <div
          key={discussion.id}
          className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:bg-gray-50 hover:shadow-md"
        >
          <div className="flex gap-4">
            {/* Avatar on the left */}
            <div className="flex-shrink-0">
              <UserAvatar
                name="Anonymous"
                imageUrl={discussion.users.avatar_url}
                size={50}
              />
            </div>

            {/* Content on the right */}
            <div className="min-w-0 flex-1">
              {/* Title */}
              <h2 className="mb-2 text-xl font-semibold">
                <Link
                  href={`/community/discussions/${discussion.slug}`}
                  className="hover:underline"
                >
                  {discussion.title}
                </Link>
              </h2>

              {/* Metadata */}
              <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">
                  {discussion.users.full_name}
                </span>
                <span>•</span>
                <span>{formatTimeAgo(new Date(discussion.created_at))}</span>
              </div>
              {/* Description */}
              <p className="mb-4 line-clamp-2 text-gray-700">
                {discussion.content}
              </p>

              {/* Interaction Metrics */}
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{discussion.likes || 0}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>{discussion.comments || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Helper function to format date as "time ago"
function formatTimeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  }

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit)
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`
    }
  }

  return "Just now"
}

export default DiscussionCard
