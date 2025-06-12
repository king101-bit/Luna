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
import { GripVertical, FileText, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { useState } from "react"

export const VideoLesson = () => {
  const [platform, setPlatform] = useState<string>("YouTube")
  const [videoUrl, setVideoUrl] = useState<string>("")

  const platformPlaceholders = {
    YouTube: "https://www.youtube.com/watch=",
    Vimeo: "https://vimeo.com/",
    Other: "https://example.com/video/",
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
            defaultValue="New Video Lesson"
          />
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            className="w-16 border bg-transparent p-4 text-right text-muted-foreground shadow-none focus-visible:ring-0"
            placeholder="0:00"
            defaultValue="0:00"
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
          <DialogContent className="max-w-2xl overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base font-medium">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-500 p-1">
                  <Video className="h-4 w-4 text-white" />
                </div>
                Upload Video Lesson
              </DialogTitle>
              <DialogDescription>
                Configure the details and content for this lesson.{" "}
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
                      New Video Title
                      <span className="ml-1 text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder="Video Title"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Video Lesson" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="text">Text Lesson</SelectItem>
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
                    <div className="flex flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed border-gray-300 bg-white p-8 text-center">
                      <Video className="h-10 w-10 text-muted-foreground" />
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-black">
                          Upload Video
                        </h3>
                        <p className="text-sm font-medium text-muted-foreground">
                          Drag and drop your video file here or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Supported formats: MP4, MOV, AVI, WebM (max 500MB)
                        </p>
                      </div>
                      <Button variant="outline" className="mt-2">
                        Select Video
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="embed" className="pt-4">
                    <div className="items-center gap-4">
                      <Label htmlFor="title" className="mb-2">
                        Video Platform
                      </Label>
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
                    <div className="items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Video Url
                        <span className="ml-1 text-red-500">*</span>
                      </Label>
                      <Input
                        id="videoUrl"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder={
                          platformPlaceholders[
                            platform as keyof typeof platformPlaceholders
                          ]
                        }
                        className="col-span-3"
                      />
                      <span className="text-xs text-muted-foreground">
                        Paste a {platform} video URL or embed code
                      </span>
                    </div>
                    <Button className="mt-4 w-full bg-accent text-primary hover:bg-accent/75">
                      Add Embeded Video
                    </Button>
                  </TabsContent>
                  <p className="mt-4 text-sm text-muted-foreground">💡 Tips:</p>
                  <ol className="ml-6 mt-2 list-disc space-y-2">
                    <li className="text-xs text-muted-foreground">
                      For best quality, use MP4 format with H.264 codec{" "}
                    </li>
                    <li className="text-xs text-muted-foreground">
                      Recommended resolution: 1080p (1920x1080) or 720p
                      (1280x720){" "}
                    </li>
                    <li className="text-xs text-muted-foreground">
                      Keep videos under 15 minutes for better engagement{" "}
                    </li>
                    <li className="text-xs text-muted-foreground">
                      Add captions to improve accessibility{" "}
                    </li>
                  </ol>
                </Tabs>
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
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button type="submit">Cancel</Button>
              <Button
                type="submit"
                className="bg-accent text-primary hover:bg-accent/75"
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </>
  )
}
