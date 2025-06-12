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

export function TabsComponent() {
  return (
    <Tabs defaultValue="lessoncontent">
      <TabsList className="h-10 rounded-lg p-2">
        <TabsTrigger value="lessoncontent" className="rounded-md">
          Lesson Content
        </TabsTrigger>
        <TabsTrigger value="notes" className="rounded-md">
          Notes
        </TabsTrigger>
        <TabsTrigger value="resources" className="rounded-md">
          Resources
        </TabsTrigger>
      </TabsList>
      <Separator className="mt-3" />
      <TabsContent value="lessoncontent"></TabsContent>
      <TabsContent className="mt-5" value="notes">
        <Card>
          <CardHeader>
            <CardTitle>Your Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="Type your notes here...." />
          </CardContent>
          <CardFooter className="items-end justify-end">
            <Button className="bg-accent text-white">Save Notes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent className="mt-5" value="resources">
        <h1 className="mb-3 text-xl">Additional Resources</h1>
        <div className="container space-y-3">
          {/* Add resource items here */}
        </div>
      </TabsContent>
    </Tabs>
  )
}
