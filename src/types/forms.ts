export type LearningStyle = 'Visual' | 'Auditivo' | 'Kinestésico' | 'Lectura/Escritura' | 'Mixto';

export interface ProfileFormData {
  // Step 1
  nombre: string;
  edad?: number;
  email?: string;
  quizResponses: number[];
  learningStyle?: LearningStyle;
  
  // Step 2
  hobbies: string[];
  otherHobby?: string;
  frequency: 'daily' | 'weekly' | 'occasional';
  
  // Step 3
  mainGoal: string;
  weeklyTime: string;
  sessionPreference: 'short' | 'long' | 'mixed';
  additionalComments?: string;
}
