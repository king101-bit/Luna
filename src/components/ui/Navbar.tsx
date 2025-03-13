import { Code, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 ml-14 text-white">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Luna</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex gap-6 ml-14">
                <Link
                  href="/courses"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Courses
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" className="text-slate-300">
                  Log in
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400">
                  Get Started
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-slate-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 right-0 bg-slate-900 border-t border-slate-800 p-4 shadow-lg z-50">
              <div className="flex flex-col gap-4">
                <Link
                  href="/features"
                  className="text-slate-300 hover:text-white transition-colors py-2"
                >
                  Features
                </Link>
                <Link
                  href="/courses"
                  className="text-slate-300 hover:text-white transition-colors py-2"
                >
                  Courses
                </Link>
                <Link
                  href="/pricing"
                  className="text-slate-300 hover:text-white transition-colors py-2"
                >
                  Pricing
                </Link>
                <Link
                  href="/community"
                  className="text-slate-300 hover:text-white transition-colors py-2"
                >
                  Community
                </Link>
                <div className="flex flex-col gap-3 pt-4 border-t border-slate-800">
                  <Button variant="outline" className="justify-center">
                    Log in
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-500 justify-center">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      ;
    </>
  );
};

export default Navbar;
