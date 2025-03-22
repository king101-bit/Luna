import { CommunityHeader } from "@/components/ui/communityHeader"
import { CommunitySearch } from "@/components/ui/communitySearch"
import { MainNavbar } from "@/components/ui/MainNavbar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Community | Luna",
  description:
    "Connect with fellow learners and instructors in the Luna coding community",
}

export default function CommunityPage() {
  return (
    <>
      <MainNavbar />
      <div className="container mx-auto p-4 py-8">
        <CommunityHeader />
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <CommunitySearch />
            </div>

            {/* <Suspense fallback={<DiscussionListSkeleton />}>
                    <DiscussionList />
                  </Suspense> */}
          </div>

          <div className="space-y-8">
            {/* <Suspense fallback={<Skeleton className="h-[300px] w-full rounded-lg" />}>
                    <PopularTags />
                  </Suspense>

                  <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-lg" />}>
                    <ActiveMembers />
                  </Suspense> */}
          </div>
        </div>
      </div>
    </>
  )
}
