"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
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

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content:
        "Hello! I'm your AI English tutor. I'm here to help you practice conversation, grammar, and pronunciation. What would you like to work on today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [currentTopic, setCurrentTopic] = useState("General Conversation")
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
      content:
        "That's a great question! Let me help you with that. Your sentence structure is good, but I noticed a small grammar point we can improve.",
      sender: "ai",
      timestamp: new Date(),
      feedback: {
        grammar: ["Consider using 'have been' instead of 'was' for ongoing actions"],
        pronunciation: ["The 'th' sound in 'think' could be clearer"],
        suggestions: ["Try: 'I have been thinking about this topic lately'"],
      },
    }

    setMessages([...messages, userMessage, aiResponse])
    setInputMessage("")
  }

  const conversationTopics = [
    "General Conversation",
    "Business English",
    "Travel & Tourism",
    "Academic Discussion",
    "Job Interview Practice",
    "Daily Life Situations",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-blue-600" />
                <h1 className="text-2xl font-bold">AI Tutor Session</h1>
              </div>
              <Badge variant="secondary">{currentTopic}</Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>
                  {Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, "0")}
                </span>
              </div>
              <Button variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                New Topic
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
                    <CardTitle className="text-lg">Emma - AI Tutor</CardTitle>
                    <p className="text-sm text-gray-600">Specialized in conversational English</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Online
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
                              message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p>{message.content}</p>
                          </div>

                          {message.feedback && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 space-y-2">
                              <h4 className="font-semibold text-sm text-yellow-800">Feedback & Suggestions</h4>
                              {message.feedback.grammar.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-yellow-700">Grammar:</p>
                                  <ul className="text-xs text-yellow-600 list-disc list-inside">
                                    {message.feedback.grammar.map((item, i) => (
                                      <li key={i}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {message.feedback.suggestions.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-yellow-700">Suggestions:</p>
                                  <ul className="text-xs text-yellow-600 list-disc list-inside">
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
                      placeholder="Type your message or use voice input..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <Volume2 className="h-3 w-3" />
                    <span>AI will provide pronunciation feedback and grammar suggestions</span>
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
                  Topics
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
                    {topic}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Session Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Session Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Practice past tense</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Improve pronunciation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span>Use 5 new vocabulary words</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                  📝 Grammar Check
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                  🔊 Pronunciation Practice
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                  📚 Vocabulary Builder
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                  🎯 Take Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
