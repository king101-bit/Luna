"use client"

import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/ui/UserAvatar"
import UserGreetText from "@/components/ui/UserGreetText"
import useUserStore from "@/stores/UserStore"
import { ArrowLeft, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"

// Mock discussions array (Replace this with an API call if needed)
const discussions = [
  {
    id: "1",
    title: "Best practices for React state management in 2023",
    content:
      "I've been using Redux for a while, but I'm curious about other state management solutions like Zustand, Jotai, and React Query. What are your experiences with these libraries? Are there any clear winners for different use cases?",
  },
  {
    id: "2",
    title: "React Hooks: A Comprehensive Guide",
    content: "Learn how to use React Hooks to manage state...",
  },
  {
    id: "3",
    title: "Building a Real-time Chat App with React and Socket.IO",
    content: "A step-by-step guide to building a chat application...",
  },
]

export default function DiscussionPage() {
  const { user } = useUserStore()
  const { id } = useParams<{ id: string }>()
  const [discussion, setDiscussion] = useState<{
    title: string
    content: string
  } | null>(null)

  useEffect(() => {
    if (id) {
      const foundDiscussion = discussions.find((d) => d.id === id)
      setDiscussion(foundDiscussion || null)
    }
  }, [id])

  if (!discussion) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold">Discussion not found.</h1>
        <Link
          href="/community"
          className="mt-4 flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back to Community</span>
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/community" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              <span className="text-sm"> Back to Community</span>
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">{discussion.title}</h1>
              <div className="mt-4 flex items-center gap-3">
                <UserAvatar
                  name={user?.user_metadata?.name || "User"} // Fallback for name
                  imageUrl={user?.user_metadata?.avatar_url}
                  size={50}
                />
                <div className="">
                  <UserGreetText
                    className="font-medium hover:underline"
                    user={user}
                  />
                  <p className="text-sm text-muted-foreground">
                    Posted almost 2 hours ago
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-700">{discussion.content}</p>
          </div>
        </div>
      </div>
    </>
  )
}
