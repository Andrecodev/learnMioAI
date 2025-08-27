'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { ProfileFormData } from '@/src/types/forms';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

export default function ProfileForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfileFormData>({
    nombre: '',
    quizResponses: [],
    hobbies: [],
    frequency: 'weekly',
    mainGoal: '',
    weeklyTime: '',
    sessionPreference: 'mixed'
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const { setProfileCompleted } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/profile/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      setProfileCompleted(true);
      router.push('/dashboard');
    } catch (err) {
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
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
          
          {/* Step indicators */}
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                ${step === num 
                  ? 'bg-primary text-primary-foreground scale-110 shadow-lg ring-4 ring-primary/20' 
                  : num < step 
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
      
      <form onSubmit={handleSubmit}>
        <div className="relative min-h-[400px] transition-all duration-500">
          {step === 1 && (
            <div className="animate-in slide-in-from-right-1/2 duration-500">
              <StepOne
                formData={formData}
                setFormData={setFormData}
                onNext={nextStep}
              />
            </div>
          )}
          {step === 2 && (
            <div className="animate-in slide-in-from-right-1/2 duration-500">
              <StepTwo
                formData={formData}
                setFormData={setFormData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            </div>
          )}
          {step === 3 && (
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
