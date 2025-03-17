"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { MainNavbar } from "@/components/ui/MainNavbar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserAvatar } from "@/components/ui/UserAvatar"
import useUserStore from "@/stores/UserStore"
import {
  Server,
  Calendar,
  Badge,
  Users,
  BadgeCheck,
  BookOpen,
  Clock,
  Edit2,
  Share2,
  Star,
  Award,
  ChevronRight,
  FileText,
  MessageSquare,
  Globe,
  Code,
  Database,
  Check,
} from "lucide-react"

export default function Profile() {
  const { user } = useUserStore()

  return (
    <>
      <MainNavbar />
      <main className="container mx-auto px-4 py-8">
        {/* Profile header */}
        <div className="relative mb-8">
          {/* Cover image */}
          <div className="h-48 overflow-hidden rounded-xl bg-gradient-to-r from-primary/80 to-primary md:h-64">
            <img
              src="/placeholder.svg?height=256&width=1200"
              alt="Cover"
              className="h-full w-full object-cover opacity-20"
            />
          </div>

          {/* Profile info */}
          <div className="absolute -bottom-16 left-0 right-0 px-4">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-end">
              <div className="mb-3">
                <UserAvatar
                  name={user?.user_metadata?.name || "User"} // Fallback for name
                  imageUrl={user?.user_metadata?.avatar_url}
                />
              </div>
              <div className="flex-1 pb-2">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                  <h1 className="text-2xl font-bold text-gray-900">Jane Doe</h1>
                  <BadgeCheck className="w-fit text-blue-500"></BadgeCheck>
                </div>
                <p className="text-gray-500">
                  Frontend Developer | UX Enthusiast
                </p>
              </div>

              <div className="flex gap-2 pb-2">
                <Button size="sm" variant="outline" className="gap-1">
                  <Edit2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Edit Profile</span>
                </Button>
                <Button size="sm" className="gap-1">
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Share Profile</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content tabs */}
        <Tabs defaultValue="dashboard" className="mt-24 w-full">
          <TabsList className="mb-6 w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="dashboard"
              className="rounded-none px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="rounded-none px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              My Courses
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="rounded-none px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Achievements
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-none px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-0 space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Left column */}
              <div className="space-y-6 lg:col-span-2">
                {/* Learning path */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Your Learning Path</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-primary"
                      >
                        View all <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative border-l border-gray-200 pl-6">
                      {/* Completed step */}
                      <div className="relative mb-6">
                        <div className="absolute -left-[25px] top-0 h-4 w-4 rounded-full border-4 border-primary/20 bg-primary"></div>
                        <h3 className="font-medium text-gray-900">
                          HTML & CSS Basics
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Completed on March 15, 2023
                        </p>
                        <Check className="mt-2 bg-green-50 text-green-700 hover:bg-green-100">
                          Completed
                        </Check>
                      </div>

                      {/* Current step */}
                      <div className="relative mb-6">
                        <div className="absolute -left-[25px] top-0 h-4 w-4 rounded-full border-4 border-primary/20 bg-primary"></div>
                        <h3 className="font-medium text-gray-900">
                          Responsive Web Design
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          In progress - 60% completed
                        </p>
                        <div className="mb-1 mt-2">
                          <Progress value={60} className="h-2" />
                        </div>
                        <Button size="sm" variant="outline" className="mt-2">
                          Continue
                        </Button>
                      </div>

                      {/* Next step */}
                      <div className="relative mb-6">
                        <div className="absolute -left-[25px] top-0 h-4 w-4 rounded-full border-4 border-gray-100 bg-gray-300"></div>
                        <h3 className="font-medium text-gray-500">
                          JavaScript Fundamentals
                        </h3>
                        <p className="mt-1 text-sm text-gray-400">
                          Next in your path
                        </p>
                        <Badge variant="outline" className="mt-2 text-gray-500">
                          Coming up
                        </Badge>
                      </div>

                      {/* Future step */}
                      <div className="relative">
                        <div className="absolute -left-[25px] top-0 h-4 w-4 rounded-full border-4 border-gray-100 bg-gray-300"></div>
                        <h3 className="font-medium text-gray-500">
                          React Basics
                        </h3>
                        <p className="mt-1 text-sm text-gray-400">
                          Unlock after JavaScript Fundamentals
                        </p>
                        <Badge variant="outline" className="mt-2 text-gray-500">
                          Locked
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent activity */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Activity</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-primary"
                      >
                        View all <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="rounded-lg bg-blue-50 p-2 text-blue-500">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            Completed lesson: CSS Grid Layout
                          </h4>
                          <p className="text-sm text-gray-500">
                            Today at 10:30 AM
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="rounded-lg bg-green-50 p-2 text-green-500">
                          <Award className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            Earned badge: CSS Master
                          </h4>
                          <p className="text-sm text-gray-500">
                            Yesterday at 3:45 PM
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="rounded-lg bg-amber-50 p-2 text-amber-500">
                          <MessageSquare className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            Commented on: Flexbox vs Grid
                          </h4>
                          <p className="text-sm text-gray-500">2 days ago</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="rounded-lg bg-purple-50 p-2 text-purple-500">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            Started course: JavaScript Fundamentals
                          </h4>
                          <p className="text-sm text-gray-500">3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                {/* Skills */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Skills Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">HTML</span>
                        <span className="text-sm text-gray-500">90%</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">CSS</span>
                        <span className="text-sm text-gray-500">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">JavaScript</span>
                        <span className="text-sm text-gray-500">40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">React</span>
                        <span className="text-sm text-gray-500">15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Node.js</span>
                        <span className="text-sm text-gray-500">5%</span>
                      </div>
                      <Progress value={5} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Weekly streak */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Weekly Streak</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div
                            className={`mb-1 ml-1 flex h-14 w-14 items-center justify-center rounded-full ${
                              i < 5
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {i === 4 ? (
                              <span className="text-sm font-bold">Today</span>
                            ) : (
                              <span className="text-sm font-medium">{day}</span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {i < 5 ? "✓" : ""}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                      <div>
                        <p className="text-sm text-gray-500">Current streak</p>
                        <p className="text-xl font-bold">12 days</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Longest streak</p>
                        <p className="text-xl font-bold">15 days</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Certificates */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Certificates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                      <div className="rounded-lg bg-green-50 p-2 text-green-500">
                        <Award className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">
                          HTML & CSS Fundamentals
                        </h4>
                        <p className="text-xs text-gray-500">
                          Issued on March 15, 2023
                        </p>
                      </div>
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                      <div className="rounded-lg bg-green-50 p-2 text-green-500">
                        <Award className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">
                          Responsive Web Design
                        </h4>
                        <p className="text-xs text-gray-500">
                          Issued on January 10, 2023
                        </p>
                      </div>
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="mt-0">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Course card 1 */}
              <Card className="overflow-hidden">
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Responsive Web Design"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge className="bg-primary/80 hover:bg-primary">
                      60% Complete
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Responsive Web Design
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Learn HTML, CSS, and responsive design principles
                      </p>
                    </div>
                    <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                      <Globe className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mb-2 mt-4">
                    <Progress value={60} className="h-2" />
                  </div>

                  <div className="my-4 flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                    >
                      Frontend
                    </Badge>
                    <Badge variant="outline" className="text-gray-600">
                      40 hours
                    </Badge>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">
                        Last activity:
                      </span>{" "}
                      Yesterday
                    </div>
                    <Button size="sm">Continue</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Course card 2 */}
              <Card className="overflow-hidden">
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="JavaScript Fundamentals"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge className="bg-amber-500/80 hover:bg-amber-500">
                      5% Complete
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        JavaScript Fundamentals
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Master the basics of JavaScript programming
                      </p>
                    </div>
                    <div className="rounded-lg bg-amber-100 p-2 text-amber-600">
                      <Code className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mb-2 mt-4">
                    <Progress value={5} className="h-2" />
                  </div>

                  <div className="my-4 flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                    >
                      Frontend
                    </Badge>
                    <Badge variant="outline" className="text-gray-600">
                      50 hours
                    </Badge>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">
                        Last activity:
                      </span>{" "}
                      Today
                    </div>
                    <Button size="sm">Continue</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Course card 3 */}
              <Card className="overflow-hidden">
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Introduction to Databases"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge className="bg-gray-500/80 hover:bg-gray-500">
                      Not Started
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Introduction to Databases
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Understand database concepts and SQL
                      </p>
                    </div>
                    <div className="rounded-lg bg-green-100 p-2 text-green-600">
                      <Database className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mb-2 mt-4">
                    <Progress value={0} className="h-2" />
                  </div>

                  <div className="my-4 flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-purple-50 text-purple-700 hover:bg-purple-100"
                    >
                      Backend
                    </Badge>
                    <Badge variant="outline" className="text-gray-600">
                      30 hours
                    </Badge>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">
                        Enrolled:
                      </span>{" "}
                      2 days ago
                    </div>
                    <Button size="sm">Start</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-0">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {/* Achievement cards */}
              {[
                {
                  title: "First Course Completed",
                  description: "Completed your first course",
                  icon: Award,
                  color: "primary",
                  earned: true,
                },
                {
                  title: "7-Day Streak",
                  description: "Learned for 7 days in a row",
                  icon: Clock,
                  color: "primary",
                  earned: true,
                },
                {
                  title: "Frontend Master",
                  description: "Complete all Frontend courses",
                  icon: Globe,
                  color: "gray",
                  earned: false,
                  progress: "2/5 Courses",
                },
                {
                  title: "Backend Explorer",
                  description: "Complete your first Backend course",
                  icon: Server,
                  color: "gray",
                  earned: false,
                  progress: "0/1 Courses",
                },
                {
                  title: "30-Day Streak",
                  description: "Learn for 30 days in a row",
                  icon: Calendar,
                  color: "gray",
                  earned: false,
                  progress: "12/30 Days",
                },
                {
                  title: "Knowledge Seeker",
                  description: "Complete 5 courses in total",
                  icon: BookOpen,
                  color: "gray",
                  earned: false,
                  progress: "1/5 Courses",
                },
                {
                  title: "Community Helper",
                  description: "Answer 10 questions in the forum",
                  icon: Users,
                  color: "gray",
                  earned: false,
                  progress: "3/10 Answers",
                },
                {
                  title: "Perfect Score",
                  description: "Get 100% on any course quiz",
                  icon: Star,
                  color: "gray",
                  earned: false,
                  progress: "Best: 90%",
                },
              ].map((achievement, i) => (
                <Card
                  key={i}
                  className={`overflow-hidden border ${achievement.earned ? "border-primary/20" : "border-gray-200"}`}
                >
                  <div
                    className={`h-1 w-full ${achievement.earned ? "bg-primary" : "bg-gray-200"}`}
                  ></div>
                  <CardContent className="flex flex-col items-center p-5 text-center">
                    <div
                      className={`rounded-full p-3 ${
                        achievement.earned
                          ? "bg-primary/10 text-primary"
                          : "bg-gray-100 text-gray-400"
                      } mb-3`}
                    >
                      {achievement.icon && (
                        <achievement.icon className="h-6 w-6" />
                      )}
                    </div>
                    <h3
                      className={`font-semibold ${achievement.earned ? "" : "text-gray-500"}`}
                    >
                      {achievement.title}
                    </h3>
                    <p className="mb-3 mt-1 text-xs text-gray-500">
                      {achievement.description}
                    </p>

                    {achievement.earned ? (
                      <Badge className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/20">
                        Earned
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-400">
                        {achievement.progress}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Left column - Account settings */}
              <div className="space-y-6 lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <input
                          type="text"
                          className="w-full rounded-md border border-gray-300 px-3 py-2"
                          defaultValue="Jane Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Display Name
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-md border border-gray-300 px-3 py-2"
                          defaultValue="Jane"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <input
                        type="email"
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                        defaultValue="jane.doe@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bio</label>
                      <textarea
                        className="min-h-[100px] w-full rounded-md border border-gray-300 px-3 py-2"
                        defaultValue="Frontend developer with 3 years of experience, passionate about creating intuitive user interfaces. Currently focusing on mastering React and exploring backend technologies to become a full-stack developer."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Profile Picture
                      </label>
                      <div className="flex items-center gap-4">
                        <UserAvatar
                          name={user?.user_metadata?.name || "User"} // Fallback for name
                          imageUrl={user?.user_metadata?.avatar_url}
                        />
                        <Button size="sm" variant="outline">
                          Change
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Update your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Update Password</Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Right column - Preferences and notifications */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>
                      Customize your learning experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Dark Mode</h4>
                        <p className="text-sm text-gray-500">
                          Switch between light and dark themes
                        </p>
                      </div>
                      <div className="relative h-6 w-11 rounded-full bg-gray-200">
                        <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-gray-500">
                          Receive course updates via email
                        </p>
                      </div>
                      <div className="relative h-6 w-11 rounded-full bg-primary">
                        <div className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Learning Reminders</h4>
                        <p className="text-sm text-gray-500">
                          Daily reminders to continue learning
                        </p>
                      </div>
                      <div className="relative h-6 w-11 rounded-full bg-primary">
                        <div className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Subscription</CardTitle>
                    <CardDescription>
                      Manage your subscription plan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-semibold">Pro Plan</h3>
                        <Badge className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/20">
                          Active
                        </Badge>
                      </div>
                      <p className="mb-2 text-sm text-gray-600">
                        Unlimited access to all courses and features
                      </p>
                      <p className="text-sm font-medium">$15.99 / month</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Next billing date</h4>
                        <p className="text-sm text-gray-500">April 15, 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Linked Accounts</CardTitle>
                    <CardDescription>
                      Connect your social accounts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Facebook</h4>
                          <p className="text-sm text-gray-500">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Twitter</h4>
                          <p className="text-sm text-gray-500">Connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-gray-100 p-2 text-gray-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">GitHub</h4>
                          <p className="text-sm text-gray-500">Connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}
