"use client"
import { useState } from "react"
import { Input } from "./input"
import { Search } from "lucide-react" // Optional: For search icon
import { Tabs, TabsList, TabsTrigger } from "./tabs"

export const CommunitySearch = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = () => {
    // Perform search action here, e.g., filter courses or call an API
    console.log("Searching for:", searchTerm)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 sm:flex-row sm:p-0">
      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full sm:w-auto">
        <TabsList className="flex w-full flex-wrap justify-start gap-2">
          <TabsTrigger value="all" className="flex-1 sm:flex-none">
            All
          </TabsTrigger>
          <TabsTrigger value="javascript" className="flex-1 sm:flex-none">
            JS
          </TabsTrigger>
          <TabsTrigger value="python" className="flex-1 sm:flex-none">
            Python
          </TabsTrigger>
          <TabsTrigger value="web-development" className="flex-1 sm:flex-none">
            Web Dev
          </TabsTrigger>
          <TabsTrigger value="react" className="flex-1 sm:flex-none">
            React
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search Input */}
      <div className="relative w-full sm:w-1/3">
        <Input
          placeholder="Search discussions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10" // Add padding for the icon
        />
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" // Optional: Search icon styling
          onClick={handleSearch} // Optional: Make the icon clickable
        />
      </div>
    </div>
  )
}
