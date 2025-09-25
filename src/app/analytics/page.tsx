"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, BookOpen, Clock, Award, Brain, Target, Activity } from "lucide-react"

import { useTranslations } from 'next-intl'

export default function AnalyticsPage() {
  const t = useTranslations('analytics')
  // Sample data for charts
  const weeklyProgress = [
    { day: "Mon", lessons: 3, speaking: 45, reading: 30 },
    { day: "Tue", lessons: 2, speaking: 30, reading: 25 },
    { day: "Wed", lessons: 4, speaking: 60, reading: 40 },
    { day: "Thu", lessons: 3, speaking: 50, reading: 35 },
    { day: "Fri", lessons: 5, speaking: 75, reading: 50 },
    { day: "Sat", lessons: 2, speaking: 40, reading: 20 },
    { day: "Sun", lessons: 1, speaking: 20, reading: 15 },
  ]

  const skillProgress = [
    { skill: "Speaking", current: 75, target: 85, color: "#3b82f6" },
    { skill: "Listening", current: 82, target: 90, color: "#10b981" },
    { skill: "Reading", current: 68, target: 80, color: "#f59e0b" },
    { skill: "Writing", current: 71, target: 85, color: "#ef4444" },
  ]

  const learningTime = [
    { month: "Jan", hours: 45 },
    { month: "Feb", hours: 52 },
    { month: "Mar", hours: 48 },
    { month: "Apr", hours: 61 },
    { month: "May", hours: 58 },
    { month: "Jun", hours: 67 },
  ]

  const activityBreakdown = [
    { name: "AI Conversations", value: 35, color: "#3b82f6" },
    { name: "Interactive Lessons", value: 28, color: "#10b981" },
    { name: "Live Tutoring", value: 22, color: "#f59e0b" },
    { name: "Self Study", value: 15, color: "#ef4444" },
  ]

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
  <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
      <h1 className="text-3xl font-bold text-gray-900">{t('learningAnalytics')}</h1>
      <p className="text-gray-600 mt-1">{t('trackProgress')}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                <Activity className="h-4 w-4 mr-1" />
                {t('realTimeData')}
              </Badge>
            </div>
          </div>
        </div>
      </div>

  <div className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('totalStudyTime')}</p>
                  <p className="text-3xl font-bold text-gray-900">127h</p>
                  <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    {t('thisMonth')}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('lessonsCompleted')}</p>
                  <p className="text-3xl font-bold text-gray-900">156</p>
                    <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    {t('thisWeek')}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('aiConversations')}</p>
                  <p className="text-3xl font-bold text-gray-900">42</p>
                    <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    {t('thisWeek')}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('currentLevel')}</p>
                  <p className="text-3xl font-bold text-gray-900">B2</p>
                  <p className="text-sm text-blue-600 flex items-center gap-1 mt-1">
                    <Target className="h-3 w-3" />
                    75% to B2+
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
            <TabsTrigger value="skills">{t('skillsProgress')}</TabsTrigger>
            <TabsTrigger value="activity">{t('activity')}</TabsTrigger>
            <TabsTrigger value="predictions">{t('predictions')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Weekly Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('weeklyLearningActivity')}</CardTitle>
                  <CardDescription>{t('dailyLearningProgress')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="lessons" fill="#3b82f6" name="Lessons" />
                      <Bar dataKey="speaking" fill="#10b981" name="Speaking (min)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Learning Time Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('monthlyLearningHours')}</CardTitle>
                  <CardDescription>{t('learningTimeTrend')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={learningTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="hours" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Activity Breakdown */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('activityBreakdown')}</CardTitle>
                  <CardDescription>{t('howYouSpendTime')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={activityBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {activityBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4">
                    {activityBreakdown.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                          <span>{item.name}</span>
                        </div>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>{t('recentAchievements')}</CardTitle>
                  <CardDescription>{t('latestMilestones')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl">🏆</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Grammar Master</h4>
                      <p className="text-sm text-gray-600">Completed 50 grammar exercises with 95% accuracy</p>
                    </div>
                    <Badge variant="secondary">Yesterday</Badge>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl">💬</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Conversation Champion</h4>
                      <p className="text-sm text-gray-600">Had 25 AI conversations this month</p>
                    </div>
                    <Badge variant="secondary">2 days ago</Badge>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl">🔥</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Streak Master</h4>
                      <p className="text-sm text-gray-600">Maintained 30-day learning streak</p>
                    </div>
                    <Badge variant="secondary">1 week ago</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('skillsProgressOverview')}</CardTitle>
                  <CardDescription>{t('currentLevelEachSkill')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {skillProgress.map((skill) => (
                    <div key={skill.skill} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.skill}</span>
                        <span className="text-sm text-gray-600">
                          {skill.current}% / {skill.target}%
                        </span>
                      </div>
                      <Progress value={skill.current} className="h-3" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Current Level</span>
                        <span>Target: {skill.target}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('skillDevelopmentRecommendations')}</CardTitle>
                  <CardDescription>{t('aiPoweredSuggestions')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">📖 Reading Comprehension</h4>
                    <p className="text-sm text-red-700 mb-3">
                      Your weakest skill. Focus on improving vocabulary and reading speed.
                    </p>
                    <div className="space-y-2">
                      <div className="text-xs text-red-600">• Practice daily reading for 20 minutes</div>
                      <div className="text-xs text-red-600">• Focus on academic texts</div>
                      <div className="text-xs text-red-600">• Use vocabulary flashcards</div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">✍️ Writing Skills</h4>
                    <p className="text-sm text-yellow-700 mb-3">
                      Good progress! Focus on advanced grammar structures and essay organization.
                    </p>
                    <div className="space-y-2">
                      <div className="text-xs text-yellow-600">• Practice writing complex sentences</div>
                      <div className="text-xs text-yellow-600">• Work on paragraph transitions</div>
                      <div className="text-xs text-yellow-600">• Get AI feedback on essays</div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">🎧 Listening Skills</h4>
                    <p className="text-sm text-green-700 mb-3">
                      Excellent progress! Maintain your level with diverse content.
                    </p>
                    <div className="space-y-2">
                      <div className="text-xs text-green-600">• Listen to podcasts and news</div>
                      <div className="text-xs text-green-600">• Practice with different accents</div>
                      <div className="text-xs text-green-600">• Take advanced listening quizzes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Activity Heatmap</CardTitle>
                <CardDescription>Your learning consistency over the past 3 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {Array.from({ length: 91 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-sm ${
                        Math.random() > 0.3
                          ? Math.random() > 0.7
                            ? "bg-green-500"
                            : Math.random() > 0.5
                              ? "bg-green-300"
                              : "bg-green-100"
                          : "bg-gray-100"
                      }`}
                      title={`Day ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Less active</span>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-100 rounded-sm" />
                    <div className="w-3 h-3 bg-green-100 rounded-sm" />
                    <div className="w-3 h-3 bg-green-300 rounded-sm" />
                    <div className="w-3 h-3 bg-green-500 rounded-sm" />
                  </div>
                  <span>More active</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Learning Predictions</CardTitle>
                  <CardDescription>Based on your current progress and learning patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">🎯 Level Progression</h4>
                    <p className="text-sm text-blue-700 mb-2">
                      You're likely to reach B2+ level in approximately 6-8 weeks
                    </p>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-blue-600 mt-1">Based on current learning pace</p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">📈 Success Probability</h4>
                    <p className="text-sm text-green-700 mb-2">92% chance of achieving your monthly goals</p>
                    <Progress value={92} className="h-2" />
                    <p className="text-xs text-green-600 mt-1">Keep up the excellent work!</p>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">⚠️ Risk Factors</h4>
                    <p className="text-sm text-orange-700 mb-2">Slight decrease in speaking practice detected</p>
                    <p className="text-xs text-orange-600">
                      Recommendation: Schedule 2 more AI conversations this week
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Personalized Learning Path</CardTitle>
                  <CardDescription>AI-optimized recommendations for the next 30 days</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                        1
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium">Focus on Reading Comprehension</h5>
                        <p className="text-xs text-gray-600">Complete 3 reading exercises daily</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-bold text-green-600">
                        2
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium">Increase Speaking Practice</h5>
                        <p className="text-xs text-gray-600">Have 4 AI conversations per week</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-bold text-purple-600">
                        3
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium">Advanced Grammar Modules</h5>
                        <p className="text-xs text-gray-600">Complete conditional sentences unit</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm font-bold text-orange-600">
                        4
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium">Live Tutor Sessions</h5>
                        <p className="text-xs text-gray-600">Book 2 sessions for pronunciation feedback</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
