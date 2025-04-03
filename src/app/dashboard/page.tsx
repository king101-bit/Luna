"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Loader2 } from "lucide-react"
import UserGreetText from "@/components/ui/UserGreetText"
import { createBrowserClient } from "@supabase/ssr"
import useUserStore from "@/stores/UserStore"
import { MainNavbar } from "@/components/ui/MainNavbar"
import Link from "next/link"

const DashboardPage = () => {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return "Good Morning"
    if (hour >= 12 && hour < 17) return "Good Afternoon"
    if (hour >= 17 && hour < 21) return "Good Evening"
    return "Good Night"
  }

  const [progress, setProgress] = useState(50)
  const { login, user, loading, setLoading } = useUserStore()

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const fetchUser = async () => {
      setLoading(true) // Set loading to true before fetching
      try {
        const result = await supabase.auth.getUser()

        if (!result.data) {
          console.error("No user data found")
          setLoading(false) // Set loading to false if no data
          return
        }

        const { user } = result.data
        login(user!)
        console.log("User From Dashboard:", user)
      } catch (error) {
        console.error("Auth error:", error)
      } finally {
        setLoading(false) // Set loading to false after fetching
      }
    }

    fetchUser()
  }, [login, setLoading])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MainNavbar />
      {/* Main Content */}
      <div className="flex-1">
        {loading ? (
          // Loading State
          <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" /> {/* Loading spinner */}
          </div>
        ) : !user ? (
          // No User State
          <div className="flex min-h-screen items-center justify-center">
            <p>
              No user found. Please{" "}
              <Link href="/login" className="hover:underline">
                log in
              </Link>
              .
            </p>
          </div>
        ) : (
          // Dashboard Content
          <main className="container mx-auto p-4 md:p-6 lg:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight">
                <span>
                  {getGreeting()},
                  <UserGreetText
                    user={user}
                    className="ml-2 inline text-xl font-bold"
                  />
                </span>
              </h2>
              <p className="text-muted-foreground">
                Continue your learning journey where you left off.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Progress Card */}
              <Card className="col-span-full lg:col-span-2">
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>
                    You&apos;ve completed {progress}% of your current path
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={progress} className="h-2" />

                    <div className="grid grid-cols-3 gap-4 pt-2">
                      <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-3 shadow-sm">
                        <div className="text-xl font-bold">12</div>
                        <div className="text-sm font-semibold text-muted-foreground">
                          Lessons
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-3 shadow-sm">
                        <div className="text-xl font-bold">5</div>
                        <div className="text-sm font-semibold text-muted-foreground">
                          Challenges
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-3 shadow-sm">
                        <div className="text-xl font-bold">7</div>
                        <div className="text-sm font-semibold text-muted-foreground">
                          Day Streak
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => setProgress(Math.min(progress + 1, 100))}
                  >
                    Continue Learning
                  </Button>
                </CardFooter>
              </Card>

              {/* Continue Learning Card */}
              <Card className="col-span-full md:col-span-1">
                <CardHeader>
                  <CardTitle>Continue Learning</CardTitle>
                  <CardDescription>Your current course</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 rounded-md bg-primary/10 p-4">
                      <BookOpen className="h-8 w-8 text-primary"></BookOpen>
                      <div>
                        <h3 className="font-sans font-medium">
                          Responsive Web Design
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Module 3 of 5
                        </p>
                      </div>
                    </div>
                    <Progress value={50} className="h-2"></Progress>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Resume Course</Button>
                </CardFooter>
              </Card>
            </div>
          </main>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
