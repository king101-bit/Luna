import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

type FilterBarProps = {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedLevel: string
  setSelectedLevel: (level: string) => void
  selectedSort: string
  setSelectedSort: (sort: string) => void
}

const FilterBar = ({
  selectedCategory,
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  selectedSort,
  setSelectedSort,
}: FilterBarProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Category Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex w-40 items-center justify-between border-gray-300 dark:border-gray-700"
          >
            {selectedCategory}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setSelectedCategory("All")}>
            All
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setSelectedCategory("Web Development")}
          >
            Web Development
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedCategory("Data Science")}>
            Data Science
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Level Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex w-40 items-center justify-between border-gray-300 dark:border-gray-700"
          >
            {selectedLevel}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setSelectedLevel("All Levels")}>
            All Levels
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedLevel("Beginner")}>
            Beginner
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedLevel("Intermediate")}>
            Intermediate
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedLevel("Advanced")}>
            Advanced
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex w-40 items-center justify-between border-gray-300 dark:border-gray-700"
          >
            {selectedSort}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setSelectedSort("Most Popular")}>
            Most Popular
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedSort("Newest")}>
            Newest
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setSelectedSort("Price: Low to High")}
          >
            Price: Low to High
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setSelectedSort("Price: High to Low")}
          >
            Price: High to Low
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default FilterBar
