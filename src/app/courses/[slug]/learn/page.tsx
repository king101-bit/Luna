"use client"
import { Footer } from "@/components/LearnPage/Footer"
import { Header } from "@/components/LearnPage/Header"
import { LearnPageSkeleton } from "@/components/LearnPage/LearnPageSkeleton"
import TextLessonViewer from "@/components/LearnPage/text-lesson-viewer"
import VideoLessonViewer from "@/components/LearnPage/video-lesson"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCourseProgress } from "@/hook/CourseProgress"
import { useCourseModules } from "@/hook/useCourseModules"
import { useCourses } from "@/hook/useFetchCourse"
import { Lesson } from "@root/global"
import { createClient } from "@root/utils/supabase/client"
import {
  Clock,
  CheckCircle,
  Search,
  Terminal,
  Video,
  Text,
  FileText,
  VideoIcon,
  TextIcon,
  TerminalIcon,
  FileIcon,
  Award,
  Play,
  AlertCircle,
} from "lucide-react"
import { useParams } from "next/navigation"
import { useState, useMemo, useEffect } from "react"

export default function LearnPage() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("content")
  const { slug } = useParams()

  const { data: courses, isLoading, error } = useCourses()
  const course = courses?.find((c) => c.slug === slug)

  const { data: modules } = useCourseModules(course?.id, {
    enabled: !!course,
  })

  const supabase = createClient()
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)

  const [lessonCompleted, setLessonCompleted] = useState(false)
  const {
    progress: courseProgress,
    isLoading: progressLoading,
    refreshProgress,
  } = useCourseProgress(course?.id)
  // Replace your problematic useEffect with this:
  useEffect(() => {
    const fetchProgress = async () => {
      if (!selectedLesson) return

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data, error } = await supabase
        .from("lesson_progress")
        .select("completed")
        .eq("user_id", user.id)
        .eq("lesson_id", selectedLesson.id)
        .single()

      if (data) {
        setLessonCompleted(data.completed)
      } else {
        setLessonCompleted(false)
      }
    }

    fetchProgress()
  }, [selectedLesson])
  const filteredModules = useMemo(() => {
    if (!modules) return []

    if (!searchTerm.trim()) {
      return modules.map((module) => ({
        ...module,
        lessons: module.course_lessons || [],
      }))
    }

    return modules
      .map((module) => {
        const filteredLessons = (module.course_lessons || []).filter(
          (lesson: Lesson) =>
            lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        return { ...module, lessons: filteredLessons }
      })
      .filter((module) => module.lessons.length > 0)
  }, [modules, searchTerm])

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen)
  }

  function selectLesson(moduleIndex: number, lessonIndex: number) {
    setCurrentModuleIndex(moduleIndex)
    setCurrentLessonIndex(lessonIndex)
    const lesson =
      filteredModules?.[moduleIndex]?.lessons?.[lessonIndex] ?? null
    if (lesson) {
      setSelectedLesson({
        ...lesson,
        type: lesson.type.toLowerCase(),
      })
    } else {
      setSelectedLesson(null)
    }
  }

  useEffect(() => {
    if (filteredModules.length > 0 && filteredModules[0].lessons.length > 0) {
      const lesson = filteredModules[0].lessons[0]
      setSelectedLesson({
        ...lesson,
        type: lesson.type.toLowerCase(),
      })
      setCurrentModuleIndex(0)
      setCurrentLessonIndex(0)
    }
  }, [filteredModules])

  // function getLessonIcon(type: string) {
  //   switch (type.toLowerCase()) {
  //     case "video":
  //       return <Video className="h-4 w-4" />
  //     case "text":
  //       return <FileText className="h-4 w-4" />
  //     case "terminal":
  //       return <Terminal className="h-4 w-4" />
  //     default:
  //       return <FileIcon className="h-4 w-4" />
  //   }
  // }
  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      const newLessonIndex = currentLessonIndex - 1
      setCurrentLessonIndex(newLessonIndex)
      updateSelectedLesson(currentModuleIndex, newLessonIndex)
    } else if (currentModuleIndex > 0) {
      const newModuleIndex = currentModuleIndex - 1
      const newLessonIndex = filteredModules[newModuleIndex].lessons.length - 1
      setCurrentModuleIndex(newModuleIndex)
      setCurrentLessonIndex(newLessonIndex)
      updateSelectedLesson(newModuleIndex, newLessonIndex)
    }
  }

  const goToNextLesson = () => {
    if (
      currentLessonIndex <
      filteredModules[currentModuleIndex].lessons.length - 1
    ) {
      const newLessonIndex = currentLessonIndex + 1
      setCurrentLessonIndex(newLessonIndex)
      updateSelectedLesson(currentModuleIndex, newLessonIndex)
    } else if (currentModuleIndex < filteredModules.length - 1) {
      const newModuleIndex = currentModuleIndex + 1
      setCurrentModuleIndex(newModuleIndex)
      setCurrentLessonIndex(0)
      updateSelectedLesson(newModuleIndex, 0)
    }
  }

  function updateSelectedLesson(moduleIndex: number, lessonIndex: number) {
    const lesson =
      filteredModules?.[moduleIndex]?.lessons?.[lessonIndex] ?? null
    if (lesson) {
      setSelectedLesson({
        ...lesson,
        type: lesson.type.toLowerCase(),
      })
    } else {
      setSelectedLesson(null)
    }
  }

  if (isLoading)
    return (
      <div>
        <LearnPageSkeleton />
      </div>
    )

  if (error)
    return (
      <div className="flex h-screen items-center justify-center p-4">
        <Card className="max-w-md border border-red-500 bg-red-50">
          <CardContent className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-6 w-6" />
            <span>Error: {error.message}</span>
          </CardContent>
        </Card>
      </div>
    )

  if (!course)
    return (
      <div className="flex h-screen items-center justify-center p-4">
        <Card className="max-w-md border border-yellow-400 bg-yellow-50">
          <CardContent className="flex items-center gap-2 text-yellow-700">
            <AlertCircle className="h-6 w-6" />
            <span>Course not found</span>
          </CardContent>
        </Card>
      </div>
    )

  const lessonComponents: Record<string, React.FC<{ lesson: Lesson }>> = {
    text: TextLessonViewer,
    video: VideoLessonViewer,
    // terminal: TerminalViewer,
    // quiz handled separately or as a component too
  }

  const renderLessonContent = () => {
    if (!selectedLesson) return null

    // if (selectedLesson.type === "quiz") {
    //   return (
    //     <div className="flex h-full items-center justify-center">
    //       <Card className="w-full max-w-2xl">
    //         <CardHeader>
    //           <CardTitle className="flex items-center leading-snug">
    //             <Award className="mr-2 h-6 w-6 text-blue-500" />
    //             {selectedLesson.title}
    //           </CardTitle>
    //         </CardHeader>
    //         <CardContent>
    //           <p className="mb-4 text-muted-foreground">
    //             This quiz will test your understanding of the concepts covered
    //             in this module.
    //           </p>
    //           <Button className="bg-blue-600 hover:bg-blue-700">
    //             <Play className="mr-2 h-4 w-4" />
    //             Start Quiz
    //           </Button>
    //         </CardContent>
    //       </Card>
    //     </div>
    //   )
    // }

    const Component = lessonComponents[selectedLesson.type]
    if (Component) return <Component lesson={selectedLesson} />

    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Lesson content not available</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside
          className="flex max-h-screen w-full max-w-md flex-col overflow-y-auto border-r bg-card p-4 sm:max-w-xs"
          style={{ minWidth: 250 }}
        >
          <SidebarContent
            course={{
              ...course,
              progress: courseProgress,
            }}
            modules={filteredModules}
            onSelectLesson={selectLesson}
            selectedModuleIndex={currentModuleIndex}
            selectedLessonIndex={currentLessonIndex}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </aside>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          course={course}
          currentModuleIndex={currentModuleIndex}
          currentLessonIndex={currentLessonIndex}
          onToggleSidebar={toggleSidebar}
        />
        <main className="flex-1 overflow-auto p-6">
          <div className="">
            {selectedLesson ? (
              <div>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="content">Lesson Content</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="content"
                    className="flex-1 overflow-auto p-6"
                  >
                    {renderLessonContent()}
                  </TabsContent>

                  <TabsContent
                    value="notes"
                    className="flex-1 overflow-auto p-6"
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle>My Notes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <textarea
                          placeholder="Take notes about this lesson..."
                          className="h-64 w-full resize-none rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent
                    value="resources"
                    className="flex-1 overflow-auto p-6"
                  >
                    <Card className="h-full space-y-4">
                      <CardHeader>
                        <CardTitle>Additional Resources</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <h4 className="mb-2 font-medium">Documentation</h4>
                          <p className="mb-2 text-sm text-muted-foreground">
                            Official documentation and reference materials
                          </p>
                          <Button variant="outline" size="sm">
                            View Documentation
                          </Button>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h4 className="mb-2 font-medium">
                            Practice Exercises
                          </h4>
                          <p className="mb-2 text-sm text-muted-foreground">
                            Additional exercises to reinforce your learning
                          </p>
                          <Button variant="outline" size="sm">
                            Start Exercises
                          </Button>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h4 className="mb-2 font-medium">
                            Community Discussion
                          </h4>
                          <p className="mb-2 text-sm text-muted-foreground">
                            Join the discussion with other students
                          </p>
                          <Button variant="outline" size="sm">
                            Join Discussion
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-white">
                Select a lesson to begin
              </p>
            )}
          </div>
          {selectedLesson ? (
            <Footer
              onPrevious={goToPreviousLesson}
              onNext={goToNextLesson}
              disablePrevious={
                currentModuleIndex === 0 && currentLessonIndex === 0
              }
              disableNext={
                currentModuleIndex === filteredModules.length - 1 &&
                currentLessonIndex ===
                  filteredModules[currentModuleIndex].lessons.length - 1
              }
              courseId={course.id}
              lessonId={selectedLesson.id}
              onProgressUpdate={refreshProgress}
            />
          ) : (
            <div className="flex items-center justify-between border-t px-4 py-2">
              <div className="text-muted-foreground">
                Select a lesson to begin
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function SidebarContent({
  course,
  modules,
  onSelectLesson,
  selectedModuleIndex,
  selectedLessonIndex,
  searchTerm,
  setSearchTerm,
}: {
  course: {
    title: string
    progress?: number
  }
  modules: {
    id: string
    title: string
    lessons: Lesson[]
  }[]
  onSelectLesson: (moduleIndex: number, lessonIndex: number) => void
  selectedModuleIndex: number
  selectedLessonIndex: number
  searchTerm: string
  setSearchTerm: (val: string) => void
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Course Header */}
      <div className="border-b p-4">
        <h2 className="mb-2 text-lg font-semibold">{course.title}</h2>
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>Progress</span>
          <span>{course.progress ?? 0}%</span>
        </div>
        <Progress value={course.progress ?? 0} className="h-2" />
      </div>

      {/* Search */}
      <div className="border-b p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <input
            type="text"
            placeholder="Search lessons..."
            className="w-full rounded-lg border py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/* Course Content */}
      <div className="flex-1 overflow-y-auto">
        {modules.map((module, moduleIndex) => (
          <div key={module.id} className="border-b">
            <div className="p-4">
              <h3 className="mb-2 flex items-center font-medium">
                <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600">
                  {moduleIndex + 1}
                </span>
                {module.title}
              </h3>
              <div className="space-y-1">
                {(module.lessons ?? []).map((lesson, lessonIndex) => (
                  <Button
                    key={lesson.id}
                    onClick={() => onSelectLesson(moduleIndex, lessonIndex)}
                    variant={
                      selectedModuleIndex === moduleIndex &&
                      selectedLessonIndex === lessonIndex
                        ? "default"
                        : "ghost"
                    }
                    className={`flex w-full items-center justify-between rounded-lg p-2 text-left text-sm transition-colors ${
                      selectedModuleIndex === moduleIndex &&
                      selectedLessonIndex === lessonIndex
                        ? "border border-blue-700 bg-blue-900 text-blue-400"
                        : "text-gray-300 hover:bg-gray-900"
                    } `}
                  >
                    <div className="flex min-w-0 items-center">
                      {getLessonIcon(lesson.type)}
                      <span className="ml-2 truncate text-sm">
                        {lesson.title}
                      </span>
                    </div>
                    <div className="ml-2 flex items-center">
                      <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {lesson.duration} min
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getLessonIcon(type: string) {
  switch (type) {
    case "video":
      return <Video className="h-4 w-4" />
    case "text":
      return <FileText className="h-4 w-4" />
    case "terminal":
      return <Terminal className="h-4 w-4" />
  }
}
