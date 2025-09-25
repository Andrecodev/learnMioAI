'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { ProfileFormData } from '@/src/types/forms';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { useProfileFormStore } from '@/src/stores/ui-store';
import { useBatchProfileSave } from '@/src/hooks/use-api';

export default function ProfileForm() {
  // Zustand store for form state management
  const {
    formData,
    currentStep,
    isSubmitting,
    error,
    setFormData,
    setCurrentStep,
    setIsSubmitting,
    setError,
    nextStep,
    prevStep,
    resetForm
  } = useProfileFormStore();

  // TanStack Query mutation for external API
  const batchSaveMutation = useBatchProfileSave();
  
  const { setProfileCompleted, user } = useAuth();
  const router = useRouter();

  // Reset form when component mounts
  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log("📝 ProfileForm: Submitting profile data", formData);
      
      // Use external API through TanStack Query
      if (user?.uid) {
        await batchSaveMutation.mutateAsync({
          profileData: formData,
          userId: user.uid
        });
      } else {
        // Fallback to local API if no external service
        const response = await fetch('/api/profile/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to save profile');
        }
      }

      console.log("✅ ProfileForm: Profile saved successfully, setting cookie");
      setProfileCompleted(true);
      
      console.log("➡️ ProfileForm: Redirecting to dashboard");
      router.push('/dashboard');
    } catch (err) {
      console.error("❌ ProfileForm: Error saving profile:", err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <div className="flex justify-between items-center relative">
          {/* Progress bar */}
          <div className="absolute h-1 bg-muted top-4 left-0 right-0 -z-10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            />
          </div>
          
          {/* Step indicators */}
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                ${currentStep === num 
                  ? 'bg-primary text-primary-foreground scale-110 shadow-lg ring-4 ring-primary/20' 
                  : num < currentStep 
                    ? 'bg-primary/80 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'}`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg animate-in slide-in-from-top-2 fade-in duration-300">
          {error}
        </div>
      )}

      {/* TanStack Query loading state */}
      {batchSaveMutation.isPending && (
        <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-lg animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700"></div>
            Saving to external service...
          </div>
        </div>
      )}

      {/* Zustand state debug (remove in production) */}
      <div className="mb-4 p-3 bg-gray-100 rounded text-xs text-gray-600">
        <div>Zustand State - Step: {currentStep}, Submitting: {isSubmitting ? 'Yes' : 'No'}</div>
        <div>TanStack Query - Pending: {batchSaveMutation.isPending ? 'Yes' : 'No'}</div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="relative min-h-[400px] transition-all duration-500">
          {currentStep === 1 && (
            <div className="animate-in slide-in-from-right-1/2 duration-500">
              <StepOne
                formData={formData}
                setFormData={setFormData}
                onNext={nextStep}
              />
            </div>
          )}
          {currentStep === 2 && (
            <div className="animate-in slide-in-from-right-1/2 duration-500">
              <StepTwo
                formData={formData}
                setFormData={setFormData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            </div>
          )}
          {currentStep === 3 && (
            <div className="animate-in slide-in-from-right-1/2 duration-500">
              <StepThree
                formData={formData}
                setFormData={setFormData}
                onPrev={prevStep}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
