import {
  BookOpen,
  ChevronRight,
  MessageSquare,
  Play,
  Trophy,
} from "lucide-react"
import { Button } from "./button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import { Progress } from "./progress"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

const currentCourses = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    progress: 75,
    nextLesson: "Arrays and Objects",
    instructor: "John Doe",
    thumbnail: "/jero",
    totalLessons: 24,
    completedLessons: 18,
  },
  {
    id: "2",
    title: "React Basics",
    progress: 45,
    nextLesson: "State Management",
    instructor: "Jane Smith",
    thumbnail: "/jero",
    totalLessons: 20,
    completedLessons: 9,
  },
  {
    id: "3",
    title: "CSS Grid & Flexbox",
    progress: 90,
    nextLesson: "Advanced Layouts",
    instructor: "Mike Johnson",
    thumbnail: "/jero",
    totalLessons: 15,
    completedLessons: 13,
  },
]

const upcomingDeadlines = [
  {
    id: "1",
    title: "JavaScript Quiz",
    course: "JavaScript Fundamentals",
    dueDate: "2024-01-15",
    type: "quiz",
  },
  {
    id: "2",
    title: "React Project",
    course: "React Basics",
    dueDate: "2024-01-18",
    type: "project",
  },
  {
    id: "3",
    title: "CSS Assignment",
    course: "CSS Grid & Flexbox",
    dueDate: "2024-01-20",
    type: "assignment",
  },
]

const recentAchievements = [
  {
    id: "1",
    title: "JavaScript Master",
    description: "Completed JavaScript Fundamentals",
    icon: "🏆",
    earnedAt: "2024-01-10",
  },
  {
    id: "2",
    title: "Consistent Learner",
    description: "7 day learning streak",
    icon: "🔥",
    earnedAt: "2024-01-08",
  },
]

const communityActivity = [
  {
    id: "1",
    user: "Sarah Wilson",
    action: "started a discussion",
    topic: "Best React Practices",
    time: "2 hours ago",
    avatar: "/face1.jpeg",
  },
  {
    id: "2",
    user: "Mike Chen",
    action: "completed",
    topic: "JavaScript Arrays Quiz",
    time: "4 hours ago",
    avatar: "/face6.avif",
  },
  {
    id: "3",
    user: "Alex Rodriguez",
    action: "shared a project",
    topic: "Portfolio Website",
    time: "6 hours ago",
    avatar: "/face3.jpg",
  },
]

export default function ContinueLearningCard() {
  return (
    <>
      <div className="space-y-8 lg:col-span-2">
        {/* Continue Learning */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Continue Learning
              </CardTitle>
              <Link href="/courses">
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center gap-4 rounded-lg border border-slate-200 p-4 transition-all hover:border-blue-300 hover:shadow-md dark:border-slate-700 dark:hover:border-blue-600"
              >
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="h-16 w-20 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    by {course.instructor}
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                          {course.completedLessons}/{course.totalLessons}{" "}
                          lessons
                        </span>
                        <span className="font-medium text-blue-600">
                          {course.progress}%
                        </span>
                      </div>
                      <Progress value={course.progress} className="mt-1 h-2" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Next: {course.nextLesson}
                  </p>
                </div>
                <Button
                  size="sm"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Play className="mr-1 h-4 w-4" />
                  Continue
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {recentAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20"
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {achievement.description}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      {achievement.earnedAt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              Community Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {communityActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={activity.avatar || "/placeholder.svg"}
                    alt={activity.user}
                  />
                  <AvatarFallback>
                    {activity.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium text-slate-900 dark:text-white">
                      {activity.user}
                    </span>{" "}
                    <span className="text-slate-600 dark:text-slate-400">
                      {activity.action}
                    </span>{" "}
                    <span className="font-medium text-blue-600">
                      {activity.topic}
                    </span>
                  </p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
            <Link href="/community">
              <Button variant="outline" size="sm" className="mt-4 w-full">
                View Community
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
