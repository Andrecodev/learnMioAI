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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back, Alex!</h1>
              <p className="text-muted-foreground mt-1">Continue your English learning journey</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300">
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
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Your Progress
                </CardTitle>
                <CardDescription className="text-muted-foreground">Current level: Intermediate (B2)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">Overall Progress</span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-3 bg-blue-100 dark:bg-blue-950" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-100 dark:bg-blue-950/50 rounded-lg">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">156</div>
                    <div className="text-sm text-muted-foreground">Lessons Completed</div>
                  </div>
                  <div className="text-center p-4 bg-green-100 dark:bg-green-950/50 rounded-lg">
                    <Brain className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">42</div>
                    <div className="text-sm text-muted-foreground">AI Conversations</div>
                  </div>
                  <div className="text-center p-4 bg-purple-100 dark:bg-purple-950/50 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">18</div>
                    <div className="text-sm text-muted-foreground">Tutor Sessions</div>
                  </div>
                  <div className="text-center p-4 bg-orange-100 dark:bg-orange-950/50 rounded-lg">
                    <Award className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">12</div>
                    <div className="text-sm text-muted-foreground">Achievements</div>
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
                  <Button asChild className="h-24 flex-col gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
                    <Link href="/lessons/ai-tutor">
                      <Brain className="h-6 w-6" />
                      <span>AI Tutor</span>
                      <span className="text-xs opacity-75">Practice conversation</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" 
                    className="h-24 flex-col gap-2 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950/50">
                    <Link href="/lessons/interactive">
                      <Play className="h-6 w-6 text-green-600 dark:text-green-400" />
                      <span className="text-green-600 dark:text-green-400">Interactive Lesson</span>
                      <span className="text-xs text-green-600/75 dark:text-green-400/75">Grammar & Vocabulary</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" 
                    className="h-24 flex-col gap-2 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/50">
                    <Link href="/tutoring/book">
                      <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      <span className="text-purple-600 dark:text-purple-400">Book Tutor</span>
                      <span className="text-xs text-purple-600/75 dark:text-purple-400/75">Live 1-on-1 session</span>
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
                    <div key={achievement.id} className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
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
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{lesson.time}</span>
                        </div>
                        {lesson.tutor && <p className="text-xs text-muted-foreground mt-1">with {lesson.tutor}</p>}
                      </div>
                      <Badge variant={lesson.type === "Live Tutor" ? "default" : "secondary"} className="text-xs">
                        {lesson.type}
                      </Badge>
                    </div>
                    {lesson.id < upcomingLessons.length && <div className="border-b border-border" />}
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
                    <span className="text-foreground">Complete 5 lessons</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">4/5</span>
                  </div>
                  <Progress value={80} className="h-2 bg-green-100 dark:bg-green-950" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">Practice speaking 3 times</span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">2/3</span>
                  </div>
                  <Progress value={67} className="h-2 bg-blue-100 dark:bg-blue-950" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">Learn 20 new words</span>
                    <span className="text-purple-600 dark:text-purple-400 font-medium">20/20</span>
                  </div>
                  <Progress value={100} className="h-2 bg-purple-100 dark:bg-purple-950" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Streak</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">28</div>
                <p className="text-sm text-muted-foreground mb-4">Days in a row</p>
                <div className="flex justify-center gap-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className={`w-6 h-6 rounded-full ${i < 6 ? 'bg-orange-500 dark:bg-orange-500' : 'bg-orange-200 dark:bg-orange-800'}`} />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Keep it up!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
