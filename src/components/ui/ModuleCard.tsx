import {
  Book,
  BookOpenText,
  ChevronDown,
  ChevronRight,
  FileText,
  FlaskConical,
  GripVertical,
  Scroll,
  ShieldQuestion,
  Trash2,
  Video,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "./card"
import { Input } from "./input"
import { Textarea } from "./textarea"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { TextLesson } from "./TextLesson"
import { useState } from "react"
import { VideoLesson } from "../admin/VideoLesson"
import { QuizLesson } from "./QuizLesson"
import { Lesson, LessonType } from "@root/global"

export default function ModuleCard() {
  const [lessons, setLessons] = useState<Lesson[]>([])

  const addLesson = (type: LessonType) => {
    setLessons((prev) => [...prev, { id: Date.now(), type }])
  }

  const handleAddTextLesson = () => addLesson("text")
  const handleAddVideoLesson = () => addLesson("video")
  const handleAddQuiz = () => addLesson("quiz")
  const handleAddAssignment = () => addLesson("assignment")

  const lessonComponents = {
    text: TextLesson,
    video: VideoLesson,
    quiz: QuizLesson,
    // assignment: AssignmentLesson,
    // article: ArticleLesson,
    // pdf: PdfLesson,
    // slide: SlideLesson,
    // code: CodeLesson,
    // demo: DemoLesson,
  }
  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start gap-2">
            <div className="flex h-10 items-center gap-1 pt-1">
              <GripVertical className="h-5 w-5 text-muted-foreground hover:cursor-grab" />
              <ChevronRight className="h-5 w-5 text-muted-foreground hover:cursor-pointer" />
            </div>

            <div className="flex flex-grow flex-col gap-1">
              <Input
                className="border-0 p-0 text-base font-medium shadow-none focus-visible:ring-0"
                defaultValue="Getting Started"
                placeholder="Module Title"
              />
              <Textarea
                className="min-h-0 resize-none border p-4 text-sm text-muted-foreground shadow-none focus-visible:ring-0"
                placeholder="Module description (optional)"
                defaultValue="Module description (optional)"
              />
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground">
              Lessons
            </h2>
            {lessons.map((lesson) => {
              const LessonComponent = lessonComponents[lesson.type]
              return <LessonComponent key={lesson.id} />
            })}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleAddTextLesson}
            >
              <FileText className="h-4 w-4" />
              Add Text Lesson
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleAddVideoLesson}
            >
              <Video className="h-4 w-4" />
              Add Video
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleAddQuiz}
            >
              <ShieldQuestion className="h-4 w-4" />
              Add Quiz
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Add Assignment
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  More Content Types
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Article
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  PDF Resource
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <BookOpenText className="h-4 w-4" />
                  Slide Deck
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Scroll className="h-4 w-4" />
                  Code Snippet
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <FlaskConical className="h-4 w-4" />
                  Interactive Demo
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
