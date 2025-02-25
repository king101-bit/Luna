"use client";
import { Code } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

const Navbar = () => {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b border-gray-800 bg-[#111827]">
      {/* Logo */}
      <Link className="flex items-center" href="#">
        <Code className="h-6 w-6 text-blue-400" />
        <span className="ml-2 text-2xl font-bold font-mono text-white">
          Luna
        </span>
      </Link>

      {/* Navigation Links */}
      <nav className="flex items-center gap-6">
        <Link
          className="text-sm font-medium text-white hover:text-blue-400 transition-colors"
          href="#features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium text-white hover:text-blue-400 transition-colors"
          href="#courses"
        >
          Courses
        </Link>
        <Button className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md">
          Get Started
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
