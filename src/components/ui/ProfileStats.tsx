import { BookOpen, Clock, MessageSquare, Users } from "lucide-react"
import { Card, CardContent } from "./card"

export default function ProfileStats() {
  return (
    <>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer shadow transition duration-200 hover:scale-[1.01] hover:shadow-lg">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <h3 className="font-medium">Learning</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completed Courses</span>
                <span className="font-medium">1</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">In progress</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Lessons Completed</span>
                <span className="font-medium">40</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer shadow transition duration-200 hover:scale-[1.01] hover:shadow-lg">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-500" />
              <h3 className="font-medium">Activity</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Minutes Learned</span>
                <span className="font-medium">1240</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Current Streak</span>
                <span className="font-medium">7 days</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Longest Streak</span>
                <span className="font-medium">14 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer shadow transition duration-200 hover:scale-[1.01] hover:shadow-lg">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-500" />
              <h3 className="font-medium">Community</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Discussions</span>
                <span className="font-medium">1</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Likes Received</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Badges Earned</span>
                <span className="font-medium">4</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer shadow transition duration-200 hover:scale-[1.01] hover:shadow-lg">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-amber-500" />
              <h3 className="font-medium">Network</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Followers</span>
                <span className="font-medium">128</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Following</span>
                <span className="font-medium">75</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Reputation</span>
                <span className="font-medium">742</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
