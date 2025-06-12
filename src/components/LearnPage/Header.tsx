import { Button } from "@/components/ui/button"
import { ChevronLeft, Search } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b px-6">
      <div className="flex items-center gap-4">
        <Link href="/courses">
          <Button variant="ghost" className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Courses
          </Button>
        </Link>
        <div className="hidden md:block">
          <h1 className="text-sm font-semibold">Responsive Web Design</h1>
          <p className="text-xs text-gray-500">Beginner - Sarah Johnson</p>
        </div>
      </div>

      <div className="flex items-center gap-4 pr-16">
        <div className="relative w-full max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Search lessons..."
            className="block w-full rounded-lg border py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </header>
  )
}
