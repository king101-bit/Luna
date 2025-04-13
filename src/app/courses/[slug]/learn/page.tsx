import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CourseSidebar } from "@/components/ui/course-sidebar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  File,
  FileText,
  Flag,
  Search,
  Settings,
} from "lucide-react"
import Link from "next/link"

export default function LearnPage() {
  return (
    <div className="flex h-screen">
      <CourseSidebar />
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center gap-4">
            <Link href="/courses">
              <Button variant="ghost" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Back to Courses
              </Button>
            </Link>
            <div className="hidden md:block">
              <h1 className="text-sm font-semibold">Responsive Web Design</h1>
              <p className="text-xs text-gray-500">Beginner - Sarah Johnson</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-4 pr-16">
            <div className="relative w-full max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search lessons..."
                className="block w-full rounded-lg border py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Flag className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Report an issue</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Bookmark className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Bookmark</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Settings</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Your lesson content will go here */}
          <div className="prose mb-2 max-w-none">
            <div className="flex items-center gap-2">
              <File className="h-4 w-4 flex-shrink-0 text-accent" />
              <span>Text Lesson</span>
              <Badge className="bg-accent text-white hover:bg-blue-700">
                <Clock className="mr-1 h-3 w-3" /> 15 minutes
              </Badge>
            </div>
            <h2 className="text-2xl font-semibold">HTML Elements</h2>
          </div>
          <div className="container">
            <Tabs defaultValue="lessoncontent">
              <TabsList className="h-10 rounded-lg p-2">
                <TabsTrigger
                  value="lessoncontent"
                  className="rounded-md data-[state=active]:bg-accent data-[state=active]:shadow-sm"
                >
                  Lesson Content
                </TabsTrigger>
                <TabsTrigger
                  value="notes"
                  className="rounded-md data-[state=active]:bg-accent data-[state=active]:shadow-sm"
                >
                  Notes
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="rounded-md data-[state=active]:bg-accent data-[state=active]:shadow-sm"
                >
                  Resources
                </TabsTrigger>
              </TabsList>
              <Separator className="mt-3" />
              <TabsContent value="lessoncontent"></TabsContent>
              <TabsContent className="mt-5" value="notes">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea placeholder="Type your notes here...." />
                  </CardContent>
                  <CardFooter className="items-end justify-end">
                    <Button className="bg-accent text-white">Save Notes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent className="mt-5" value="resources">
                <h1 className="mb-3 text-xl">Additional Resources </h1>
                <div className="container space-y-3">
                  <div className="mt-2 rounded-md border p-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 flex-shrink-0 text-accent" />
                      <span>Documentation</span>
                    </div>
                    <p className="text-gray-300">
                      Official documentation for the concepts covered in this
                      lesson.
                    </p>
                    <Link href={"/"} className="text-accent hover:underline">
                      View Documentation
                    </Link>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4 flex-shrink-0 text-accent" />
                      <span>Exercise Files</span>
                    </div>
                    <p className="text-gray-300">
                      Download the exercise files for this lesson.
                    </p>
                    <Link href={"/"} className="text-accent hover:underline">
                      Download Files
                    </Link>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="fixed bottom-0 left-0 right-0 border-t bg-card p-4">
            <div className="container flex items-center justify-between">
              {/* Left-aligned navigation buttons */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              {/* Right-aligned Complete button */}
              <Button className="bg-accent text-white hover:bg-blue-700">
                Complete
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
