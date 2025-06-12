"use client"

import { useEffect, useState } from "react"
import { BookOpen } from "lucide-react"
import { MainNavbar } from "@/components/ui/MainNavbar"
import { createClient } from "@root/utils/supabase/client"
import CourseSkeletonCard from "@/components/course/CourseSkeletonCard"
import CourseCard from "@/components/course/CourseCard"
import CourseFilters from "@/components/course/CourseFilters"
import { Course } from "@root/global"

export default function Courses() {
  const supabase = createClient()
  const [courses, setCourses] = useState<Course[] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredCourses, setFilteredCourses] = useState<Course[] | null>(null)
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
        // console.log(data)
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
            <CourseFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setSelectedCategory={setSelectedCategory}
            />
            {/* Loading State */}
            {isLoading && <CourseSkeletonCard />}

            {/* Loaded State */}
            {!isLoading && (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredCourses &&
                    filteredCourses.map((course, index) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        index={index}
                        setSelectedCategory={setSelectedCategory}
                      />
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
