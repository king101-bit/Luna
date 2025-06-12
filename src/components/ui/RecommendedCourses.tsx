import {
  ChevronLeft,
  ChevronRight,
  Clock,
  GlobeIcon,
  Users,
} from "lucide-react"
import { Button } from "./button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import { Badge } from "./badge"
import { Progress } from "./progress"
import Link from "next/link"

export default function RecommendedCourses() {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">
          Recommended for you
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            // onClick={scrollLeft}
            // disabled={scrollPosition === 0}
            className="h-8 w-8 rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            // onClick={scrollRight}
            // disabled={scrollPosition >= recommendedCourses.length - 2}
            className="h-8 w-8 rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2"></div>
    </>
  )
}
