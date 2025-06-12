"use client"

import { useState } from "react"
import {
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Plus,
  Copy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { QuizQuestionEditorProps } from "@root/global"

export default function QuizQuestionEditor({
  question,
  index,
  onUpdate,
  onDelete,
}: QuizQuestionEditorProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const updateField = (field: string, value: any) => {
    onUpdate({
      ...question,
      [field]: value,
    })
  }

  const updateOptionText = (optionId: string, text: string) => {
    onUpdate({
      ...question,
      options: question.options.map((option) =>
        option.id === optionId ? { ...option, text } : option
      ),
    })
  }

  const updateOptionCorrectness = (optionId: string, isCorrect: boolean) => {
    onUpdate({
      ...question,
      options: question.options.map((option) => {
        if (
          question.type === "multiple-choice" ||
          question.type === "true-false"
        ) {
          return option.id === optionId
            ? { ...option, isCorrect }
            : { ...option, isCorrect: false }
        }

        return option.id === optionId ? { ...option, isCorrect } : option
      }),
    })
  }

  const addOption = () => {
    const newOption = {
      id: `option-${Date.now()}`,
      text: `Option ${question.options.length + 1}`,
      isCorrect: false,
    }

    onUpdate({
      ...question,
      options: [...question.options, newOption],
    })
  }

  const removeOption = (optionId: string) => {
    onUpdate({
      ...question,
      options: question.options.filter((option) => option.id !== optionId),
    })
  }

  const duplicateQuestion = () => {
    const duplicatedQuestion = {
      ...question,
      id: `question-${Date.now()}`,
      text: `${question.text} (Copy)`,
      options: question.options.map((option) => ({
        ...option,
        id: `option-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      })),
    }

    onUpdate(duplicatedQuestion)
  }

  return (
    <Card>
      <CardHeader
        className="flex cursor-pointer flex-row items-center justify-between border-b p-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700">
            {index + 1}
          </div>
          <h3 className="truncate font-medium">
            {question.text || "New Question"}
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <div className="mr-2 text-sm text-muted-foreground">
            {question.points} points
          </div>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4 p-4">
          <div className="space-y-2">
            <Label htmlFor={`question-${question.id}`}>Question</Label>
            <Textarea
              id={`question-${question.id}`}
              value={question.text}
              onChange={(e) => updateField("text", e.target.value)}
              placeholder="Enter your question"
              className="min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`question-type-${question.id}`}>
                Question Type
              </Label>
              <Select
                value={question.type}
                onValueChange={(value) => updateField("type", value)}
              >
                <SelectTrigger id={`question-type-${question.id}`}>
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple-choice">
                    Multiple Choice
                  </SelectItem>
                  <SelectItem value="true-false">True/False</SelectItem>
                  <SelectItem value="short-answer">Short Answer</SelectItem>
                  <SelectItem value="matching">Matching</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`question-points-${question.id}`}>Points</Label>
              <Input
                id={`question-points-${question.id}`}
                type="number"
                min="0"
                value={question.points}
                onChange={(e) =>
                  updateField("points", Number.parseInt(e.target.value) || 0)
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Answer Options</Label>
              {question.type !== "true-false" && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                >
                  <Plus className="mr-1 h-3.5 w-3.5" />
                  Add Option
                </Button>
              )}
            </div>

            {question.type === "short-answer" ? (
              <div className="rounded-md border bg-muted/30 p-4">
                <Label
                  htmlFor={`correct-answer-${question.id}`}
                  className="text-sm"
                >
                  Correct Answer
                </Label>
                <Input
                  id={`correct-answer-${question.id}`}
                  placeholder="Enter the correct answer"
                  className="mt-1"
                  value={question.options[0]?.text || ""}
                  onChange={(e) =>
                    updateOptionText(
                      question.options[0]?.id || `option-${Date.now()}`,
                      e.target.value
                    )
                  }
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  For short answers, enter the expected correct response.
                  Multiple variations can be separated by commas.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={option.id}
                    className="flex items-center gap-2 rounded-md border p-2"
                  >
                    <div className="cursor-move rounded p-1 hover:bg-muted">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                    </div>

                    {question.type === "multiple-choice" && (
                      <RadioGroup
                        value={option.isCorrect ? option.id : ""}
                        onValueChange={() =>
                          updateOptionCorrectness(option.id, true)
                        }
                      >
                        <RadioGroupItem
                          value={option.id}
                          id={`option-${option.id}`}
                        />
                      </RadioGroup>
                    )}

                    {question.type === "true-false" && (
                      <RadioGroup
                        value={option.isCorrect ? option.id : ""}
                        onValueChange={() =>
                          updateOptionCorrectness(option.id, true)
                        }
                      >
                        <RadioGroupItem
                          value={option.id}
                          id={`option-${option.id}`}
                        />
                      </RadioGroup>
                    )}

                    <Input
                      value={option.text}
                      onChange={(e) =>
                        updateOptionText(option.id, e.target.value)
                      }
                      className="flex-1"
                    />

                    {question.type !== "true-false" && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive/90"
                        onClick={() => removeOption(option.id)}
                        disabled={question.options.length <= 2}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`explanation-${question.id}`}>
              Explanation (Optional)
            </Label>
            <Textarea
              id={`explanation-${question.id}`}
              value={question.explanation || ""}
              onChange={(e) => updateField("explanation", e.target.value)}
              placeholder="Explain the correct answer (shown after submission)"
              className="min-h-[80px]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={duplicateQuestion}
            >
              <Copy className="mr-1 h-3.5 w-3.5" />
              Duplicate
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={onDelete}
            >
              <Trash2 className="mr-1 h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
