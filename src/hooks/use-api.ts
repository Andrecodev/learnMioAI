// TanStack Query hooks for API operations
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { ProfileFormData } from '@/src/types/forms';

// Query keys for caching
export const queryKeys = {
  profile: (userId: string) => ['profile', userId],
  lessons: (level: string, topic?: string) => ['lessons', level, topic],
  analytics: (userId: string) => ['analytics', userId],
};

// Profile hooks
export const useProfileMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.profile.save,
    onSuccess: (data, variables) => {
      // Invalidate and refetch profile queries
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      
      // Optimistically update cache if we have user ID
      // queryClient.setQueryData(queryKeys.profile(userId), data);
    },
    onError: (error) => {
      console.error('Profile save failed:', error);
    },
  });
};

export const useProfileQuery = (userId: string, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.profile(userId),
    queryFn: () => api.profile.get(userId),
    enabled: enabled && !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProfileUpdateMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: Partial<ProfileFormData> }) =>
      api.profile.update(userId, data),
    onSuccess: (data, variables) => {
      // Update the cache with new data
      queryClient.setQueryData(queryKeys.profile(variables.userId), data);
    },
    onError: (error) => {
      console.error('Profile update failed:', error);
    },
  });
};

// Lessons hooks
export const useLessonsQuery = (level: string, topic?: string) => {
  return useQuery({
    queryKey: queryKeys.lessons(level, topic),
    queryFn: () => api.content.getLessons(level, topic),
    enabled: !!level,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useQuizSubmissionMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ quizId, answers }: { quizId: string; answers: any[] }) =>
      api.content.submitQuiz(quizId, answers),
    onSuccess: (data, variables) => {
      // Invalidate analytics queries to refresh progress
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
    onError: (error) => {
      console.error('Quiz submission failed:', error);
    },
  });
};

// Analytics hooks
export const useProgressMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, activityData }: { userId: string; activityData: any }) =>
      api.analytics.trackProgress(userId, activityData),
    onSuccess: (data, variables) => {
      // Update analytics cache
      queryClient.invalidateQueries({ queryKey: queryKeys.analytics(variables.userId) });
    },
    onError: (error) => {
      console.error('Progress tracking failed:', error);
    },
  });
};

// Custom hook for batch operations
export const useBatchProfileSave = () => {
  const profileMutation = useProfileMutation();
  const progressMutation = useProgressMutation();
  
  return useMutation({
    mutationFn: async ({ profileData, userId }: { profileData: ProfileFormData; userId: string }) => {
      // Save profile first
      const profileResult = await profileMutation.mutateAsync(profileData);
      
      // Track completion activity
      const activityData = {
        action: 'profile_completed',
        timestamp: new Date().toISOString(),
        metadata: {
          steps_completed: 3,
          form_data: profileData,
        },
      };
      
      await progressMutation.mutateAsync({ userId, activityData });
      
      return profileResult;
    },
  });
};
