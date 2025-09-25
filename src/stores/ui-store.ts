import { create } from 'zustand';
import { ProfileFormData } from '@/types/forms';

// Profile form state interface
interface ProfileFormState {
  formData: ProfileFormData;
  currentStep: number;
  isSubmitting: boolean;
  error: string | null;
  setFormData: (data: Partial<ProfileFormData>) => void;
  setCurrentStep: (step: number) => void;
  setIsSubmitting: (submitting: boolean) => void;
  setError: (error: string | null) => void;
  resetForm: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

// UI state interface
interface UIState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

// Initial form data
const initialFormData: ProfileFormData = {
  nombre: '',
  quizResponses: [],
  hobbies: [],
  frequency: 'weekly',
  mainGoal: '',
  weeklyTime: '',
  sessionPreference: 'mixed'
};

// Profile form store
export const useProfileFormStore = create<ProfileFormState>((set, get) => ({
  formData: initialFormData,
  currentStep: 1,
  isSubmitting: false,
  error: null,
  setFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),
  setCurrentStep: (step) => set({ currentStep: step }),
  setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),
  setError: (error) => set({ error }),
  resetForm: () => set({
    formData: initialFormData,
    currentStep: 1,
    isSubmitting: false,
    error: null
  }),
  nextStep: () => {
    const { currentStep } = get();
    if (currentStep < 3) {
      set({ currentStep: currentStep + 1 });
    }
  },
  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 });
    }
  },
}));

// UI store (keeping existing functionality)
export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
