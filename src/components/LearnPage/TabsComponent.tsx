import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import DOMPurify from "dompurify"

interface TabsComponentProps {
  lesson: {
    id: string
    title: string
    content?: string
  } | null
}

export function TabsComponent({ lesson }: TabsComponentProps) {
  return (
    <Tabs defaultValue="lessoncontent" className="w-full">
      <TabsList className="h-10 rounded-lg bg-muted p-1">
        <TabsTrigger value="lessoncontent" className="rounded-md px-4">
          Lesson
        </TabsTrigger>
        <TabsTrigger value="notes" className="rounded-md px-4">
          Notes
        </TabsTrigger>
        <TabsTrigger value="resources" className="rounded-md px-4">
          Resources
        </TabsTrigger>
      </TabsList>

      <Separator className="mb-6 mt-4" />

      {/* Lesson Content */}
      <TabsContent value="lessoncontent" className="space-y-4">
        <h1 className="text-2xl font-bold">{lesson?.title}</h1>
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              lesson?.content || "<p>No content available.</p>"
            ),
          }}
        />
      </TabsContent>

      {/* Notes */}
      <TabsContent value="notes" className="mt-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Write Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Type your notes here..."
              rows={6}
              className="resize-none"
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="default">Save Notes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Resources */}
      <TabsContent value="resources" className="mt-6 space-y-4">
        <h2 className="text-xl font-semibold">Additional Resources</h2>
        <div className="space-y-3">
          {/* TODO: Replace with dynamic resource list */}
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                No resources added yet for this lesson.
              </p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}
