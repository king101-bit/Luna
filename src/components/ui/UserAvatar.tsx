"use client"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import BoringAvatar from "boring-avatars"
import { useRouter } from "next/navigation"
import { signout } from "@/lib/auth-actions"
import toast from "react-hot-toast"

interface UserAvatarProps {
  name: string
  imageUrl?: string
  size?: number
  showDropdown?: boolean
  className?: string
}

export function UserAvatar({
  name,
  imageUrl,
  size = 35,
  showDropdown = false,
  className = "",
}: UserAvatarProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signout()
      toast.success("Logged out successfully!")
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
      toast.error("Logout failed. Please try again.")
    }
  }

  const avatar = imageUrl ? (
    <Avatar
      className={`hover:opacity-80 ${className}`}
      style={{ width: size, height: size }}
    >
      <AvatarImage
        src={imageUrl}
        alt={name}
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
    </Avatar>
  ) : (
    <BoringAvatar
      size={size}
      name={name}
      variant="marble"
      colors={["#E63946", "#F1FAEE", "#A8DADC", "#457B9D", "#1D3557"]}
      className={className}
    />
  )

  return showDropdown ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={`cursor-pointer`}>{avatar}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    avatar
  )
}
