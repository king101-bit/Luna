"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function QuizDetails() {
  return (
    <div className="w-full rounded-lg border bg-black p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold">Quiz Details</h2>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">Quiz Title</label>
        <Input placeholder="New Quiz" />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">Description</label>
        <Textarea placeholder="Enter quiz description" className="col-span-3" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Course</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="math">Math</SelectItem>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="history">History</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
