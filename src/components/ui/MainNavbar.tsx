"use client"

import { Bell, Code, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserAvatar } from "@/components/ui/UserAvatar"
import useUserStore from "@/stores/UserStore"
import { useState } from "react"

export const MainNavbar = () => {
  const { user } = useUserStore()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
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
        {/* Hamburger Menu for Mobile */}
        <button
          className="text-gray-500 transition-colors hover:text-gray-900 md:hidden"
          onClick={toggleMenu}
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Navigation Links */}
        <nav
          className={`absolute left-0 right-0 top-16 z-20 bg-white transition-all duration-300 ease-in-out md:static md:flex md:items-center md:gap-8 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <Link
            href="/dashboard"
            className={`block px-4 py-2 text-sm font-medium transition-colors md:inline-block ${
              isActive("/dashboard")
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/courses"
            className={`block px-4 py-2 text-sm font-medium transition-colors md:inline-block ${
              isActive("/courses")
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Courses
          </Link>
          <Link
            href="/profile"
            className={`block px-4 py-2 text-sm font-medium transition-colors md:inline-block ${
              isActive("/profile")
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Profile
          </Link>
          <Link
            href="/community"
            className={`block px-4 py-2 text-sm font-medium transition-colors md:inline-block ${
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
            size={40}
          />
        </div>
      </div>
    </header>
  )
}
