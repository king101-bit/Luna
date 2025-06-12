"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, CircleHelp, Clock, Eye, Plus, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuizDetails } from "@/components/ui/QuizDetails"
import { QuizSummary } from "@/components/ui/QuizSummary"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import QuizQuestionEditor from "@/components/admin/QuizQuestionEditor"
import { useState } from "react"
import { Question, QuestionOption } from "@root/global"
export default function NewQuiz() {
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedQuestionType, setSelectedQuestionType] =
    useState("multiple-choice")
  const [timeLimit, setTimeLimit] = useState<number | undefined>(undefined)
  const [passingScore, setPassingScore] = useState<number | undefined>(
    undefined
  )
  const [attempts, setAttempts] = useState<number | undefined>(undefined)

  // Add a new question
  const addQuestion = () => {
    const defaultOptions: QuestionOption[] =
      selectedQuestionType === "true-false"
        ? [
            { id: `option-${Date.now()}-1`, text: "True", isCorrect: false },
            { id: `option-${Date.now()}-2`, text: "False", isCorrect: false },
          ]
        : selectedQuestionType === "short-answer"
          ? [{ id: `option-${Date.now()}`, text: "", isCorrect: true }]
          : [
              {
                id: `option-${Date.now()}-1`,
                text: "Option 1",
                isCorrect: false,
              },
              {
                id: `option-${Date.now()}-2`,
                text: "Option 2",
                isCorrect: false,
              },
            ]

    const newQuestion: Question = {
      id: `question-${Date.now()}`,
      text: "",
      type: selectedQuestionType,
      points: 1,
      options: defaultOptions,
    }

    setQuestions([...questions, newQuestion])
  }

  // Update a question
  const updateQuestion = (updatedQuestion: Question) => {
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    )
  }

  // Delete a question
  const deleteQuestion = (questionId: string) => {
    setQuestions(questions.filter((q) => q.id !== questionId))
  }
  const saveQuiz = () => {
    // Implement your save logic here
    console.log("Quiz to save:", {
      title: "Your Quiz Title", // You'll want to add this state
      description: "Your Quiz Description", // And this
      questions,
    })
    // router.push("/your-success-route");
  }

  return (
    <>
      {/* Header */}
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="mr-2"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Quizzes
          </Button>
          <h1 className="text-2xl font-bold">Create New Quiz</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push("/admin/quizzes/new")}
            className="bg-accent text-primary hover:bg-accent/75"
          >
            <Save className="mr-1 h-4 w-4" />
            Save Quiz
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto flex flex-col gap-6 px-5 py-6 md:flex-row">
        {/* Left Section */}
        <div className="w-full md:w-2/3">
          <QuizDetails />
          <Tabs defaultValue="questions" className="mt-5 w-full">
            <TabsList className="flex w-full justify-start gap-2">
              <TabsTrigger value="questions" className="flex-1">
                Questions
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Questions Tab */}
            <TabsContent value="questions">
              <div className="flex items-center justify-between gap-4 py-4">
                <h1 className="whitespace-nowrap text-xl font-semibold">
                  Quiz Questions
                </h1>
                <div className="flex items-center gap-3">
                  <Select
                    value={selectedQuestionType}
                    onValueChange={setSelectedQuestionType}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Multiple Choice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="multiplechoice">
                          Multiple Choice
                        </SelectItem>
                        <SelectItem value="t/f">True/False</SelectItem>
                        <SelectItem value="sa">Short Answer</SelectItem>
                        <SelectItem value="matching">Matching</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={addQuestion}
                    className="flex items-center whitespace-nowrap bg-accent text-primary hover:bg-accent/75"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Question
                  </Button>
                </div>
              </div>

              {questions.length === 0 ? (
                <>
                  <div className="mt-5 flex flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed border-gray-300 bg-slate-100 p-8 text-center">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-black">
                        No Questions Yet
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground">
                        Start by adding your first question to this quiz.
                      </p>
                      <Button
                        onClick={addQuestion}
                        className="mt-2 bg-accent text-primary hover:bg-accent/75"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Question
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <QuizQuestionEditor
                      key={question.id}
                      question={question}
                      index={index}
                      onUpdate={updateQuestion}
                      onDelete={() => deleteQuestion(question.id)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="time">Time Left (Minutes)</Label>
                  <Input
                    id="time"
                    name="time"
                    type="number"
                    placeholder="30"
                    value={timeLimit ?? ""}
                    onChange={(e) => setTimeLimit(Number(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Set to 0 for no time limit
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="score">Passing Score (%)</Label>
                  <Input
                    id="score"
                    name="score"
                    type="number"
                    placeholder="50"
                    value={passingScore ?? ""}
                    onChange={(e) => setPassingScore(Number(e.target.value))}
                  />
                </div>
              </div>

              <Separator className="mb-6 mt-6" />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="attempts">Attempts Allowed</Label>
                  <Input
                    id="attempts"
                    name="attempts"
                    type="number"
                    placeholder="0"
                    value={attempts ?? ""}
                    onChange={(e) => setAttempts(Number(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Set to 0 for unlimited attempts
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="text-sm">
                      <Label htmlFor="shuffleQuestions" className="font-medium">
                        Shuffle Questions
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Randomize the order of questions for each attempt
                      </p>
                    </div>
                    <Switch id="shuffleQuestions" defaultChecked />
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="text-sm">
                      <Label htmlFor="showAnswers" className="font-medium">
                        Show Correct Answers
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Show correct answers after quiz submission
                      </p>
                    </div>
                    <Switch id="showAnswers" defaultChecked />
                  </div>
                </div>
              </div>
              <Separator className="mb-6 mt-6" />
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="text-sm">
                    <Label
                      htmlFor="requirePassingScore"
                      className="font-medium"
                    >
                      Require Passing Score
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Students must acheive passing score to complete the quiz
                    </p>
                  </div>
                  <Switch id="requirePassingScore" defaultChecked />
                </div>
                <div className="flex items-start justify-between">
                  <div className="text-sm">
                    <Label htmlFor="showFeedback" className="font-medium">
                      Show Feedback
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Show explanations for questions after submission
                    </p>
                  </div>
                  <Switch id="showFeedback" defaultChecked />
                </div>
                <div className="flex items-start justify-between">
                  <div className="text-sm">
                    <Label htmlFor="shuffleQuestions" className="font-medium">
                      Allow Review
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Allow students review their answers after submission
                    </p>
                  </div>
                  <Switch id="shuffleQuestions" defaultChecked />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/3">
          <QuizSummary
            questionCount={questions.length}
            totalPoints={questions.reduce((sum, q) => sum + q.points, 0)}
            timeLimit={timeLimit}
            passingScore={passingScore}
            attempts={attempts}
          />
        </div>
      </div>
    </>
  )
}
