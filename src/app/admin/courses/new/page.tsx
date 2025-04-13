"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MainNavbar } from "@/components/ui/MainNavbar"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Book,
  BookOpen,
  BookOpenText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  FlaskConical,
  GripVertical,
  Plus,
  Scroll,
  Settings,
  ShieldQuestion,
  Trash2,
  Upload,
  Video,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NewCoursePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basic")

  return (
    <>
      <MainNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-grow">
            <div className="mb-6 flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to Courses
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Create New Course</CardTitle>
                <CardDescription>
                  Fill in the details below to create a new course for the Luna
                  platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form id="course-form">
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="mb-6 grid w-full grid-cols-3">
                      <TabsTrigger value="basic">Basic Info</TabsTrigger>
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    {/* Basic Info Tab */}
                    <TabsContent value="basic" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">
                          Course Title <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="title"
                          name="title"
                          placeholder="e.g., Advanced JavaScript Techniques"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">
                          Description <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Provide a detailed description of the course"
                          rows={5}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="category">
                            Category <span className="text-red-500">*</span>
                          </Label>
                          <Select>
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Frontend">Frontend</SelectItem>
                              <SelectItem value="Backend">Backend</SelectItem>
                              <SelectItem value="Full Stack">
                                Full Stack
                              </SelectItem>
                              <SelectItem value="DevOps">DevOps</SelectItem>
                              <SelectItem value="Mobile">Mobile</SelectItem>
                              <SelectItem value="Data Science">
                                Data Science
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="level">
                            Difficulty Level{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <Select>
                            <SelectTrigger id="level">
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Intermediate">
                                Intermediate
                              </SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="hours">
                            Duration (hours){" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="hours"
                            name="hours"
                            type="number"
                            placeholder="e.g., 12"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="price">Price ($)</Label>
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            placeholder="e.g., 49.99"
                          />
                          <p className="text-xs text-muted-foreground">
                            Leave empty for free courses
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="instructor">
                          Instructor <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="instructor"
                          name="instructor"
                          placeholder="e.g., John Smith"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <div className="flex gap-2">
                          <Input
                            id="tagInput"
                            name="tagInput"
                            placeholder="e.g., JavaScript"
                          />
                          <Button type="button">Add</Button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            Tag
                            <button
                              type="button"
                              className="ml-1 rounded-full p-0.5 hover:bg-secondary"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="thumbnail">Course Thumbnail</Label>
                        <div className="flex items-center gap-4">
                          <div className="flex h-40 w-full max-w-xs flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
                            <div className="relative h-full w-full">
                              <img
                                src="/placeholder.svg"
                                alt="Thumbnail preview"
                                className="h-full w-full rounded-md object-cover"
                              />
                              <button
                                type="button"
                                className="absolute right-1 top-1 rounded-full bg-white p-1 shadow-sm hover:bg-gray-100"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </button>
                            </div>
                            <Upload className="mb-2 h-40 w-40 text-gray-400" />
                            <p className="text-center text-sm text-gray-500">
                              Drag & drop or click to upload
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                              Recommended: 1280×720px (16:9)
                            </p>
                            <input
                              type="file"
                              id="thumbnail"
                              className="hidden"
                              accept="image/*"
                            />
                          </div>
                          <Button type="button" variant="outline">
                            Upload Image
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Content Tab */}
                    <TabsContent value="content" className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Course Modules</h3>
                        <Button
                          type="button"
                          className="flex items-center gap-1"
                        >
                          <Plus className="h-4 w-4" />
                          Add Module
                        </Button>
                      </div>

                      <div className="space-y-6">
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
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                  <GripVertical className="h-4 w-4 text-muted-foreground hover:cursor-grab" />
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                </div>

                                <div className="flex flex-grow items-center gap-2">
                                  <Input
                                    className="flex-grow border bg-transparent p-4 shadow-none focus-visible:ring-0"
                                    placeholder="New Text Lesson"
                                    defaultValue="New Text Lesson"
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
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle className="flex items-center">
                                        <FileText className="mr-2 h-4 w-4" />
                                        Edit Text Lesson
                                      </DialogTitle>
                                      <DialogDescription>
                                        Configure the details and content of the
                                        lesson.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <Tabs
                                      defaultValue="details"
                                      className="w-full"
                                    >
                                      <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="details">
                                          Basic Details
                                        </TabsTrigger>
                                        <TabsTrigger value="content">
                                          Content
                                        </TabsTrigger>
                                        <TabsTrigger value="settings">
                                          Settings
                                        </TabsTrigger>
                                      </TabsList>
                                      <TabsContent value="details">
                                        <div className="grid gap-4 py-4">
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                              htmlFor="title"
                                              className="text-right"
                                            >
                                              Title
                                              <span className="ml-1 text-red-500">
                                                *
                                              </span>
                                            </Label>
                                            <Input
                                              id="title"
                                              placeholder="Lesson title"
                                              className="col-span-3"
                                            />
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                              htmlFor="type"
                                              className="text-right"
                                            >
                                              Type
                                            </Label>
                                            <Select>
                                              <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Text Lesson" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectGroup>
                                                  <SelectItem value="text">
                                                    Text Lesson
                                                  </SelectItem>
                                                  <SelectItem value="video">
                                                    Video
                                                  </SelectItem>
                                                  <SelectItem value="quiz">
                                                    Quiz
                                                  </SelectItem>
                                                  <SelectItem value="assignment">
                                                    Assignment
                                                  </SelectItem>
                                                  <SelectItem value="file">
                                                    File
                                                  </SelectItem>
                                                </SelectGroup>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                              htmlFor="duration"
                                              className="flex items-center justify-end"
                                            >
                                              Duration{" "}
                                              <Clock className="ml-2 h-4 w-4" />
                                            </Label>
                                            <Input
                                              id="duration"
                                              placeholder="0:00"
                                              className="col-span-3"
                                            />
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                              htmlFor="description"
                                              className="text-right"
                                            >
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
                                        <div className="grid gap-4 py-4">
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                              htmlFor="content"
                                              className="text-right"
                                            >
                                              Content
                                            </Label>
                                            <Textarea
                                              id="content"
                                              placeholder="Lesson content"
                                              className="col-span-3 min-h-[200px]"
                                            />
                                          </div>
                                        </div>
                                      </TabsContent>
                                      <TabsContent value="settings">
                                        <div className="grid gap-4 py-4">
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                              htmlFor="required"
                                              className="text-right"
                                            >
                                              Required
                                            </Label>
                                            <div className="col-span-3 flex items-center gap-2">
                                              <Switch id="required" />
                                              <Label
                                                htmlFor="required"
                                                className="text-sm"
                                              >
                                                Students must complete this
                                                lesson
                                              </Label>
                                            </div>
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                              htmlFor="visibility"
                                              className="text-right"
                                            >
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
                                                  <SelectItem value="draft">
                                                    Hidden (Draft)
                                                  </SelectItem>
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
                                      <Button type="submit">
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
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2"
                              >
                                <FileText className="h-4 w-4" />
                                Add Text Lesson
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2"
                              >
                                <Video className="h-4 w-4" />
                                Add Video
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2"
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
                      </div>
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings" className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="isPublished" className="text-base">
                              Publish Course
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Make this course available to students
                            </p>
                          </div>
                          <Switch id="isPublished" defaultChecked />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="requiresPrerequisites"
                              className="text-base"
                            >
                              Prerequisites
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Require completion of other courses
                            </p>
                          </div>
                          <Switch id="requiresPrerequisites" defaultChecked />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="allowComments"
                              className="text-base"
                            >
                              Allow Comments
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Let students comment on lessons
                            </p>
                          </div>
                          <Switch id="allowComments" defaultChecked />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="certificateEnabled"
                              className="text-base"
                            >
                              Enable Certificate
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Issue certificates upon completion
                            </p>
                          </div>
                          <Switch id="certificateEnabled" defaultChecked />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => router.push("/admin/courses")}
                >
                  Cancel
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">Save as Draft</Button>
                  <Button type="submit" form="course-form">
                    Create Course
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="sticky top-6 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden rounded-lg shadow-sm">
                    <div className="relative flex h-36 items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 p-6">
                      <BookOpen className="h-16 w-16 text-white/80" />
                      <div className="absolute left-4 top-4">
                        <Badge className="bg-white/90 text-blue-700 backdrop-blur-sm hover:bg-white">
                          Category
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-base font-semibold">Title</h3>
                        <Badge className="bg-white/90 text-blue-700 backdrop-blur-sm hover:bg-white">
                          Category
                        </Badge>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        Course description will appear here
                      </p>
                      <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />0 hours
                        </div>
                        <div className="flex items-center">
                          <span>General Patton</span>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        <Badge variant="outline">Tag</Badge>
                      </div>
                      <Button
                        className="mt-4 w-full"
                        variant="outline"
                        size="sm"
                      >
                        Coming soon
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>This is how your course will appear to students.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Publishing Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Add course title",
                      "Add description",
                      "Select category",
                      "Set difficulty level",
                      "Add course content",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-muted-foreground">
                          {index + 1}
                        </div>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
