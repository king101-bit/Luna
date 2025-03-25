"use client"

import { Eye, MessageCircle, ThumbsUp } from "lucide-react"
import Link from "next/link"
import { UserAvatar } from "./UserAvatar"
import useUserStore from "@/stores/UserStore"
import UserGreetText from "./UserGreetText"

export const DiscussionCard = () => {
  const { user } = useUserStore()

  const discussions = [
    {
      id: 1,
      title: "Best practices for React state management in 2023",
      createdAt: new Date("2021-01-01"),
      tags: ["JavaScript", "React"],
      description:
        "I’ve been using Redux for a while, but I’m curious about other state management solutions like Zustand, Jotai, and React Query...",
      likes: 18,
      comments: 24,
      views: 342,
    },
    {
      id: 2,
      title: "React Hooks: A Comprehensive Guide",
      createdAt: new Date("2022-05-15"),
      tags: ["JavaScript", "React"],
      description:
        "Learn how to use React Hooks to manage state and side effects in functional components.",
      likes: 32,
      comments: 45,
      views: 567,
    },
    {
      id: 3,
      title: "Building a Real-time Chat App with React and Socket.IO",
      createdAt: new Date("2023-03-10"),
      tags: ["JavaScript", "React", "Socket.IO"],
      description:
        "A step-by-step guide to building a real-time chat application using React and Socket.IO.",
      likes: 50,
      comments: 60,
      views: 789,
    },
  ]

  return (
    <div className="space-y-6">
      {discussions.map((discussion) => (
        <div
          key={discussion.id}
          className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex gap-4">
            {/* Avatar on the left */}
            <div className="flex-shrink-0">
              <UserAvatar
                name={user?.user_metadata?.name || "User"} // Fallback for name
                imageUrl={user?.user_metadata?.avatar_url}
                size={50}
              />
            </div>

            {/* Content on the right */}
            <div className="min-w-0 flex-1">
              {/* Title */}
              <h2 className="mb-2 text-xl font-semibold">
                <Link
                  href={`/community/discussions/${discussion.id}`}
                  className="hover:underline"
                >
                  {discussion.title}
                </Link>
              </h2>

              {/* Author and Metadata */}
              <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                <UserGreetText className="mr-2" user={user} />
                <span>
                  {Math.floor(
                    (new Date().getTime() - discussion.createdAt.getTime()) /
                      (1000 * 60 * 60 * 24 * 365)
                  )}{" "}
                  years ago
                </span>
                {discussion.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-2 py-1 text-xs text-black"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="mb-4 text-gray-700">{discussion.description}</p>

              {/* Interaction Metrics */}
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{discussion.likes}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>{discussion.comments}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>{discussion.views}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DiscussionCard
