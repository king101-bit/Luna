"use client"

import { Bell, Code } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserAvatar } from "@/components/ui/UserAvatar"
import useUserStore from "@/stores/UserStore"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Button } from "./button"

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
        {/* Navigation Links */}
        <nav className="hidden items-center gap-6 md:flex">
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
      </div>

      {/* Right Side: Navigation and User Avatar */}
      <div className="flex items-center gap-4">
        {/* Notification Bell and User Avatar */}
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="Notifications"
              >
                <Bell className="h-10 w-10" />
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <DropdownMenuLabel>My Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <div>
                  <h3 className="text-sm">Notification 1</h3>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit...
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <div>
                  <h3 className="text-sm">Notification 2</h3>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit...
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <a
                  href="/notifications"
                  className="text-sm text-black hover:underline"
                >
                  View All Notifications
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UserAvatar
            name={user?.user_metadata?.name || "User"}
            imageUrl={user?.user_metadata?.avatar_url}
            size={40}
          />
        </div>
      </div>
    </header>
  )
}
