"use client"
import { useState, useEffect } from "react"
import { use } from "react" // Import the `use` function
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Loader2,
  Play,
  Star,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { MainNavbar } from "@/components/ui/MainNavbar"

// Define the type for the params prop
interface PageProps {
  params: Promise<{ courseId: string }>
}

export default function CourseDetailPage({ params }: PageProps) {
  const [course, setCourse] = useState<(typeof courses)[0] | null>(null)

  // Use `React.use()` to unwrap the params Promise
  const { courseId } = use(params)

  useEffect(() => {
    // Find the course by matching the courseId
    const foundCourse = courses.find((c) => c.id.toString() === courseId)
    if (foundCourse) {
      setCourse(foundCourse)
    }
  }, [courseId])

  if (!course) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <>
      <MainNavbar />
      <div className="flex flex-1">
        <div className="container px-4 py-10">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div>
                <h1 className="mb-2 text-3xl font-bold tracking-tight">
                  {course.title}
                </h1>
                <p className="mb-4 text-muted-foreground">
                  {course.description}
                </p>
                <div className="mb-6 flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="ml-1 text-muted-foreground">
                      ({course.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>Last updated {course.lastUpdated}</span>
                  </div>
                </div>

                <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={course.image || "/globe.svg"}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" className="rounded-full">
                      <Play className="mr-2 h-4 w-4 fill-current" />
                      Watch Preview
                    </Button>
                  </div>
                </div>
              </div>

              {/* Rest of your JSX remains the same */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h2 className="mb-2 text-xl font-bold">
                      About This Course
                    </h2>
                    <p className="text-muted-foreground">
                      {course.longDescription}
                    </p>
                  </div>

                  <div>
                    <h2 className="mb-2 text-xl font-bold">
                      What You&apos;ll Learn
                    </h2>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {course.learningOutcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="mb-2 text-xl font-bold">Requirements</h2>
                    <ul className="space-y-1">
                      {course.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                          {requirement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="curriculum">
                  <div className="space-y-4">
                    <h2 className="mb-2 text-xl font-bold">Course Content</h2>
                    <div className="mb-4 text-sm text-muted-foreground">
                      {course.sections.length} sections • {course.totalLessons}{" "}
                      lessons • {course.duration} total length
                    </div>

                    <Accordion type="multiple" className="w-full">
                      {course.sections.map((section, index) => (
                        <AccordionItem key={index} value={`section-${index}`}>
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex flex-col items-start text-left">
                              <div>{section.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {section.lessons.length} lessons •{" "}
                                {section.duration}
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 pt-2">
                              {section.lessons.map((lesson, lessonIndex) => (
                                <div
                                  key={lessonIndex}
                                  className="flex items-center justify-between rounded-md p-2 hover:bg-muted"
                                >
                                  <div className="flex items-center">
                                    {lesson.type === "video" ? (
                                      <Play className="mr-2 h-4 w-4 text-muted-foreground" />
                                    ) : (
                                      <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                                    )}
                                    <span>{lesson.title}</span>
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {lesson.duration}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>

                <TabsContent value="instructor">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full">
                        <Image
                          src={
                            course.instructor.avatar ||
                            "/placeholder.svg?height=64&width=64"
                          }
                          alt={course.instructor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">
                          {course.instructor.name}
                        </h2>
                        <p className="text-muted-foreground">
                          {course.instructor.title}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-1 font-medium">About the Instructor</h3>
                      <p className="text-muted-foreground">
                        {course.instructor.bio}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold">{course.rating}</div>
                      <div className="space-y-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${star <= Math.floor(course.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Course Rating • {course.reviews} Reviews
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {course.reviewExamples.map((review, index) => (
                        <div
                          key={index}
                          className="border-b pb-4 last:border-0"
                        >
                          <div className="mb-2 flex items-center gap-2">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src={
                                  review.avatar ||
                                  "/placeholder.svg?height=32&width=32"
                                }
                                alt={review.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{review.name}</div>
                              <div className="flex text-muted-foreground">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-3 w-3 ${star <= review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold">
                    {course.free ? "Free" : `$${course.price}`}
                  </CardTitle>
                  <CardDescription>
                    {course.free ? (
                      "Enroll for free access"
                    ) : course.discount ? (
                      <span className="flex items-center">
                        <span className="mr-2 text-muted-foreground line-through">
                          ${course.originalPrice}
                        </span>
                        <Badge
                          variant="outline"
                          className="bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-500"
                        >
                          {Math.round(
                            ((course.originalPrice - course.price) /
                              course.originalPrice) *
                              100
                          )}
                          % off
                        </Badge>
                      </span>
                    ) : null}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" size="lg">
                    {course.enrolled ? "Continue Learning" : "Enroll Now"}
                  </Button>

                  {!course.free && (
                    <Button variant="outline" className="w-full">
                      Try For Free
                    </Button>
                  )}

                  <div className="text-sm text-muted-foreground">
                    <div className="mb-1 font-medium text-foreground">
                      This course includes:
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <BookOpen className="mr-2 h-4 w-4" />
                        {course.totalLessons} lessons
                      </li>
                      <li className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        {course.duration} of video content
                      </li>
                      <li className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        {course.resources} downloadable resources
                      </li>
                      <li className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        Full lifetime access
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Sample data
const courses = [
  {
    id: 1, // Unique ID
    title: "Introduction to Web Development",
    description:
      "Learn the fundamentals of web development including HTML, CSS, and JavaScript.",
    longDescription:
      "This comprehensive course will take you from beginner to proficient in web development...",
    image: "/placeholder.svg?height=450&width=800",
    duration: "20 hours",
    students: 1543,
    rating: 4.8,
    reviews: 325,
    price: 49.99,
    originalPrice: 199.99,
    discount: true,
    free: false,
    enrolled: true,
    popular: true,
    new: false,
    lastUpdated: "March 2023",
    resources: 15,
    totalLessons: 42,
    learningOutcomes: [
      "Build responsive websites using HTML5 and CSS3",
      "Create interactive web pages with JavaScript",
      "Understand web development principles and best practices",
      "Deploy websites to production environments",
      "Optimize websites for performance and SEO",
      "Debug and troubleshoot common web development issues",
    ],
    requirements: [
      "No prior programming experience required",
      "Basic computer skills",
      "A computer with internet access",
    ],
    sections: [
      {
        title: "Getting Started with HTML",
        duration: "4 hours",
        lessons: [
          { title: "Introduction to HTML", duration: "10:15", type: "video" },
          {
            title: "HTML Document Structure",
            duration: "15:30",
            type: "video",
          },
          {
            title: "Working with Text Elements",
            duration: "12:45",
            type: "video",
          },
          { title: "HTML Forms and Inputs", duration: "20:10", type: "video" },
          {
            title: "HTML5 Semantic Elements",
            duration: "18:20",
            type: "video",
          },
          { title: "HTML Quiz", duration: "15 mins", type: "quiz" },
        ],
      },
      // Add more sections
    ],
    instructor: {
      name: "Sarah Johnson",
      title: "Senior Web Developer",
      bio: "Sarah has over 10 years of experience in web development...",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    reviewExamples: [
      {
        name: "John Doe",
        rating: 5,
        comment:
          "This course is amazing! I went from knowing nothing about web development to building my own website in just a few weeks.",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      // Add more reviews
    ],
  },
  // Add more courses
]
