"use client"

import CourseForm from "@/components/admin/CourseForm"
import CoursePreview from "@/components/ui/CoursePreview"
import { MainNavbar } from "@/components/ui/MainNavbar"
import { createClient } from "@root/utils/supabase/client"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Category } from "@root/global"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CheckList from "@/components/ui/CheckList"

export default function NewCoursePage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[] | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase.from("categories").select("*")

        if (error) throw error
        if (data) {
          setCategories(data)
        }
      } catch (error) {
        console.error("Error Fetching Categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [supabase])

  return (
    <>
      <MainNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Courses
          </Button>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-grow">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl">Create New Course</CardTitle>
                <CardDescription>
                  Fill in the details below to create a new course for the Luna
                  platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CourseForm categories={categories} loading={loading} />
              </CardContent>
            </Card>
          </div>
          <div className="w-full lg:w-96 lg:flex-shrink-0">
            <div className="sticky top-6 space-y-4">
              <CoursePreview
                titleText=""
                thumbnailPreview=""
                descriptionText=""
              />
              <CheckList />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
