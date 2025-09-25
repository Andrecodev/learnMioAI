"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  Brain,
  Users,
  Award,
  Calendar,
  TrendingUp,
  Play,
  Clock,
  Target,
  Flame,
  Languages,
} from "lucide-react";
import Link from "next/link";
import { LevelTestBanner } from "@/components/LevelTestBanner";
import { useTranslations } from "next-intl";

type localeType = "en" | "es";

export default function DashboardPage() {
  const [locale, setLocale] = useState<localeType>("en");
  const router = useRouter();
  const t = useTranslations("dashboard");
  const lessonTypeKeyMap: Record<string, string> = {
    "AI Tutor": "lessonType.aiTutor",
    "Live Tutor": "lessonType.liveTutor",
    "Self-Study": "lessonType.selfStudy",
  };
  
  const changeLocale = () => {
    const loc: localeType = locale === "en" ? "es" : "en";
    setLocale(loc);
    document.cookie = `MYNEXTAPP_LOCALE=${loc};`;
    router.refresh();
  }

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("MYNEXTAPP_LOCALE="))
      ?.split("=")[1];
    if (cookieLocale) {
      setLocale(cookieLocale as localeType);
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      setLocale(browserLocale as localeType);
      document.cookie = `MYNEXTAPP_LOCALE=${browserLocale};`;
      router.refresh();
    }
  }, [router]);

  const upcomingLessons = [
    {
      id: 1,
      title: "Advanced Grammar: Conditional Sentences",
      time: "2:00 PM",
      type: "AI Tutor",
    },
    {
      id: 2,
      title: "Business English Conversation",
      time: "4:30 PM",
      type: "Live Tutor",
      tutor: "Sarah Johnson",
    },
    {
      id: 3,
      title: "IELTS Writing Practice",
      time: "Tomorrow 10:00 AM",
      type: "Self-Study",
    },
  ];

  const recentAchievements = [
    {
      id: 1,
      title: "Grammar Master",
      description: "Completed 50 grammar exercises",
      icon: "🏆",
    },
    {
      id: 2,
      title: "Conversation Starter",
      description: "Had 10 AI conversations",
      icon: "💬",
    },
    {
      id: 3,
      title: "Streak Champion",
      description: "30-day learning streak",
      icon: "🔥",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {t("welcomeBack", { name: "Pedri" })}!
              </h1>
              <p className="text-muted-foreground mt-1">
                {t("continueJourney")}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge
                variant="secondary"
                className="text-sm bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300"
              >
                <Flame className="h-4 w-4 mr-1" />
                28-day streak
              </Badge>
              <Badge
                onClick={changeLocale}
                variant="default"
                className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 cursor-pointer"
              >
                <Languages className="h-2 w-2 mr-1" />
                {locale?.toUpperCase()}
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
                  {t("yourProgress")}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {t("currentLevel", { level: "Intermediate (B2)" })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">{t("overallProgress")}</span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      75%
                    </span>
                  </div>
                  <Progress
                    value={75}
                    className="h-3 bg-blue-100 dark:bg-blue-950"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-100 dark:bg-blue-950/50 rounded-lg">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      156
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t("lessonsCompleted")}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-100 dark:bg-green-950/50 rounded-lg">
                    <Brain className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      42
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t("aiConversations")}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-100 dark:bg-purple-950/50 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      18
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t("tutorSessions")}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-orange-100 dark:bg-orange-950/50 rounded-lg">
                    <Award className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      12
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t("achievements")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                <CardTitle>{t("continueLearning")}</CardTitle>
                <CardDescription>{t("pickUpWhereYouLeftOff")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button
                    asChild
                    className="h-24 flex-col gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                      <Link href="/lessons/ai-tutor">
                      <Brain className="h-6 w-6" />
                      <span>{t("aiTutor")}</span>
                      <span className="text-xs opacity-75">
                        {t("aiTutorDesc")}
                      </span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-24 flex-col gap-2 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950/50"
                  >
                      <Link href="/lessons/interactive">
                      <Play className="h-6 w-6 text-green-600 dark:text-green-400" />
                      <span className="text-green-600 dark:text-green-400">
                        {t("interactiveLesson")}
                      </span>
                      <span className="text-xs text-green-600/75 dark:text-green-400/75">
                        {t("interactiveLessonDesc")}
                      </span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-24 flex-col gap-2 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/50"
                  >
                      <Link href="/tutoring/book">
                      <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      <span className="text-purple-600 dark:text-purple-400">
                        {t("bookTutor")}
                      </span>
                      <span className="text-xs text-purple-600/75 dark:text-purple-400/75">
                        {t("bookTutorDesc")}
                      </span>
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
                  {t("recentAchievements")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border"
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
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
                  {t("upcomingLessons")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingLessons.map((lesson) => (
                  <div key={lesson.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm leading-tight">
                          {lesson.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {lesson.time}
                          </span>
                        </div>
                        {lesson.tutor && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {t("withTutor", { tutor: lesson.tutor })}
                          </p>
                        )}
                      </div>
                      <Badge
                        variant={
                          lesson.type === "Live Tutor" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {t(lessonTypeKeyMap[lesson.type] ?? lesson.type)}
                      </Badge>
                    </div>
                    {lesson.id < upcomingLessons.length && (
                      <div className="border-b border-border" />
                    )}
                  </div>
                ))}
                <Button
                  asChild
                  variant="outline"
                  className="w-full mt-4 bg-transparent"
                >
                  <Link href="/schedule">{t("viewFullSchedule")}</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Learning Goals */}
            <Card>
                  <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  {t("thisWeeksGoals")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">{t("goal.completeLessons")}</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      4/5
                    </span>
                  </div>
                  <Progress
                    value={80}
                    className="h-2 bg-green-100 dark:bg-green-950"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">
                      {t("goal.practiceSpeaking")}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      2/3
                    </span>
                  </div>
                  <Progress
                    value={67}
                    className="h-2 bg-blue-100 dark:bg-blue-950"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">{t("goal.learnNewWords")}</span>
                    <span className="text-purple-600 dark:text-purple-400 font-medium">
                      20/20
                    </span>
                  </div>
                  <Progress
                    value={100}
                    className="h-2 bg-purple-100 dark:bg-purple-950"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>{t("learningStreak")}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  28
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("daysInARow")}
                </p>
                <div className="flex justify-center gap-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full ${
                        i < 6
                          ? "bg-orange-500 dark:bg-orange-500"
                          : "bg-orange-200 dark:bg-orange-800"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {t("keepItUp")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
