import { Badge } from "@/components/ui/badge"
import { CourseSidebar } from "@/components/ui/course-sidebar"
import { Footer } from "@/components/LearnPage/Footer"
import { Header } from "@/components/LearnPage/Header"
import { TabsComponent } from "@/components/LearnPage/TabsComponent"
import { Clock, File } from "lucide-react"

export default function LearnPage() {
  return (
    <div className="flex h-screen">
      <CourseSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
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
            <TabsComponent />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}
