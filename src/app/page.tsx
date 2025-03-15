"use client"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/ui/Navbar"
import {
  BookOpen,
  Users,
  Zap,
  Globe,
  Code,
  ChevronRight,
  Sparkles,
  Star,
  Award,
  Clock,
  ArrowRight,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import useAuthRedirect from "@/hook/useAuthRedirect"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import BoringAvatar from "boring-avatars"

const Page = () => {
  const user = useAuthRedirect()
  if (user.user) {
    return null
  }

  return (
    <>
      <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-950 to-slate-900">
        {/* Decorative elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        </div>
        <Navbar />
        <main className="relative overflow-x-hidden">
          {/* Hero Section */}
          <section className="relative z-10 pt-12 lg:pt-24 pb-20 p-14">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-1/2 space-y-8">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-950/50 border border-blue-800/30 text-blue-400 text-sm">
                    <Sparkles className="w-4 h-4 mr-2" />
                    <span>The modern way to learn coding</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    Master Coding with{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                      Luna
                    </span>
                  </h1>

                  <p className="text-lg text-slate-300 max-w-xl">
                    Learn to code through interactive lessons, real-world
                    projects, and expert mentorship. Start your journey to
                    becoming a professional developer today.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/login"
                      className="flex bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Get Started
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-slate-700 text-black hover:bg-slate-800 hover:text-white"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Explore Courses
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 pt-6">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-slate-900 overflow-hidden bg-slate-800"
                        >
                          <BoringAvatar
                            size={32} // Matches your existing size
                            variant="beam" // Options: "marble", "beam", "pixel", "sunset", "ring", "bauhaus"
                            colors={[
                              "#E63946",
                              "#F1FAEE",
                              "#A8DADC",
                              "#457B9D",
                              "#1D3557",
                            ]}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-slate-400">
                      <span className="text-blue-400 font-medium">2,500+</span>{" "}
                      students enrolled this month
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-lg opacity-30"></div>
                  <div className="relative bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-2xl">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-950">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-xs text-slate-500 font-mono bg-slate-900 px-2 py-1 rounded">
                        index.js
                      </div>
                    </div>
                    <div className="p-4 font-mono text-sm text-slate-300 overflow-hidden">
                      <pre className="text-blue-400">
                        <span className="text-slate-500">
                          {" // Luna interactive code example"}
                        </span>
                        {"\n"}
                        <span className="text-purple-400">function</span>{" "}
                        <span className="text-yellow-300">learnToCode</span>(){" "}
                        {"{"}
                      </pre>
                      <pre className="pl-4">
                        <span className="text-purple-400">const</span> skills =
                        [<span className="text-green-400">&#34;HTML&#34;</span>,{" "}
                        <span className="text-green-400">&#34;CSS&#34;</span>,{" "}
                        <span className="text-green-400">
                          &#34;JavaScript&#34;
                        </span>
                        ];
                        {"\n"}
                        <span className="text-purple-400">const</span> projects
                        ={" "}
                        <span className="text-yellow-300">buildPortfolio</span>
                        (skills);{"\n"}
                        <span className="text-purple-400">return</span>{" "}
                        <span className="text-yellow-300">launchCareer</span>
                        (projects);
                      </pre>
                      <pre className="text-blue-400">{"}"}</pre>
                      <div className="mt-2 border-l-4 border-blue-500 pl-3 text-slate-400">
                        {"// Start your coding journey with Luna today!"}
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-600/20 backdrop-blur-xl rounded-lg border border-blue-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">50+</div>
                      <div className="text-xs text-blue-300">Projects</div>
                    </div>
                  </div>
                  <div className="absolute -left-4 -top-4 w-20 h-20 bg-purple-600/20 backdrop-blur-xl rounded-lg border border-purple-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">24/7</div>
                      <div className="text-xs text-purple-300">Support</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logos section */}
              <div className="mt-20 border-t border-slate-800 pt-10">
                <p className="text-center text-sm text-slate-500 mb-6">
                  TRUSTED BY DEVELOPERS FROM
                </p>
                <div className="flex flex-wrap justify-center gap-8 opacity-70">
                  {["Google", "Microsoft", "Amazon", "Meta", "Apple"].map(
                    (company) => (
                      <div
                        key={company}
                        className="text-slate-400 font-semibold"
                      >
                        {company}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-24 relative">
            <div className="absolute inset-0 bg-slate-950/50"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-950/50 border border-blue-800/30 text-blue-400 text-sm mb-4">
                  <Zap className="w-4 h-4 mr-2" />
                  <span>Why choose Luna</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Everything you need to become a developer
                </h2>
                <p className="text-slate-300">
                  Our platform combines interactive learning, real-world
                  projects, and personalized mentorship to give you the skills
                  you need to succeed.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <BookOpen className="w-6 h-6" />,
                    title: "Interactive Curriculum",
                    description:
                      "Learn by doing with our hands-on interactive lessons that make complex concepts easy to understand.",
                  },
                  {
                    icon: <Users className="w-6 h-6" />,
                    title: "Expert Mentorship",
                    description:
                      "Get guidance from industry professionals who provide feedback and help you overcome challenges.",
                  },
                  {
                    icon: <Award className="w-6 h-6" />,
                    title: "Real-World Projects",
                    description:
                      "Build a portfolio of projects that demonstrate your skills to potential employers.",
                  },
                  {
                    icon: <Globe className="w-6 h-6" />,
                    title: "Global Community",
                    description:
                      "Join a community of learners from around the world to share knowledge and collaborate.",
                  },
                  {
                    icon: <Clock className="w-6 h-6" />,
                    title: "Learn at Your Pace",
                    description:
                      "Our flexible learning platform allows you to learn on your schedule, at your own pace.",
                  },
                  {
                    icon: <Sparkles className="w-6 h-6" />,
                    title: "Career Support",
                    description:
                      "Get help with your resume, interview preparation, and job search strategies.",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center mb-4 text-blue-400 group-hover:bg-blue-600/30 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Courses Section */}
          <section className="py-24 relative">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-950/50 border border-blue-800/30 text-blue-400 text-sm mb-4">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span>Our curriculum</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Comprehensive learning paths
                </h2>
                <p className="text-slate-300">
                  Choose from a variety of learning paths designed to take you
                  from beginner to professional developer.
                </p>
              </div>

              <Tabs
                defaultValue="frontend"
                className="w-full max-w-4xl mx-auto"
              >
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="frontend">Frontend</TabsTrigger>
                  <TabsTrigger value="backend">Backend</TabsTrigger>
                  <TabsTrigger value="fullstack">Full Stack</TabsTrigger>
                </TabsList>

                <TabsContent value="frontend" className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "HTML & CSS Fundamentals",
                        level: "Beginner",
                        duration: "4 weeks",
                        lessons: 24,
                        image: "/placeholder.svg?height=200&width=300",
                      },
                      {
                        title: "JavaScript Essentials",
                        level: "Intermediate",
                        duration: "6 weeks",
                        lessons: 36,
                        image: "/placeholder.svg?height=200&width=300",
                      },
                      {
                        title: "React Development",
                        level: "Intermediate",
                        duration: "8 weeks",
                        lessons: 42,
                        image: "/placeholder.svg?height=200&width=300",
                      },
                      {
                        title: "Advanced Frontend Architecture",
                        level: "Advanced",
                        duration: "10 weeks",
                        lessons: 48,
                        image: "/placeholder.svg?height=200&width=300",
                      },
                    ].map((course, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300"
                      >
                        <div className="aspect-video overflow-hidden">
                          <Image
                            src={course.image || "/placeholder.svg"}
                            width={300}
                            height={200}
                            alt={course.title}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-white">
                              {course.title}
                            </h3>
                            <div className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                              {course.level}
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-slate-400 mb-4">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{course.duration}</span>
                            <span className="mx-2">•</span>
                            <BookOpen className="w-4 h-4 mr-1" />
                            <span>{course.lessons} lessons</span>
                          </div>
                          <Button
                            variant="outline"
                            className="w-full justify-between group-hover:border-blue-500/50 group-hover:text-blue-400 transition-colors"
                          >
                            View Course
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <Button
                      variant="ghost"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      View all Frontend courses
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="backend" className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Node.js Fundamentals",
                        level: "Beginner",
                        duration: "6 weeks",
                        lessons: 32,
                        image: "/placeholder.svg?height=200&width=300",
                      },
                      {
                        title: "Database Design & SQL",
                        level: "Intermediate",
                        duration: "5 weeks",
                        lessons: 28,
                        image: "/placeholder.svg?height=200&width=300",
                      },
                      {
                        title: "API Development",
                        level: "Intermediate",
                        duration: "7 weeks",
                        lessons: 38,
                        image: "/placeholder.svg?height=200&width=300",
                      },
                      {
                        title: "Cloud Architecture",
                        level: "Advanced",
                        duration: "9 weeks",
                        lessons: 45,
                        image: "/placeholder.svg?height=200&width=300",
                      },
                    ].map((course, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300"
                      >
                        <div className="aspect-video overflow-hidden">
                          <Image
                            src={course.image || "/placeholder.svg"}
                            width={300}
                            height={200}
                            alt={course.title}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-white">
                              {course.title}
                            </h3>
                            <div className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                              {course.level}
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-slate-400 mb-4">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{course.duration}</span>
                            <span className="mx-2">•</span>
                            <BookOpen className="w-4 h-4 mr-1" />
                            <span>{course.lessons} lessons</span>
                          </div>
                          <Button
                            variant="outline"
                            className="w-full justify-between group-hover:border-blue-500/50 group-hover:text-blue-400 transition-colors"
                          >
                            View Course
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <Button
                      variant="ghost"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      View all Backend courses
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="fullstack" className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Full Stack JavaScript",
                        level: "Intermediate",
                        duration: "12 weeks",
                        lessons: 64,
                        image: "/placeholder.svg?height=200&width=300",
                      },
                      {
                        title: "MERN Stack Development",
                        level: "Intermediate",
                        duration: "10 weeks",
                        lessons: 56,
                        image: "/placeholder.svg?height=200&width=300",
                      },
                      {
                        title: "Next.js & Serverless",
                        level: "Advanced",
                        duration: "8 weeks",
                        lessons: 48,
                        image: "/placeholder.svg?height=200&width=300",
                      },
                      {
                        title: "DevOps for Developers",
                        level: "Advanced",
                        duration: "6 weeks",
                        lessons: 36,
                        image: "/placeholder.svg?height=200&width=300",
                      },
                    ].map((course, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300"
                      >
                        <div className="aspect-video overflow-hidden">
                          <Image
                            src={course.image || "/placeholder.svg"}
                            width={300}
                            height={200}
                            alt={course.title}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-white">
                              {course.title}
                            </h3>
                            <div className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                              {course.level}
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-slate-400 mb-4">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{course.duration}</span>
                            <span className="mx-2">•</span>
                            <BookOpen className="w-4 h-4 mr-1" />
                            <span>{course.lessons} lessons</span>
                          </div>
                          <Button
                            variant="outline"
                            className="w-full justify-between group-hover:border-blue-500/50 group-hover:text-blue-400 transition-colors"
                          >
                            View Course
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <Button
                      variant="ghost"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      View all Full Stack courses
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-24 relative">
            <div className="absolute inset-0 bg-slate-950/50"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-950/50 border border-blue-800/30 text-blue-400 text-sm mb-4">
                  <Star className="w-4 h-4 mr-2" />
                  <span>Success stories</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  What our students say
                </h2>
                <p className="text-slate-300">
                  Hear from our graduates who have successfully transitioned
                  into tech careers.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Alex Johnson",
                    role: "Frontend Developer at Spotify",
                    image: "/placeholder.svg?height=80&width=80",
                    quote:
                      "Luna's curriculum was exactly what I needed to transition from my old career to web development. The projects were challenging but rewarding, and the mentorship was invaluable.",
                  },
                  {
                    name: "Sarah Chen",
                    role: "Full Stack Engineer at Airbnb",
                    image: "/placeholder.svg?height=80&width=80",
                    quote:
                      "I tried several other platforms before finding Luna. The difference was night and day. Luna's focus on real-world applications and job preparation helped me land my dream job.",
                  },
                  {
                    name: "Michael Rodriguez",
                    role: "Backend Developer at Stripe",
                    image: "/placeholder.svg?height=80&width=80",
                    quote:
                      "The community at Luna is what sets it apart. Being able to collaborate with other learners and get feedback from experienced mentors accelerated my learning tremendously.",
                  },
                  {
                    name: "Emily Taylor",
                    role: "Software Engineer at Netflix",
                    image: "/placeholder.svg?height=80&width=80",
                    quote:
                      "As someone with no prior coding experience, I was worried about keeping up. Luna's step-by-step approach made learning to code accessible and even fun!",
                  },
                  {
                    name: "David Kim",
                    role: "DevOps Engineer at Amazon",
                    image: "/placeholder.svg?height=80&width=80",
                    quote:
                      "The DevOps course at Luna gave me practical skills that I use every day in my job. The hands-on projects with real-world tools were exactly what employers were looking for.",
                  },
                  {
                    name: "Priya Patel",
                    role: "Mobile Developer at Uber",
                    image: "/placeholder.svg?height=80&width=80",
                    quote:
                      "Luna's flexible learning schedule allowed me to balance my full-time job while learning to code. Within 8 months, I was able to switch careers completely.",
                  },
                ].map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          width={80}
                          height={80}
                          alt={testimonial.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-blue-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-slate-300">{testimonial.quote}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-24 relative">
            <div className="absolute inset-0 bg-slate-950/50"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-950/50 border border-blue-800/30 text-blue-400 text-sm mb-4">
                  <ChevronDown className="w-4 h-4 mr-2" />
                  <span>FAQ</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Frequently asked questions
                </h2>
                <p className="text-slate-300">
                  Find answers to common questions about Luna and our learning
                  platform.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  {[
                    {
                      question: "Do I need prior coding experience to start?",
                      answer:
                        "No, our curriculum is designed for complete beginners. We start with the fundamentals and gradually build up to more advanced concepts. If you already have some experience, you can skip ahead to more advanced modules.",
                    },
                    {
                      question: "How long does it take to complete a course?",
                      answer:
                        "Course completion times vary depending on the course and your learning pace. On average, our beginner courses take 4-6 weeks to complete if you dedicate 10-15 hours per week. More advanced courses may take 8-12 weeks.",
                    },
                    {
                      question: "Will I get a certificate upon completion?",
                      answer:
                        "Yes, you'll receive a certificate of completion for each course you finish. Our certificates are recognized by many employers and can be added to your LinkedIn profile and resume.",
                    },
                    {
                      question: "Can I switch between learning paths?",
                      answer:
                        "Our platform is designed to be flexible. You can switch between learning paths or take courses from different paths simultaneously. We recommend focusing on one path initially, but the choice is yours.",
                    },
                  ].map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border border-slate-800 rounded-lg overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-slate-900/60 text-white font-medium text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 py-4 text-slate-300">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 relative">
            <div className="container mx-auto px-4">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 md:p-12">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      Ready to start your coding journey?
                    </h2>
                    <p className="text-blue-100 text-lg mb-6">
                      Join thousands of students who have transformed their
                      careers with Luna. Get started today with a 7-day free
                      trial.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href="/"
                        className="bg-white text-blue-600 hover:bg-blue-50 rounded-lg p-2 py-2"
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white">30K+</div>
                      <div className="text-blue-100">Students</div>
                    </div>
                    <div className="w-px h-16 bg-white/20"></div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white">95%</div>
                      <div className="text-blue-100">Completion</div>
                    </div>
                    <div className="w-px h-16 bg-white/20"></div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white">87%</div>
                      <div className="text-blue-100">Job Placement</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 border-t border-slate-800">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                <div className="col-span-2">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-white mb-4"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold">Luna</span>
                  </Link>
                  <p className="text-slate-400 mb-4">
                    Luna is the modern platform for learning to code, building
                    projects, and advancing your career.
                  </p>
                  <div className="flex gap-4">
                    {["GitHub"].map((social) => (
                      <Link
                        key={social}
                        href="#"
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {social}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-4">Platform</h3>
                  <ul className="space-y-2">
                    {[
                      "Courses",
                      "Learning Paths",
                      "Mentorship",
                      "Projects",
                      "Community",
                    ].map((item) => (
                      <li key={item}>
                        <Link
                          href="#"
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-4">Company</h3>
                  <ul className="space-y-2">
                    {["About Us", "Careers", "Blog", "Press", "Contact"].map(
                      (item) => (
                        <li key={item}>
                          <Link
                            href="#"
                            className="text-slate-400 hover:text-white transition-colors"
                          >
                            {item}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-4">Resources</h3>
                  <ul className="space-y-2">
                    {[
                      "Documentation",
                      "Tutorials",
                      "Guides",
                      "API Reference",
                      "Support",
                    ].map((item) => (
                      <li key={item}>
                        <Link
                          href="#"
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-slate-400 text-sm">
                  © {new Date().getFullYear()} Luna Learning, Inc. All rights
                  reserved.
                </p>
                <div className="flex gap-6 mt-4 md:mt-0">
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  )
}

export default Page
