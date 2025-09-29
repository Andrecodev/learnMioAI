import { type NextRequest, NextResponse } from "next/server"
import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  try {
    const { messages, topic, level } = await req.json()

    const systemPrompt = `You are an AI English tutor helping a ${level} level student practice conversation about ${topic}. 

Your role:
- Engage in natural conversation while being supportive and encouraging
- Gently correct grammar mistakes by rephrasing correctly
- Ask follow-up questions to keep the conversation flowing
- Provide vocabulary suggestions when appropriate
- Give pronunciation tips for difficult words
- Adapt your language complexity to the student's level

Guidelines:
- Keep responses conversational and not too long
- Focus on fluency over perfect accuracy
- Encourage the student to express their ideas
- Provide positive reinforcement
- If the student makes errors, model the correct form naturally

Student level: ${level}
Topic: ${topic}`

    const result = await streamText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      messages: messages,
      temperature: 0.7,
      // maxTokens: 300,
    })

    // return result?.toDataStreamResponse()
  } catch (error) {
    console.error("AI conversation error:", error)
    return NextResponse.json({ error: "Failed to process conversation" }, { status: 500 })
  }
}
