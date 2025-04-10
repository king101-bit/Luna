"use client"
import Link from "next/link"
import { createClient } from "@root/utils/supabase/client"
import { useEffect, useState } from "react"

export const PopularTags = () => {
  const supabase = createClient()
  const [tags, setTags] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("discussion_categories")
          .select("id, name, slug, discussion_count")
          .order("discussion_count", { ascending: false })
          .limit(5)

        console.log("Fetched tags:", data) // Add this line

        if (error) throw error
        setTags(data || [])
      } catch (error) {
        console.error("Error fetching tags:", error)
        setTags([]) // You can set default tags here if needed
      } finally {
        setLoading(false)
      }
    }

    fetchTags()
  }, [])

  return (
    <div className="rounded-lg p-4 shadow-sm sm:p-6">
      <h2 className="mb-4 text-lg font-semibold">Popular Tags</h2>

      {loading ? (
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-20 animate-pulse rounded-full bg-muted"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              href={`/community?tag=${tag.slug}`}
              key={tag.id}
              className="rounded-full bg-primary/5 px-3 py-1 text-sm font-semibold text-white hover:bg-primary/10 hover:shadow-md"
            >
              <span>{tag.name}</span>
              <span className="ml-1 text-muted-foreground">
                ({tag.discussion_count})
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
