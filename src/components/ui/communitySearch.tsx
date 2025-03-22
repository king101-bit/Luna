"use client"
import { useState } from "react"
import { Input } from "./input"
import { Search } from "lucide-react" // Optional: For search icon

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
    <div className="relative md:w-1/3">
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
  )
}
