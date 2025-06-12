import { Award, BarChart, BookOpen, Code, MessageSquare } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import LearningProgress from "./LearningProgress"
import RecentDiscussion from "./RecentDiscussion"

export const ProfileTabs = () => {
  return (
    <>
      <Tabs defaultValue="progress" className="space-y-4">
        <TabsList className="grid h-auto grid-cols-2 p-1 md:grid-cols-5">
          <TabsTrigger
            value="progress"
            className="flex items-center gap-2 py-2"
          >
            <BarChart className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Progress</span>
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2 py-2">
            <BookOpen className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Courses</span>
          </TabsTrigger>
          <TabsTrigger
            value="discussions"
            className="flex items-center gap-2 py-2"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Discussions</span>
          </TabsTrigger>
          <TabsTrigger
            value="certifications"
            className="flex items-center gap-2 py-2"
          >
            <Award className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Certificates</span>
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            className="flex items-center gap-2 py-2"
          >
            <Code className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Projects</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="progress" className="space-y-6">
          <LearningProgress />
        </TabsContent>
        <TabsContent value="courses">zotent</TabsContent>
        <TabsContent value="discussions">
          <RecentDiscussion />
        </TabsContent>
        <TabsContent value="certifications">Certificates</TabsContent>
        <TabsContent value="projects">projects</TabsContent>
      </Tabs>
    </>
  )
}
