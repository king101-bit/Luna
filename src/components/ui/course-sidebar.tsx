import {
  Book,
  Bookmark,
  Clock,
  User,
  Award,
  Terminal,
  Video,
  File,
  Dot,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import { Progress } from "./progress"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion"

export function CourseSidebar() {
  return (
    <div className="flex w-80 flex-col border p-6">
      {/* Course Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          JavaScript Fundamentals
        </h2>
        <p className="text-sm text-gray-300">Instructor: Michael Chen</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="mb-1 flex justify-between text-sm">
          <span>Course Progress</span>
          <span className="font-medium">60%</span>
        </div>
        <Progress value={60} />
      </div>

      {/* Navigation */}
      <nav className="mb-8">
        <Tabs defaultValue="modules">
          <TabsList className="h-10 w-full rounded-lg p-1">
            <TabsTrigger
              value="modules"
              className="w-full rounded-md data-[state=active]:bg-accent data-[state=active]:shadow-sm"
            >
              Modules
            </TabsTrigger>
            <TabsTrigger
              value="courseinfo"
              className="w-full rounded-md data-[state=active]:bg-accent data-[state=active]:shadow-sm"
            >
              Course Info
            </TabsTrigger>
          </TabsList>
          <TabsContent value="modules">
            <div className="">
              <h3 className="mb-3 flex items-center gap-2 font-medium">
                Course Content
              </h3>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-2">
              {/* HTML Basics Module */}
              <AccordionItem value="html-basics" className="border-none">
                <AccordionTrigger className="rounded-lg px-4 py-3 hover:no-underline data-[state=open]:rounded-b-none">
                  <div className="flex items-center">
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-sm font-medium text-white">
                      1
                    </span>
                    <span className="font-medium">HTML Basics</span>
                    <span className="ml-3 text-sm text-gray-500">1/3</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 rounded-b-lg border-t-0 px-4 py-2">
                  {/* Introduction */}
                  <div className="flex items-start gap-3 p-2">
                    <Dot className="mr-6-2 h-5 w-5" />
                    <div>
                      <div className="font-medium">Introduction to HTML</div>
                      <div className="flex items-center gap-1 text-sm text-gray-300">
                        <File className="h-3 w-3" /> Text
                      </div>
                    </div>
                  </div>

                  {/* Video Lesson */}
                  <div className="flex items-start gap-3 p-2">
                    <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                    <div>
                      <div className="font-medium">HTML Elements</div>
                      <div className="flex items-center gap-1 text-sm text-gray-300">
                        <Video className="h-3 w-3" /> Video · 15 minutes
                      </div>
                    </div>
                  </div>

                  {/* Terminal Practice */}
                  <div className="flex items-start gap-3 p-2">
                    <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                    <div>
                      <div className="font-medium">HTML Terminal Practice</div>
                      <div className="flex items-center gap-1 text-sm text-gray-300">
                        <Terminal className="h-3 w-3" /> Terminal
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* CSS Basics Module */}
              <AccordionItem value="css-basics" className="border-none">
                <AccordionTrigger className="rounded-lg px-4 py-3 hover:no-underline">
                  <div className="flex items-center">
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-sm font-medium text-white">
                      2
                    </span>
                    <span className="font-medium">CSS Basics</span>
                    <span className="ml-3 text-sm text-gray-500">1/3</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="rounded-b-lg border-t-0 px-4 py-2">
                  {/* Content would go here */}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="courseinfo">
            <div className="mb-4">
              <h3 className="mb-3 flex items-center gap-2 font-medium">
                <Bookmark className="h-4 w-4" />
                About This Course
              </h3>
              <p className="text-sm text-gray-300">
                Master the core concepts of JavaScript programming language.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-5">
              {/* Modules */}
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Book className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  <span>Modules</span>
                </div>
                <div className="mt-1 pl-6 text-sm text-gray-500 dark:text-gray-400">
                  10 modules
                </div>
              </div>

              {/* Lessons */}
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Bookmark className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  <span>Lessons</span>
                </div>
                <div className="mt-1 pl-6 text-sm text-gray-500 dark:text-gray-400">
                  45 lessons
                </div>
              </div>

              {/* Duration & Level - Full width */}
              <div className="col-span-2 grid grid-cols-2 gap-4">
                {/* Duration */}
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Clock className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    <span>Duration</span>
                  </div>
                  <div className="mt-1 pl-6 text-sm text-gray-500 dark:text-gray-400">
                    10 weeks
                  </div>
                </div>

                {/* Level */}
                <div className="w-full rounded-lg border p-3">
                  <div className="flex items-start gap-2 text-sm font-medium">
                    <Award className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-600 dark:text-gray-300" />
                    <span className="line-clamp-1">Level</span>
                  </div>
                  <div className="mt-1 min-h-[20px] break-words pl-6 text-sm text-gray-500 dark:text-gray-400">
                    Intermediate
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </nav>
    </div>
  )
}
