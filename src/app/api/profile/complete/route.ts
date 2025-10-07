import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { userId, formData } = await request.json();

    if (!userId || !formData) {
      return NextResponse.json(
        { error: 'User ID and form data are required' },
        { status: 400 }
      );
    }

    // Store everything as JSONB - much simpler and flexible
    const profileData = {
      user_id: userId, // Firebase Auth UID as string
      form_data: formData, // Complete form data as JSONB
      form_completed: true,
      form_step_completed: 3, // All steps completed
      updated_at: new Date().toISOString()
    };

    // Check if profile exists first
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();

    let data, error;
    
    if (existingProfile) {
      // Update existing profile
      ({ data, error } = await supabase
        .from('user_profiles')
        .update(profileData)
        .eq('user_id', userId)
        .select()
        .single());
    } else {
      // Insert new profile
      ({ data, error } = await supabase
        .from('user_profiles')
        .insert(profileData)
        .select()
        .single());
    }

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save profile', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Profile saved successfully',
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