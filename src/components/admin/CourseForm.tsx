"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Upload,
  ChevronsUpDown,
  Check,
  X,
} from "lucide-react"
import { ModuleForm } from "@/components/admin/module"
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Category } from "@root/global"
import { Instrument_Sans } from "next/font/google"
import { createClient } from "@root/utils/supabase/client"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command"
import { cn } from "@/lib/utils"

// Types for the lesson type options
export const LESSON_TYPES = ["TEXT", "VIDEO", "QUIZ", "ASSIGNMENT"] as const

export const VISIBILITY_OPTIONS = ["VISIBLE", "DRAFT", "SCHEDULED"] as const

// Zod schema for the text lesson
export const LessonSchema = z.object({
  order_index: z.number().int(),
  title: z.string().min(1, "Title is required"),
  type: z.enum(LESSON_TYPES).default("TEXT"),
  duration: z.string().regex(/^\d+:\d{2}$/, "Duration must be in format MM:SS"),
  description: z.string().optional(),
  content: z.string().optional(),
  required: z.boolean().default(false),
  visibility: z.enum(VISIBILITY_OPTIONS).default("VISIBLE"),
  submissionType: z
    .enum(["TEXT ENTRY", "FILE UPLOAD", "BOTH"])
    .default("TEXT ENTRY"),
  instructions: z.string().optional(),
  dueDate: z.date().optional(),
  points: z.number().min(0, "Points must be a positive number").default(0),
})

// Type derived from the schema
export type LessonFormValues = z.infer<typeof LessonSchema>

// Props for the component including state management
export interface LessonProps {
  initialData?: Partial<LessonFormValues>
  onUpdate: (values: LessonFormValues) => void
  onDelete?: () => void
}
export const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  level: z.string().min(1, "Level is required"),
  hours: z.number().min(1, "Duration must be at least 1 hour"),
  price: z.number().min(0).optional(),
  instructor: z.string().min(2, "Instructor name is required"),
  tags: z
    .array(
      z.object({
        name: z.string().min(1, "Tag name is required"),
        id: z.string().optional(), // Assuming tags can have an ID, adjust as needed
      })
    )
    .optional(),
  thumbnail: z.any().optional(),
  isPublished: z.boolean().default(false),
  requiresPrerequisites: z.boolean().default(false),
  allowComments: z.boolean().default(true),
  certificateEnabled: z.boolean().default(true),
  modules: z.array(
    z.object({
      order_index: z
        .number()
        .int()
        .min(1, "Order index must be a positive integer"),
      title: z.string().min(2, "Module title is required"),
      description: z.string().min(10, "Module description is required"),
      lessons: z.array(LessonSchema).default([]),
    })
  ),
})

export type FormValues = z.infer<typeof formSchema>

