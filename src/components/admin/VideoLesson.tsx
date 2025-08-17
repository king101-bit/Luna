"use client"
import { Settings, Trash2, Video, Upload, Link } from "lucide-react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { Textarea } from "../ui/textarea"
import { Input } from "../ui/input"
import { GripVertical, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { useState, useEffect } from "react"
import { createClient } from "@root/utils/supabase/client"
import { LessonFormValues } from "./CourseForm"
import { toast } from "sonner"

type LessonType = LessonFormValues

interface VideoLessonProps {
  lesson: LessonType
  onUpdate: (values: LessonFormValues) => void
  onRemove: () => void
}

export const VideoLesson = ({
  lesson,
  onUpdate,
  onRemove,
}: VideoLessonProps) => {
  const supabase = createClient()

  // Local state that syncs with the lesson prop
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState<LessonFormValues>({
    order_index: lesson.order_index || 1,
    title: lesson.title || "",
    type: "VIDEO",
    duration: lesson.duration || "0:00",
    description: lesson.description || "",
    content: lesson.content || "",
    required: lesson.required || false,
    visibility: lesson.visibility || "VISIBLE",
    submissionType: lesson.submissionType || "TEXT ENTRY",
    video_url: lesson.video_url || "",
    instructions: lesson.instructions || "",
    dueDate: lesson.dueDate || undefined,
    points: lesson.points || 0,
  })

  // Additional state for video-specific fields
  const [platform, setPlatform] = useState<string>("YouTube")
  const [isUploading, setIsUploading] = useState(false)

  // Sync formData with lesson prop when it changes
  useEffect(() => {
    setFormData({
      order_index: lesson.order_index || 1,
      title: lesson.title || "",
      type: "VIDEO",
      duration: lesson.duration || "0:00",
      description: lesson.description || "",
      content: lesson.content || "",
      required: lesson.required || false,
      visibility: lesson.visibility || "VISIBLE",
      submissionType: lesson.submissionType || "TEXT ENTRY",
      video_url: lesson.video_url || "",
      instructions: lesson.instructions || "",
      dueDate: lesson.dueDate || undefined,
      points: lesson.points || 0,
    })
  }, [lesson])

  const platformPlaceholders = {
    YouTube: "https://www.youtube.com/watch?v=",
    Vimeo: "https://vimeo.com/",
    Other: "https://example.com/video/",
  }

  const handleFormChange = (field: keyof LessonFormValues, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    // Validate required fields
    if (!formData.title.trim()) {
      toast.error("Please enter a lesson title")
      return
    }

    // Validate duration format
    const durationRegex = /^\d{1,2}:\d{2}$/
    if (!durationRegex.test(formData.duration)) {
      toast.error("Duration must be in format MM:SS or M:SS")
      return
    }

    // Update the parent component
    onUpdate(formData)
    setIsDialogOpen(false)
    toast.success("Video lesson updated successfully")
  }

  const handleVideoUpload = async (file: File) => {
    if (!file) return

    setIsUploading(true)
    try {
      // Validate file size (max 500MB)
      if (file.size > 500 * 1024 * 1024) {
        toast.error("File size must be less than 500MB")
        return
      }

      const fileExt = file.name.split(".").pop()
      const fileName = `videos/${Date.now()}.${fileExt}`

      const { data, error } = await supabase.storage
        .from("course-assets")
        .upload(fileName, file)

      if (error) {
        console.error("Upload error:", error)
        toast.error("Failed to upload video")
        return
      }

      const { data: publicUrlData } = supabase.storage
        .from("course-assets")
        .getPublicUrl(fileName)

      const publicUrl = publicUrlData?.publicUrl
      if (publicUrl) {
        handleFormChange("video_url", publicUrl)
        toast.success("Video uploaded successfully")
      }
    } catch (error) {
      console.error("Error uploading video:", error)
      toast.error("Failed to upload video")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground hover:cursor-grab" />
          <Video className="h-4 w-4 text-muted-foreground" />
        </div>

        <div className="flex flex-grow items-center gap-2">
          <Input
            className="flex-grow border bg-transparent p-4 shadow-none focus-visible:ring-0"
            placeholder="New Video Lesson"
            value={formData.title}
            onChange={(e) => handleFormChange("title", e.target.value)}
            onBlur={() => onUpdate(formData)} // Auto-save on blur
          />
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            className="w-16 border bg-transparent p-4 text-right text-muted-foreground shadow-none focus-visible:ring-0"
            placeholder="0:00"
            value={formData.duration}
            onChange={(e) => handleFormChange("duration", e.target.value)}
            onBlur={() => onUpdate(formData)} // Auto-save on blur
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

          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base font-medium">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-500 p-1">
                  <Video className="h-4 w-4 text-white" />
                </div>
                Edit Video Lesson
              </DialogTitle>
              <DialogDescription>
                Configure the details and content for this video lesson.
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Basic Details</TabsTrigger>
                <TabsTrigger value="content">Video Content</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Video Title
                      <span className="ml-1 text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder="Enter video title"
                      className="col-span-3"
                      value={formData.title}
                      onChange={(e) =>
                        handleFormChange("title", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        handleFormChange("type", value as any)
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="VIDEO">Video</SelectItem>
                          <SelectItem value="TEXT">Text Lesson</SelectItem>
                          <SelectItem value="QUIZ">Quiz</SelectItem>
                          <SelectItem value="ASSIGNMENT">Assignment</SelectItem>
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
                      placeholder="5:30"
                      className="col-span-3"
                      value={formData.duration}
                      onChange={(e) =>
                        handleFormChange("duration", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the lesson"
                      className="col-span-3"
                      value={formData.description}
                      onChange={(e) =>
                        handleFormChange("description", e.target.value)
                      }
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="content">
                <Tabs defaultValue="upload" className="mt-4">
                  <TabsList className="grid h-full w-full grid-cols-2">
                    <TabsTrigger value="upload">
                      <Upload className="mr-2 h-4 w-4" /> Upload Video
                    </TabsTrigger>
                    <TabsTrigger value="embed">
                      <Link className="mr-2 h-4 w-4" /> Embed Video
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload" className="pt-4">
                    <div
                      className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed border-gray-300 bg-white p-8 text-center transition-colors hover:border-gray-400 ${
                        isUploading ? "pointer-events-none opacity-50" : ""
                      }`}
                      onClick={() => {
                        if (!isUploading) {
                          document.getElementById("video-upload-input")?.click()
                        }
                      }}
                    >
                      <Video className="h-10 w-10 text-muted-foreground" />
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-black">
                          {isUploading ? "Uploading..." : "Upload Video"}
                        </h3>
                        <p className="text-sm font-medium text-muted-foreground">
                          {isUploading
                            ? "Please wait while your video uploads"
                            : "Drag and drop your video file here or click to browse"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Supported formats: MP4, MOV, AVI, WebM (max 500MB)
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="mt-2"
                        disabled={isUploading}
                      >
                        {isUploading ? "Uploading..." : "Select Video"}
                      </Button>
                      <input
                        id="video-upload-input"
                        type="file"
                        accept="video/*"
                        hidden
                        disabled={isUploading}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleVideoUpload(file)
                          }
                        }}
                      />
                    </div>

                    {formData.video_url && (
                      <div className="mt-4">
                        <video
                          controls
                          src={formData.video_url}
                          className="w-full rounded-md border"
                        />
                        <div className="mt-2 text-sm text-green-600">
                          ✓ Video uploaded successfully
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="embed" className="pt-4">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="platform">Video Platform</Label>
                        <Select value={platform} onValueChange={setPlatform}>
                          <SelectTrigger id="platform">
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="YouTube">YouTube</SelectItem>
                            <SelectItem value="Vimeo">Vimeo</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="videoUrl">
                          Video URL
                          <span className="ml-1 text-red-500">*</span>
                        </Label>
                        <Input
                          id="videoUrl"
                          value={formData.video_url}
                          onChange={(e) =>
                            handleFormChange("video_url", e.target.value)
                          }
                          placeholder={
                            platformPlaceholders[
                              platform as keyof typeof platformPlaceholders
                            ]
                          }
                        />
                        <span className="text-xs text-muted-foreground">
                          Paste a {platform} video URL
                        </span>
                      </div>

                      {formData.video_url && (
                        <div className="mt-2 text-sm text-green-600">
                          ✓ Video URL added
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <div className="mt-4 rounded-lg bg-blue-50 p-4">
                    <p className="mb-2 text-sm font-medium text-blue-800">
                      💡 Video Tips:
                    </p>
                    <ul className="space-y-1 text-xs text-blue-700">
                      <li>
                        • For best quality, use MP4 format with H.264 codec
                      </li>
                      <li>
                        • Recommended resolution: 1080p (1920x1080) or 720p
                        (1280x720)
                      </li>
                      <li>
                        • Keep videos under 15 minutes for better engagement
                      </li>
                      <li>• Add captions to improve accessibility</li>
                    </ul>
                  </div>
                </Tabs>
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
                        checked={formData.required}
                        onCheckedChange={(checked) =>
                          handleFormChange("required", checked)
                        }
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
                    <Select
                      value={formData.visibility}
                      onValueChange={(value) =>
                        handleFormChange("visibility", value as any)
                      }
                    >
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

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="points" className="text-right">
                      Points
                    </Label>
                    <Input
                      id="points"
                      type="number"
                      min="0"
                      className="col-span-3"
                      value={formData.points}
                      onChange={(e) =>
                        handleFormChange(
                          "points",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="instructions" className="text-right">
                      Instructions
                    </Label>
                    <Textarea
                      id="instructions"
                      placeholder="Additional instructions for students"
                      className="col-span-3"
                      value={formData.instructions}
                      onChange={(e) =>
                        handleFormChange("instructions", e.target.value)
                      }
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Save Changes
              </Button>
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
