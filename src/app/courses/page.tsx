"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, GlobeIcon, Users } from "lucide-react"
import Link from "next/link"
import { MainNavbar } from "@/components/ui/MainNavbar"
import { createClient } from "@root/utils/supabase/client"
import { Skeleton } from "@/components/ui/skeleton"
import { slugify } from "@root/utils/slugify"

export default function Courses() {
  const supabase = createClient()
  const [courses, setCourses] = useState<Courses[] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredCourses, setFilteredCourses] = useState<Courses[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (courses) {
      const foundCourses = courses.filter(
        (c) =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedCategory === "All" || c.category === selectedCategory)
      )
      setFilteredCourses(foundCourses)
    }
  }, [courses, selectedCategory, searchTerm])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true)
        const { data, error } = await supabase.from("courses").select("*")

        if (error) throw error
        if (!data) {
          return
        }
        setCourses(data)
      } catch (error) {
        console.error("Error Fetching Courses:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [supabase])

  return (
    <>
      <div className="flex min-h-screen">
        {/* Main Content Area */}
        <div className="flex flex-1 flex-col">
          {/* Navbar */}
          <MainNavbar />

          {/* Main Content */}
          <div className="container mx-auto flex-1 p-4 md:p-6 lg:p-8">
            <h1 className="text-3xl font-bold">Explore Courses</h1>
            <p className="mb-6 text-foreground">
              Enhance your skills with our expert-led courses
            </p>

            <div className="mb-6 flex flex-col gap-4 md:flex-row">
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="md:w-1/3"
              />
              <Tabs defaultValue="All" className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger
                    value="All"
                    onClick={() => setSelectedCategory("All")}
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="Frontend"
                    onClick={() => setSelectedCategory("Frontend")}
                  >
                    Frontend
                  </TabsTrigger>
                  <TabsTrigger
                    value="Backend"
                    onClick={() => setSelectedCategory("Backend")}
                  >
                    Backend
                  </TabsTrigger>
                  <TabsTrigger
                    value="Fullstack"
                    onClick={() => setSelectedCategory("Fullstack")}
                  >
                    Fullstack
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden rounded-2xl border shadow-md transition hover:shadow-lg"
                  >
                    {/* Image Header */}
                    <div className="relative h-24 bg-gray-200">
                      <Skeleton className="absolute inset-0 h-full w-full" />
                      {/* Category Badge */}
                      <Badge className="absolute left-4 top-4 bg-white/30 text-white backdrop-blur-sm">
                        <Skeleton className="h-4 w-14 rounded" />
                      </Badge>
                    </div>

                    <CardHeader className="px-6 pb-4 pt-6 text-start">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </div>
                      <CardDescription className="mt-2 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </CardDescription>

                      {/* Stats */}
                      <div className="mt-4 flex gap-4 text-sm">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-24" />
                      </div>

                      {/* Rating */}
                      <div className="mt-2 flex gap-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </CardHeader>

                    <CardContent className="px-6 pb-4 pt-0">
                      <div className="mb-1 flex justify-between text-xs text-gray-500">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-2 w-full rounded" />

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </div>
                    </CardContent>

                    <CardFooter className="p-6 pt-0">
                      <Skeleton className="h-10 w-full rounded-md" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            {/* Loaded State */}
            {!isLoading && (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredCourses &&
                    filteredCourses.map((course, index) => (
                      <Card
                        key={course.id}
                        className="overflow-hidden rounded-2xl border shadow-md transition hover:shadow-lg"
                      >
                        <div
                          className="relative h-24 bg-cover bg-center transition-transform duration-300 hover:scale-105"
                          style={{
                            backgroundImage: "url(/jero)",
                          }}
                        >
                          {/* Category Badge */}
                          <Badge className="absolute left-4 top-4 bg-white/15 text-black backdrop-blur-sm hover:bg-white/30">
                            Frontend
                          </Badge>

                          {/* Overlay & Icon */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <GlobeIcon className="h-10 w-10 text-white opacity-90" />
                          </div>
                        </div>

                        {/* Course Info */}
                        <CardHeader className="px-6 pb-4 pt-6 text-start">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold">
                              {course.title}
                            </CardTitle>
                            <Badge
                              className="ml-2 bg-green-100 text-green-700 hover:bg-green-100/80"
                              variant="secondary"
                            >
                              Beginner
                            </Badge>
                          </div>

                          <CardDescription className="mt-2 line-clamp-3 text-sm">
                            {course.description}
                          </CardDescription>

                          {/* Stats */}
                          <div className="mt-4 flex items-start justify-start gap-4 text-sm">
                            <Clock className="h-4 w-4" />
                            <span>40 hours</span>
                            <Users className="h-4 w-4" />
                            <span>1,245 students</span>
                          </div>

                          {/* Rating */}
                          <div className="mt-2 flex items-start justify-start gap-1 text-sm">
                            <div className="flex text-yellow-400">
                              {"★".repeat(4)}
                              <span className="text-yellow-400/50">☆</span>
                            </div>
                            <span className="font-medium">4.8</span>
                            <span className="">• Alex Johnson</span>
                          </div>
                        </CardHeader>

                        {/* Progress */}
                        <CardContent className="px-6 pb-4 pt-0">
                          <div className="mb-1 flex justify-between text-xs text-gray-500">
                            <span>In progress</span>
                            <span>60% complete</span>
                          </div>
                          <Progress value={60} className="h-2" />

                          {/* Tags */}
                          <div className="mt-4 flex flex-wrap justify-start gap-2 text-xs">
                            <Badge
                              variant="outline"
                              className="bg-gray-450 text-xs"
                            >
                              HTML
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-gray-450 text-xs"
                            >
                              CSS
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-gray-450 text-xs"
                            >
                              Responsive
                            </Badge>
                          </div>
                        </CardContent>

                        {/* Footer */}
                        <CardFooter className="p-6 pt-0">
                          <Link
                            key={index}
                            className="w-full"
                            href={`/courses/${encodeURIComponent(course.title.toLowerCase().replace(/\s+/g, "-"))}/preview`}
                          >
                            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                              Continue Course
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                </div>

                {filteredCourses && filteredCourses.length === 0 && (
                  <div className="py-12 text-center">
                    <BookOpen className="mx-auto h-12 w-12 text-white" />
                    <h3 className="mt-4 text-lg font-medium">
                      No courses found
                    </h3>
                    <p className="mt-1">
                      Try adjusting your search or filter to find what
                      you&apos;re looking for.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
