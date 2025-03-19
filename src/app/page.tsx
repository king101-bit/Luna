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
  Github,
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

const Page = () => {
  const user = useAuthRedirect()
  if (user.user) {
    return null
  }

  return (
    <>
      <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-950 to-slate-900">
        {/* Decorative elements */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />
        </div>
        <Navbar />
        <main className="relative overflow-x-hidden">
          {/* Hero Section */}
          <section className="relative z-10 p-14 pb-20 pt-12 lg:pt-24">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center gap-12 lg:flex-row">
                <div className="space-y-8 lg:w-1/2">
                  <div className="inline-flex items-center rounded-full border border-blue-800/30 bg-blue-950/50 px-3 py-1 text-sm text-blue-400">
                    <Sparkles className="mr-2 h-4 w-4" />
                    <span>The modern way to learn coding</span>
                  </div>

                  <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                    Master Coding with{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                      Luna
                    </span>
                  </h1>

                  <p className="max-w-xl text-lg text-slate-300">
                    Learn to code through interactive lessons, real-world
                    projects, and expert mentorship. Start your journey to
                    becoming a professional developer today.
                  </p>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Link
                      href="/login"
                      className="flex rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                    >
                      Get Started
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-slate-700 text-black hover:bg-slate-800 hover:text-white"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Explore Courses
                    </Button>
                  </div>
                </div>
                <div className="relative lg:w-1/2">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur-lg"></div>
                  <div className="relative overflow-hidden rounded-lg border border-slate-800 bg-slate-900 shadow-2xl">
                    <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-950 px-4 py-3">
                      <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="rounded bg-slate-900 px-2 py-1 font-mono text-xs text-slate-500">
                        index.js
                      </div>
                    </div>
                    <div className="overflow-hidden p-4 font-mono text-sm text-slate-300">
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
                  <div className="absolute -bottom-6 -right-6 flex h-24 w-24 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-600/20 backdrop-blur-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">50+</div>
                      <div className="text-xs text-blue-300">Projects</div>
                    </div>
                  </div>
                  <div className="absolute -left-4 -top-4 flex h-20 w-20 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-600/20 backdrop-blur-xl">
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">24/7</div>
                      <div className="text-xs text-purple-300">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="relative py-24">
            <div className="absolute inset-0 bg-slate-950/50"></div>
            <div className="container relative z-10 mx-auto px-4">
              <div className="mx-auto mb-16 max-w-3xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full border border-blue-800/30 bg-blue-950/50 px-3 py-1 text-sm text-blue-400">
                  <Zap className="mr-2 h-4 w-4" />
                  <span>Why choose Luna</span>
                </div>
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  Everything you need to become a developer
                </h2>
                <p className="text-slate-300">
                  Our platform combines interactive learning, real-world
                  projects, and personalized mentorship to give you the skills
                  you need to succeed.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: <BookOpen className="h-6 w-6" />,
                    title: "Interactive Curriculum",
                    description:
                      "Learn by doing with our hands-on interactive lessons that make complex concepts easy to understand.",
                  },
                  {
                    icon: <Users className="h-6 w-6" />,
                    title: "Expert Mentorship",
                    description:
                      "Get guidance from industry professionals who provide feedback and help you overcome challenges.",
                  },
                  {
                    icon: <Award className="h-6 w-6" />,
                    title: "Real-World Projects",
                    description:
                      "Build a portfolio of projects that demonstrate your skills to potential employers.",
                  },
                  {
                    icon: <Globe className="h-6 w-6" />,
                    title: "Global Community",
                    description:
                      "Join a community of learners from around the world to share knowledge and collaborate.",
                  },
                  {
                    icon: <Clock className="h-6 w-6" />,
                    title: "Learn at Your Pace",
                    description:
                      "Our flexible learning platform allows you to learn on your schedule, at your own pace.",
                  },
                  {
                    icon: <Sparkles className="h-6 w-6" />,
                    title: "Career Support",
                    description:
                      "Get help with your resume, interview preparation, and job search strategies.",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="group rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-colors hover:border-blue-500/50"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 transition-colors group-hover:bg-blue-600/30">
                      {feature.icon}
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Courses Section */}
          <section className="relative py-24">
            <div className="container mx-auto px-4">
              <div className="mx-auto mb-16 max-w-3xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full border border-blue-800/30 bg-blue-950/50 px-3 py-1 text-sm text-blue-400">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>Our curriculum</span>
                </div>
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  Comprehensive learning paths
                </h2>
                <p className="text-slate-300">
                  Choose from a variety of learning paths designed to take you
                  from beginner to professional developer.
                </p>
              </div>

              <Tabs
                defaultValue="frontend"
                className="mx-auto w-full max-w-4xl"
              >
                <TabsList className="mb-8 grid grid-cols-3">
                  <TabsTrigger value="frontend">Frontend</TabsTrigger>
                  <TabsTrigger value="backend">Backend</TabsTrigger>
                  <TabsTrigger value="fullstack">Full Stack</TabsTrigger>
                </TabsList>

                <TabsContent value="frontend" className="space-y-8">
                  <div className="grid gap-6 md:grid-cols-2">
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
                        className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50"
                      >
                        <div className="aspect-video overflow-hidden">
                          <Image
                            src={course.image || "/placeholder.svg"}
                            width={300}
                            height={200}
                            alt={course.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <div className="mb-4 flex items-start justify-between">
                            <h3 className="text-xl font-semibold text-white">
                              {course.title}
                            </h3>
                            <div className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-400">
                              {course.level}
                            </div>
                          </div>
                          <div className="mb-4 flex items-center text-sm text-slate-400">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>{course.duration}</span>
                            <span className="mx-2">•</span>
                            <BookOpen className="mr-1 h-4 w-4" />
                            <span>{course.lessons} lessons</span>
                          </div>
                          <Button
                            variant="outline"
                            className="w-full justify-between transition-colors group-hover:border-blue-500/50 group-hover:text-blue-400"
                          >
                            View Course
                            <ArrowRight className="h-4 w-4" />
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
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="backend" className="space-y-8">
                  <div className="grid gap-6 md:grid-cols-2">
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
                        className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50"
                      >
                        <div className="aspect-video overflow-hidden">
                          <Image
                            src={course.image || "/placeholder.svg"}
                            width={300}
                            height={200}
                            alt={course.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <div className="mb-4 flex items-start justify-between">
                            <h3 className="text-xl font-semibold text-white">
                              {course.title}
                            </h3>
                            <div className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-400">
                              {course.level}
                            </div>
                          </div>
                          <div className="mb-4 flex items-center text-sm text-slate-400">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>{course.duration}</span>
                            <span className="mx-2">•</span>
                            <BookOpen className="mr-1 h-4 w-4" />
                            <span>{course.lessons} lessons</span>
                          </div>
                          <Button
                            variant="outline"
                            className="w-full justify-between transition-colors group-hover:border-blue-500/50 group-hover:text-blue-400"
                          >
                            View Course
                            <ArrowRight className="h-4 w-4" />
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
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="fullstack" className="space-y-8">
                  <div className="grid gap-6 md:grid-cols-2">
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
                        className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50"
                      >
                        <div className="aspect-video overflow-hidden">
                          <Image
                            src={course.image || "/placeholder.svg"}
                            width={300}
                            height={200}
                            alt={course.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <div className="mb-4 flex items-start justify-between">
                            <h3 className="text-xl font-semibold text-white">
                              {course.title}
                            </h3>
                            <div className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-400">
                              {course.level}
                            </div>
                          </div>
                          <div className="mb-4 flex items-center text-sm text-slate-400">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>{course.duration}</span>
                            <span className="mx-2">•</span>
                            <BookOpen className="mr-1 h-4 w-4" />
                            <span>{course.lessons} lessons</span>
                          </div>
                          <Button
                            variant="outline"
                            className="w-full justify-between transition-colors group-hover:border-blue-500/50 group-hover:text-blue-400"
                          >
                            View Course
                            <ArrowRight className="h-4 w-4" />
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
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="relative py-24">
            <div className="absolute inset-0 bg-slate-950/50"></div>
            <div className="container relative z-10 mx-auto px-4">
              <div className="mx-auto mb-16 max-w-3xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full border border-blue-800/30 bg-blue-950/50 px-3 py-1 text-sm text-blue-400">
                  <Star className="mr-2 h-4 w-4" />
                  <span>Success stories</span>
                </div>
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  What our students say
                </h2>
                <p className="text-slate-300">
                  Hear from our graduates who have successfully transitioned
                  into tech careers.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Alex Johnson",
                    role: "Frontend Developer at Spotify",
                    image: "/face1.jpg",
                    quote:
                      "Luna's curriculum was exactly what I needed to transition from my old career to web development. The projects were challenging but rewarding, and the mentorship was invaluable.",
                  },
                  {
                    name: "Sarah Chen",
                    role: "Full Stack Engineer at Airbnb",
                    image: "/face1.jpeg",
                    quote:
                      "I tried several other platforms before finding Luna. The difference was night and day. Luna's focus on real-world applications and job preparation helped me land my dream job.",
                  },
                  {
                    name: "Michael Rodriguez",
                    role: "Backend Developer at Stripe",
                    image: "/face3.jpg",
                    quote:
                      "The community at Luna is what sets it apart. Being able to collaborate with other learners and get feedback from experienced mentors accelerated my learning tremendously.",
                  },
                  {
                    name: "Emily Taylor",
                    role: "Software Engineer at Netflix",
                    image: "/face6.avif",
                    quote:
                      "As someone with no prior coding experience, I was worried about keeping up. Luna's step-by-step approach made learning to code accessible and even fun!",
                  },
                  {
                    name: "David Kim",
                    role: "DevOps Engineer at Amazon",
                    image: "/face4.jpg",
                    quote:
                      "The DevOps course at Luna gave me practical skills that I use every day in my job. The hands-on projects with real-world tools were exactly what employers were looking for.",
                  },
                  {
                    name: "Priya Patel",
                    role: "Mobile Developer at Uber",
                    image: "/face5.avif",
                    quote:
                      "Luna's flexible learning schedule allowed me to balance my full-time job while learning to code. Within 8 months, I was able to switch careers completely.",
                  },
                ].map((testimonial, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-colors hover:border-blue-500/50"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-full">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          width={80}
                          height={80}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
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
                    <div className="mb-4 flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
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
          <section className="relative py-24">
            <div className="absolute inset-0 bg-slate-950/50"></div>
            <div className="container relative z-10 mx-auto px-4">
              <div className="mx-auto mb-16 max-w-3xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full border border-blue-800/30 bg-blue-950/50 px-3 py-1 text-sm text-blue-400">
                  <ChevronDown className="mr-2 h-4 w-4" />
                  <span>FAQ</span>
                </div>
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  Frequently asked questions
                </h2>
                <p className="text-slate-300">
                  Find answers to common questions about Luna and our learning
                  platform.
                </p>
              </div>

              <div className="mx-auto max-w-3xl">
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
                      className="overflow-hidden rounded-lg border border-slate-800"
                    >
                      <AccordionTrigger className="px-6 py-4 text-left font-medium text-white hover:bg-slate-900/60">
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
          <section className="relative py-24">
            <div className="container mx-auto px-4">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 md:p-12">
                <div className="absolute right-0 top-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>

                <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
                  <div className="max-w-xl">
                    <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                      Ready to start your coding journey?
                    </h2>
                    <p className="mb-6 text-lg text-blue-100">
                      Join thousands of students who have transformed their
                      careers with Luna. Get started today!
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <Link
                        href="/login"
                        className="rounded-lg bg-white p-2 py-2 text-blue-600 hover:bg-blue-50"
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white">30K+</div>
                      <div className="text-blue-100">Students</div>
                    </div>
                    <div className="h-16 w-px bg-white/20"></div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white">95%</div>
                      <div className="text-blue-100">Completion</div>
                    </div>
                    <div className="h-16 w-px bg-white/20"></div>
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
          <footer className="border-t border-slate-800 py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
                <div className="col-span-2">
                  <Link
                    href="/"
                    className="mb-4 flex items-center gap-2 text-white"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                      <Code className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold">Luna</span>
                  </Link>
                  <p className="mb-4 text-slate-400">
                    Luna is the modern platform for learning to code, building
                    projects, and advancing your career.
                  </p>
                </div>

                <div>
                  <h3 className="mb-4 font-semibold text-white">Platform</h3>
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
                          className="text-slate-400 transition-colors hover:text-white"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-4 font-semibold text-white">Company</h3>
                  <ul className="space-y-2">
                    {["About Us", "Careers", "Blog", "Press", "Contact"].map(
                      (item) => (
                        <li key={item}>
                          <Link
                            href="#"
                            className="text-slate-400 transition-colors hover:text-white"
                          >
                            {item}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="flex flex-col items-start space-y-4">
                  <h3 className="mb-4 text-lg font-semibold text-white">
                    Socials
                  </h3>
                  <Link href="https://github.com/king101-bit/Luna">
                    <Github className="h-10 w-10 rounded-lg bg-black p-2 text-white transition-all hover:scale-105 hover:bg-gray-900" />{" "}
                  </Link>
                </div>
              </div>

              <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-800 pt-8 md:flex-row">
                <p className="text-sm text-slate-400">
                  © {new Date().getFullYear()} Luna Learning, Inc. All rights
                  reserved.
                </p>
                <div className="mt-4 flex gap-6 md:mt-0">
                  <Link
                    href="#"
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-slate-400 transition-colors hover:text-white"
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
