"use client"

import { useState } from "react"
import Link from "next/link"
import { MessageSquare, ThumbsUp, Share2, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Discussion {
  id: string
  title: string
  content: string
  created_at: string
  like_count: number
  reply_count: number
  tags: string[] | null
  author: {
    name: string
    username: string
    avatar: string | null
  }
  replies: {
    id: string
    content: string
    created_at: string
    like_count: number
    author: {
      name: string
      username: string
      avatar: string | null
    }
  }[]
}

interface DiscussionThreadProps {
  discussion: Discussion
}

export default function DiscussionThread({
  discussion,
}: DiscussionThreadProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(discussion.like_count ?? 0)

  const handleLike = () => {
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
    setLiked(!liked)
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch {
      console.error("Failed to copy link")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{discussion.title}</h1>

        <div className="mt-4 flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={discussion.author.avatar ?? ""}
              alt={discussion.author.name}
            />
            <AvatarFallback>
              {discussion.author.name.slice(0, 2) ?? "?"}
            </AvatarFallback>
          </Avatar>

          <div>
            <Link
              href={`/community/profile/${discussion.author.username}`}
              className="font-medium hover:underline"
            >
              {discussion.author.name ?? "Unknown"}
            </Link>
            <p className="text-sm text-muted-foreground">
              {discussion.created_at}
            </p>
          </div>
        </div>
      </div>

      <div className="prose prose-sm sm:prose max-w-none">
        {discussion.content}
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t pt-4">
        {discussion.tags?.map((tag) => (
          <Link
            key={tag}
            href={`/community/search?q=${encodeURIComponent(tag)}`}
          >
            <Badge variant="secondary" className="hover:bg-secondary/80">
              {tag}
            </Badge>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex items-center gap-1 ${liked ? "text-primary" : ""}`}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{likeCount}</span>
          </Button>

          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{discussion.reply_count ?? 0}</span>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Bookmark</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {discussion.replies?.map((reply) => (
        <div key={reply.id} className="ml-8 rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={reply.author.avatar ?? ""}
                alt={reply.author.name}
              />
              <AvatarFallback>
                {reply.author.name.slice(0, 2) ?? "?"}
              </AvatarFallback>
            </Avatar>

            <div>
              <Link
                href={`/community/profile/${reply.author.username}`}
                className="font-medium hover:underline"
              >
                {reply.author.name ?? "Unknown"}
              </Link>
              <p className="text-xs text-muted-foreground">
                {reply.created_at}
              </p>
            </div>
          </div>

          <div className="mt-2 text-sm">{reply.content}</div>

          <div className="mt-3 flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex h-7 items-center gap-1 px-2"
            >
              <ThumbsUp className="h-3 w-3" />
              <span className="text-xs">{reply.like_count ?? 0}</span>
            </Button>

            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
              Reply
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
