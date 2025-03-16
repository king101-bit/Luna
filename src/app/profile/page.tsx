"use client"
import { Card, CardContent } from "@/components/ui/card"
import Sidebar from "@/components/ui/sidebar"
import { UserAvatar } from "@/components/ui/UserAvatar"
import useUserStore from "@/stores/UserStore"
import { Edit } from "lucide-react"

export default function Profile() {
  const { user } = useUserStore()

  return (
    <>
      <div className="flex flex-1">
        <Sidebar />
        <div className="container px-4 py-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <UserAvatar
                    name={user?.user_metadata?.name || "User"} // Fallback for name
                    imageUrl={user?.user_metadata?.avatar_url}
                  />
                  <button className="absolute bottom-0 right-0 rounded-full bg-primary p-1 text-white">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
                <h2 className="mt-4 text-xl font-bold">Jane Doe</h2>
                <p className="text-sm text-gray-500">Frontend Developer</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
