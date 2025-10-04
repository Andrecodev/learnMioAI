import { NextResponse } from 'next/server'
import { DatabaseFactory } from '@/lib/database'

export async function GET() {
  try {
    const isConnected = await DatabaseFactory.testConnection()
    
    return NextResponse.json({
      success: isConnected,
      message: isConnected ? 'Database connected successfully' : 'Database connection failed',
      provider: process.env.DATABASE_PROVIDER || 'supabase',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Connection test failed', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}