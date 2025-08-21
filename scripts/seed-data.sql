-- Seed data for English Learning Platform

-- Insert sample achievements
INSERT INTO achievements (name, description, icon, category, criteria, points) VALUES
('First Steps', 'Complete your first lesson', '🎯', 'learning', '{"lessons_completed": 1}', 10),
('Grammar Master', 'Complete 50 grammar exercises with 90%+ accuracy', '📚', 'grammar', '{"grammar_exercises": 50, "min_accuracy": 90}', 100),
('Conversation Starter', 'Have 10 AI conversations', '💬', 'speaking', '{"ai_conversations": 10}', 50),
('Streak Champion', 'Maintain a 30-day learning streak', '🔥', 'consistency', '{"streak_days": 30}', 200),
('Vocabulary Builder', 'Learn 100 new words', '📖', 'vocabulary', '{"words_learned": 100}', 75),
('Pronunciation Pro', 'Get 95%+ pronunciation score in 20 sessions', '🎤', 'pronunciation', '{"pronunciation_sessions": 20, "min_score": 95}', 150),
('Night Owl', 'Complete 10 lessons after 10 PM', '🦉', 'dedication', '{"late_lessons": 10}', 25),
('Early Bird', 'Complete 10 lessons before 7 AM', '🌅', 'dedication', '{"early_lessons": 10}', 25),
('Social Learner', 'Join 5 group conversations', '👥', 'social', '{"group_conversations": 5}', 40),
('Test Master', 'Score 90%+ on 5 practice tests', '🏆', 'testing', '{"practice_tests": 5, "min_score": 90}', 120);

-- Insert sample vocabulary words
INSERT INTO vocabulary_words (word, definition, pronunciation, part_of_speech, difficulty_level, example_sentences, synonyms, antonyms, frequency_rank) VALUES
('accomplish', 'to complete successfully', '/əˈkʌmplɪʃ/', 'verb', 'B2', 
 ARRAY['She accomplished her goal of learning English.', 'The team accomplished the project ahead of schedule.'], 
 ARRAY['achieve', 'complete', 'fulfill'], ARRAY['fail', 'abandon'], 1500),
 
('beneficial', 'having a good or helpful effect', '/ˌbenɪˈfɪʃəl/', 'adjective', 'B2',
 ARRAY['Regular exercise is beneficial for your health.', 'The new policy will be beneficial to students.'],
 ARRAY['helpful', 'advantageous', 'useful'], ARRAY['harmful', 'detrimental'], 2100),
 
('comprehensive', 'including everything that is necessary; complete', '/ˌkɒmprɪˈhensɪv/', 'adjective', 'C1',
 ARRAY['The report provides a comprehensive analysis.', 'She has comprehensive knowledge of the subject.'],
 ARRAY['complete', 'thorough', 'extensive'], ARRAY['incomplete', 'partial'], 2800),
 
('demonstrate', 'to show clearly by giving proof or evidence', '/ˈdemənstreɪt/', 'verb', 'B1',
 ARRAY['The teacher will demonstrate the experiment.', 'His actions demonstrate his commitment.'],
 ARRAY['show', 'prove', 'illustrate'], ARRAY['hide', 'conceal'], 1200),
 
('efficient', 'working in a well-organized way', '/ɪˈfɪʃənt/', 'adjective', 'B2',
 ARRAY['She is very efficient at her job.', 'This is an efficient use of time.'],
 ARRAY['effective', 'productive', 'capable'], ARRAY['inefficient', 'wasteful'], 1800);

-- Insert sample lessons
INSERT INTO lessons (title, description, level, skill_focus, lesson_type, content, estimated_duration, learning_objectives, difficulty_score, is_published) VALUES
('Present Perfect Tense', 'Learn to use present perfect tense correctly', 'B1', 'grammar', 'interactive', 
 '{"sections": [{"type": "explanation", "content": "Present perfect formation"}, {"type": "practice", "exercises": 10}]}', 
 45, ARRAY['Understand present perfect formation', 'Use present perfect in context'], 6, true),
 
('Business Email Writing', 'Professional email communication skills', 'B2', 'writing', 'interactive',
 '{"sections": [{"type": "examples", "content": "Email templates"}, {"type": "practice", "exercises": 5}]}',
 60, ARRAY['Write professional emails', 'Use appropriate business language'], 7, true),
 