export default function CourseForm({
  categories,
  loading,
}: {
  categories: Category[] | null
  loading: boolean
}) {
  const [currentStep, setCurrentStep] = useState(1)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      level: "",
      hours: 0,
      price: 0,
      instructor: "",
      tags: [],
      isPublished: false,
      requiresPrerequisites: false,
      allowComments: true,
      certificateEnabled: true,
      modules: [],
    },
  })

  const { watch, setValue, getValues } = form
  const formValues = watch()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState<{ id: string; name: string }[]>([])

  useEffect(() => {
    const fetchTags = async () => {
      const { data, error } = await supabase.from("tags").select("*")
      console.log("Fetched tags:", data)
      if (error) {
        console.error("Error fetching tags:", error)
      } else {
        setTags(data || [])
      }
    }
    fetchTags()
  }, [])

  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Form submitted:", data)
      const fetchCourses = async () => {
        try {
          setIsLoading(true)
          const { data: response, error } = await supabase
            .from("courses")
            .insert([
              {
                title: data.title,
                description: data.description,
                category: data.category,
                level: data.level,
                hours: data.hours,
                price: data.price,
                instructor: data.instructor,
                tags: data.tags,
                // thumbnail: data.thumbnail, // Assuming thumbnail is a file object
                is_published: data.isPublished,
                requires_prerequisites: data.requiresPrerequisites,
                allow_comments: data.allowComments,
                certificate_enabled: data.certificateEnabled,
                modules: data.modules.map((module) => ({
                  order_index: module.order_index,
                  title: module.title,
                  description: module.description,
                  lessons: module.lessons.map((lesson) => ({
                    order_index: lesson.order_index,
                    title: lesson.title,
                    type: lesson.type, // Assuming type is a string
                    duration: lesson.duration,
                    description: lesson.description,
                    content: lesson.content,
                    required: lesson.required,
                    visibility: lesson.visibility,
                    submission_type: lesson.submissionType,
                    instructions: lesson.instructions,
                    due_date: lesson.dueDate
                      ? lesson.dueDate.toISOString()
                      : null,
                    points: lesson.points,
                  })),
                })),
              },
            ])
          console.log(response)
          if (error) throw error
          if (!data) {
            return
          }
          // setCourses(data)
        } catch (error) {
          console.error("Error Fetching Courses:", error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchCourses()
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setValue("thumbnail", file)
      setThumbnailPreview(URL.createObjectURL(file))
    }
  }

  const handleAddModule = () => {
    const newModule = {
      order_index: getValues("modules").length + 1,
      title: "",
      description: "",
      lessons: [],
    }
    setValue("modules", [...getValues("modules"), newModule])
  }

  const handleNext = async () => {
    // Validate current step before proceeding
    let isValid = true
    if (currentStep === 1) {
      isValid = await form.trigger([
        "title",
        "description",
        "category",
        "level",
      ])
    } else if (currentStep === 2) {
      // Validate modules if needed
    }

    if (isValid) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Step indicators */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep === step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of 3
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Course Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Advanced JavaScript Techniques"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a detailed description of the course"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Category <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Difficulty Level <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Duration (hours) <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 12"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (&#8358;)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 49.99"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-muted-foreground">
                      Leave empty for free courses
                    </p>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="instructor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Instructor <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          {(field.value?.length ?? 0) > 0
                            ? `${field.value?.length} tags selected`
                            : "Select tags"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search tags..." />
                          <CommandEmpty>No tags found.</CommandEmpty>
                          <CommandGroup>
                            {tags.map((tag) => (
                              <CommandItem
                                key={tag.id}
                                onSelect={() => {
                                  const currentValue = field.value ?? []
                                  const isSelected = currentValue.some(
                                    (selectedTag) =>
                                      selectedTag.name === tag.name
                                  )
                                  const newValue = isSelected
                                    ? currentValue.filter(
                                        (selectedTag) =>
                                          selectedTag.name !== tag.name
                                      )
                                    : [
                                        ...currentValue,
                                        { name: tag.name, id: tag.id },
                                      ]
                                  field.onChange(newValue)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    (field.value ?? []).some(
                                      (selectedTag) =>
                                        selectedTag.name === tag.name
                                    )
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {tag.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                  {(field.value?.length ?? 0) > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {field.value?.map((selectedTag) => (
                        <Badge key={selectedTag.name} variant="secondary">
                          {selectedTag.name}
                          <button
                            type="button"
                            onClick={() => {
                              const currentValue = field.value ?? []
                              field.onChange(
                                currentValue.filter(
                                  (tag) => tag.name !== selectedTag.name
                                )
                              )
                            }}
                            className="ml-1 rounded-full"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )) ?? []}
                    </div>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Thumbnail</FormLabel>
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-40 w-full max-w-xs cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                      onClick={() =>
                        document.getElementById("thumbnail")?.click()
                      }
                    >
                      {thumbnailPreview ? (
                        <div className="relative h-full w-full">
                          <img
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            className="h-full w-full rounded-md object-cover"
                          />
                          <button
                            type="button"
                            className="absolute right-1 top-1 z-10 rounded-full bg-white p-1 shadow-sm hover:bg-gray-100"
                            onClick={(e) => {
                              e.stopPropagation() // Prevent triggering the upload click
                              setThumbnailPreview(null)
                              setValue("thumbnail", null)
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="mb-2 h-10 w-10 text-gray-400" />
                          <p className="text-center text-sm text-gray-500">
                            Drag & drop or click to upload
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            Recommended: 1280×720px (16:9)
                          </p>
                        </>
                      )}
                      <input
                        type="file"
                        id="thumbnail"
                        className="hidden"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                      />
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Step 2: Course Content */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Course Modules</h3>
              <Button
                type="button"
                className="flex items-center gap-1"
                onClick={handleAddModule}
              >
                <Plus className="h-4 w-4" />
                Add Module
              </Button>
            </div>

            <div className="space-y-6">
              {formValues.modules?.map((module, index) => (
                <ModuleForm
                  key={index}
                  module={module}
                  moduleIndex={index}
                  form={form}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Settings */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <FormLabel className="text-base">Publish Course</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Make this course available to students
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name="requiresPrerequisites"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <FormLabel className="text-base">Prerequisites</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Require completion of other courses
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name="allowComments"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <FormLabel className="text-base">Allow Comments</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Let students comment on lessons
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name="certificateEnabled"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <FormLabel className="text-base">
                      Enable Certificate
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Issue certificates upon completion
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between">
          {currentStep > 1 ? (
            <Button type="button" variant="outline" onClick={handlePrev}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
          ) : (
            <div></div>
          )}

          {currentStep < 3 ? (
            <Button type="button" onClick={handleNext}>
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" onClick={() => console.log(formValues)}>
              Create Course
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
