import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { userId, step, stepData } = await request.json();

    if (!userId || !step || !stepData) {
      return NextResponse.json(
        { error: 'User ID, step, and step data are required' },
        { status: 400 }
      );
    }

    // Get existing profile
    let { data: profile } = await supabase
      .from('user_profiles')
      .select('form_data, id')
      .eq('user_id', userId)
      .single();

    // Merge step data with existing data (all as JSONB)
    const existingData = profile?.form_data || {};
    const updatedData = { ...existingData, ...stepData };

    const stepUpdateData = {
      user_id: userId, // Firebase Auth UID as string
      form_data: updatedData, // Store as JSONB
      form_step_completed: step,
      updated_at: new Date().toISOString()
    };

    let data, error;
    
    if (profile) {
      // Update existing profile
      ({ data, error } = await supabase
        .from('user_profiles')
        .update(stepUpdateData)
        .eq('user_id', userId)
        .select()
        .single());
    } else {
      // Insert new profile
      ({ data, error } = await supabase
        .from('user_profiles')
        .insert(stepUpdateData)
        .select()
        .single());
    }

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save step', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: `Step ${step} saved successfully`,
      profile: data 
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}