"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Trash2 } from "lucide-react"
import { useFormContext } from "react-hook-form"

export default function LessonForm({
  moduleIndex,
  lessonIndex,
  lesson,
}: {
  moduleIndex: number
  lessonIndex: number
  lesson: any
}) {
  const { register, getValues, setValue } = useFormContext()

  const handleRemoveLesson = () => {
    const updatedModules = [...getValues("modules")]
    updatedModules[moduleIndex].lessons.splice(lessonIndex, 1)
    setValue("modules", updatedModules)
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h5 className="font-medium">Lesson {lessonIndex + 1}</h5>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleRemoveLesson}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>

      <div className="mt-4 space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor={`modules.${moduleIndex}.lessons.${lessonIndex}.title`}
          >
            Lesson Title
          </Label>
          <Input
            id={`modules.${moduleIndex}.lessons.${lessonIndex}.title`}
            {...register(`modules.${moduleIndex}.lessons.${lessonIndex}.title`)}
            placeholder="e.g., Variables and Data Types"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor={`modules.${moduleIndex}.lessons.${lessonIndex}.content`}
          >
            Content
          </Label>
          <Textarea
            id={`modules.${moduleIndex}.lessons.${lessonIndex}.content`}
            {...register(
              `modules.${moduleIndex}.lessons.${lessonIndex}.content`
            )}
            placeholder="Enter the lesson content"
            rows={5}
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor={`modules.${moduleIndex}.lessons.${lessonIndex}.duration`}
          >
            Duration (minutes)
          </Label>
          <Input
            id={`modules.${moduleIndex}.lessons.${lessonIndex}.duration`}
            type="number"
            {...register(
              `modules.${moduleIndex}.lessons.${lessonIndex}.duration`,
              {
                valueAsNumber: true,
              }
            )}
            placeholder="e.g., 30"
          />
        </div>
      </div>
    </div>
  )
}
