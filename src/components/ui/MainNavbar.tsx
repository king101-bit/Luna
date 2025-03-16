"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Flame } from "lucide-react"
import { UserAvatar } from "@/components/ui/UserAvatar"
import useUserStore from "@/stores/UserStore"

export const MainNavbar = () => {
  const { user } = useUserStore()

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <div className="flex flex-1 items-center justify-between gap-4">
        {/* Right Side: Buttons and Avatar */}
        <div className="ml-auto flex flex-row items-center gap-4">
          <Button variant="outline" size="icon" className="relative">
            <Flame className="h-5 w-5" />
            <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0">
              7
            </Badge>
          </Button>
          <UserAvatar
            name={user?.user_metadata?.name || "User"} // Fallback for name
            imageUrl={user?.user_metadata?.avatar_url}
          />
        </div>
      </div>
    </header>
  )
}
