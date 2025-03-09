"use client"; // Required for client-side interactivity

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Shadcn UI Dropdown
import { Avatar, AvatarImage } from "@/components/ui/avatar"; // Shadcn UI Avatar
import BoringAvatar from "boring-avatars";
import { useRouter } from "next/navigation"; // For navigation
import { signout } from "@/lib/auth-actions"; // Import the signout function
import toast from "react-hot-toast"; // For toast notifications

interface UserAvatarProps {
  name: string; // User's name for the fallback avatar
  imageUrl?: string; // Optional user image URL
}

export function UserAvatar({ name, imageUrl }: UserAvatarProps) {
  const router = useRouter();

  // Handle logout action
  const handleLogout = async () => {
    try {
      await signout(); // Call the signout function from auth-actions.ts
      toast.success("Logged out successfully!"); // Show success toast
      router.push("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again."); // Show error toast
    }
  };

  // Handle profile action
  const handleProfile = () => {
    console.log("Navigating to profile...");
    router.push("/profile"); // Redirect to profile page
  };

  return (
    <DropdownMenu>
      {/* Dropdown Trigger */}
      <DropdownMenuTrigger asChild>
        {imageUrl ? (
          <Avatar className="cursor-pointer hover:opacity-80">
            {/* User Image */}
            <AvatarImage
              src={imageUrl}
              alt={name}
              onError={(e) => (e.currentTarget.style.display = "none")} // Hide image on error
            />
          </Avatar>
        ) : (
          <BoringAvatar
            size={32} // Matches your existing size
            name={name} // Dynamic name
            variant="marble" // Options: "marble", "beam", "pixel", "sunset", "ring", "bauhaus"
            colors={["#E63946", "#F1FAEE", "#A8DADC", "#457B9D", "#1D3557"]}
          />
        )}
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuItem onSelect={handleProfile}>Profile</DropdownMenuItem>
        <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
