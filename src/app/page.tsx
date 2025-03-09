"use client";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import Navbar from "../components/ui/Navbar";
import { Terminal, BookOpen, Users, Zap, Globe, Code } from "lucide-react";
import Link from "next/link";
import { Input } from "../components/ui/input";
import useAuthRedirect from "@/hook/useAuthRedirect";
const Page = () => {
  const user = useAuthRedirect();
  if (user.user) {
    return null;
  }

  return (
    <>
      <Navbar />
      <section className="w-full h-screen py-12 md:py-24 lg:py-32 xl:py-48 bg-[#111827]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <h1 className="text-3xl font-bold text-white tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Master Coding with <span className="text-blue-400">Luna</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                Learn to code through interactive lessons, real-world projects,
                and expert mentorship. Start your journey to becoming a
                professional developer today.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-x-4"
            >
              <Link href="/signup">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
              <Link href="/courses">
                <Button
                  variant="outline"
                  className="text-blue-400 bg-black border-blue-400 hover:bg-blue-400/10 hover:text-white"
                >
                  Explore Courses
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-800"
      >
        <div className="container px-4 md:px-6">
          <h1 className="text-white text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Why Choose Luna?
          </h1>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-3 text-center">
              <Terminal className="h-12 w-12 text-blue-400" />
              <h3 className="text-white text-xl font-bold">
                Interactive Coding Environment
              </h3>
              <p className="text-sm text-gray-400">
                Practice coding in real-time with our built-in IDE and instant
                feedback system.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <BookOpen className="h-12 w-12 text-green-400" />
              <h3 className="text-white text-xl font-bold">
                Comprehensive Curriculum
              </h3>
              <p className="text-sm text-gray-400">
                From basics to advanced topics, our structured learning path
                covers it all.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <Users className="h-12 w-12 text-purple-400" />
              <h3 className="text-white text-xl font-bold">
                Expert Mentorship
              </h3>
              <p className="text-sm text-gray-400">
                Get guidance from industry professionals and experienced
                developers.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="courses"
        className="w-full py-12 md:py-24 lg:py-32 bg-[#111827]"
      >
        <div className="container px-4 md:px-6">
          <h2 className="text-white text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Our Courses
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-3 text-center bg-gray-800 p-6 rounded-lg">
              <Zap className="h-12 w-12 text-yellow-400" />
              <h3 className="text-white text-xl font-bold">
                Web Development Fundamentals
              </h3>
              <p className="text-sm text-gray-400">
                Learn HTML, CSS, and JavaScript to build responsive websites.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center bg-gray-800 p-6 rounded-lg">
              <Code className="h-12 w-12 text-blue-400" />
              <h3 className="text-white text-xl font-bold">
                Full-Stack JavaScript
              </h3>
              <p className="text-sm text-gray-400">
                Master Node.js, Express, and MongoDB for backend development.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center bg-gray-800 p-6 rounded-lg">
              <Globe className="h-12 w-12 text-green-400" />
              <h3 className="text-white text-xl font-bold">
                Python for Data Science
              </h3>
              <p className="text-sm text-gray-400">
                Explore data analysis and machine learning with Python.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-white text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Start Your Coding Journey Today
              </h2>
              <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl">
                Join thousands of successful students and begin your path to
                becoming a professional developer.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input
                  className="max-w-lg flex-1 bg-white text-gray-900"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button className="bg-gray-900 text-blue-400 hover:bg-gray-800">
                  Get Started
                </Button>
              </form>
              <p className="text-xs text-blue-100">
                Start your free trial. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </section>{" "}
      <footer className="bg-[#111827] flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Luna. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-400"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-400"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </>
  );
};

export default Page;
