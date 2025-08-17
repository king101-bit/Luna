"use client"
import { useState, useEffect } from "react"
import { Award, Clock, Loader2, Target, TrendingUp } from "lucide-react"
import UserGreetText from "@/components/ui/UserGreetText"
import { createBrowserClient } from "@supabase/ssr"
import useUserStore from "@/stores/UserStore"
import { MainNavbar } from "@/components/ui/MainNavbar"
import Link from "next/link"
import ContinueLearningCard from "@/components/ui/ContinueLearningCard"
import RecommendedCourses from "@/components/ui/RecommendedCourses"
import { Card, CardContent } from "@/components/ui/card"

const DashboardPage = () => {
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
          <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" /> {/* Loading spinner */}
          </div>
        ) : !user ? (
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
          <main className="container mx-auto max-w-6xl px-4 py-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight">
                <span>
                  Welcome back,
                  <UserGreetText
                    user={user}
                    className="ml-2 inline text-2xl font-bold"
                  />
                  👋
                </span>
              </h2>
              <p className="text-muted-foreground">
                Continue your learning journey
              </p>
            </div>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Overall Progress</p>
                        <p className="text-3xl font-bold">30%</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">Hours This Week</p>
                        <p className="text-3xl font-bold">30%</p>
                      </div>
                      <Clock className="h-8 w-8 text-green-200" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">Learning Streak</p>
                        <p className="text-3xl font-bold">7 days</p>
                      </div>
                      <Target className="h-8 w-8 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100">Completed</p>
                        <p className="text-3xl font-bold">3</p>
                      </div>
                      <Award className="h-8 w-8 text-orange-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <ContinueLearningCard />
            </div>
            <div className="mt-8">
              <RecommendedCourses />
            </div>
          </main>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
