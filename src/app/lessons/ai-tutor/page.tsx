"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/types/components/ui/card"
import { Button } from "@/src/types/components/ui/button"
import { Input } from "@/src/types/components/ui/input"
import { Badge } from "@/src/types/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/types/components/ui/avatar"
import { ScrollArea } from "@/src/types/components/ui/scroll-area"
import { Mic, MicOff, Send, Volume2, Brain, BookOpen, Target, Clock, RotateCcw } from "lucide-react"

interface Message {
  id: number
  content: string
  sender: "user" | "ai"
  timestamp: Date
  feedback?: {
    grammar: string[]
    pronunciation: string[]
    suggestions: string[]
  }
}

import { useTranslations } from 'next-intl'

export default function AITutorPage() {
  const t = useTranslations('aiTutor')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
  content: t('helloAITutor'),
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [currentTopic, setCurrentTopic] = useState("generalConversation")
  const [sessionTime, setSessionTime] = useState(0)

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    // Simulate AI response with feedback
    const aiResponse: Message = {
      id: messages.length + 2,
      content: t('greatQuestion'),
      sender: "ai",
      timestamp: new Date(),
      feedback: {
        grammar: [t('considerUsing')],
        pronunciation: [t('thSoundClearer')],
        suggestions: [t('tryExample')],
      },
    }

    setMessages([...messages, userMessage, aiResponse])
    setInputMessage("")
  }

  const conversationTopics = [
    'generalConversation',
    'businessEnglish',
    'travelTourism',
    'academicDiscussion',
    'jobInterviewPractice',
    'dailyLifeSituations',
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Brain className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">{t('aiTutorSession')}</h1>
              <Badge variant="secondary">{t(currentTopic)}</Badge>
            </div>

        <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
          {Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <Button variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                {t('newTopic')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg text-foreground">{t('emmaAITutor')}</CardTitle>
                    <p className="text-sm text-muted-foreground">{t('specializedConversational')}</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="secondary" className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                      {t('online')}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[80%] space-y-2`}>
                          <div
                            className={`p-3 rounded-lg ${
                              message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <p>{message.content}</p>
                          </div>

                          {message.feedback && (
                            <div className="bg-card border border-border rounded-lg p-3 space-y-2">
                              <h4 className="font-semibold text-sm text-foreground">{t('feedbackSuggestions')}</h4>
                              {message.feedback.grammar.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-foreground">{t('grammar')}</p>
                                  <ul className="text-xs text-muted-foreground list-disc list-inside">
                                    {message.feedback.grammar.map((item, i) => (
                                      <li key={i}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {message.feedback.suggestions.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-foreground">{t('suggestions')}</p>
                                  <ul className="text-xs text-muted-foreground list-disc list-inside">
                                    {message.feedback.suggestions.map((item, i) => (
                                      <li key={i}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Button
                      variant={isRecording ? "destructive" : "outline"}
                      size="icon"
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    <Input
                      placeholder={t('typeMessage')}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Volume2 className="h-3 w-3" />
                      <span>{t('aiWillProvide')}</span>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Conversation Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {t('topics')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {conversationTopics.map((topic) => (
                  <Button
                    key={topic}
                    variant={topic === currentTopic ? "default" : "ghost"}
                    className="w-full justify-start text-sm"
                    onClick={() => setCurrentTopic(topic)}
                  >
                    {t(topic)}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Session Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  {t('sessionGoals')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{t('practicePastTense')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>{t('improvePronunciation')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span>{t('use5NewVocab')}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('quickActions')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                  📝 {t('grammarCheck')}
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                  🔊 {t('pronunciationPractice')}
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                  📚 {t('vocabularyBuilder')}
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                  🎯 {t('takeQuiz')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
