"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Sidebar from "@/components/ui/sidebar";
import { Flame, BookOpen } from "lucide-react";
import UserGreetText from "@/components/ui/UserGreetText";
import { UserAvatar } from "@/components/ui/UserAvatar";

const DashboardPage = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";
    return "Good Night";
  };
  const [progress, setProgress] = useState(50);

  return (
    <>
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1">
          {/* Navbar */}
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center gap-4">
              <div className="ml-auto flex items-center gap-4">
                <Button variant="outline" size="icon" className="relative">
                  <Flame className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    7
                  </Badge>
                </Button>
                <UserAvatar
                  name="John Doe" // Dynamic name
                  imageUrl="/path/to/user-image.jpg"
                />
              </div>
            </div>
          </header>
          <main className="container mx-auto p-4 md:p-6 lg:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight">
                <span>
                  {getGreeting()},
                  <UserGreetText />
                </span>
              </h2>
              <p className="text-muted-foreground">
                Continue your learning journey where you left off.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/*Progress Card */}
              <Card className="col-span-full lg:col-span-2">
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>
                    You&apos;ve completed {progress}% of your current path
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={progress} className="h-2" />

                    <div className="grid grid-cols-3 gap-4 pt-2">
                      <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-3 shadow-sm">
                        <div className="text-xl font-bold">12</div>
                        <div className="text-sm font-semibold text-muted-foreground">
                          Lessons
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-3 shadow-sm">
                        <div className="text-xl font-bold">5</div>
                        <div className="text-sm font-semibold text-muted-foreground">
                          Challenges
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-3 shadow-sm">
                        <div className="text-xl font-bold">7</div>
                        <div className="text-sm font-semibold text-muted-foreground">
                          Day Streak
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => setProgress(Math.min(progress + 1, 100))}
                  >
                    Continue Learning
                  </Button>
                </CardFooter>
              </Card>
              <Card className="col-span-full md:col-span-1">
                <CardHeader>
                  <CardTitle>Continue Learning</CardTitle>
                  <CardDescription>Your current course</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="rounded-md bg-primary/10 p-4 flex items-center gap-4">
                      <BookOpen className="h-8 w-8 text-primary"></BookOpen>
                      <div>
                        <h3 className="font-medium font-sans">
                          Responsive Web Design
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Module 3 of 5
                        </p>
                      </div>
                    </div>
                    <Progress value={50} className="h-2"></Progress>
                  </div>
                </CardContent>
                <CardFooter>
                  {" "}
                  <Button className="w-full">Resume Course</Button>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
