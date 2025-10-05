import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { DatabaseProvider, User, UserProfile, UserInsert, ProfileInsert, DatabaseConfig } from './types';

export class SupabaseProvider implements DatabaseProvider {
  private client: SupabaseClient;

  constructor(config: DatabaseConfig) {
    if (!config.url || !config.key) {
      throw new Error('Supabase URL and key are required');
    }
    
    this.client = createClient(config.url, config.key);
  }

  async testConnection(): Promise<boolean> {
    try {
      const { error } = await this.client.from('usersx').select('count').limit(1);
      return !error;
    } catch {
      return false;
    }
  }

  // User operations
  async createUser(userData: UserInsert): Promise<User> {
    const { data, error } = await this.client
      .from('users')
      .insert(userData)
      .select()
      .single();    
    
    if (error) throw new Error(`Failed to create user: ${error.message}`);
    return data;
  }

  async getUserById(id: string): Promise<User | null> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw new Error(`Failed to get user: ${error.message}`);
    }
    return data;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const { data, error } = await this.client
      .from('users')
      .update(userData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new Error(`Failed to update user: ${error.message}`);
    return data;
  }

  // Profile operations
  async createProfile(profileData: ProfileInsert): Promise<UserProfile> {
    const { data, error } = await this.client
      .from('user_profiles')
      .insert(profileData)
      .select()
      .single();
    
    if (error) throw new Error(`Failed to create profile: ${error.message}`);
    return data;
  }

  async getProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await this.client
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw new Error(`Failed to get profile: ${error.message}`);
    }
    return data;
  }

  async updateProfile(userId: string, profileData: Partial<UserProfile>): Promise<UserProfile> {
    const { data, error } = await this.client
      .from('user_profiles')
      .update(profileData)
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error) throw new Error(`Failed to update profile: ${error.message}`);
    return data;
  }
}