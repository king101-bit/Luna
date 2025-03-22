import Link from "next/link"
import { Button } from "./button"
import { PlusCircle } from "lucide-react"

export const CommunityHeader = () => {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold">Community</h1>
        <p className="mt-1 text-muted-foreground">
          Connect with fellow learners and instructors
        </p>
      </div>

      <Button asChild>
        <Link
          href="/community/new-discussion"
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          New Discussion
        </Link>
      </Button>
    </div>
  )
}
