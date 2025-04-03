"use client"
import { Button } from "./button"
import { PlusCircle, Send } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "./label"
import { Input } from "./input"
import { Textarea } from "./textarea"
import { FormEvent, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@root/utils/supabase/client"
import { toast } from "sonner"

export const CommunityHeader = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    tag_id: "",
  })
  const [tags, setTags] = useState<{ id: number; name: string }[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // Slug generation function
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace spaces & special characters with "-"
      .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
      .substring(0, 50) // Limit slug length
  }

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data, error } = await supabase
          .from("tags")
          .select("id, name")
          .order("name", { ascending: true })

        if (error) throw error
        setTags(data || [])

        if (data?.length && !form.tag_id) {
          setForm((prev) => ({ ...prev, tag_id: String(data[0].id) }))
        }
      } catch (error) {
        console.error("Error loading tags:", error)
        toast.error("Failed to load tags")
      }
    }

    fetchTags()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate inputs
      if (!form.title.trim()) throw new Error("Title is required")
      if (!form.content.trim()) throw new Error("Content is required")
      if (!form.tag_id) throw new Error("Tag is required")

      // Get authenticated user
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()
      if (authError || !user) throw new Error("Authentication required")

      // Generate slug
      const slug = generateSlug(form.title)

      // Insert discussion
      const { data, error } = await supabase
        .from("discussion")
        .insert({
          title: form.title,
          content: form.content,
          tag_id: Number(form.tag_id),
          user_id: user.id,
          slug, // Store the generated slug
        })
        .select()
        .single()

      if (error) throw error

      toast.success("Discussion created!")
      router.push(`/community/discussions/${data.slug}`)
      router.refresh()
    } catch (error: any) {
      console.error("Submission error:", error)
      toast.error(error.message || "Creation failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold">Community</h1>
        <p className="mt-1 text-muted-foreground">
          Connect with fellow learners and instructors
        </p>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            New Discussion
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Create New Discussion
            </DialogTitle>
            <DialogDescription>
              Share your thoughts, questions, or insights with the community.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-6 py-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="What's your discussion about?"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tag">Tag</Label>
              <select
                id="tag"
                value={form.tag_id}
                onChange={(e) => setForm({ ...form, tag_id: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Share your thoughts..."
                className="min-h-[200px]"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Posting..." : "Post Discussion"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
