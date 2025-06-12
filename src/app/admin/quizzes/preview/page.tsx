"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function QuizPreview() {
  const router = useRouter()
  return (
    <>
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-16 py-8">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="mr-2"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Editor
          </Button>
          <h1 className="text-2xl font-bold">Quiz Preview</h1>
        </div>
      </div>

      <div>
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle className="text-2xl">JavaScript Fundamentals</CardTitle>
            <CardDescription>
              Test your knowledge of JavaScript basics including variables,
              functions, and control flow.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Question 2 of 2</div>
                <div className="flex items-center text-sm font-medium">
                  <Clock className="mr-1 h-4 w-4" />
                  Time Limit: 30 minutes
                </div>
              </div>

              <h1 className="text-lg font-semibold">
                What will the following code output? console.log(typeof [])
              </h1>

              <RadioGroup>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 rounded-md p-2 transition-colors hover:bg-neutral-800">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label
                      htmlFor="option-one"
                      className="flex-grow cursor-pointer"
                    >
                      Option One
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md p-2 transition-colors hover:bg-neutral-800">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label
                      htmlFor="option-two"
                      className="flex-grow cursor-pointer"
                    >
                      Option Two
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <Button>Previous</Button>
                  <div className="flex items-center">
                    <Button className="bg-accent text-primary hover:bg-accent/75">
                      Submit Quiz
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
