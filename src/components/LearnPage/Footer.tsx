import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function Footer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-card p-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <Button className="bg-accent text-white hover:bg-blue-700">
          Complete
        </Button>
      </div>
    </div>
  )
}