('Pronunciation: TH Sounds', 'Master the challenging TH sounds', 'A2', 'speaking', 'audio',
 '{"sections": [{"type": "audio", "content": "TH sound examples"}, {"type": "practice", "exercises": 15}]}',
 30, ARRAY['Pronounce TH sounds correctly', 'Distinguish between voiced and voiceless TH'], 5, true),
 
('Reading Comprehension: News Articles', 'Improve reading skills with current events', 'B2', 'reading', 'text',
 '{"sections": [{"type": "article", "content": "Sample news articles"}, {"type": "questions", "exercises": 8}]}',
 50, ARRAY['Understand main ideas in news articles', 'Identify supporting details'], 7, true),
 
('Conversation: Making Small Talk', 'Learn natural conversation starters', 'A2', 'speaking', 'conversation',
 '{"sections": [{"type": "dialogue", "content": "Small talk examples"}, {"type": "role_play", "scenarios": 5}]}',
 40, ARRAY['Initiate casual conversations', 'Respond appropriately to small talk'], 4, true);

-- Insert sample tutors (these would be real user accounts in production)
INSERT INTO users (email, password_hash, first_name, last_name, current_level, subscription_type) VALUES
('sarah.johnson@englishai.com', '$2b$12$example_hash_1', 'Sarah', 'Johnson', 'C2', 'premium'),
('michael.chen@englishai.com', '$2b$12$example_hash_2', 'Michael', 'Chen', 'C2', 'premium'),
('emma.rodriguez@englishai.com', '$2b$12$example_hash_3', 'Emma', 'Rodriguez', 'C2', 'premium'),
('david.thompson@englishai.com', '$2b$12$example_hash_4', 'David', 'Thompson', 'C2', 'premium');

-- Insert tutor profiles
INSERT INTO tutors (user_id, certification, specialties, languages_spoken, teaching_experience_years, hourly_rate, bio, rating, total_reviews, is_verified, timezone) 
SELECT 
    u.id,
    CASE u.first_name
        WHEN 'Sarah' THEN ARRAY['TESOL', 'IELTS Certified']
        WHEN 'Michael' THEN ARRAY['PhD Linguistics', 'TOEFL Certified']
        WHEN 'Emma' THEN ARRAY['CELTA', 'Business English Certified']
        WHEN 'David' THEN ARRAY['MA Applied Linguistics', 'Academic Writing Specialist']
    END,
    CASE u.first_name
        WHEN 'Sarah' THEN ARRAY['Business English', 'IELTS Prep', 'Conversation']
        WHEN 'Michael' THEN ARRAY['Academic English', 'Grammar', 'Writing']
        WHEN 'Emma' THEN ARRAY['Conversation', 'Pronunciation', 'Cultural English']
        WHEN 'David' THEN ARRAY['TOEFL Prep', 'Academic Writing', 'Research Skills']
    END,
    CASE u.first_name
        WHEN 'Sarah' THEN ARRAY['English (Native)', 'Spanish']
        WHEN 'Michael' THEN ARRAY['English (Native)', 'Mandarin']
        WHEN 'Emma' THEN ARRAY['English (Native)', 'French', 'Portuguese']
        WHEN 'David' THEN ARRAY['English (Native)', 'German']
    END,
    CASE u.first_name
        WHEN 'Sarah' THEN 8
        WHEN 'Michael' THEN 6
        WHEN 'Emma' THEN 10
        WHEN 'David' THEN 12
    END,
    CASE u.first_name
        WHEN 'Sarah' THEN 25.00
        WHEN 'Michael' THEN 22.00
        WHEN 'Emma' THEN 28.00
        WHEN 'David' THEN 30.00
    END,
    CASE u.first_name
        WHEN 'Sarah' THEN 'Certified TESOL instructor with expertise in business communication and test preparation.'
        WHEN 'Michael' THEN 'PhD in Linguistics with focus on academic writing and advanced grammar instruction.'
        WHEN 'Emma' THEN 'International communication expert helping students with natural conversation skills.'
        WHEN 'David' THEN 'Former university professor specializing in academic English and standardized test preparation.'
    END,
    CASE u.first_name
        WHEN 'Sarah' THEN 4.9
        WHEN 'Michael' THEN 4.8
        WHEN 'Emma' THEN 4.9
        WHEN 'David' THEN 4.7
    END,
    CASE u.first_name
        WHEN 'Sarah' THEN 234
        WHEN 'Michael' THEN 189
        WHEN 'Emma' THEN 312
        WHEN 'David' THEN 156
    END,
    true,
    'UTC'
FROM users u 
WHERE u.email LIKE '%@englishai.com';

