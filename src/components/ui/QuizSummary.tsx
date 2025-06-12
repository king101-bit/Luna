"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Trash2 } from "lucide-react"
import { Separator } from "./separator"
import Link from "next/link"

export function QuizSummary({
  questionCount,
  totalPoints,
  timeLimit = 0,
  passingScore = 0,
  attempts = 0,
}: QuizSummaryProps) {
  return (
    <div className="w-full rounded-lg border bg-black p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold">Quiz Summary</h2>

      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Quiz Status</span>
          <Badge variant="outline">Draft</Badge>
        </div>
      </div>

      <div className="mb-4 border-t pt-4">
        <p className="text-sm font-medium">Questions</p>
        <p className="mt-3 text-3xl font-bold">{questionCount}</p>
        <p className="text-sm text-muted-foreground">
          {" "}
          Total points: {totalPoints}
        </p>
      </div>
      <Separator />
      <div className="mb-6 pt-4">
        <p className="text-sm font-medium">Settings</p>
        <div className="mt-2 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Time limit:</span>
            <span className="text-primary">{timeLimit} minutes</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Passing score:</span>
            <span className="text-primary">{passingScore}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Attempts:</span>
            <span className="text-primary">{attempts}</span>
          </div>
        </div>
      </div>

      <Separator />

      <div className="mt-4 flex flex-col gap-2">
        <Link href="/admin/quizzes/preview">
          <Button variant="outline" className="w-full">
            <Eye className="mr-2 h-4 w-4" />
            Preview Quiz
          </Button>
        </Link>
        <Button variant="destructive" className="w-full">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Quiz
        </Button>
      </div>
    </div>
  )
}
