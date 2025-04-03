"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "./input"
import { cn } from "@/lib/utils"
import { createClient } from "@root/utils/supabase/client"

export const CommunitySearch = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<
    Array<{
      id: string
      name: string
      description: string
      discussion_count: number
    }>
  >([])

  // Fetch categories from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true)
      try {
        const { data, error } = await supabase
          .from("tags")
          .select("id, name, description, discussion_count")
          .order("discussion_count", { ascending: true }) // Fixed typo here
          .limit(5)
        if (error) throw error
        setCategories(data || [])
      } catch (error) {
        console.error("Error fetching categories:", error)
        setCategories([
          {
            id: "javascript",
            name: "JavaScript",
            description: "Discuss JavaScript concepts",
            discussion_count: 128,
          },
          {
            id: "python",
            name: "Python",
            description: "Discuss Python programming",
            discussion_count: 85,
          },
          {
            id: "web-dev",
            name: "Web Development",
            description: "Web dev discussions",
            discussion_count: 152,
          },
          {
            id: "data-science",
            name: "Data Science",
            description: "Data science topics",
            discussion_count: 78,
          },
          {
            id: "career",
            name: "Career Advice",
            description: "Career guidance",
            discussion_count: 96,
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }
    fetchCategories()
  }, [supabase])

  // Sync tab with URL
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) setActiveTab(tab)
  }, [searchParams])

  // Search with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        searchDiscussions(searchTerm.trim())
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const searchDiscussions = async (query: string) => {
    try {
      const { data } = await supabase
        .from("discussions")
        .select("*")
        .ilike("title", `%${query}%`)
        .limit(10)

      console.log("Search results:", data)
    } catch (error) {
      console.error("Search error:", error)
    }
  }

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    router.push(`?tag=${tabId}`, { shallow: true })
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="rounded-lg bg-muted/50 p-6">
          <div className="space-y-2">
            <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
          </div>
        </div>
      )
    }

    if (activeTab === "all") {
      return null
    }

    const activeCategory = categories.find((c) => c.id === activeTab)
    if (!activeCategory) return null

    return (
      <div className="rounded-lg bg-muted/50 p-6">
        <div className="mb-2 flex items-center gap-3">
          <h2 className="text-2xl font-bold">{activeCategory.name}</h2>
          <span className="rounded bg-secondary px-2.5 py-0.5 text-sm font-medium text-secondary-foreground">
            {activeCategory.discussion_count} discussions
          </span>
        </div>
        <p className="text-muted-foreground">{activeCategory.description}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search discussions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 md:w-[300px]"
        />
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-1 overflow-x-auto pb-2 md:gap-2">
        <button
          onClick={() => handleTabChange("all")}
          className={cn(
            "whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium",
            activeTab === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          )}
        >
          All Discussions
        </button>
        {isLoading
          ? [...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-9 w-24 animate-pulse rounded-md bg-muted"
              />
            ))
          : categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleTabChange(category.id)}
                className={cn(
                  "whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium",
                  activeTab === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                {category.name}
              </button>
            ))}
      </div>

      {/* Content Area */}
      {renderContent()}
    </div>
  )
}
