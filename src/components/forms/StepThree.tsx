// StepThree.tsx
'use client';

import { useState, useEffect } from 'react';
import { ProfileFormData, AvailabilitySlot } from '@/types/forms';

interface ValidationErrors {
  availability?: string;
  sessionPreference?: string;
  assessmentFrequency?: string;
  device?: string;
  consentPersonalization?: string;
}

interface FieldCompletion {
  availability: boolean;
  sessionPreference: boolean;
  assessmentFrequency: boolean;
  device: boolean;
  consentPersonalization: boolean;
}

interface StepThreeProps {
  formData: ProfileFormData;
  setFormData: (data: ProfileFormData) => void;
  onPrev: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
}

const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

export default function StepThree({ formData, setFormData, onPrev, onSubmit, isSubmitting = false }: StepThreeProps) {
  const [day, setDay] = useState<string>(days[0]);
  const [from, setFrom] = useState<string>('18:00');
  const [to, setTo] = useState<string>('19:00');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showValidation, setShowValidation] = useState(false);
  const [fieldCompletion, setFieldCompletion] = useState<FieldCompletion>({
    availability: false,
    sessionPreference: false,
    assessmentFrequency: false,
    device: false,
    consentPersonalization: false,
  });

  // Validation functions
  const validateAvailability = (availability?: AvailabilitySlot[]): string | null => {
    if (!availability || availability.length === 0) {
      return 'Debes agregar al menos una franja horaria de disponibilidad';
    }
    return null;
  };

  const validateSessionPreference = (sessionPreference?: string): string | null => {
    if (!sessionPreference) {
      return 'Debes seleccionar tu preferencia de sesiones de estudio';
    }
    return null;
  };

  const validateAssessmentFrequency = (assessmentFrequency?: string): string | null => {
    if (!assessmentFrequency) {
      return 'Debes seleccionar tu preferencia de evaluación';
    }
    return null;
  };

  const validateDevice = (device?: string | null): string | null => {
    if (!device) {
      return 'Debes seleccionar tu dispositivo principal';
    }
    return null;
  };

  const validateConsentPersonalization = (consentPersonalization?: boolean): string | null => {
    if (!consentPersonalization) {
      return 'Debes aceptar el consentimiento para personalización para continuar';
    }
    return null;
  };

  // Update field completion status
  useEffect(() => {
    const newFieldCompletion: FieldCompletion = {
      availability: formData.availability && formData.availability.length > 0,
      sessionPreference: !!formData.sessionPreference,
      assessmentFrequency: !!formData.assessmentFrequency,
      device: !!formData.device,
      consentPersonalization: !!formData.consentPersonalization,
    };
    setFieldCompletion(newFieldCompletion);

    // Update errors in real-time
    const newErrors: ValidationErrors = {};
    
    const availabilityError = validateAvailability(formData.availability);
    if (availabilityError) newErrors.availability = availabilityError;

    const sessionPreferenceError = validateSessionPreference(formData.sessionPreference);
    if (sessionPreferenceError) newErrors.sessionPreference = sessionPreferenceError;

    const assessmentFrequencyError = validateAssessmentFrequency(formData.assessmentFrequency);
    if (assessmentFrequencyError) newErrors.assessmentFrequency = assessmentFrequencyError;

    const deviceError = validateDevice(formData.device);
    if (deviceError) newErrors.device = deviceError;

    const consentError = validateConsentPersonalization(formData.consentPersonalization);
    if (consentError) newErrors.consentPersonalization = consentError;

    setErrors(newErrors);
  }, [formData]);

  // Calculate progress percentage
  const getProgressPercentage = (): number => {
    const completedFields = Object.values(fieldCompletion).filter(Boolean).length;
    const totalFields = Object.keys(fieldCompletion).length;
    return Math.round((completedFields / totalFields) * 100);
  };

  // Handle form submission with validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidation(true);

    // Check if all validations pass
    if (Object.keys(errors).length > 0) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[data-field="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // All validations passed, proceed with submission
    onSubmit(e);
  };

  const addAvailability = () => {
    const slot: AvailabilitySlot = { day, from, to };
    const newList = [...(formData.availability || []), slot];
    setFormData({ ...formData, availability: newList });
  };

  const removeSlot = (index: number) => {
    const newList = (formData.availability || []).filter((_, i) => i !== index);
    setFormData({ ...formData, availability: newList });
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="bg-gray-50 rounded-lg p-4 border">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700">Progreso del paso 3</h3>
          <span className="text-sm font-semibold text-blue-600">{getProgressPercentage()}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          {Object.values(fieldCompletion).filter(Boolean).length} de {Object.keys(fieldCompletion).length} secciones completadas
        </p>
      </div>

      {/* Show validation summary if there are errors */}
      {showValidation && Object.keys(errors).length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <h4 className="text-sm font-medium text-red-800">Faltan campos por completar:</h4>
          </div>
          <ul className="mt-2 text-sm text-red-700 space-y-1">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-6">
        <div data-field="availability">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Tu disponibilidad de tiempo *
            {fieldCompletion.availability && (
              <span className="ml-2 text-green-600">✓</span>
            )}
          </label>
          <p className="text-sm text-gray-600 mb-4">
            Añade al menos una franja horaria cuando puedas estudiar. Puedes agregar múltiples horarios.
          </p>
          
          <div className={`p-4 rounded-lg border mb-4 ${
            showValidation && errors.availability 
              ? 'border-red-500 bg-red-50' 
              : fieldCompletion.availability 
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mb-4">
              <div className="flex-1 sm:flex-none">
                <label className="block text-xs text-gray-600 mb-1 sm:hidden">Día:</label>
                <select 
                  value={day} 
                  onChange={(e) => setDay(e.target.value)} 
                  className="w-full sm:w-auto p-2 sm:p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
                >
                  {days.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="flex-1 sm:flex-none">
                <label className="block text-xs text-gray-600 mb-1 sm:hidden">Desde:</label>
                <input 
                  type="time" 
                  value={from} 
                  onChange={(e) => setFrom(e.target.value)} 
                  className="w-full sm:w-auto p-2 sm:p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm" 
                />
              </div>
              <div className="flex-1 sm:flex-none">
                <label className="block text-xs text-gray-600 mb-1 sm:hidden">Hasta:</label>
                <input 
                  type="time" 
                  value={to} 
                  onChange={(e) => setTo(e.target.value)} 
                  className="w-full sm:w-auto p-2 sm:p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm" 
                />
              </div>
              <button 
                type="button" 
                onClick={addAvailability} 
                className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                + Agregar
              </button>
            </div>

            <div className="space-y-2">
              {(formData.availability || []).length === 0 ? (
                <p className="text-gray-500 text-sm italic">No hay franjas horarias agregadas</p>
              ) : (
                (formData.availability || []).map((slot, i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-3 rounded-lg border border-gray-200 gap-2 sm:gap-0">
                    <div className="text-xs sm:text-sm font-medium text-gray-700">
                      {slot.day} — {slot.from} a {slot.to}
                    </div>
                    <button 
                      type="button" 
                      onClick={() => removeSlot(i)} 
                      className="text-red-600 hover:text-red-800 text-xs sm:text-sm font-medium self-end sm:self-auto"
                    >
                      Eliminar
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {showValidation && errors.availability && (
            <p className="mt-1 text-sm text-red-600">{errors.availability}</p>
          )}
        </div>

        <div data-field="sessionPreference">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Preferencia de duración de sesiones *
            {fieldCompletion.sessionPreference && (
              <span className="ml-2 text-green-600">✓</span>
            )}
          </label>
          <p className="text-sm text-gray-600 mb-4">
            ¿Prefieres sesiones cortas y frecuentes o bloques más largos de estudio?
          </p>
          
          <div className={`p-4 rounded-lg border ${
            showValidation && errors.sessionPreference 
              ? 'border-red-500 bg-red-50' 
              : fieldCompletion.sessionPreference 
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="space-y-2 sm:space-y-3">
              {['short', 'long', 'mixed'].map((type) => (
                <label key={type} className="flex items-start space-x-3 cursor-pointer hover:bg-white p-2 sm:p-3 rounded transition-colors min-w-0">
                  <input
                    type="radio"
                    name="sessionPreference"
                    value={type}
                    checked={formData.sessionPreference === type}
                    onChange={(e) => setFormData({ ...formData, sessionPreference: e.target.value as any })}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 mt-0.5 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-800 text-sm sm:text-base">
                      {type === 'short' && 'Sesiones cortas y diarias'}
                      {type === 'long' && 'Bloques más largos'}
                      {type === 'mixed' && 'Combinación flexible'}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 leading-tight">
                      {type === 'short' && '10–20 minutos por día'}
                      {type === 'long' && '45–90 minutos por sesión'}
                      {type === 'mixed' && 'Varía según disponibilidad'}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {showValidation && errors.sessionPreference && (
            <p className="mt-1 text-sm text-red-600">{errors.sessionPreference}</p>
          )}
        </div>

        <div data-field="assessmentFrequency">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Preferencias de evaluación *
            {fieldCompletion.assessmentFrequency && (
              <span className="ml-2 text-green-600">✓</span>
            )}
          </label>
          <p className="text-sm text-gray-600 mb-4">
            ¿Con qué frecuencia te gustaría recibir evaluaciones de tu progreso?
          </p>
          
          <div className="space-y-4">
            <select
              value={formData.assessmentFrequency || ''}
              onChange={(e) => setFormData({ ...formData, assessmentFrequency: e.target.value as any })}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors ${
                showValidation && errors.assessmentFrequency
                  ? 'border-red-500 bg-red-50'
                  : fieldCompletion.assessmentFrequency
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300'
              }`}
            >
              <option value="">Selecciona frecuencia de evaluación...</option>
              <option value="none">Sin pruebas periódicas</option>
              <option value="biweekly">Quincenal (cada 2 semanas)</option>
              <option value="monthly">Mensual</option>
            </select>

            <label className="flex items-center space-x-3 cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <input 
                type="checkbox" 
                checked={formData.oralTest || false} 
                onChange={(e) => setFormData({ ...formData, oralTest: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <div>
                <div className="font-medium text-gray-800">Incluir evaluaciones orales</div>
                <div className="text-sm text-gray-600">Practicar pronunciación y conversación</div>
              </div>
            </label>
          </div>

          {showValidation && errors.assessmentFrequency && (
            <p className="mt-1 text-sm text-red-600">{errors.assessmentFrequency}</p>
          )}
        </div>

        <div data-field="device">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Dispositivo principal *
            {fieldCompletion.device && (
              <span className="ml-2 text-green-600">✓</span>
            )}
          </label>
          <p className="text-sm text-gray-600 mb-4">
            ¿Qué dispositivo usarás principalmente para estudiar? Esto nos ayuda a optimizar la experiencia.
          </p>
          
          <select 
            value={formData.device || ''} 
            onChange={(e) => setFormData({ ...formData, device: e.target.value as any })} 
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors ${
              showValidation && errors.device
                ? 'border-red-500 bg-red-50'
                : fieldCompletion.device
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300'
            }`}
          >
            <option value="">Selecciona tu dispositivo principal...</option>
            <option value="mobile">Móvil / Teléfono</option>
            <option value="desktop">Computadora / Desktop</option>
            <option value="mobile-limited">Móvil con datos limitados</option>
          </select>

          {showValidation && errors.device && (
            <p className="mt-1 text-sm text-red-600">{errors.device}</p>
          )}
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Comentarios adicionales
            <span className="text-sm text-gray-500 font-normal">(opcional)</span>
          </label>
          <p className="text-sm text-gray-600 mb-4">
            ¿Hay algo específico que quieras que sepamos sobre tus objetivos de aprendizaje?
          </p>
          <textarea
            placeholder="Ej. Necesito vocabulario para mi trabajo en ventas, quiero enfocarme en conversaciones de negocios..."
            value={formData.additionalComments || ''}
            onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors"
            rows={4}
          />
        </div>

        <div data-field="consentPersonalization">
          <div className={`p-4 rounded-lg border ${
            showValidation && errors.consentPersonalization 
              ? 'border-red-500 bg-red-50' 
              : fieldCompletion.consentPersonalization 
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-gray-50'
          }`}>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={!!formData.consentPersonalization}
                onChange={(e) => setFormData({ ...formData, consentPersonalization: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
              />
              <div>
                <div className="font-medium text-gray-800">
                  Consentimiento para personalización *
                  {fieldCompletion.consentPersonalization && (
                    <span className="ml-2 text-green-600">✓</span>
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Acepto que se utilicen mis datos de este formulario para personalizar mi plan de estudio y crear contenido adaptado a mis necesidades e intereses.
                </div>
              </div>
            </label>
          </div>

          {showValidation && errors.consentPersonalization && (
            <p className="mt-1 text-sm text-red-600">{errors.consentPersonalization}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 pt-4 sm:pt-6 border-t">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center justify-center space-x-2 w-full sm:w-auto px-4 sm:px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Anterior</span>
        </button>

        <div className="text-center order-first sm:order-none">
          <p className="text-xs sm:text-sm text-gray-600">
            Paso final • {getProgressPercentage()}% completado
          </p>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className={`flex items-center justify-center space-x-2 w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg transition-colors font-medium text-sm sm:text-base ${
            getProgressPercentage() === 100 && !isSubmitting
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={isSubmitting || getProgressPercentage() !== 100}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <span>Finalizar registro</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
