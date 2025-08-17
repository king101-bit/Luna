import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface FooterProps {
  onPrevious?: () => void
  onNext?: () => void
  onComplete?: () => void
  disablePrevious?: boolean
  disableNext?: boolean
  disableComplete?: boolean
}

export function Footer({
  onPrevious,
  onNext,
  onComplete,
  disablePrevious,
  disableNext,
  disableComplete,
}: FooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card p-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevious}
            disabled={disablePrevious}
            className="flex items-center"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onNext}
            disabled={disableNext}
            className="flex items-center"
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <Button
          className="bg-accent text-white hover:bg-blue-700"
          onClick={onComplete}
          disabled={disableComplete}
        >
          Complete
        </Button>
      </div>
    </div>
  )
}
