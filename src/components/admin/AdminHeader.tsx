"use client"
import { Plus, Search } from "lucide-react" // Added ArrowLeft for back navigation
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { AdminHeaderProps } from "@root/global"

export default function AdminHeader({
  title,
  description,
  buttonText,
  buttonIcon = <Plus className="h-4 w-4" />, // Default icon
  showSearch = true,
  showActionButton = true, // Defaults to true (backward compatible)
  actionButtonText = "Add New", // Default text
  actionButtonRoute = "#", // Fallback route
  showBackButton = false,
  className = "",
}: AdminHeaderProps) {
  const router = useRouter()

  return (
    <main className={`container mx-auto px-4 py-8 sm:px-16 ${className}`}>
      {/* Back button (conditionally rendered) */}
      {showBackButton && (
        <Button
          variant={"ghost"}
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          {buttonIcon}
          {buttonText}
        </Button>
      )}

      {/* Title section + Action button */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">{description}</p>
        </div>

        {showActionButton && (
          <Button
            onClick={() => router.push(actionButtonRoute)}
            className="flex items-center gap-2 bg-accent text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            {actionButtonText}
          </Button>
        )}
      </div>

      {/* Search and filters (conditionally rendered) */}
      {showSearch && (
        <div className="mb-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <Input
                type="search"
                placeholder="Search Courses..."
                className="pl-9"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="">
                Filter
              </Button>
              <Button variant="outline" className="">
                Sort
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
