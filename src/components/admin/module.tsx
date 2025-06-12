import {
  GripVertical,
  ChevronRight,
  Trash2,
  FileText,
  Video,
  ShieldQuestion,
  Book,
  CircleHelp,
  ChevronDown,
  Clock,
  Settings,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useForm, useFormContext } from "react-hook-form"
import { useState } from "react"
import { TextLesson } from "@/components/ui/TextLesson"
import { VideoLesson } from "@/components/admin/VideoLesson"
import { QuizLesson } from "@/components/ui/QuizLesson"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { formSchema, FormValues } from "./CourseForm"

export function ModuleForm({
  module,
  moduleIndex,
  form,
}: {
  module: (typeof formSchema._type)["modules"][number]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  moduleIndex: number
  form: any
}) {
  const { control, watch, setValue } = form
  const modules = watch("modules")

  const handleAddLesson = (type: string) => {
    const baseLesson = {
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Lesson`,
      type,
      order_index: module.lessons.length + 1,
      duration: 0,
      description: "",
      required: false,
      visibility: "VISIBLE",
    }

    // Type-specific defaults
    const lessonDefaults = {
      text: {
        ...baseLesson,
        content: "",
      },
      video: {
        ...baseLesson,
        platform: "YouTube",
        videoUrl: "",
        uploadStatus: "pending",
      },
      quiz: {
        ...baseLesson,
        passingScore: 70,
        timeLimit: 30,
        maxAttempts: 2,
        questions: [],
      },
      assignment: {
        ...baseLesson,
        instructions: "",
        submissionType: "text",
        dueDate: null,
        points: 100,
      },
    }

    const newLesson =
      lessonDefaults[type as keyof typeof lessonDefaults] || baseLesson

    const updatedModules = [...modules]
    updatedModules[moduleIndex].lessons.push(newLesson)
    setValue("modules", updatedModules)
  }

  const handleRemoveLesson = (lessonIndex: number) => {
    const updatedModules = [...modules]
    updatedModules[moduleIndex].lessons.splice(lessonIndex, 1)
    setValue("modules", updatedModules)
  }

  const handleModuleChange = (field: string, value: string) => {
    const updatedModules = [...modules]
    updatedModules[moduleIndex][field] = value
    setValue("modules", updatedModules)
  }

  const handleRemoveModule = () => {
    const updatedModules = modules.filter(
      (_module: any, idx: number) => idx !== moduleIndex
    )
    setValue("modules", updatedModules)
  }

  const handleLessonUpdate = (lessonIndex: number, updatedLesson: any) => {
    const updatedModules = [...modules]
    updatedModules[moduleIndex].lessons[lessonIndex] = updatedLesson
    setValue("modules", updatedModules)
  }

  return (
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
              value={module.title}
              onChange={(e) => handleModuleChange("title", e.target.value)}
              placeholder="Module Title"
            />
            <Textarea
              className="min-h-0 resize-none border p-4 text-sm text-muted-foreground shadow-none focus-visible:ring-0"
              placeholder="Module description (optional)"
              value={module.description}
              onChange={(e) =>
                handleModuleChange("description", e.target.value)
              }
            />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-destructive hover:bg-destructive/10"
            onClick={handleRemoveModule}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground">Lessons</h2>
          {module.lessons?.map((lesson, lessonIndex: number) => {
            switch (lesson.type) {
              case "TEXT":
                return (
                  <TextLesson
                    key={lessonIndex}
                    lesson={lesson}
                    onUpdate={(updatedLesson) =>
                      handleLessonUpdate(lessonIndex, updatedLesson)
                    }
                    onRemove={() => handleRemoveLesson(lessonIndex)}
                  />
                )
              case "VIDEO":
                return (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  <VideoLesson
                    key={lessonIndex}
                    // lesson={lesson}
                    // onUpdate={(updatedLesson) =>
                    //   handleLessonUpdate(lessonIndex, updatedLesson)
                    // }
                    // onRemove={() => handleRemoveLesson(lessonIndex)}
                  />
                )
              case "QUIZ":
                return (
                  <QuizLesson
                    key={lessonIndex}
                    // lesson={lesson}
                    // onUpdate={(updatedLesson) =>
                    //   handleLessonUpdate(lessonIndex, updatedLesson)
                    // }
                    // onRemove={() => handleRemoveLesson(lessonIndex)}
                  />
                )
              case "ASSIGNMENT":
                return (
                  <AssignmentLesson
                    key={lessonIndex}
                    lesson={lesson}
                    onUpdate={(updatedLesson) =>
                      handleLessonUpdate(lessonIndex, updatedLesson)
                    }
                    onRemove={() => handleRemoveLesson(lessonIndex)}
                  />
                )
              default:
                return null
            }
          })}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => handleAddLesson("text")}
          >
            <FileText className="h-4 w-4" />
            Add Text Lesson
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => handleAddLesson("video")}
          >
            <Video className="h-4 w-4" />
            Add Video
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => handleAddLesson("quiz")}
          >
            <ShieldQuestion className="h-4 w-4" />
            Add Quiz
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => handleAddLesson("assignment")}
          >
            <Book className="h-4 w-4" />
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
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => handleAddLesson("article")}
              >
                <FileText className="h-4 w-4" />
                Article
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => handleAddLesson("pdf")}
              >
                <FileText className="h-4 w-4" />
                PDF Resource
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => handleAddLesson("demo")}
              >
                <CircleHelp className="h-4 w-4" />
                Interactive Demo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

// AssignmentLesson Component
const AssignmentLesson = ({
  lesson,
  onUpdate,
  onRemove,
}: {
  lesson: (typeof formSchema._type)["modules"][number]["lessons"][number]
  onUpdate: (values: any) => void
  onRemove: () => void
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { register, handleSubmit, control } = useForm({
    defaultValues: lesson,
  })

  const onSubmit = (data: any) => {
    onUpdate(data)
    setIsDialogOpen(false)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <GripVertical className="h-4 w-4 text-muted-foreground hover:cursor-grab" />
        <Book className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="flex flex-grow items-center gap-2">
        <Input
          className="flex-grow border bg-transparent p-4 shadow-none focus-visible:ring-0"
          placeholder="New Assignment"
          {...register("title")}
        />
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          className="w-16 border bg-transparent p-4 text-right text-muted-foreground shadow-none focus-visible:ring-0"
          placeholder="0:00"
          {...register("duration")}
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Book className="mr-2 h-4 w-4" />
              Edit Assignment
            </DialogTitle>
            <DialogDescription>
              Configure the details and requirements for this assignment.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                  <span className="ml-1 text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Assignment Title"
                  className="col-span-3"
                  {...register("title")}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="points" className="text-right">
                  Points
                </Label>
                <Input
                  id="points"
                  type="number"
                  className="col-span-3"
                  {...register("points")}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="instructions" className="text-right">
                  Instructions
                </Label>
                <Textarea
                  id="instructions"
                  placeholder="Detailed assignment instructions"
                  className="col-span-3 min-h-[200px]"
                  {...register("instructions")}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="submissionType" className="text-right">
                  Submission Type
                </Label>
                <Select
                  {...register("submissionType")}
                  defaultValue={lesson.submissionType}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select submission type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TEXT ENTRY">Text Entry</SelectItem>
                    <SelectItem value="FILE UPLOAD">File Upload</SelectItem>
                    <SelectItem value="BOTH">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="text-destructive hover:bg-destructive/10"
        onClick={onRemove}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
