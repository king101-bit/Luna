"use client"

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
import { Settings, Trash2, GripVertical, FileText, Clock } from "lucide-react"
import { useState } from "react"
import Tiptap from "../Tiptap"

export const TextLesson = ({
  lesson,
  onUpdate,
  onRemove,
}: {
  lesson: any
  onUpdate: (values: any) => void
  onRemove: () => void
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [title, setTitle] = useState(lesson.title || "")
  const [duration, setDuration] = useState(lesson.duration || "")
  const [description, setDescription] = useState(lesson.description || "")
  const [content, setContent] = useState(lesson.content || "")
  const [required, setRequired] = useState(lesson.required || false)
  const [visibility, setVisibility] = useState(lesson.visibility || "VISIBLE")

  const handleSave = () => {
    onUpdate({
      ...lesson,
      title,
      duration,
      description,
      content,
      required,
      visibility,
    })
    setIsDialogOpen(false)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <GripVertical className="h-4 w-4 text-muted-foreground hover:cursor-grab" />
        <FileText className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="flex flex-grow items-center gap-2">
        <Input
          className="flex-grow border bg-transparent p-4 shadow-none focus-visible:ring-0"
          placeholder="New Text Lesson"
          value={title}
          readOnly
        />
        <Clock className="h-4 w-4 text-muted-foreground" />
        <Input
          className="w-16 border bg-transparent p-4 text-right text-muted-foreground shadow-none focus-visible:ring-0"
          placeholder="0:00"
          value={duration}
          readOnly
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
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Lesson title"
                    className="col-span-3"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duration (minutes)
                  </Label>
                  <Input
                    id="duration"
                    type="text"
                    placeholder="0:00"
                    className="col-span-3"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                  <div className="col-span-3">
                    <Tiptap value={content} onChange={setContent} />
                  </div>
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
                    <Switch
                      id="required"
                      checked={required}
                      onCheckedChange={setRequired}
                    />
                    <Label htmlFor="required" className="text-sm">
                      Students must complete this lesson
                    </Label>
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="visibility" className="text-right">
                    Visibility
                  </Label>
                  <Select value={visibility} onValueChange={setVisibility}>
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
            <Button onClick={handleSave}>Save changes</Button>
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
  )
}
