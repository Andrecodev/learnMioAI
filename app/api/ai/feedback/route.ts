import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  try {
    const { text, type, level } = await req.json()

    let systemPrompt = ""

    switch (type) {
      case "grammar":
        systemPrompt = `You are an English grammar expert. Analyze the following text for grammar errors and provide constructive feedback for a ${level} level student.

Provide feedback in this JSON format:
{
  "errors": [
    {
      "original": "incorrect text",
      "corrected": "correct text",
      "explanation": "brief explanation of the error",
      "rule": "grammar rule involved"
    }
  ],
  "suggestions": ["general improvement suggestions"],
  "score": 85,
  "level_appropriate": true
}`
        break

      case "pronunciation":
        systemPrompt = `You are a pronunciation expert. Analyze the following text and provide pronunciation guidance for a ${level} level student.

Provide feedback in this JSON format:
{
  "difficult_words": [
    {
      "word": "word",
      "phonetic": "/pronunciation/",
      "tips": "pronunciation tips"
    }
  ],
  "rhythm_tips": ["tips for sentence rhythm and stress"],
  "score": 88,
  "focus_areas": ["areas to practice"]
}`
        break

      case "writing":
        systemPrompt = `You are a writing instructor. Evaluate the following text for a ${level} level student and provide comprehensive feedback.

Provide feedback in this JSON format:
{
  "strengths": ["what the student did well"],
  "areas_for_improvement": ["specific areas to work on"],
  "vocabulary_suggestions": ["better word choices"],
  "structure_feedback": "feedback on organization and flow",
  "score": 82,
  "next_steps": ["actionable improvement steps"]
}`
        break

      default:
        return NextResponse.json({ error: "Invalid feedback type" }, { status: 400 })
    }

    const { text: feedback } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: `Text to analyze: "${text}"`,
      temperature: 0.3,
    })

    try {
      const parsedFeedback = JSON.parse(feedback)
      return NextResponse.json(parsedFeedback)
    } catch (parseError) {
      // If JSON parsing fails, return a structured response
      return NextResponse.json(
        {
          error: "Failed to parse feedback",
          raw_feedback: feedback,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("AI feedback error:", error)
    return NextResponse.json({ error: "Failed to generate feedback" }, { status: 500 })
  }
}
