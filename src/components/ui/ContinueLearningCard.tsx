import { BookOpen } from "lucide-react"
import { Button } from "./button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import { Progress } from "./progress"

export default function ContinueLearningCard() {
  return (
    <>
      <Card className="col-span-full md:col-span-1">
        <CardHeader>
          <CardTitle>Continue Learning</CardTitle>
          <CardDescription>Your current course</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 rounded-md bg-primary/10 p-4">
              <BookOpen className="h-8 w-8 text-primary"></BookOpen>
              <div>
                <h3 className="font-sans font-medium">Responsive Web Design</h3>
                <p className="text-sm text-muted-foreground">Module 3 of 5</p>
              </div>
            </div>
            <Progress value={50} className="h-2"></Progress>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-accent text-white hover:bg-accent/90">
            Resume Course
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