-- Create a sample student user
INSERT INTO users (email, password_hash, first_name, last_name, native_language, current_level, target_level, learning_goals, subscription_type) VALUES
('alex.student@example.com', '$2b$12$example_hash_student', 'Alex', 'Johnson', 'Spanish', 'B2', 'C1', 
 ARRAY['Improve business communication', 'Pass IELTS exam', 'Enhance pronunciation'], 'premium');

-- Insert user profile for the sample student
INSERT INTO user_profiles (user_id, interests, learning_style, preferred_study_time, daily_goal_minutes, weekly_goal_lessons)
SELECT id, ARRAY['Technology', 'Travel', 'Business'], 'mixed', 'evening', 45, 7
FROM users WHERE email = 'alex.student@example.com';

-- Insert user streak data
INSERT INTO user_streaks (user_id, current_streak, longest_streak, last_activity_date)
SELECT id, 28, 45, CURRENT_DATE
FROM users WHERE email = 'alex.student@example.com';

-- Insert some sample lesson progress
INSERT INTO user_lesson_progress (user_id, lesson_id, status, score, time_spent, attempts, completed_at)
SELECT 
    u.id,
    l.id,
    'completed',
    CASE 
        WHEN random() > 0.8 THEN 95 + (random() * 5)
        WHEN random() > 0.6 THEN 85 + (random() * 10)
        ELSE 75 + (random() * 10)
    END,
    l.estimated_duration * 60 + (random() * 600)::int,
    1,
    NOW() - (random() * interval '30 days')
FROM users u
CROSS JOIN lessons l
WHERE u.email = 'alex.student@example.com'
AND random() > 0.3; -- Only complete some lessons

-- Insert sample AI conversations
INSERT INTO ai_conversations (user_id, topic, conversation_type, duration_seconds, user_satisfaction, created_at)
SELECT 
    u.id,
    CASE (random() * 5)::int
        WHEN 0 THEN 'Daily Life'
        WHEN 1 THEN 'Travel Planning'
        WHEN 2 THEN 'Job Interview'
        WHEN 3 THEN 'Restaurant Ordering'
        ELSE 'Weather Discussion'
    END,
    CASE (random() * 3)::int
        WHEN 0 THEN 'free_talk'
        WHEN 1 THEN 'guided'
        ELSE 'role_play'
    END,
    300 + (random() * 1200)::int,
    4 + (random())::int,
    NOW() - (random() * interval '60 days')
FROM users u
CROSS JOIN generate_series(1, 42) -- 42 conversations for the sample user
WHERE u.email = 'alex.student@example.com';

-- Insert sample vocabulary progress
INSERT INTO user_vocabulary (user_id, word_id, mastery_level, times_reviewed, times_correct, last_reviewed, next_review)
SELECT 
    u.id,
    v.id,
    (random() * 5)::int,
    (5 + random() * 15)::int,
    (3 + random() * 10)::int,
    NOW() - (random() * interval '7 days'),
    NOW() + (random() * interval '7 days')
FROM users u
CROSS JOIN vocabulary_words v
WHERE u.email = 'alex.student@example.com';

-- Insert sample user achievements
INSERT INTO user_achievements (user_id, achievement_id, earned_at)
SELECT 
    u.id,
    a.id,
    NOW() - (random() * interval '90 days')
FROM users u
CROSS JOIN achievements a
WHERE u.email = 'alex.student@example.com'
AND random() > 0.4; -- User has earned 60% of achievements

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type, is_read, created_at)
SELECT 
    u.id,
    CASE (random() * 4)::int
        WHEN 0 THEN 'Daily Goal Reminder'
        WHEN 1 THEN 'New Achievement Unlocked!'
        WHEN 2 THEN 'Upcoming Tutoring Session'
        ELSE 'Weekly Progress Report'
    END,
    CASE (random() * 4)::int
        WHEN 0 THEN 'Don''t forget to complete your daily lesson!'
        WHEN 1 THEN 'Congratulations! You''ve earned the Grammar Master badge.'
        WHEN 2 THEN 'Your session with Sarah Johnson starts in 1 hour.'
        ELSE 'Check out your learning progress this week.'
    END,
    CASE (random() * 4)::int
        WHEN 0 THEN 'reminder'
        WHEN 1 THEN 'achievement'
        WHEN 2 THEN 'session'
        ELSE 'system'
    END,
    random() > 0.3, -- 70% of notifications are read
    NOW() - (random() * interval '14 days')
FROM users u
CROSS JOIN generate_series(1, 15) -- 15 notifications
WHERE u.email = 'alex.student@example.com';
