import React, { JSX } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Video,
  FileText,
  Terminal,
  Award,
  CheckCircle,
  User,
  Clock,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CourseModule, Lesson } from "@root/global"
interface PreviewTabsProps {
  lessonTypeCount: Record<string, number>
  CourseDescription: string
  lessonCount: number
  formattedDuration: string
  moduleCount: number
  course: {
    id: string
    title: string
    description: string
    price: number
    category: {
      name: string
    }
    level: string
    instructor: string
    slug: string
    hours?: number
    modules: CourseModule[]
  }
}

const PreviewTabs = ({
  CourseDescription,
  lessonTypeCount,
  lessonCount,
  course,
  formattedDuration,
  moduleCount,
}: PreviewTabsProps) => {
  const lessonTypeDisplay: Record<
    string,
    { label: string; icon: JSX.Element }
  > = {
    video: {
      label: "Videos",
      icon: <Video className="mx-auto mb-2 h-6 w-6 text-blue-600" />,
    },
    text: {
      label: "Text Lessons",
      icon: <FileText className="mx-auto mb-2 h-6 w-6 text-blue-600" />,
    },
    terminal: {
      label: "Terminal",
      icon: <Terminal className="mx-auto mb-2 h-6 w-6 text-blue-600" />,
    },
    quiz: {
      label: "Quizzes",
      icon: <Award className="mx-auto mb-2 h-6 w-6 text-blue-600" />,
    },
  }

  function getLessonTypeIcon(type: string) {
    switch (type.toLowerCase()) {
      case "video":
        return <Video className="mr-2 h-5 w-5 text-black dark:text-white" />
      case "text":
        return <FileText className="mr-2 h-5 w-5 text-black dark:text-white" />
      case "terminal":
        return <Terminal className="mr-2 h-5 w-5 text-black dark:text-white" />
      case "quiz":
        return <Award className="mr-2 h-5 w-5 text-black dark:text-white" />
      default:
        return null
    }
  }

  return (
    <>
      <div className="md:col-span-2">
        <Tabs className="w-full" defaultValue="overview">
          <TabsList className="mb-8 grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div>
              <h2 className="mb-4 text-2xl font-bold">About This Course</h2>
              <p className="mb-6">{CourseDescription}</p>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {Object.entries(lessonTypeCount).map(([type, count]) => {
                  const info = lessonTypeDisplay[type]

                  if (!info) return null // skip unknown types

                  return (
                    <div
                      key={type}
                      className="rounded-lg border p-4 text-center shadow-sm hover:shadow-lg"
                    >
                      {info.icon}
                      <p className="text-sm">{info.label}</p>
                      <p className="font-bold">{count}</p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold">What You'll Learn</h2>
              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {course.modules.flatMap((module) =>
                  (module.lessons ?? []).slice(0, 2).map((lesson) => (
                    <li key={lesson.id} className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                      <span>{lesson.title}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
            {/* <div>
              <h2 className="mb-4 text-2xl font-bold">Prerequisites</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Basic understanding of programming concepts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Familiarity with web development (HTML, CSS)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>A computer with internet access</span>
                </li>
              </ul>
            </div> */}
          </TabsContent>

          <TabsContent value="curriculum" className="space-y-6">
            <h2 className="mb-4 text-2xl font-bold">Course Curriculum</h2>
            <p className="mb-6">
              This course includes {moduleCount} modules with {lessonCount}{" "}
              lessons, totaling approximately {formattedDuration} hours of
              learning content.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {course.modules.map((module: any, index) => (
                <AccordionItem
                  key={module.id}
                  value={module.id}
                  className="border-secondary"
                >
                  <AccordionTrigger className="rounded-lg px-4 py-3 hover:bg-secondary/50">
                    <div className="flex items-center text-left">
                      <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600/20 font-medium text-blue-500">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-medium">{module.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {module.lessons.length} lessons
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-2">
                    <ul className="space-y-3 pl-11">
                      {module.lessons.map((lesson: Lesson) => (
                        <li
                          key={lesson.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            {getLessonTypeIcon(lesson.type)}
                            <span>{lesson.title}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {lesson.duration} min
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Student Reviews</h2>
              <div className="mb-6 flex items-center">
                {/* <div className="mr-4 flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xl font-bold">4.8</span>
                <span className="ml-2 text-gray-500">(124 reviews)</span> */}
              </div>

              {/* Reviews list */}
              <div className="space-y-6">
                {/* Review 1 */}
                {/* <div className="border-b pb-6">
                  <div className="mb-2 flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Michael Johnson</h4>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className="h-4 w-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-gray-500">2 weeks ago</span>
                      </div>
                    </div>
                  </div>
                  <p>
                    This course exceeded my expectations. The content is
                    well-structured and the instructor explains complex concepts
                    in a way that&apos;s easy to understand.
                  </p>
                </div> */}

                {/* Additional reviews would follow the same pattern */}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default PreviewTabs
