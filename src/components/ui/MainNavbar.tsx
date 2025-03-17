"use client"

import { Bell, Code } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserAvatar } from "@/components/ui/UserAvatar"
import useUserStore from "@/stores/UserStore"

export const MainNavbar = () => {
  const { user } = useUserStore()
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 sm:px-6">
      {/* Left Side: Logo */}
      <div className="flex items-center gap-2">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-purple-500">
            <Code className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold">Luna</span>
        </Link>
      </div>

      {/* Right Side: Navigation and User Avatar */}
      <div className="flex items-center gap-4">
        {/* Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors ${
              isActive("/dashboard")
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/courses"
            className={`text-sm font-medium transition-colors ${
              isActive("/courses")
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Courses
          </Link>
          <Link
            href="/profile"
            className={`text-sm font-medium transition-colors ${
              isActive("/profile")
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Profile
          </Link>
          <Link
            href="/community"
            className={`text-sm font-medium transition-colors ${
              isActive("/community")
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Community
          </Link>
        </nav>

        {/* Notification Bell and User Avatar */}
        <div className="flex items-center gap-3">
          <button className="text-gray-500 transition-colors hover:text-gray-900">
            <Bell className="h-5 w-5" />
          </button>
          <UserAvatar
            name={user?.user_metadata?.name || "User"}
            imageUrl={user?.user_metadata?.avatar_url}
          />
        </div>
      </div>
    </header>
  )
}
