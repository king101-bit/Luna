import ActivityStream from "@/components/ui/ActivityStream"
import { CommunityHeader } from "@/components/ui/communityHeader"
import { CommunitySearch } from "@/components/ui/communitySearch"
import DiscussionList from "@/components/ui/DiscussionList"
import { MainNavbar } from "@/components/ui/MainNavbar"
import { PopularTags } from "@/components/ui/PopularTags"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Community | Luna",
  description:
    "Connect with fellow learners and instructors in the Luna coding community",
}

export default function CommunityPage() {
  return (
    <>
      <MainNavbar />
      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <CommunityHeader />
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <Suspense fallback={<div>Loading search...</div>}>
                <CommunitySearch />
              </Suspense>
            </div>

            <Suspense fallback={<div>Loading discussions...</div>}>
              <DiscussionList />
            </Suspense>
          </div>

          <div className="space-y-8">
            <PopularTags />
            <ActivityStream />
          </div>
        </div>
      </div>
    </>
  )
}
