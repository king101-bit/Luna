import { Code, Menu, X } from "lucide-react"
import Link from "next/link"
import { Button } from "./button"
import { useState } from "react"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <Link href="/" className="ml-14 flex items-center gap-2 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Luna</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              <div className="ml-14 flex gap-6">
                <Link
                  href="/courses"
                  className="text-slate-300 transition-colors hover:text-white"
                >
                  Courses
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-slate-300">
                  Login
                </Link>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400">
                  Get Started
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="text-slate-300 hover:text-white md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </nav>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="absolute left-0 right-0 top-20 z-50 border-t border-slate-800 bg-slate-900 p-4 shadow-lg md:hidden">
              <div className="flex flex-col gap-4">
                <Link
                  href="/features"
                  className="py-2 text-slate-300 transition-colors hover:text-white"
                >
                  Features
                </Link>
                <Link
                  href="/courses"
                  className="py-2 text-slate-300 transition-colors hover:text-white"
                >
                  Courses
                </Link>
                <Link
                  href="/pricing"
                  className="py-2 text-slate-300 transition-colors hover:text-white"
                >
                  Pricing
                </Link>
                <Link
                  href="/community"
                  className="py-2 text-slate-300 transition-colors hover:text-white"
                >
                  Community
                </Link>
                <div className="flex flex-col gap-3 border-t border-slate-800 pt-4">
                  <Button variant="outline" className="justify-center">
                    Log in
                  </Button>
                  <Button className="justify-center bg-gradient-to-r from-blue-600 to-blue-500">
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
  )
}

export default Navbar
