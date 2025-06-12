import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  ChevronDown,
  Clock,
  GlobeIcon,
  Search,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
const CourseFilters = ({ searchTerm, setSearchTerm, setSelectedCategory }) => {
  return (
    <>
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="relative w-full max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Search lessons..."
            className="block w-full rounded-lg border py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-accent text-white hover:bg-accent/90">
                Level
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <span>All Levels</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Beginner</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Intermediate</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Advanced</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-accent text-white hover:bg-accent/90">
                Duration
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <span>0-10 Hours</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>10-20 Hours</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>20-40 Hours</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>40+ Hours</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Tabs defaultValue="All" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="All" onClick={() => setSelectedCategory("All")}>
              All
            </TabsTrigger>
            <TabsTrigger
              value="Frontend"
              onClick={() => setSelectedCategory("Frontend")}
            >
              Frontend
            </TabsTrigger>
            <TabsTrigger
              value="Backend"
              onClick={() => setSelectedCategory("Backend")}
            >
              Backend
            </TabsTrigger>
            <TabsTrigger
              value="Fullstack"
              onClick={() => setSelectedCategory("Fullstack")}
            >
              Fullstack
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </>
  )
}

export default CourseFilters
