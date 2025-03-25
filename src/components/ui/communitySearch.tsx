"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "./input"
import { cn } from "@/lib/utils"

export const CommunitySearch = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("javascript")
  const router = useRouter()

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(
        `/community/search?q=${encodeURIComponent(searchTerm.trim())}`
      )
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
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
          onKeyDown={handleKeyDown}
          className="w-full pl-9 md:w-[250px]"
        />
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-1 overflow-x-auto pb-2 md:gap-2">
        {[
          { id: "all", name: "All Discussions" },
          { id: "javascript", name: "JavaScript" },
          { id: "python", name: "Python" },
          { id: "web-dev", name: "Web Development" },
          { id: "data-science", name: "Data Science" },
          { id: "career", name: "Career Advice" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium",
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="space-y-4">
        {activeTab === "all" && <div></div>}
        {activeTab === "javascript" && (
          <div className="rounded-lg bg-muted/50 p-6">
            <div className="mb-2 flex items-center gap-3">
              <h2 className="text-2xl font-bold">JavaScript</h2>
              <span className="rounded bg-secondary px-2.5 py-0.5 text-sm font-medium text-secondary-foreground">
                128 discussions
              </span>
            </div>
            <p className="text-muted-foreground">
              Discuss JavaScript concepts, frameworks, and best practices
            </p>
          </div>
        )}
        {activeTab === "python" && (
          <div className="rounded-lg bg-muted/50 p-6">
            <div className="mb-2 flex items-center gap-3">
              <h2 className="text-2xl font-bold">Python</h2>
              <span className="rounded bg-secondary px-2.5 py-0.5 text-sm font-medium text-secondary-foreground">
                85 discussions
              </span>
            </div>
            <p className="text-muted-foreground">
              Discuss Python concepts, libraries, and best practices
            </p>
          </div>
        )}
        {activeTab === "web-dev" && (
          <div className="rounded-lg bg-muted/50 p-6">
            <div className="mb-2 flex items-center gap-3">
              <h2 className="text-2xl font-bold">Web Development</h2>
              <span className="rounded bg-secondary px-2.5 py-0.5 text-sm font-medium text-secondary-foreground">
                152 discussions
              </span>
            </div>
            <p className="text-muted-foreground">
              Discuss web development concepts, frameworks, and best practices
            </p>
          </div>
        )}
        {activeTab === "data-science" && (
          <div className="rounded-lg bg-muted/50 p-6">
            <div className="mb-2 flex items-center gap-3">
              <h2 className="text-2xl font-bold">Data Science</h2>
              <span className="rounded bg-secondary px-2.5 py-0.5 text-sm font-medium text-secondary-foreground">
                78 discussions
              </span>
            </div>
            <p className="text-muted-foreground">
              Discuss data science concepts, tools, and best practices
            </p>
          </div>
        )}
        {activeTab === "career" && (
          <div className="rounded-lg bg-muted/50 p-6">
            <div className="mb-2 flex items-center gap-3">
              <h2 className="text-2xl font-bold">Career Advice</h2>
              <span className="rounded bg-secondary px-2.5 py-0.5 text-sm font-medium text-secondary-foreground">
                96 discussions
              </span>
            </div>
            <p className="text-muted-foreground">
              Get advice on career paths, job hunting, and professional
              development
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
