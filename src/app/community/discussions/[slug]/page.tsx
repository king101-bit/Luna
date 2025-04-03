"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import {
  ChevronLeft,
  Edit,
  MessageSquare,
  ThumbsDown,
  ThumbsUp,
  Trash,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { createClient } from "@root/utils/supabase/client"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ReplyForm from "@/components/ui/reply-form"

type User = {
  id: string
  name: string
  full_name?: string
  avatar_url: string | null
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
  updated_at?: string
  user: User[]
  author_id: string
}

type ReactionCounts = {
  likes: number
  dislikes: number
  userReaction: "like" | "dislike" | null
}

export default function DiscussionPage() {
  const { slug } = useParams() as { slug?: string }
  const supabase = createClient()
  const [discussion, setDiscussion] = useState<Discussion | null>(null)
  const [replies, setReplies] = useState<Reply[]>([])
  const [loading, setLoading] = useState(true)
  const [repliesLoading, setRepliesLoading] = useState(false)
  const [reactionLoading, setReactionLoading] = useState(false)
  const [reactions, setReactions] = useState<ReactionCounts>({
    likes: 0,
    dislikes: 0,
    userReaction: null,
  })

  const fetchReactions = async () => {
    if (!discussion?.id) return

    try {
      // Get counts
      const { count: likeCount } = await supabase
        .from("discussion_likes")
        .select("*", { count: "exact", head: true })
        .eq("discussion_id", discussion.id)
        .eq("reaction_type", "like")

      const { count: dislikeCount } = await supabase
        .from("discussion_likes")
        .select("*", { count: "exact", head: true })
        .eq("discussion_id", discussion.id)
        .eq("reaction_type", "dislike")

      // Get user's reaction if logged in
      const {
        data: { user },
      } = await supabase.auth.getUser()
      let userReaction = null

      if (user) {
        const { data } = await supabase
          .from("discussion_likes")
          .select("reaction_type")
          .eq("discussion_id", discussion.id)
          .eq("user_id", user.id)
          .single()

        userReaction = data?.reaction_type || null
      }

      setReactions({
        likes: likeCount || 0,
        dislikes: dislikeCount || 0,
        userReaction,
      })
    } catch (error) {
      console.error("Error fetching reactions:", error)
    }
  }

  const fetchReplies = async () => {
    if (!discussion?.id) return

    setRepliesLoading(true)
    try {
      const { data, error } = await supabase
        .from("replies")
        .select(
          `
          id,
          content,
          created_at,
          updated_at,
          author_id,
          user:author_id (id, full_name, avatar_url)
        `
        )
        .eq("discussion_id", discussion.id)
        .order("created_at", { ascending: true })

      if (error) throw error
      setReplies(data || [])
    } catch (error) {
      console.error("Error fetching replies:", error)
      toast.error("Failed to load replies")
    } finally {
      setRepliesLoading(false)
    }
  }

  const handleReaction = async (type: "like" | "dislike") => {
    if (!discussion) return

    setReactionLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        toast.info("You need to sign in to react")
        return
      }

      // If user already reacted with this type, remove reaction
      if (reactions.userReaction === type) {
        await supabase
          .from("discussion_likes")
          .delete()
          .eq("discussion_id", discussion.id)
          .eq("user_id", user.id)

        setReactions((prev) => ({
          ...prev,
          [type === "like" ? "likes" : "dislikes"]:
            prev[type === "like" ? "likes" : "dislikes"] - 1,
          userReaction: null,
        }))
      }
      // If user reacted with opposite type, update reaction
      else if (reactions.userReaction) {
        await supabase
          .from("discussion_likes")
          .update({ reaction_type: type })
          .eq("discussion_id", discussion.id)
          .eq("user_id", user.id)

        setReactions((prev) => ({
          likes: type === "like" ? prev.likes + 1 : prev.likes - 1,
          dislikes: type === "dislike" ? prev.dislikes + 1 : prev.dislikes - 1,
          userReaction: type,
        }))
      }
      // If no previous reaction, add new one
      else {
        await supabase.from("discussion_likes").upsert({
          discussion_id: discussion.id,
          user_id: user.id,
          reaction_type: type,
        })

        setReactions((prev) => ({
          ...prev,
          [type === "like" ? "likes" : "dislikes"]:
            prev[type === "like" ? "likes" : "dislikes"] + 1,
          userReaction: type,
        }))
      }
    } catch (error) {
      console.error("Error updating reaction:", error)
      toast.error("Failed to update reaction")
    } finally {
      setReactionLoading(false)
    }
  }

  useEffect(() => {
    if (!slug) {
      notFound()
      return
    }

    const fetchDiscussion = async () => {
      try {
        const { data, error } = await supabase
          .from("discussion")
          .select(
            `
            id,
            title,
            content,
            created_at,
            user:user_id (id, full_name, avatar_url),
            tag:tag_id (name, slug)
          `
          )
          .eq("slug", slug)
          .single()

        if (error) throw error
        if (!data) {
          notFound()
          return
        }

        setDiscussion(data)
      } catch (error) {
        console.error("Error fetching discussion:", error)
        toast.error("Failed to load discussion")
        notFound()
      }
    }

    const fetchData = async () => {
      setLoading(true)
      await fetchDiscussion()
      await fetchReplies()
      await fetchReactions()
      setLoading(false)
    }

    fetchData()
  }, [slug, supabase])

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Skeleton className="mb-6 h-10 w-24" />
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-20" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    )
  }

  if (!discussion) {
    return notFound()
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href="/community">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Community
        </Link>
      </Button>

      {/* Discussion Content */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <div className="mb-4 flex items-center gap-3">
          <Avatar>
            <AvatarImage src={discussion.user.avatar_url || undefined} />
            <AvatarFallback>
              {discussion.user.full_name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{discussion.user.full_name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Posted at {""}
              {new Date(discussion.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <h1 className="mb-4 text-2xl font-bold">{discussion.title}</h1>

        {discussion.tag && (
          <Link href={`/community/tags/${discussion.tag.slug}`}>
            <span className="mb-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-gray-700">
              {discussion.tag.name}
            </span>
          </Link>
        )}

        <div className="prose dark:prose-invert mb-6">
          {discussion.content.split("\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
            <MessageSquare className="h-5 w-5" />
            <span>{replies.length}</span>
          </div>
          <button
            onClick={() => handleReaction("like")}
            disabled={reactionLoading}
            className={`flex items-center gap-1 ${reactions.userReaction === "like" ? "text-blue-500" : "text-gray-600 dark:text-gray-300"}`}
          >
            <ThumbsUp className="h-5 w-5" />
            <span>{reactions.likes}</span>
          </button>
          <button
            onClick={() => handleReaction("dislike")}
            disabled={reactionLoading}
            className={`flex items-center gap-1 ${reactions.userReaction === "dislike" ? "text-red-500" : "text-gray-600 dark:text-gray-300"}`}
          >
            <ThumbsDown className="h-5 w-5" />
            <span>{reactions.dislikes}</span>
          </button>
        </div>
      </div>

      {/* Replies Section */}
      <div className="mb-8 space-y-6">
        <h2 className="text-xl font-semibold">Replies ({replies.length})</h2>
        {repliesLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg bg-white p-4 shadow dark:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="mt-3 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-5/6" />
              </div>
            ))}
          </div>
        ) : replies.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No replies yet</p>
        ) : (
          replies.map((reply) => (
            <div
              key={reply.id}
              className="rounded-lg bg-white p-4 shadow dark:bg-gray-800"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={reply.user.avatar_url || undefined} />
                    <AvatarFallback>
                      {reply.user.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{reply.user.full_name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {reply.updated_at && " Posted at "}
                      {new Date(reply.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="whitespace-pre-line">{reply.content}</p>
            </div>
          ))
        )}
        <ReplyForm discussionId={discussion.id} onReplyPosted={fetchReplies} />
      </div>
    </div>
  )
}
