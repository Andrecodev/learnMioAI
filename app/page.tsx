"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AbstractIntlMessages, useTranslations } from "next-intl"
import { getMessages } from "next-intl/server"
// import { Button } from "@/components/ui/button"
// import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { BookOpen, Users, Brain, Award, TrendingUp, Globe } from "lucide-react"
// import Link from "next/link"

// export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
//   const messages: AbstractIntlMessages = await getMessages({ locale });
//   console.log("first messages", messages)
//   const title = typeof messages.TabTitles === "object" && messages.TabTitles !== null
//     ? (messages.TabTitles as Record<string, any>).title
//     : undefined
//   const description = typeof messages.TabTitles === "object" && messages.TabTitles !== null
//     ? (messages.TabTitles as Record<string, any>).description
//     : undefined

//   return {
//     title,
//     description,
//     generator: 'andrecodev'
//   }
// }

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user) {
        // If user is authenticated, redirect to dashboard
        router.push("/dashboard")
      } else {
        // If user is not authenticated, redirect to login
        router.push("/login")
      }
    }
  }, [user, loading, router])

  // Show loading state while checking authentication
  const t = useTranslations("common")

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">{t("loading")}</p>
        </div>
      </div>
    )
  }

  return null
  // This component will redirect, but we'll keep the original content as fallback
  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
  //     {/* Hero Section */}
  //     <section className="relative overflow-hidden py-20 px-4">
  //       <div className="container mx-auto max-w-6xl">
  //         <div className="grid lg:grid-cols-2 gap-12 items-center">
  //           <div className="space-y-8">
  //             <div className="space-y-4">
  //               <Badge variant="secondary" className="w-fit">
  //                 🚀 AI-Powered Learning Platform
  //               </Badge>
  //               <h1 className="text-5xl font-bold tracking-tight text-gray-900">
  //                 Master English with
  //                 <span className="text-blue-600"> Personalized AI</span>
  //               </h1>
  //               <p className="text-xl text-gray-600 leading-relaxed">
  //                 Experience adaptive learning with real-time AI tutors, interactive exercises, and live human
  //                 instructors. From A1 to C2 proficiency levels.
  //               </p>
  //             </div>

  //             <div className="flex flex-col sm:flex-row gap-4">
  //               <Button asChild size="lg" className="text-lg px-8">
  //                 <Link href="/dashboard">Start Learning Free</Link>
  //               </Button>
  //               <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
  //                 <Link href="/demo">Watch Demo</Link>
  //               </Button>
  //             </div>

  //             <div className="flex items-center gap-8 pt-4">
  //               <div className="text-center">
  //                 <div className="text-2xl font-bold text-gray-900">500K+</div>
  //                 <div className="text-sm text-gray-600">Active Learners</div>
  //               </div>
  //               <div className="text-center">
  //                 <div className="text-2xl font-bold text-gray-900">95%</div>
  //                 <div className="text-sm text-gray-600">Success Rate</div>
  //               </div>
  //               <div className="text-center">
  //                 <div className="text-2xl font-bold text-gray-900">24/7</div>
  //                 <div className="text-sm text-gray-600">AI Support</div>
  //               </div>
  //             </div>
  //           </div>

  //           <div className="relative">
  //             <div className="bg-white rounded-2xl shadow-2xl p-6 border">
  //               <div className="space-y-4">
  //                 <div className="flex items-center justify-between">
  //                   <h3 className="font-semibold">Today's Progress</h3>
  //                   <Badge variant="secondary">Level B2</Badge>
  //                 </div>
  //                 <Progress value={75} className="h-2" />
  //                 <div className="grid grid-cols-2 gap-4">
  //                   <div className="text-center p-3 bg-blue-50 rounded-lg">
  //                     <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-1" />
  //                     <div className="text-sm font-medium">Lessons</div>
  //                     <div className="text-lg font-bold text-blue-600">12/15</div>
  //                   </div>
  //                   <div className="text-center p-3 bg-green-50 rounded-lg">
  //                     <Award className="h-6 w-6 text-green-600 mx-auto mb-1" />
  //                     <div className="text-sm font-medium">Streak</div>
  //                     <div className="text-lg font-bold text-green-600">28 days</div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>

  //     {/* Features Section */}
  //     <section className="py-20 px-4 bg-white">
  //       <div className="container mx-auto max-w-6xl">
  //         <div className="text-center mb-16">
  //           <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Learning Ecosystem</h2>
  //           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
  //             Our platform combines cutting-edge AI technology with proven educational methods to deliver personalized
  //             learning experiences.
  //           </p>
  //         </div>

  //         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  //           <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
  //             <CardHeader>
  //               <Brain className="h-12 w-12 text-blue-600 mb-4" />
  //               <CardTitle>AI-Powered Tutoring</CardTitle>
  //               <CardDescription>
  //                 Real-time conversation practice with context-aware AI tutors that adapt to your learning style
  //               </CardDescription>
  //             </CardHeader>
  //           </Card>

  //           <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
  //             <CardHeader>
  //               <Users className="h-12 w-12 text-green-600 mb-4" />
  //               <CardTitle>Live Human Tutors</CardTitle>
  //               <CardDescription>
  //                 HD video sessions with certified instructors, automated matching, and integrated lesson planning
  //               </CardDescription>
  //             </CardHeader>
  //           </Card>

  //           <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
  //             <CardHeader>
  //               <TrendingUp className="h-12 w-12 text-purple-600 mb-4" />
  //               <CardTitle>Adaptive Learning</CardTitle>
  //               <CardDescription>
  //                 Personalized learning paths that adjust based on your progress and performance patterns
  //               </CardDescription>
  //             </CardHeader>
  //           </Card>

  //           <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
  //             <CardHeader>
  //               <Award className="h-12 w-12 text-orange-600 mb-4" />
  //               <CardTitle>Gamified Experience</CardTitle>
  //               <CardDescription>
  //                 Achievements, badges, and progress milestones that keep you motivated and engaged
  //               </CardDescription>
  //             </CardHeader>
  //           </Card>

  //           <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
  //             <CardHeader>
  //               <BookOpen className="h-12 w-12 text-red-600 mb-4" />
  //               <CardTitle>CEFR Aligned Content</CardTitle>
  //               <CardDescription>
  //                 Structured curriculum from A1 to C2 levels with multi-format interactive materials
  //               </CardDescription>
  //             </CardHeader>
  //           </Card>

  //           <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
  //             <CardHeader>
  //               <Globe className="h-12 w-12 text-teal-600 mb-4" />
  //               <CardTitle>Global Accessibility</CardTitle>
  //               <CardDescription>
  //                 Cross-platform support with offline capabilities and accessibility features for all learners
  //               </CardDescription>
  //             </CardHeader>
  //           </Card>
  //         </div>
  //       </div>
  //     </section>

  //     {/* CTA Section */}
  //     <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
  //       <div className="container mx-auto max-w-4xl text-center">
  //         <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your English Learning?</h2>
  //         <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
  //           Join thousands of learners who have achieved fluency with our AI-powered platform. Start your personalized
  //           learning journey today.
  //         </p>
  //         <div className="flex flex-col sm:flex-row gap-4 justify-center">
  //           <Button asChild size="lg" variant="secondary" className="text-lg px-8">
  //             <Link href="/signup">Get Started Free</Link>
  //           </Button>
  //           <Button
  //             asChild
  //             size="lg"
  //             variant="outline"
  //             className="text-lg px-8 text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
  //           >
  //             <Link href="/pricing">View Pricing</Link>
  //           </Button>
  //         </div>
  //       </div>
  //     </section>
  //   </div>
  // )
}
