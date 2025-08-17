import { CircleHelp, GripVertical, Clock, Settings, Trash2 } from "lucide-react"
import { Button } from "./button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import { Label } from "./label"
import { Switch } from "./switch"
import { Textarea } from "./textarea"
import { Input } from "./input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import Link from "next/link"

export const QuizLesson = ({
  lesson,
  onUpdate,
  onRemove,
}: {
  lesson: any
  onUpdate: (values: any) => void
  onRemove: () => void
}) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground hover:cursor-grab" />
          <CircleHelp className="h-4 w-4 text-muted-foreground" />
        </div>

        <div className="flex flex-grow items-center gap-2">
          <Input
            className="flex-grow border bg-transparent p-4 shadow-none focus-visible:ring-0"
            placeholder="New Quiz Lesson"
            value={lesson.title}
            onChange={(e) => onUpdate({ ...lesson, title: e.target.value })}
          />
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            className="w-16 border bg-transparent p-4 text-right text-muted-foreground shadow-none focus-visible:ring-0"
            placeholder="0:00"
            value={lesson.duration}
            onChange={(e) => onUpdate({ ...lesson, duration: e.target.value })}
          />
        </div>

        <Dialog>
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
                <CircleHelp className="mr-2 h-4 w-4" />
                Edit Quiz Lesson
              </DialogTitle>
              <DialogDescription>
                Configure the details and content of the lesson.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Basic Details</TabsTrigger>
                <TabsTrigger value="quizquestion">Quiz Questions</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                      <span className="ml-1 text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder="New Quiz Lesson"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Quiz" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="text">Text Lesson</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="quiz">Quiz</SelectItem>
                          <SelectItem value="assignment">Assignment</SelectItem>
                          <SelectItem value="file">File</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="duration"
                      className="flex items-center justify-end"
                    >
                      Duration <Clock className="ml-2 h-4 w-4" />
                    </Label>
                    <Input
                      id="duration"
                      placeholder="0:00"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Lesson description"
                      className="col-span-3"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="quizquestion">
                <div className="mt-5 flex flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed border-gray-300 bg-white p-8 text-center">
                  <CircleHelp className="h-10 w-10 text-purple-600" />
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-black">
                      Quiz Editor
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground">
                      Create and manage quiz questions, set passing scores, and
                      configure feedback options.{" "}
                    </p>
                  </div>
                  <Link href="/admin/quizzes/new">
                    <Button className="mt-2 bg-accent text-primary hover:bg-accent/75">
                      Open Quiz Editor
                    </Button>
                  </Link>
                </div>
              </TabsContent>
              <TabsContent value="settings">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="required" className="text-right">
                      Required
                    </Label>
                    <div className="col-span-3 flex items-center gap-2">
                      <Switch id="required" />
                      <Label htmlFor="required" className="text-sm">
                        Students must complete this lesson
                      </Label>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="visibility" className="text-right">
                      Visibility
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Visible to all students" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="visible">
                            Visible to all students
                          </SelectItem>
                          <SelectItem value="draft">Hidden (Draft)</SelectItem>
                          <SelectItem value="scheduled">
                            Scheduled Release
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="passingScore" className="text-right">
                      Passing Score
                    </Label>
                    <div className="col-span-3 flex items-center gap-2">
                      <Input
                        id="passingScore"
                        placeholder="50"
                        className="max-w-20"
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>

                    <Label htmlFor="timeLimit" className="text-right">
                      Time Limit
                    </Label>
                    <div className="col-span-3 flex items-center gap-2">
                      <Input
                        id="timeLimit"
                        placeholder="30"
                        className="max-w-20"
                      />
                      <span className="text-sm text-muted-foreground">
                        minutes
                      </span>
                    </div>

                    <Label htmlFor="attempts" className="text-right">
                      Attempts
                    </Label>
                    <div className="col-span-3 flex items-center gap-2">
                      <Input
                        id="attempts"
                        placeholder="2"
                        className="max-w-20"
                      />
                      <span className="text-sm text-muted-foreground">
                        attempts allowed
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
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
    </>
  )
}
