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
  SelectItem,
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
  const [activeTab, setActiveTab] = useState("basic") // State for active tab

  return (
    <div>
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
                    className="w-full"
                    value={activeTab} // Controlled tab value
                    onValueChange={setActiveTab}
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
                          <p className="text-xs text-gray-500">
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
                          <Badge className="flex items-center gap-1 bg-purple-100 text-purple-800 hover:bg-purple-200">
                            Tag
                            <button
                              type="button"
                              className="ml-1 rounded-full p-0.5 hover:bg-purple-200"
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
                                src={"/placeholder.svg"}
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
                              {/* Drag handle and chevron */}
                              <div className="flex h-10 items-center gap-1 pt-1">
                                <GripVertical className="h-5 w-5 text-gray-400 hover:cursor-grab" />
                                <ChevronRight className="h-5 w-5 text-gray-400 hover:cursor-pointer" />
                              </div>

                              {/* Title and description container */}
                              <div className="flex flex-grow flex-col gap-1">
                                <Input
                                  className="border-0 p-0 text-base font-medium shadow-none focus-visible:ring-0"
                                  defaultValue="Getting Started"
                                  placeholder="Module Title"
                                />
                                <Textarea
                                  className="min-h-0 resize-none border p-0 text-sm text-gray-500 shadow-none focus-visible:ring-0"
                                  placeholder=" Module description (optional)"
                                  defaultValue="Module description (optional)"
                                />
                              </div>

                              {/* Delete button */}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:bg-red-50 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Lessons Section */}
                            <div className="space-y-3">
                              <h2 className="text-sm font-medium text-gray-300">
                                Lessons
                              </h2>
                              <div className="flex items-center gap-2">
                                {/* Drag handle and document icon */}
                                <div className="flex items-center gap-2">
                                  <GripVertical className="h-4 w-4 text-gray-400 hover:cursor-grab" />
                                  <FileText className="h-4 w-4 text-gray-400" />
                                </div>

                                {/* Lesson title and duration */}
                                <div className="flex flex-grow items-center gap-2">
                                  <Input
                                    className="flex-grow border bg-transparent p-0 text-gray-100 shadow-none focus-visible:ring-0"
                                    placeholder="New Text Lesson"
                                    defaultValue="New Text Lesson"
                                  />
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                  </div>
                                  <Input
                                    className="w-16 border bg-transparent p-0 text-right text-gray-400 shadow-none focus-visible:ring-0"
                                    placeholder="0:00"
                                    defaultValue="0:00"
                                  />
                                </div>

                                {/* Action buttons */}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-400"
                                >
                                  <Settings className="h-4 w-4" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Content Type Buttons */}
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="border hover:text-gray-200"
                              >
                                <FileText className="h-4 w-4" />
                                Add Text Lesson
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="border hover:text-gray-200"
                              >
                                <Video className="h-4 w-4" />
                                Add Video
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="border hover:text-gray-200"
                              >
                                <ShieldQuestion className="h-4 w-4" />
                                Add Quiz
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="border hover:text-gray-200"
                              >
                                <FileText className="h-4 w-4" />
                                Add Assignment
                              </Button>

                              {/* Dropdown Menu */}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="border hover:text-gray-200"
                                  >
                                    More Content Types
                                    <ChevronDown className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="min-w-[10rem] border sm:min-w-[12rem]"
                                >
                                  <DropdownMenuItem className="max-w-[200px] sm:max-w-none">
                                    <Book className="mr-2 h-4 w-4" />
                                    Article
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="max-w-[200px] sm:max-w-none">
                                    <FileText className="mr-2 h-4 w-4" />
                                    PDF Resource
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="max-w-[200px] sm:max-w-none">
                                    <BookOpenText className="mr-2 h-4 w-4" />
                                    Slide Deck
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="">
                                    <Scroll className="mr-2 h-4 w-4" />
                                    Code Snippet
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="">
                                    <FlaskConical className="mr-2 h-4 w-4" />
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
                            <p className="text-sm text-gray-500">
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
                            <p className="text-sm text-gray-500">
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
                            <p className="text-sm text-gray-500">
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
                            <p className="text-sm text-gray-500">
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
                  <Button
                    type="submit"
                    form="course-form"
                    className="min-w-[120px]"
                  >
                    Create Course
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="sticky top-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden rounded-lg shadow-sm">
                    {/* Course header with icon and category */}
                    <div className="relative flex h-36 items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 p-6">
                      <BookOpen className="h-16 w-16 text-white/80" />

                      <div className="absolute left-4 top-4">
                        <Badge className="bg-white/90 text-blue-700 backdrop-blur-sm hover:bg-white">
                          Category{" "}
                        </Badge>
                      </div>
                    </div>

                    {/* Course content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-base font-semibold text-primary">
                          Title{" "}
                        </h3>
                        <Badge className="bg-white/90 text-blue-700 backdrop-blur-sm hover:bg-white">
                          Category{" "}
                        </Badge>
                      </div>

                      <p className="mt-2 line-clamp-2 text-xs text-gray-400">
                        Course description will appear here
                      </p>

                      <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />0 hours
                        </div>
                        <div className="flex items-center">
                          <span>General Patton</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        <Badge
                          variant="outline"
                          className="bg-gray-400 text-xs"
                        >
                          Tag{" "}
                        </Badge>
                      </div>

                      {/* Action button */}
                      <Button
                        className="mt-4 w-full"
                        variant="outline"
                        size="sm"
                      >
                        Coming soon{" "}
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-500">
                    <p>This is how your course will appear to students.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader className="pb-3">
                  <CardTitle>Publishing Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        1
                      </div>
                      <span className="text-gray-400">Add course title</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        2
                      </div>
                      <span className="text-gray-400">Add description</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        3
                      </div>
                      <span className="text-gray-400">Select category</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        4
                      </div>
                      <span className="text-gray-400">
                        Set difficulty level
                      </span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        5
                      </div>
                      <span className="text-gray-400">Add course content</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
