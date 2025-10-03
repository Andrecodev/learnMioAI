// StepTwo.tsx
'use client';

import { useState, useEffect } from 'react';
import { ProfileFormData } from '@/types/forms';

interface ValidationErrors {
  hobbies?: string;
  frequency?: string;
  topicsOfInterest?: string;
  otherHobby?: string;
}

interface FieldCompletion {
  hobbies: boolean;
  frequency: boolean;
  topicsOfInterest: boolean;
}

interface StepTwoProps {
  formData: ProfileFormData;
  setFormData: (data: ProfileFormData) => void;
  onNext: () => void;
  onPrev: () => void;
}

const hobbies = [
  "Leer libros o artículos",
  "Ver series / películas",
  "Escuchar música / podcasts",
  "Deportes (fútbol, gimnasio)",
  "Cocina / gastronomía",
  "Viajar / excursiones",
  "Videojuegos",
  "Fotografía / video",
  "Dibujar / arte",
  "Jardinería / naturaleza",
  "Programación / tecnología",
  "Voluntariado / actividades sociales"
];

const topics = [
  "Negocios / emprendimiento",
  "Tecnología / programación",
  "Viajes / turismo",
  "Salud / fitness",
  "Arte / cultura",
  "Ciencia / educación",
  "Ventas / marketing"
];

