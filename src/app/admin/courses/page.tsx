"use client"

import AdminHeader from "@/components/ui/AdminHeader"
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
import { Copy, Edit, Ellipsis, Eye, Trash2 } from "lucide-react"

export default function CoursesAdminPage() {
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
              <TableRow>
                <TableCell className="font-medium">
                  Responsive Web Design
                </TableCell>
                <TableCell>Frontend</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-600">
                    Beginner
                  </Badge>
                </TableCell>
                <TableCell>Alex Johnson</TableCell>
                <TableCell className="text-right">1,245</TableCell>
                <TableCell>
                  {" "}
                  <Badge className="bg-blue-100 text-blue-600">Published</Badge>
                </TableCell>
                <TableCell>10/15/2023</TableCell>
                <TableCell>
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
              <TableRow>
                <TableCell className="font-medium">
                  JavaScript Fundamentals{" "}
                </TableCell>
                <TableCell>Frontend</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-600">
                    Beginner
                  </Badge>
                </TableCell>
                <TableCell>Sarah Miller</TableCell>
                <TableCell className="text-right">2,130</TableCell>
                <TableCell>
                  {" "}
                  <Badge className="bg-blue-100 text-blue-600">Published</Badge>
                </TableCell>
                <TableCell>11/2/2023</TableCell>
                <TableCell>
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
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  )
}
