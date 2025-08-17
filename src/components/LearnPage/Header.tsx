import { Button } from "@/components/ui/button"
import { CourseModule } from "@root/global"
import { ChevronLeft, Menu, Search } from "lucide-react"

interface HeaderProps {
  course: {
    id: string
    title: string
    description: string
    thumbnail: string
    price: number
    category: {
      name: string
    }
    level: string
    instructor: string
    slug: string
    hours?: number
    module: CourseModule[]
  }
  currentModuleIndex: number
  currentLessonIndex: number
  onToggleSidebar: () => void
}

export function Header({
  course,
  currentModuleIndex,
  currentLessonIndex,
  onToggleSidebar,
}: HeaderProps) {
  const selectedModule = course.module?.[currentModuleIndex]
  const selectedLesson = selectedModule?.lessons?.[currentLessonIndex]

  return (
    <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left: Back button + Course info */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-sm"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="hidden flex-col md:flex">
            <span className="line-clamp-1 text-sm font-semibold">
              {course.title}
            </span>
            <span className="text-xs text-muted-foreground">
              {selectedModule
                ? `Module ${currentModuleIndex + 1}: ${selectedModule.title}`
                : "No module selected"}
            </span>
            {selectedLesson && (
              <span className="text-xs text-muted-foreground">
                Lesson: {selectedLesson.title}
              </span>
            )}
          </div>
        </div>

        {/* Right: Search input */}
        <div className="relative w-full max-w-xs sm:max-w-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search lessons..."
            className="block w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
    </header>
  )
}
