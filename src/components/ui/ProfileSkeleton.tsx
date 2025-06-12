import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ProfileSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <Card className="overflow-hidden border-0 shadow-md">
        <div className="relative h-40 w-full overflow-hidden rounded-t-lg"></div>
        <CardContent className="relative px-6 pb-6 pt-0">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="-mt-12">
              <Skeleton className="h-24 w-24 rounded-full" />
            </div>

            <div className="flex-1 space-y-4 pt-2">
              <div>
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="mt-2 h-4 w-[150px]" />
              </div>

              <Skeleton className="h-4 w-full max-w-[600px]" />
              <Skeleton className="h-4 w-full max-w-[400px]" />

              <div className="flex gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-5 w-24" />
                </div>

                <div className="space-y-3">
                  {Array(3)
                    .fill(0)
                    .map((_, j) => (
                      <div
                        key={j}
                        className="flex items-center justify-between"
                      >
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Tabs skeleton */}
      <div>
        <Skeleton className="mb-6 h-10 w-full max-w-md" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
            ))}
        </div>
      </div>
    </div>
  )
}
