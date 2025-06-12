import { Settings, Trash2, GripVertical, FileText, Clock } from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import { Button } from "./button"
import { Input } from "./input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LessonSchema } from "../admin/CourseForm"

export const TextLesson = ({
  lesson,
  onUpdate,
  onRemove,
}: {
  lesson: any
  onUpdate: (values: any) => void
  onRemove: () => void
}) => {
  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(LessonSchema),
    defaultValues: lesson,
  })

  const onSubmit = (data: any) => {
    onUpdate(data)
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground hover:cursor-grab" />
          <FileText className="h-4 w-4 text-muted-foreground" />
        </div>

        <div className="flex flex-grow items-center gap-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-grow items-center gap-2"
          >
            <Input
              className="flex-grow border bg-transparent p-4 shadow-none focus-visible:ring-0"
              placeholder="New Text Lesson"
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
          </form>
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
                <FileText className="mr-2 h-4 w-4" />
                Edit Text Lesson
              </DialogTitle>
              <DialogDescription>
                Configure the details and content of the lesson.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Basic Details</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select {...register("type")} defaultValue={watch("type")}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Text Lesson" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="TEXT">Text Lesson</SelectItem>
                          <SelectItem value="VIDEO">Video</SelectItem>
                          <SelectItem value="QUIZ">Quiz</SelectItem>
                          <SelectItem value="ASSIGNMENT">Assignment</SelectItem>
                          <SelectItem value="FILE">File</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Lesson description"
                      className="col-span-3"
                      {...register("description")}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="content">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="content" className="text-right">
                      Content
                    </Label>
                    <Textarea
                      id="content"
                      placeholder="Lesson content"
                      className="col-span-3 min-h-[200px]"
                      {...register("content")}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="settings">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="required" className="text-right">
                      Required
                    </Label>
                    <div className="col-span-3 flex items-center gap-2">
                      <Switch id="required" {...register("required")} />
                      <Label htmlFor="required" className="text-sm">
                        Students must complete this lesson
                      </Label>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="visibility" className="text-right">
                      Visibility
                    </Label>
                    <Select {...register("visibility")}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Visible to all students" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="VISIBLE">
                            Visible to all students
                          </SelectItem>
                          <SelectItem value="DRAFT">Hidden (Draft)</SelectItem>
                          <SelectItem value="SCHEDULED">
                            Scheduled Release
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
