import { Button } from "./button"
import DiscussionCard from "./DiscussionCard"

export default function RecentDiscussion() {
  return (
    <>
      <div className="mb-4 flex justify-between">
        <h2 className="font-bold">Recent Discussions</h2>
        <Button className="rounded font-bold hover:bg-blue-700 hover:text-white">
          View all
        </Button>
      </div>
      <DiscussionCard />
    </>
  )
}
