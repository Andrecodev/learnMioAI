export type LearningStyle = 'Visual' | 'Auditivo' | 'Kinestésico' | 'Lectura/Escritura' | 'Mixto';

// @/types/forms.ts
export interface AvailabilitySlot {
  day: string;     // "Mon", "Tue", ...
  from: string;    // "18:00"
  to: string;      // "19:00"
}
export interface ProfileFormData {
  // datos base
  nombre?: string;
  edad?: number | null;
  email?: string;

  // Step1 (pedagogía + objetivo)
  quizResponses: number[];      // respuestas del quiz de estilos
  learningStyle?: string;       // "Visual" | "Auditivo" | "Kinestésico" | "Lectura/Escritura" | "Mixto"

  mainGoal?: string;            // objetivo principal (fluency, work, travel, ...)
  weeklyTime?: string;          // "<1", "1-3", "3-6", "6+"
  deadline?: string | null;     // fecha ISO opcional
  followUp?: 'ia' | 'teacher' | 'mentor' | null;

  // Step2 (hobbies / intereses)
  hobbies: string[];
  otherHobby?: string | null;
  frequency?: 'daily' | 'weekly' | 'occasional' | null;
  topicsOfInterest?: string[];   // e.g. ["negocios", "viajes"]

  // Step3 (logística)
  availability: AvailabilitySlot[]; // lista de franjas
  sessionPreference?: 'short' | 'long' | 'mixed';
  assessmentFrequency?: 'none' | 'biweekly' | 'monthly';
  oralTest?: boolean;
  device?: 'mobile' | 'desktop' | 'mobile-limited' | null;

  // consentimiento + comments
  additionalComments?: string | null;
  consentPersonalization?: boolean;

  // meta / estado
  createdAt?: string;
  updatedAt?: string;
}
