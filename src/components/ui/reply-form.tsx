"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@root/utils/supabase/client"
import { toast } from "sonner"

interface ReplyFormProps {
  discussionId: string
  onReplyPosted?: () => void // Callback to refresh replies
}

export default function ReplyForm({
  discussionId,
  onReplyPosted,
}: ReplyFormProps) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) return

    setIsSubmitting(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("You must be logged in to post replies")
      }

      const { error } = await supabase.from("replies").insert({
        discussion_id: discussionId,
        author_id: user.id,
        content: content.trim(),
      })

      if (error) throw error

      setContent("")
      toast.success("Reply posted successfully")
      onReplyPosted?.() // Refresh the replies list
    } catch (error) {
      console.error("Error posting reply:", error)
      toast.error(
        error instanceof Error ? error.message : "Failed to post reply"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-medium">Post a Reply</h3>

      <Textarea
        id="reply-form"
        placeholder="Share your thoughts..."
        rows={5}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[120px] resize-y"
        disabled={isSubmitting}
      />

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setContent("")}
          disabled={isSubmitting || !content.trim()}
        >
          Clear
        </Button>
        <Button type="submit" disabled={!content.trim() || isSubmitting}>
          {isSubmitting ? "Posting..." : "Post Reply"}
        </Button>
      </div>
    </form>
  )
}
