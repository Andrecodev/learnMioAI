// API utilities for external endpoints
import { ProfileFormData } from '@/src/types/forms';

export const api = {
  // Base configuration for local Next.js API routes
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  
  // Headers for API calls
  getHeaders: () => ({
    'Content-Type': 'application/json',
    // Only add auth header if we have a token and it's an external API
    ...(process.env.NEXT_PUBLIC_API_TOKEN && api.baseURL ? 
      { 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}` } : {}
    ),
  }),

  // Profile related endpoints
  profile: {
    // Save profile to local Next.js API route
    save: async (data: ProfileFormData) => {
      const url = api.baseURL ? `${api.baseURL}/api/profiles` : '/api/profile/save';
      const response = await fetch(url, {
        method: 'POST',
        headers: api.getHeaders(),
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          // If response is not JSON (like HTML 404 page), use default message
          errorMessage = `Failed to save profile (${response.status})`;
        }
        throw new Error(errorMessage);
      }
      
      return response.json();
    },

    // Get profile from external service
    get: async (userId: string) => {
      const response = await fetch(`${api.baseURL}/api/profiles/${userId}`, {
        method: 'GET',
        headers: api.getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      
      return response.json();
    },

    // Update profile on external service
    update: async (userId: string, data: Partial<ProfileFormData>) => {
      const response = await fetch(`${api.baseURL}/api/profiles/${userId}`, {
        method: 'PUT',
        headers: api.getHeaders(),
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
      
      return response.json();
    },
  },

  // Learning content endpoints
  content: {
    // Get lessons from external service
    getLessons: async (level: string, topic?: string) => {
      const params = new URLSearchParams({ level });
      if (topic) params.append('topic', topic);
      
      const response = await fetch(`${api.baseURL}/api/lessons?${params}`, {
        method: 'GET',
        headers: api.getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch lessons');
      }
      
      return response.json();
    },

    // Submit quiz results to external service
    submitQuiz: async (quizId: string, answers: any[]) => {
      const response = await fetch(`${api.baseURL}/api/quizzes/${quizId}/submit`, {
        method: 'POST',
        headers: api.getHeaders(),
        body: JSON.stringify({ answers }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }
      
      return response.json();
    },
  },

  // Analytics endpoints
  analytics: {
    // Track user progress
    trackProgress: async (userId: string, activityData: any) => {
      const response = await fetch(`${api.baseURL}/api/analytics/progress`, {
        method: 'POST',
        headers: api.getHeaders(),
        body: JSON.stringify({ userId, ...activityData }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to track progress');
      }
      
      return response.json();
    },
  },
};
