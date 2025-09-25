import { Card, CardContent, CardHeader, CardTitle } from "@/src/types/components/ui/card"
import { Button } from "@/src/types/components/ui/button"
import { Badge } from "@/src/types/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/types/components/ui/avatar"
import { Input } from "@/src/types/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/types/components/ui/select"
import { Star, Clock, Globe, Calendar, Video, MessageSquare, Award, Filter, Search } from "lucide-react"
import Link from "next/link"

import { useTranslations } from 'next-intl'

export default function TutoringPage() {
  const t = useTranslations('tutoring')
  const tutors = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.9,
      reviews: 234,
      specialties: ["Business English", "IELTS Prep", "Conversation"],
      languages: ["English (Native)", "Spanish"],
      experience: "8 years",
      price: 25,
      availability: "Available now",
      description: "Certified TESOL instructor with expertise in business communication and test preparation.",
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      reviews: 189,
      specialties: ["Academic English", "Grammar", "Writing"],
      languages: ["English (Native)", "Mandarin"],
      experience: "6 years",
      price: 22,
      availability: "Next available: 2:00 PM",
      description: "PhD in Linguistics with focus on academic writing and advanced grammar instruction.",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.9,
      reviews: 312,
      specialties: ["Conversation", "Pronunciation", "Cultural English"],
      languages: ["English (Native)", "French", "Portuguese"],
      experience: "10 years",
      price: 28,
      availability: "Available now",
      description: "International communication expert helping students with natural conversation skills.",
    },
    {
      id: 4,
      name: "David Thompson",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.7,
      reviews: 156,
      specialties: ["TOEFL Prep", "Academic Writing", "Research Skills"],
      languages: ["English (Native)", "German"],
      experience: "12 years",
      price: 30,
      availability: "Next available: Tomorrow 9:00 AM",
      description: "Former university professor specializing in academic English and standardized test preparation.",
    },
  ]

  const upcomingSessions = [
    {
      id: 1,
      tutor: "Sarah Johnson",
      subject: "Business Presentation Skills",
      time: "Today, 4:30 PM",
      duration: "60 min",
      type: "Video Call",
    },
    {
      id: 2,
      tutor: "Michael Chen",
      subject: "Essay Writing Workshop",
      time: "Tomorrow, 10:00 AM",
      duration: "45 min",
      type: "Video Call",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t('liveTutoring')}</h1>
              <p className="text-muted-foreground mt-1">{t('connectCertified')}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                <Video className="h-4 w-4 mr-1" />
                {t('hdVideoSessions')}
              </Badge>
              <Button asChild>
                <Link href="/tutoring/book">{t('bookSession')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  {t('findPerfectTutor')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder={t('searchTutors')} className="pl-10" />
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t('specialty')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">{t('businessEnglish')}</SelectItem>
                      <SelectItem value="conversation">{t('conversation')}</SelectItem>
                      <SelectItem value="ielts">{t('ieltsPrep')}</SelectItem>
                      <SelectItem value="toefl">{t('toefPrep')}</SelectItem>
                      <SelectItem value="academic">{t('academicWriting')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t('availability')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">{t('availableNow')}</SelectItem>
                      <SelectItem value="today">{t('today')}</SelectItem>
                      <SelectItem value="week">{t('thisWeek')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t('priceRange')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">{t('priceLow')}</SelectItem>
                      <SelectItem value="mid">{t('priceMid')}</SelectItem>
                      <SelectItem value="high">{t('priceHigh')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Tutor List */}
            <div className="space-y-6">
              {tutors.map((tutor) => (
                <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={tutor.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {tutor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-semibold">{tutor.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium">{tutor.rating}</span>
                                  <span className="text-muted-foreground">({tutor.reviews} reviews)</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">${tutor.price}</div>
                              <div className="text-sm text-muted-foreground">{t('perHour')}</div>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-3">{tutor.description}</p>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Award className="h-4 w-4 text-muted-foreground" />
                              <span>{tutor.experience} {t('teachingExperience')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <span>{tutor.languages.join(", ")}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span
                                className={
                                  tutor.availability.includes("Available now") ? "text-green-600 font-medium" : ""
                                }
                              >
                                {tutor.availability}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {tutor.specialties.map((specialty) => (
                              <Badge key={specialty} variant="secondary">
                                {specialty}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-3">
                            <Button asChild className="flex-1">
                              <Link href={`/tutoring/book/${tutor.id}`}>{t('bookSession')}</Link>
                            </Button>
                            <Button variant="outline">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              {t('message')}
                            </Button>
                            <Button variant="outline">{t('viewProfile')}</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {t('upcomingSessions')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="p-4 bg-secondary/20 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm text-foreground">{session.subject}</h4>
                      <Badge variant="secondary">{session.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{t('withTutor', { tutor: session.tutor })}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{session.time}</span>
                      <span>{session.duration}</span>
                    </div>
                    <Button size="sm" className="w-full">
                      {t('joinSession')}
                    </Button>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/schedule">{t('viewAllSessions')}</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Tutoring Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="text-center">
                  <div className="text-3xl font-bold text-primary">18</div>
                  <p className="text-sm text-muted-foreground">{t('totalSessions')}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24h</div>
                  <p className="text-sm text-muted-foreground">{t('learningTime')}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">5</div>
                  <p className="text-sm text-muted-foreground">{t('favoriteTutors')}</p>
                </div>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card>
              <CardHeader>
                <CardTitle>{t('needHelp')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                  📞 {t('technicalSupport')}
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                  💬 {t('chatWithSupport')}
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                  📚 {t('tutoringGuidelines')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