export default function StepTwo({ formData, setFormData, onNext, onPrev }: StepTwoProps) {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showValidation, setShowValidation] = useState(false);
  const [fieldCompletion, setFieldCompletion] = useState<FieldCompletion>({
    hobbies: false,
    frequency: false,
    topicsOfInterest: false,
  });

  // Validation functions
  const validateHobbies = (hobbies: string[]): string | undefined => {
    if (!hobbies || hobbies.length === 0) {
      return 'Selecciona al menos un hobby o actividad';
    }
    if (hobbies.length > 8) {
      return 'Por favor selecciona máximo 8 hobbies para personalizar mejor tu experiencia';
    }
    return undefined;
  };

  const validateFrequency = (frequency: string | null | undefined): string | undefined => {
    if (!frequency) {
      return 'Selecciona la frecuencia de tus actividades';
    }
    return undefined;
  };

  const validateTopicsOfInterest = (topics: string[]): string | undefined => {
    if (!topics || topics.length === 0) {
      return 'Selecciona al menos un tema de interés';
    }
    if (topics.length > 5) {
      return 'Por favor selecciona máximo 5 temas para mantener el contenido enfocado';
    }
    return undefined;
  };

  const validateOtherHobby = (otherHobby: string | null | undefined, hobbies: string[]): string | undefined => {
    if (hobbies?.includes('other') && (!otherHobby || otherHobby.trim().length === 0)) {
      return 'Por favor especifica tu otro hobby';
    }
    if (otherHobby && otherHobby.trim().length > 50) {
      return 'El hobby personalizado no puede exceder 50 caracteres';
    }
    return undefined;
  };

  const validateAllFields = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};
    
    const hobbiesError = validateHobbies(formData.hobbies || []);
    if (hobbiesError) newErrors.hobbies = hobbiesError;

    const frequencyError = validateFrequency(formData.frequency);
    if (frequencyError) newErrors.frequency = frequencyError;

    const topicsError = validateTopicsOfInterest(formData.topicsOfInterest || []);
    if (topicsError) newErrors.topicsOfInterest = topicsError;

    const otherHobbyError = validateOtherHobby(formData.otherHobby, formData.hobbies || []);
    if (otherHobbyError) newErrors.otherHobby = otherHobbyError;

    return newErrors;
  };

  const updateFieldCompletion = () => {
    setFieldCompletion({
      hobbies: !validateHobbies(formData.hobbies || []),
      frequency: !validateFrequency(formData.frequency),
      topicsOfInterest: !validateTopicsOfInterest(formData.topicsOfInterest || []),
    });
  };

  const getProgressPercentage = () => {
    const completedFields = Object.values(fieldCompletion).filter(Boolean).length;
    return Math.round((completedFields / Object.keys(fieldCompletion).length) * 100);
  };

  // Update field completion whenever form data changes
  useEffect(() => {
    updateFieldCompletion();
  }, [formData]);

  const handleNext = () => {
    setShowValidation(true);
    const validationErrors = validateAllFields();
    setErrors(validationErrors);

    // If there are errors, scroll to the first error field
    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.querySelector(`[data-field="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // All validations passed, proceed to next step
    onNext();
  };

  const handleHobbyChange = (hobby: string) => {
    const newHobbies = formData.hobbies?.includes(hobby)
      ? formData.hobbies.filter((h: string) => h !== hobby)
      : [...(formData.hobbies || []), hobby];
    setFormData({ ...formData, hobbies: newHobbies });
  };

  const handleTopicChange = (topic: string) => {
    const newTopics = formData.topicsOfInterest?.includes(topic)
      ? formData.topicsOfInterest.filter((t: string) => t !== topic)
      : [...(formData.topicsOfInterest || []), topic];
    setFormData({ ...formData, topicsOfInterest: newTopics });
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="bg-gray-50 rounded-lg p-4 border">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700">Progreso del paso 2</h3>
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

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Marca tus hobbies o actividades favoritas *
          {fieldCompletion.hobbies && (
            <span className="ml-2 text-green-600">✓</span>
          )}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Selecciona entre 1 y 8 actividades que más te gusten. Esto nos ayudará a personalizar tu contenido de aprendizaje.
        </p>
      </div>

      <div className="space-y-3" data-field="hobbies">
        <div className={`p-4 rounded-lg border ${
          showValidation && errors.hobbies 
            ? 'border-red-500 bg-red-50' 
            : fieldCompletion.hobbies 
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {hobbies.map((hobby) => (
              <label key={hobby} className="flex items-start space-x-2 sm:space-x-3 cursor-pointer hover:bg-white p-2 sm:p-3 rounded transition-colors min-w-0">
                <input
                  type="checkbox"
                  checked={formData.hobbies?.includes(hobby)}
                  onChange={() => handleHobbyChange(hobby)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-0.5 flex-shrink-0"
                />
                <span className="text-gray-700 text-xs sm:text-sm leading-tight">{hobby}</span>
              </label>
            ))}
          </div>

          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hobbies?.includes('other')}
                  onChange={() => handleHobbyChange('other')}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 flex-shrink-0"
                />
                <span className="text-xs sm:text-sm text-gray-700 whitespace-nowrap">Otro:</span>
              </label>
              <input
                type="text"
                placeholder="Especifica otro hobby..."
                value={formData.otherHobby || ''}
                onChange={(e) => {
                  setFormData({ ...formData, otherHobby: e.target.value });
                  if (e.target.value && !formData.hobbies?.includes('other')) {
                    setFormData({ ...formData, hobbies: [...(formData.hobbies || []), 'other'] });
                  }
                }}
                className="w-full sm:flex-1 p-2 sm:p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
                data-field="otherHobby"
              />
            </div>
            {showValidation && errors.otherHobby && (
              <p className="mt-1 text-sm text-red-600">{errors.otherHobby}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0 text-xs sm:text-sm">
          <span className="text-gray-600">
            Seleccionados: {formData.hobbies?.length || 0}/8
          </span>
          {(formData.hobbies?.length || 0) > 8 && (
            <span className="text-red-600">Máximo 8 hobbies</span>
          )}
        </div>

        {showValidation && errors.hobbies && (
          <p className="mt-1 text-sm text-red-600">{errors.hobbies}</p>
        )}
      </div>

      <div className="space-y-2" data-field="frequency">
        <label className="block text-lg font-semibold text-gray-800">
          ¿Con qué frecuencia realizas estas actividades? *
          {fieldCompletion.frequency && (
            <span className="ml-2 text-green-600">✓</span>
          )}
        </label>
        <p className="text-sm text-gray-600 mb-4">
          Esto nos ayuda a entender tu nivel de compromiso y disponibilidad de tiempo.
        </p>
        <select
          value={formData.frequency || ''}
          onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors ${
            showValidation && errors.frequency
              ? 'border-red-500 bg-red-50'
              : fieldCompletion.frequency
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300'
          }`}
        >
          <option value="">Selecciona una frecuencia...</option>
          <option value="daily">Diario / varias veces por semana</option>
          <option value="weekly">Semanal</option>
          <option value="occasional">Ocasional / fin de semana</option>
        </select>
        {showValidation && errors.frequency && (
          <p className="mt-1 text-sm text-red-600">{errors.frequency}</p>
        )}
      </div>

      <div className="space-y-3" data-field="topicsOfInterest">
        <label className="block text-lg font-semibold text-gray-800">
          Temas que te interesan *
          {fieldCompletion.topicsOfInterest && (
            <span className="ml-2 text-green-600">✓</span>
          )}
        </label>
        <p className="text-sm text-gray-600 mb-4">
          Selecciona al menos 2 temas. Esto nos permitirá crear ejemplos y vocabulario más relevante para ti.
        </p>
        <div className={`p-4 rounded-lg border ${
          showValidation && errors.topicsOfInterest 
            ? 'border-red-500 bg-red-50' 
            : fieldCompletion.topicsOfInterest 
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {topics.map(topic => (
              <label key={topic} className="flex items-start space-x-2 sm:space-x-3 cursor-pointer hover:bg-white p-2 sm:p-3 rounded transition-colors min-w-0">
                <input
                  type="checkbox"
                  checked={formData.topicsOfInterest?.includes(topic)}
                  onChange={() => handleTopicChange(topic)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-0.5 flex-shrink-0"
                />
                <span className="text-gray-700 text-xs sm:text-sm leading-tight">{topic}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0 text-xs sm:text-sm">
          <span className="text-gray-600">
            Seleccionados: {formData.topicsOfInterest?.length || 0}
          </span>
          <span className="text-gray-500">Mínimo 2 temas</span>
        </div>

        {showValidation && errors.topicsOfInterest && (
          <p className="mt-1 text-sm text-red-600">{errors.topicsOfInterest}</p>
        )}
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
            Paso 2 de 3 • {getProgressPercentage()}% completado
          </p>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className={`flex items-center justify-center space-x-2 w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg transition-colors text-sm sm:text-base ${
            getProgressPercentage() === 100
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={getProgressPercentage() !== 100}
        >
          <span>Siguiente</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
