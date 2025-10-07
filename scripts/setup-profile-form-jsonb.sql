-- Simplified ProfileForm Integration with JSONB
-- This approach stores all form data as JSONB for maximum flexibility

-- First, check if user_profiles table exists and has the basic structure
-- If not, create it with minimal required fields

-- Add missing columns for ProfileForm data (only if they don't exist)
DO $$ 
BEGIN
  -- Add user_id as TEXT to support Firebase Auth UIDs
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'user_id') THEN
    ALTER TABLE user_profiles ADD COLUMN user_id TEXT;
  END IF;

  -- Add form_data as JSONB to store complete ProfileFormData
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'form_data') THEN
    ALTER TABLE user_profiles ADD COLUMN form_data JSONB;
  END IF;

  -- Add form completion tracking
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'form_completed') THEN
    ALTER TABLE user_profiles ADD COLUMN form_completed BOOLEAN DEFAULT false;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'form_step_completed') THEN
    ALTER TABLE user_profiles ADD COLUMN form_step_completed INTEGER DEFAULT 0;
  END IF;

  -- Add timestamps if they don't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'created_at') THEN
    ALTER TABLE user_profiles ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'updated_at') THEN
    ALTER TABLE user_profiles ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;
END $$;

-- Add unique constraint on user_id if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unique_user_profiles_user_id') THEN
    ALTER TABLE user_profiles ADD CONSTRAINT unique_user_profiles_user_id UNIQUE (user_id);
  END IF;
END $$;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_form_completion ON user_profiles(form_completed, form_step_completed);
CREATE INDEX IF NOT EXISTS idx_user_profiles_form_data_gin ON user_profiles USING gin(form_data);

-- Add trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at 
  BEFORE UPDATE ON user_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comment for documentation
COMMENT ON TABLE user_profiles IS 'User profiles with ProfileForm data stored as JSONB for flexibility';
COMMENT ON COLUMN user_profiles.user_id IS 'Firebase Auth UID (string)';
COMMENT ON COLUMN user_profiles.form_data IS 'Complete ProfileFormData as JSONB - stores quiz responses, hobbies, preferences, etc.';
COMMENT ON COLUMN user_profiles.form_completed IS 'Whether the user has completed all 3 steps of the profile form';
COMMENT ON COLUMN user_profiles.form_step_completed IS 'Last completed step (0-3)';

-- Example of how the form_data JSONB will look:
/*
{
  "nombre": "Juan Pérez",
  "edad": 25,
  "quizResponses": ["1", "2", "1", "3"],
  "learningStyle": "Visual",
  "mainGoal": "travel",
  "weeklyTime": "1-3",
  "hobbies": ["Leer libros", "Ver películas"],
  "frequency": "weekly",
  "topicsOfInterest": ["Arte / cultura", "Viajes"],
  "availability": [{"day": "Mon", "from": "18:00", "to": "19:00"}],
  "sessionPreference": "mixed",
  "assessmentFrequency": "monthly",
  "device": "desktop",
  "consentPersonalization": true
}
*/