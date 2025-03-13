// pages/courses/[id].ts
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Server, Globe, Lock } from "lucide-react";

const courses = [
  // Same course data as above
];

export async function getServerSideProps({ params }) {
  // Find the course based on the id parameter
  const course = courses.find((course) => course.id === params.id);

  if (!course) {
    return {
      notFound: true, // Return a 404 page if the course is not found
    };
  }

  return {
    props: {
      course,
    },
  };
}

export default function CourseDetail({ course }) {
  const Icon = course.icon;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {course.title}
            {course.locked && <Lock className="h-4 w-4 text-muted-foreground" />}
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
        <CardContent>
          <Button className="w-full" disabled={course.locked}>
            {course.progress > 0 ? "Continue" : "Start"} Course
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
