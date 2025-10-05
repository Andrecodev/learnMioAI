// Database types and interfaces
export interface DatabaseProvider {
  // User operations
  createUser(userData: UserInsert): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  updateUser(id: string, data: Partial<User>): Promise<User>;
  
  // Profile operations
  createProfile(profileData: ProfileInsert): Promise<UserProfile>;
  getProfile(userId: string): Promise<UserProfile | null>;
  updateProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile>;
  
  // Connection test
  testConnection(): Promise<boolean>;
}

// Database entities
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  current_level?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  current_level?: string;
  form_responses?: any;
  step_one_data?: any;
  step_two_data?: any;
  step_three_data?: any;
  quiz_results?: any;
  learning_style?: string;
  interests?: string[];
  preferred_study_time?: string;
  daily_goal_minutes?: number;
  weekly_goal_lessons?: number;
  created_at: string;
  updated_at: string;
}

// Insert types (without auto-generated fields)
export type UserInsert = Omit<User, 'id' | 'created_at' | 'updated_at'>;
export type ProfileInsert = Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>;

// Provider configuration
export interface DatabaseConfig {
  provider?: 'supabase' | 'postgresql' | 'mysql';
  url: string;
  key?: string;
  options?: Record<string, any>;
}