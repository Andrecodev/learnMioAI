'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { ProfileFormData } from '@/types/forms';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { useProfileFormStore } from '@/stores/ui-store';
import { useBatchProfileSave } from '@/hooks/use-api';

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

      setProfileCompleted(true);
      router.push('/dashboard');
    } catch (err) {
      console.error("❌ ProfileForm: Error saving profile:", err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-transparent animate-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 px-2">
          Personaliza tu experiencia de aprendizaje
        </h1>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-4">
          Cuéntanos sobre ti para crear el plan de estudio perfecto
        </p>
      </div>

      {/* Enhanced Progress Section */}
      <div className="mb-6 sm:mb-8 lg:mb-10 px-2 sm:px-0">
        <div className="flex justify-between items-center relative mb-6 sm:mb-8">
          {/* Progress bar */}
          <div className="absolute h-1.5 sm:h-2 bg-gray-200 top-4 sm:top-5 left-0 right-0 -z-10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            />
          </div>
          
          {/* Step indicators with labels */}
          {[
            { num: 1, label: "Información básica" },
            { num: 2, label: "Intereses y hobbies" },
            { num: 3, label: "Preferencias finales" }
          ].map(({ num, label }) => (
            <div key={num} className="flex flex-col items-center max-w-20 sm:max-w-24 lg:max-w-32">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-500 mb-2 text-xs sm:text-sm lg:text-base
                  ${currentStep === num 
                    ? 'bg-blue-600 text-white scale-110 shadow-lg ring-2 sm:ring-4 ring-blue-200' 
                    : num < currentStep 
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-200 text-gray-500'}`}
              >
                {num < currentStep ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  num
                )}
              </div>
              <span className={`text-xs sm:text-sm font-medium text-center leading-tight px-1 ${
                currentStep === num ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {label}
              </span>
            </div>
          ))}
        </div>
        
        {/* Progress percentage */}
        <div className="text-center">
          <span className="text-xs sm:text-sm text-gray-600">
            Progreso: {Math.round(((currentStep - 1) / 2) * 100)}% completado
          </span>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Error al guardar</span>
          </div>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      )}

      {/* Loading State for TanStack Query */}
      {batchSaveMutation.isPending && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
            <div>
              <div className="font-medium">Guardando tu información...</div>
              <div className="text-sm text-blue-600">Esto puede tomar unos segundos</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Form Content */}
      <div className="bg-gray-50 rounded-lg p-3 sm:p-4 lg:p-6 min-h-[500px] sm:min-h-[600px]">
        <form onSubmit={handleSubmit} className="h-full">
          <div className="relative h-full">
            {currentStep === 1 && (
              <div className="animate-in slide-in-from-right-1/2 duration-500 h-full">
                <StepOne
                  formData={formData}
                  setFormData={setFormData}
                  onNext={nextStep}
                />
              </div>
            )}
            {currentStep === 2 && (
              <div className="animate-in slide-in-from-right-1/2 duration-500 h-full">
                <StepTwo
                  formData={formData}
                  setFormData={setFormData}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              </div>
            )}
            {currentStep === 3 && (
              <div className="animate-in slide-in-from-right-1/2 duration-500 h-full">
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

      {/* Footer Information */}
      <div className="mt-6 sm:mt-8 text-center px-2">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center space-x-2 min-w-0">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="whitespace-nowrap">Información segura</span>
          </div>
          <div className="flex items-center space-x-2 min-w-0">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="whitespace-nowrap">Plan personalizado</span>
          </div>
          <div className="flex items-center space-x-2 min-w-0">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span className="whitespace-nowrap">3 minutos para completar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
