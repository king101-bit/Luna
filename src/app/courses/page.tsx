"use client"

import { useEffect, useState } from "react"
import { BookOpen, Search } from "lucide-react"
import { MainNavbar } from "@/components/ui/MainNavbar"
import { createClient } from "@root/utils/supabase/client"
import CourseSkeletonCard from "@/components/course/CourseSkeletonCard"
import CourseCard from "@/components/course/CourseCard"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Course } from "@root/global"
import FilterBar from "@/components/course/CourseFilters"

export default function Courses() {
  const supabase = createClient()
  const [courses, setCourses] = useState<Course[] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [selectedSort, setSelectedSort] = useState("Newest")
  const [filteredCourses, setFilteredCourses] = useState<Course[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (courses) {
      const foundCourses = courses.filter(
        (c) =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedCategory === "All" || c.category?.name === selectedCategory)
      )
      setFilteredCourses(foundCourses)
    }
  }, [courses, selectedCategory, searchTerm])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true)

        const { data, error } = await supabase.from("courses").select(`
          *,
          course_tags (
            tag_id,
            tags (
              id,
              name
            )
          ),
          category:categories (
            name
          )
        `)

        if (error) throw error
        if (!data) return

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <MainNavbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold">Explore Our Courses</h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
              Master new skills with our comprehensive, hands-on courses
              designed by industry experts
            </p>

            {/* Search Bar */}
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search courses, topics, or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-14 border-white/20 bg-white/10 pl-12 text-lg text-white placeholder:text-white/70"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Filters */}
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <FilterBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />

          <div className="whitespace-nowrap text-sm text-white">
            {filteredCourses?.length || 0} courses found
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="border shadow-sm">
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="enrolled">My Courses</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            {isLoading && <CourseSkeletonCard />}
            {!isLoading && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses?.map((course, index) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    index={index}
                    setSelectedCategory={setSelectedCategory}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="enrolled" className="mt-8">
            {filteredCourses?.filter((c) => c.isEnrolled).length === 0 ? (
              <div className="py-12 text-center">
                <BookOpen className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                <h3 className="mb-2 text-xl font-medium text-gray-900">
                  No enrolled courses
                </h3>
                <p className="text-gray-500">
                  Enroll in courses to see them here
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses
                  ?.filter((c) => c.isEnrolled)
                  .map((course, index) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      index={index}
                      setSelectedCategory={setSelectedCategory}
                    />
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="wishlist" className="mt-8">
            <div className="py-12 text-center">
              <BookOpen className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <h3 className="mb-2 text-xl font-medium text-gray-900">
                No courses in wishlist
              </h3>
              <p className="text-gray-500">Save courses to view them later</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
