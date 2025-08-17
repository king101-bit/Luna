"use client"

import AdminHeader from "@/components/admin/AdminHeader"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MainNavbar } from "@/components/ui/MainNavbar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { createClient } from "@root/utils/supabase/client"
import { Copy, Edit, Ellipsis, Eye, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

export default function CoursesAdminPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from("courses").select("*")

      if (error) {
        console.error("Error fetching courses:", error)
      } else {
        setCourses(data)
      }

      setLoading(false)
    }

    fetchCourses()
  }, [])

  return (
    <>
      <MainNavbar />
      <AdminHeader
        title="Courses"
        description="Manage your courses and curriculum"
        actionButtonText="Add New Course"
        showActionButton={true}
        actionButtonRoute="/admin/courses/new"
        showSearch={true}
        showBackButton={false}
      />
      <main className="container mx-auto px-16 py-8">
        <div className="overflow-hidden rounded-xl shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Course</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead className="text-right">Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8}>Loading...</TableCell>
                </TableRow>
              ) : courses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8}>No courses found.</TableCell>
                </TableRow>
              ) : (
                courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">
                      {course.title}
                    </TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-600">
                        {course.level}
                      </Badge>
                    </TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell className="text-right">
                      {course.students_count ?? 0}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-600">
                        {course.is_published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(course.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Ellipsis className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="gap-2" align="end">
                          <DropdownMenuItem>
                            <Eye /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy /> Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 /> Delete{" "}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  )
}
