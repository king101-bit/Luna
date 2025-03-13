"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Database, Server, Globe, Lock } from "lucide-react";
import Sidebar from "@/components/ui/sidebar";
import Link from "next/link";

const courses = [
  {
    id: "responsive-web-design",
    title: "Responsive Web Design",
    description: "Learn HTML, CSS, and responsive design principles",
    category: "Frontend",
    level: "Beginner",
    duration: "40 hours",
    progress: 60,
    icon: Globe,
    locked: false,
  },
  {
    id: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    description: "Master the basics of JavaScript programming",
    category: "Frontend",
    level: "Beginner",
    duration: "50 hours",
    progress: 0,
    icon: Code,
    locked: false,
  },
  {
    id: "introduction-to-databases",
    title: "Introduction to Databases",
    description: "Understand database concepts and SQL",
    category: "Backend",
    level: "Intermediate",
    duration: "30 hours",
    progress: 0,
    icon: Database,
    locked: false,
  },
  {
    id: "react-basics",
    title: "React Basics",
    description: "Build interactive UIs with React",
    category: "Frontend",
    level: "Intermediate",
    duration: "45 hours",
    progress: 0,
    icon: Code,
    locked: true,
  },
  {
    id: "nodejs-essentials",
    title: "Node.js Essentials",
    description: "Server-side JavaScript with Node.js",
    category: "Backend",
    level: "Intermediate",
    duration: "35 hours",
    progress: 0,
    icon: Server,
    locked: true,
  },
];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || course.category === selectedCategory),
  );

  return (
    <>
      <div className="flex">
        <Sidebar />
        {/*Main content */}
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
          <h1 className="text-3xl font-bold mb-6">Explore Courses</h1>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
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
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course, index) => (
              <Link key={index} href={`/courses/${course.id}`} passHref>
                <Card className={course.locked ? "opacity-75" : ""}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <course.icon className="h-5 w-5" />
                      {course.title}
                      {course.locked && (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">{course.category}</Badge>
                      <Badge variant="secondary">{course.level}</Badge>
                      <Badge variant="secondary">{course.duration}</Badge>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-2">
                      {course.progress}% complete
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" disabled={course.locked}>
                      {course.progress > 0 ? "Continue" : "Start"} Course
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <p className="text-center text-muted-foreground mt-8">
              No courses found. Try adjusting your search or filters.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
