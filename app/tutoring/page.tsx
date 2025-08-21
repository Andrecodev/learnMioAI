import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Clock, Globe, Calendar, Video, MessageSquare, Award, Filter, Search } from "lucide-react"
import Link from "next/link"

export default function TutoringPage() {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Live Tutoring</h1>
              <p className="text-gray-600 mt-1">Connect with certified English instructors worldwide</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                <Video className="h-4 w-4 mr-1" />
                HD Video Sessions
              </Badge>
              <Button asChild>
                <Link href="/tutoring/book">Book Session</Link>
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
                  Find Your Perfect Tutor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search tutors..." className="pl-10" />
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">Business English</SelectItem>
                      <SelectItem value="conversation">Conversation</SelectItem>
                      <SelectItem value="ielts">IELTS Prep</SelectItem>
                      <SelectItem value="toefl">TOEFL Prep</SelectItem>
                      <SelectItem value="academic">Academic Writing</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Available Now</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">$15-25/hour</SelectItem>
                      <SelectItem value="mid">$25-35/hour</SelectItem>
                      <SelectItem value="high">$35+/hour</SelectItem>
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
                                  <span className="text-gray-500">({tutor.reviews} reviews)</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-600">${tutor.price}</div>
                              <div className="text-sm text-gray-500">per hour</div>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-3">{tutor.description}</p>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Award className="h-4 w-4 text-gray-400" />
                              <span>{tutor.experience} teaching experience</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Globe className="h-4 w-4 text-gray-400" />
                              <span>{tutor.languages.join(", ")}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-gray-400" />
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
                              <Link href={`/tutoring/book/${tutor.id}`}>Book Session</Link>
                            </Button>
                            <Button variant="outline">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                            <Button variant="outline">View Profile</Button>
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
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="p-4 bg-blue-50 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{session.subject}</h4>
                      <Badge variant="secondary">{session.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">with {session.tutor}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{session.time}</span>
                      <span>{session.duration}</span>
                    </div>
                    <Button size="sm" className="w-full">
                      Join Session
                    </Button>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/schedule">View All Sessions</Link>
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
                  <div className="text-3xl font-bold text-blue-600">18</div>
                  <p className="text-sm text-gray-600">Total Sessions</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">24h</div>
                  <p className="text-sm text-gray-600">Learning Time</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">5</div>
                  <p className="text-sm text-gray-600">Favorite Tutors</p>
                </div>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                  📞 Technical Support
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                  💬 Chat with Support
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                  📚 Tutoring Guidelines
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
