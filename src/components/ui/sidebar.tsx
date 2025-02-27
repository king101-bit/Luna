"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ Import usePathname
import { Code, Home, BookOpen, Award, Settings } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname(); // ✅ Get the current route

  return (
    <div className="hidden w-20 flex-col border-r bg-muted/40 md:flex">
      <div className="flex space-x-1 h-16 items-center justify-center border-b">
        <Code className="h-6 w-6 text-primary" />
        <span className="font-bold font-mono">Luna</span>
      </div>
      <div className="flex flex-1 flex-col items-center gap-4 py-6">
        <NavIcon
          icon={<Home className="h-5 w-5" />}
          href="/dashboard"
          active={pathname === "/dashboard"}
        />
        <NavIcon
          icon={<BookOpen className="h-5 w-5" />}
          href="/courses"
          active={pathname === "/courses"}
        />
        <NavIcon
          icon={<Award className="h-5 w-5" />}
          href="/achievements"
          active={pathname === "/achievements"}
        />
        <NavIcon
          icon={<Settings className="h-5 w-5" />}
          href="/settings"
          active={pathname === "/settings"}
        />
      </div>
    </div>
  );
};

const NavIcon = ({
  icon,
  href,
  active = false,
}: {
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}) => {
  return (
    <Link
      href={href}
      className={`p-2 rounded-lg transition-colors ${
        active ? "bg-gray-200 text-primary" : "hover:bg-gray-100"
      }`}
    >
      {icon}
    </Link>
  );
};

export default Sidebar;
