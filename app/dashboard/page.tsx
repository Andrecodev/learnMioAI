'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Brain, Users, Award, Calendar, TrendingUp, Play, Clock, Target, Flame } from "lucide-react"
import Link from "next/link"
import { LevelTestBanner } from "@/components/LevelTestBanner"

export default function DashboardPage() {
  const upcomingLessons = [
    { id: 1, title: "Advanced Grammar: Conditional Sentences", time: "2:00 PM", type: "AI Tutor" },
    { id: 2, title: "Business English Conversation", time: "4:30 PM", type: "Live Tutor", tutor: "Sarah Johnson" },
    { id: 3, title: "IELTS Writing Practice", time: "Tomorrow 10:00 AM", type: "Self-Study" },
  ]

  const recentAchievements = [
    { id: 1, title: "Grammar Master", description: "Completed 50 grammar exercises", icon: "🏆" },
    { id: 2, title: "Conversation Starter", description: "Had 10 AI conversations", icon: "💬" },
    { id: 3, title: "Streak Champion", description: "30-day learning streak", icon: "🔥" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, Alex!</h1>
              <p className="text-gray-600 mt-1">Continue your English learning journey</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                <Flame className="h-4 w-4 mr-1" />
                28-day streak
              </Badge>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <LevelTestBanner />

      <div className="container mx-auto px-4 py-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Your Progress
                </CardTitle>
                <CardDescription>Current level: Intermediate (B2)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-3" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">156</div>
                    <div className="text-sm text-gray-600">Lessons Completed</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Brain className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">42</div>
                    <div className="text-sm text-gray-600">AI Conversations</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">18</div>
                    <div className="text-sm text-gray-600">Tutor Sessions</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Award className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-orange-600">12</div>
                    <div className="text-sm text-gray-600">Achievements</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button asChild className="h-24 flex-col gap-2">
                    <Link href="/lessons/ai-tutor">
                      <Brain className="h-6 w-6" />
                      <span>AI Tutor</span>
                      <span className="text-xs opacity-75">Practice conversation</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                    <Link href="/lessons/interactive">
                      <Play className="h-6 w-6" />
                      <span>Interactive Lesson</span>
                      <span className="text-xs opacity-75">Grammar & Vocabulary</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                    <Link href="/tutoring/book">
                      <Users className="h-6 w-6" />
                      <span>Book Tutor</span>
                      <span className="text-xs opacity-75">Live 1-on-1 session</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                      <Badge variant="secondary">New</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Lessons */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Lessons
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingLessons.map((lesson) => (
                  <div key={lesson.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm leading-tight">{lesson.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-gray-500" />
                          <span className="text-xs text-gray-600">{lesson.time}</span>
                        </div>
                        {lesson.tutor && <p className="text-xs text-gray-500 mt-1">with {lesson.tutor}</p>}
                      </div>
                      <Badge variant={lesson.type === "Live Tutor" ? "default" : "secondary"} className="text-xs">
                        {lesson.type}
                      </Badge>
                    </div>
                    {lesson.id < upcomingLessons.length && <div className="border-b" />}
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
                  <Link href="/schedule">View Full Schedule</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Learning Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  This Week's Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Complete 5 lessons</span>
                    <span>4/5</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Practice speaking 3 times</span>
                    <span>2/3</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Learn 20 new words</span>
                    <span>20/20</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Streak</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">28</div>
                <p className="text-sm text-gray-600 mb-4">Days in a row</p>
                <div className="flex justify-center gap-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className={`w-6 h-6 rounded-full ${i < 6 ? "bg-orange-500" : "bg-orange-200"}`} />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Keep it up!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
