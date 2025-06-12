import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Progress } from "./progress"

export default function LearningProgress() {
  const courses = [
    {
      id: "course-1",
      name: "React Fundamentals",
      totalLessons: 10,
      completedLessons: 8,
    },
    {
      id: "course-2",
      name: "JavaScript Advanced",
      totalLessons: 15,
      completedLessons: 12,
    },
    {
      id: "course-3",
      name: "TypeScript Essentials",
      totalLessons: 8,
      completedLessons: 6,
    },
  ]

  const totalLessons = courses.reduce(
    (acc, course) => acc + course.totalLessons,
    0
  )
  const completedLessons = courses.reduce(
    (acc, course) => acc + course.completedLessons,
    0
  )
  const overallProgress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  const learningPaths = [
    {
      id: "path-1",
      name: "Frontend Developer",
      progress: 65,
      courses: 4,
      completedCourses: 2,
    },
    {
      id: "path-2",
      name: "JavaScript Mastery",
      progress: 80,
      courses: 5,
      completedCourses: 4,
    },
    {
      id: "path-3",
      name: "Data Structures & Algorithms",
      progress: 30,
      courses: 6,
      completedCourses: 1,
    },
  ]

  const currentStreak = 7
  const longestStreak = 14
  const thisWeekMinutes = 320
  const lastWeekMinutes = 280
  const weekProgress =
    lastWeekMinutes > 0
      ? Math.round(
          ((thisWeekMinutes - lastWeekMinutes) / lastWeekMinutes) * 100
        )
      : 0

  const activityGrid = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const activity = Math.floor(Math.random() * 4)
      let bgClass = "bg-muted"

      if (activity === 1) bgClass = "bg-blue-200"
      if (activity === 2) bgClass = "bg-blue-400"
      if (activity === 3) bgClass = "bg-blue-600"

      return (
        <div
          key={i}
          className={`h-8 rounded-sm ${bgClass}`}
          title={`${activity * 30} minutes on day ${i + 1}`}
        />
      )
    })
  }, [])

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Learning Paths</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {learningPaths.map((path) => (
              <div key={path.id}>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{path.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {path.completedCourses} of {path.courses} courses
                      completed
                    </p>
                  </div>
                  <span className="text-sm font-medium">{path.progress}%</span>
                </div>
                <Progress value={path.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Learning Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-medium">Overall Progress</h4>
                <span className="text-sm font-medium">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-4 text-center">
                <p className="text-3xl font-bold text-blue-600">
                  {currentStreak}
                </p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <p className="text-3xl font-bold text-blue-600">
                  {longestStreak}
                </p>
                <p className="text-sm text-muted-foreground">Longest Streak</p>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <h4 className="font-medium">This Week</h4>
                  <p className="text-sm text-muted-foreground">
                    {thisWeekMinutes} minutes
                    {weekProgress > 0 && (
                      <span className="ml-1 text-green-600">
                        +{weekProgress}%
                      </span>
                    )}
                    {weekProgress < 0 && (
                      <span className="ml-1 text-red-600">{weekProgress}%</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-7 gap-1">{activityGrid}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
