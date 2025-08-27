"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PreviewPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <div className="flex gap-2">
                <div className="h-6 w-20 animate-pulse rounded bg-white/20" />
                <div className="h-6 w-16 animate-pulse rounded bg-white/20" />
              </div>
              <div className="h-10 w-3/4 animate-pulse rounded bg-white/30" />
              <div className="h-6 w-full animate-pulse rounded bg-white/20" />
              <div className="flex gap-6">
                <div className="h-6 w-24 animate-pulse rounded bg-white/20" />
                <div className="h-6 w-20 animate-pulse rounded bg-white/20" />
                <div className="h-6 w-28 animate-pulse rounded bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Side (Tabs + Content) */}
          <div className="space-y-6 lg:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
            </Tabs>

            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader className="h-8 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <CardContent className="space-y-3">
                  {[...Array(3)].map((_, j) => (
                    <div
                      key={j}
                      className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700"
                    />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card>
                <CardContent className="space-y-4 p-6">
                  <div className="aspect-video w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />

                  <div className="h-8 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

                  <div className="h-10 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

                  <div className="space-y-2 border-t pt-4">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700"
                      />
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex flex-wrap gap-2">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="h-6 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
