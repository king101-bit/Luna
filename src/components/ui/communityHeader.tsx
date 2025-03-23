import { Button } from "./button"
import {
  Bold,
  Code,
  HelpCircle,
  Image,
  Italic,
  Link2,
  List,
  PlusCircle,
  Send,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "./label"
import { Input } from "./input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import { Textarea } from "./textarea"

export const CommunityHeader = () => {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold">Community</h1>
        <p className="mt-1 text-muted-foreground">
          Connect with fellow learners and instructors
        </p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            New Discussion
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Create New Discussion
            </DialogTitle>
            <DialogDescription>
              Share your thoughts, questions, or insights with the Luna
              community.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base">
                Title
              </Label>
              <Input
                id="title"
                placeholder="What's your discussion about?"
                className="text-base"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-base">
                Tags (up to 5)
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="tags"
                  placeholder="Add tags separated by comma or enter"
                  className="flex-1"
                />
                <Button type="button" variant="outline">
                  Add
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content" className="text-base">
                Content
              </Label>

              <Tabs defaultValue="write" className="w-full">
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="write">Write</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>

                  <div className="flex items-center space-x-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      title="Bold"
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      title="Italic"
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      title="Code"
                    >
                      <Code className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      title="Link"
                    >
                      <Link2 className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      title="Image"
                    >
                      <Image className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      title="List"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      title="Help"
                    >
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <TabsContent value="write" className="mt-2">
                  <Textarea
                    id="content"
                    placeholder="Share your thoughts, questions, or insights..."
                    className="min-h-[200px] resize-y font-mono text-base"
                    required
                  />
                </TabsContent>
                <TabsContent value="preview" className="mt-2">
                  <h1>Nothing to preview</h1>
                </TabsContent>{" "}
              </Tabs>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>
                You can use Markdown to format your content.{" "}
                <a href="#" className="text-primary hover:underline">
                  Learn more
                </a>
              </p>
            </div>

            <DialogFooter className="flex items-center justify-between sm:justify-between">
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="button" variant="secondary">
                  Save as Draft
                </Button>
              </div>

              <Button type="submit">
                <Send className="mr-2 h-4 w-4" />
                Post Discussion
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
