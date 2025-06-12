import { useState } from "react"
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

export default function LearningProgressCard() {
  const [progress, setProgress] = useState(50)

  return (
    <>
      {" "}
      <Card className="col-span-full lg:col-span-2">
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>
            You&apos;ve completed {progress}% of your current path
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={progress} className="h-2" />

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-3 shadow-sm">
                <div className="text-xl font-bold">12</div>
                <div className="text-sm font-semibold text-muted-foreground">
                  Lessons
                </div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-3 shadow-sm">
                <div className="text-xl font-bold">5</div>
                <div className="text-sm font-semibold text-muted-foreground">
                  Challenges
                </div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-3 shadow-sm">
                <div className="text-xl font-bold">7</div>
                <div className="text-sm font-semibold text-muted-foreground">
                  Day Streak
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-accent text-white hover:bg-accent/90"
            onClick={() => setProgress(Math.min(progress + 1, 100))}
          >
            Continue Learning
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
