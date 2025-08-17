import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LearnPageSkeleton() {
  return (
    <div className="flex h-screen">
      {/* Sidebar skeleton */}
      <aside
        className="flex max-h-screen w-full max-w-md flex-col overflow-y-auto border-r bg-card p-4 sm:max-w-xs"
        style={{ minWidth: 250 }}
      >
        {/* Course title */}
        <Skeleton className="mb-4 h-6 w-3/4 rounded" />

        {/* Progress bar */}
        <Skeleton className="mb-2 h-3 w-full rounded" />
        <Progress value={40} className="mb-4 h-2" />

        {/* Search bar */}
        <Skeleton className="mb-4 h-8 w-full rounded" />

        {/* Module and lessons */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="mb-6">
            <Skeleton className="mb-2 h-5 w-1/2 rounded" />
            {[...Array(4)].map((__, j) => (
              <Skeleton key={j} className="mb-2 h-6 w-full rounded" />
            ))}
          </div>
        ))}
      </aside>

      {/* Main content skeleton */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header skeleton */}
        <div className="sticky top-0 z-20 border-b bg-background/80 p-4">
          <Skeleton className="h-8 w-1/3 rounded" />
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="content">
            <TabsList>
              <TabsTrigger value="content" disabled>
                <Skeleton className="h-6 w-24 rounded" />
              </TabsTrigger>
              <TabsTrigger value="notes" disabled>
                <Skeleton className="h-6 w-24 rounded" />
              </TabsTrigger>
              <TabsTrigger value="resources" disabled>
                <Skeleton className="h-6 w-32 rounded" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="flex-1 overflow-auto p-6">
              <Skeleton className="mb-4 h-6 w-1/3 rounded" />
              <Skeleton className="mb-2 h-4 w-full rounded" />
              <Skeleton className="mb-2 h-4 w-full rounded" />
              <Skeleton className="mb-2 h-4 w-5/6 rounded" />
            </TabsContent>
          </Tabs>
        </main>

        {/* Footer skeleton */}
        <div className="border-t p-4">
          <div className="flex justify-between">
            <Skeleton className="h-8 w-20 rounded" />
            <Skeleton className="h-8 w-20 rounded" />
            <Skeleton className="h-8 w-24 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
