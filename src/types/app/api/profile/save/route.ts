import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ProfileFormData } from '@/src/types/forms'

export async function POST(request: NextRequest) {
  try {
    const data: ProfileFormData = await request.json()

    // Here you would typically save the data to your database
    // For now, we'll just validate the data
    if (!data.nombre || !data.mainGoal || !data.weeklyTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Return success response
    return NextResponse.json(
      { message: 'Profile saved successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save profile' },
      { status: 500 }
    )
  }
}
