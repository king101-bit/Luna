"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import {
  ChevronLeft,
  Edit,
  MessageSquare,
  Pencil,
  ThumbsDown,
  ThumbsUp,
  Trash,
  Trash2,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { createClient } from "@root/utils/supabase/client"
import { toast, Toaster } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ReplyForm from "@/components/ui/reply-form"
import { MainNavbar } from "@/components/ui/MainNavbar"
import { Button } from "@/components/ui/button"

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

      setReplies(data as Reply[])
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
      } else if (reactions.userReaction) {
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
      } else {
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
        return `Posted ${interval} ${unit}${interval === 1 ? "" : "s"} ago`
      }
    }

    return "Just now"
  }

  if (loading) {
    return (
      <>
        <div className="container mx-auto p-16">
          <div className="mb-4 flex items-center text-sm">
            <Skeleton className="mr-1 h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Discussion Content */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {/* Title */}
              <Skeleton className="mb-2 h-8 w-3/4" />

              {/* Metadata */}
              <div className="mb-4 flex items-center gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
              </div>

              {/* Content */}
              <div className="mb-6 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Tags */}
              <div className="mb-6 flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              {/* Reactions */}
              <div className="flex items-center gap-4 border-b border-t py-3">
                <div className="flex items-center gap-1">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-6" />
                </div>
                <div className="flex items-center gap-1">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-6" />
                </div>
                <div className="flex items-center gap-1">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-6" />
                </div>
              </div>

              {/* Replies section */}
              <div className="mb-8">
                <Skeleton className="mb-4 h-6 w-32" />

                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-lg p-4">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <div>
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="mt-1 h-3 w-24" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4" />
                          <Skeleton className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply form */}
              <div className="space-y-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>

            {/* Related Discussions */}
            <div>
              <Skeleton className="mb-4 h-6 w-48" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (!discussion) {
    return notFound()
  }

  return (
    <>
      <Toaster richColors />
      <MainNavbar />
      <div className="container mx-auto p-16">
        <Link
          href="/community"
          className="mb-4 flex items-center text-sm text-gray-400 hover:text-gray-100"
        >
          <Button variant="ghost" size="sm">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>
        {/* Discussion Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <h1 className="mb-2 text-2xl font-bold">{discussion.title}</h1>
              <div className="flex items-center gap-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  title="Edit Post"
                >
                  <Pencil size={18} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  title="Delete Post"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="mb-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span>{discussion.user.full_name}</span>
                <span>•</span>
                <span>{formatTimeAgo(new Date(discussion.created_at))}</span>
              </div>
            </div>

            <div className="prose dark:prose-invert mb-6">
              {discussion.content.split("\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              <span className="rounded-full border bg-black px-3 py-1 text-xs">
                {discussion.tag?.name}
              </span>
            </div>

            <div className="flex items-center gap-4 border-b border-t py-3">
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
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <MessageSquare className="h-5 w-5" />
                <span>{replies.length}</span>
              </div>
            </div>
            <div className="mb-8">
              <h2 className="mb-4 mt-4 text-lg font-semibold">
                Replies ({replies.length})
              </h2>

              {repliesLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-lg p-4">
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
                <p className="text-gray-500 dark:text-gray-400">
                  No replies yet
                </p>
              ) : (
                <div className="space-y-4">
                  {replies.map((reply) => (
                    <div key={reply.id} className="rounded-lg p-4">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={reply.user[0]?.avatar_url || undefined}
                            />
                            <AvatarFallback>
                              {reply.user[0]?.full_name
                                ?.charAt(0)
                                .toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {reply.user[0]?.full_name || "Unknown User"}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
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
                  ))}
                </div>
              )}
            </div>

            <ReplyForm
              discussionId={discussion.id}
              onReplyPosted={fetchReplies}
            />
          </div>
          {/* Related Discussions */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Related Discussions</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No related discussions found
            </p>
          </div>
        </div>

        {/* Replies Section */}
      </div>
    </>
  )
}
