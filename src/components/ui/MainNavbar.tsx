"use client"

import { Bell, Menu, Scroll, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserAvatar } from "@/components/ui/UserAvatar"
import useUserStore from "@/stores/UserStore"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import LunaLogo from "./LunaLogo"

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
    <header className="sticky left-0 right-0 top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
      <div className="flex items-center gap-2 p-8">
        <Link href="/dashboard" className="flex items-center gap-2">
          <LunaLogo />
        </Link>
      </div>
      {/* Center: Navigation Links */}
      <nav className="hidden md:absolute md:left-1/2 md:top-1/2 md:flex md:-translate-x-1/2 md:-translate-y-1/2 md:transform md:items-center md:gap-8">
        <Link
          href="/dashboard"
          className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            isActive("/dashboard")
              ? "font-semibold text-foreground"
              : "text-muted-foreground hover:text-foreground/90"
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/courses"
          className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            isActive("/courses")
              ? "font-semibold text-foreground"
              : "text-muted-foreground hover:text-foreground/90"
          }`}
        >
          Courses
        </Link>
        <Link
          href="/community"
          className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            isActive("/community")
              ? "font-semibold text-foreground"
              : "text-muted-foreground hover:text-foreground/90"
          }`}
        >
          Community
        </Link>
      </nav>
      {/* Right Side: User Controls */}
      <div className="flex items-center gap-4">
        {/* Hamburger Menu for Mobile */}
        <button
          className="text-gray-500 transition-colors hover:text-gray-900 md:hidden"
          onClick={toggleMenu}
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="absolute left-0 right-0 top-16 z-20 block border-t bg-background py-2 transition-all duration-300 ease-in-out md:hidden">
            <div className="flex flex-col gap-1">
              <Link
                href="/dashboard"
                className={`block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive("/dashboard")
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground/90"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/courses"
                className={`block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive("/courses")
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground/90"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                href="/community"
                className={`block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive("/community")
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground/90"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </Link>
              {/* Other mobile links... */}
            </div>
          </nav>
        )}

        {/* Notification Bell and User Avatar */}
        <div className="flex items-center gap-3 p-8">
          <button className="text-white transition-colors hover:text-gray-300">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Bell className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mb-8 w-full" align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="">
                  <Scroll className="mr-2 h-4 w-4" />A New comment has been
                  added to your post.{" "}
                  <Link href={`/community/discussions/`}>
                    Click here to view.
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </button>
          <UserAvatar
            name={user?.user_metadata?.name || "User"}
            imageUrl={user?.user_metadata?.avatar_url}
            size={40}
            showDropdown={true}
          />
        </div>
      </div>
    </header>
  )
}
