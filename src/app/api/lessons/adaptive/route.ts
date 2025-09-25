import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  try {
    const { userId, currentLevel, weakAreas, learningGoals, recentPerformance } = await req.json()

    const systemPrompt = `You are an adaptive learning AI that creates personalized lesson recommendations for English language learners.

Based on the student's profile, generate a personalized learning path with specific lesson recommendations.

Student Profile:
- Current Level: ${currentLevel}
- Weak Areas: ${weakAreas?.join(", ") || "None specified"}
- Learning Goals: ${learningGoals?.join(", ") || "General improvement"}
- Recent Performance: ${JSON.stringify(recentPerformance)}

Provide recommendations in this JSON format:
{
  "recommended_lessons": [
    {
      "title": "lesson title",
      "description": "lesson description",
      "skill_focus": "speaking|listening|reading|writing|grammar|vocabulary",
      "difficulty": 1-10,
      "estimated_duration": 30,
      "priority": "high|medium|low",
      "reason": "why this lesson is recommended"
    }
  ],
  "learning_path": {
    "next_milestone": "description of next achievement goal",
    "estimated_weeks": 4,
    "focus_areas": ["area1", "area2"],
    "daily_recommendations": {
      "study_time": 45,
      "lesson_types": ["interactive", "conversation"],
      "skills_to_practice": ["speaking", "vocabulary"]
    }
  },
  "motivational_message": "encouraging message for the student"
}`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: "Generate personalized learning recommendations for this student.",
      temperature: 0.7,
    })

    try {
      const recommendations = JSON.parse(text)
      return NextResponse.json(recommendations)
    } catch (parseError) {
      return NextResponse.json(
        {
          error: "Failed to parse recommendations",
          raw_response: text,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Adaptive learning error:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}
