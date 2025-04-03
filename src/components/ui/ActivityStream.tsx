"use client"
import Link from "next/link"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  TrendingUp,
  Clock,
  ShieldQuestionIcon,
} from "lucide-react"

// Define types for better type safety
type TabType = {
  id: string
  category: string
  title: string
  replies: number
  upvotes: number
  author: string
  timePosted: string
  tags?: string[]
}

export default function ActivityStream() {
  const [selectedCategory, setSelectedCategory] = useState("Trending")

  // Sample data - replace with your actual data source
  const tabs: TabType[] = [
    {
      id: "1",
      category: "Trending",
      title: "React Server Components best practices",
      replies: 24,
      upvotes: 15,
      author: "JaneDoe",
      timePosted: "2h ago",
      tags: ["React"],
    },
    {
      id: "2",
      category: "Trending",
      title: "Python type hints cheat sheet",
      replies: 12,
      upvotes: 42,
      author: "PythonLover",
      timePosted: "5h ago",
      tags: ["Python"],
    },
    {
      id: "3",
      category: "Unanswered",
      title: "CSS Grid vs Flexbox in 2024",
      replies: 8,
      upvotes: 10,
      author: "CSSWizard",
      timePosted: "1d ago",
      tags: ["CSS", "HTML"],
    },
  ]

  const filteredTabs = tabs.filter(
    (tab) =>
      selectedCategory === "Trending" || tab.category === selectedCategory
  )

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm sm:p-6">
      {/* Heading */}
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Community Activities</h2>
      </div>
      <p className="mb-4 text-muted-foreground">
        Explore the latest discussions and activities in the community.
      </p>

      {/* Tabs Navigation */}
      <Tabs
        defaultValue="Trending"
        className="w-full"
        onValueChange={(value) => setSelectedCategory(value)}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Trending" className="flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4" />
            <span>Trending</span>
          </TabsTrigger>
          <TabsTrigger value="Unanswered">
            <ShieldQuestionIcon className="h-4 w-4" />
            Unanswered
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value={selectedCategory}>
          <div className="mt-4 space-y-3">
            {filteredTabs.length > 0 ? (
              filteredTabs.map((tab) => (
                <Link
                  href={`/community/thread/${tab.id}`}
                  key={tab.id}
                  className="block"
                >
                  <div className="rounded-lg border p-3 transition-all hover:bg-muted/50">
                    <div className="mb-1 flex items-start gap-2">
                      {tab.tags &&
                        tab.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="px-1.5 py-0 text-xs font-normal"
                          >
                            {tag}
                          </Badge>
                        ))}
                      {tab.upvotes > 20 && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1 bg-amber-100 px-1.5 py-0 text-xs font-normal text-amber-800 hover:bg-amber-100"
                        >
                          <TrendingUp className="h-3 w-3" />
                          Hot
                        </Badge>
                      )}
                    </div>

                    <h3 className="line-clamp-2 text-sm font-medium">
                      {tab.title}
                    </h3>

                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {tab.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                          >
                            <path
                              d="M7.5 1.5L7.5 13.5M7.5 1.5L11.5 5.5M7.5 1.5L3.5 5.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {tab.upvotes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {tab.timePosted}
                        </span>
                      </div>
                      <span>by {tab.author}</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                No activities found in this category
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* View All Link */}
      <div className="mt-6 text-center">
        <Link
          href="/community/activities"
          className="text-sm font-medium text-primary hover:underline"
        >
          View all activities
        </Link>
      </div>
    </div>
  )
}
