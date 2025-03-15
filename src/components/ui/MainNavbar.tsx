"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Flame } from "lucide-react";
import { UserAvatar } from "@/components/ui/UserAvatar";
import useUserStore from "@/stores/UserStore";
import Link from "next/link";

export const MainNavbar = () => {
  const { user } = useUserStore();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <div className="flex flex-1 items-center justify-between gap-4">
        {/* Logo and Brand Name */}
        <Link href="/" className="flex items-center gap-2 text-white">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <Code className="w-5 h-5 text-white" />
          </div>
        </Link>

        {/* Right Side: Buttons and Avatar */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="relative">
            <Flame className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
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
  );
};
