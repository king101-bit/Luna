"use client"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import UserGreetText from "@/components/ui/UserGreetText"
import { createBrowserClient } from "@supabase/ssr"
import useUserStore from "@/stores/UserStore"
import { MainNavbar } from "@/components/ui/MainNavbar"
import Link from "next/link"
import ContinueLearningCard from "@/components/ui/ContinueLearningCard"
import LearningProgressCard from "@/components/ui/LearningProgressCard"
import RecommendedCourses from "@/components/ui/RecommendedCourses"

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
              <LearningProgressCard />
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
