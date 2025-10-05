// StepOne.tsx
'use client';

import { useState, useEffect } from 'react';
import { ProfileFormData } from '@/types/forms';

interface ValidationErrors {
  nombre?: string;
  edad?: string;
  email?: string;
  mainGoal?: string;
  weeklyTime?: string;
  followUp?: string;
  quizResponses?: string;
}

interface FieldCompletion {
  nombre: boolean;
  edad: boolean;
  email: boolean;
  mainGoal: boolean;
  weeklyTime: boolean;
  followUp: boolean;
  quizResponses: boolean;
}

interface StepOneProps {
  formData: ProfileFormData;
  setFormData: (data: ProfileFormData) => void;
  onNext: () => void;
}

const quizQuestions = [
  {
    question: "Cuando quieres recordar algo nuevo, ¿qué haces primero?",
    options: [
      { text: "Escribirlo o leerlo", type: "Lectura/Escritura" },
      { text: "Dibujar un esquema o ver una imagen", type: "Visual" },
      { text: "Escuchar en voz alta o grabarme", type: "Auditivo" },
      { text: "Practicarlo o hacerlo con las manos", type: "Kinestésico" }
    ]
  },
  {
    question: "Para entender una explicación, prefieres que te la den como:",
    options: [
      { text: "Un texto o apuntes detallados", type: "Lectura/Escritura" },
      { text: "Un video o infografía", type: "Visual" },
      { text: "Un audio o una conversación", type: "Auditivo" },
      { text: "Una actividad práctica (juego, role-play)", type: "Kinestésico" }
    ]
  },
  {
    question: "Si quieres aprender vocabulario nuevo, ¿qué te ayuda más?",
    options: [
      { text: "Hacer listas y escribirlas", type: "Lectura/Escritura" },
      { text: "Ver tarjetas con imágenes o subtítulos", type: "Visual" },
      { text: "Escuchar la palabra en contexto", type: "Auditivo" },
      { text: "Usarla en una actividad o juego", type: "Kinestésico" }
    ]
  },
  {
    question: "Cuando estudias, te distraes menos si:",
    options: [
      { text: "Tienes un texto para leer y subrayar", type: "Lectura/Escritura" },
      { text: "Ves material visual (diagramas, videos)", type: "Visual" },
      { text: "Escuchas mientras haces otra cosa suave", type: "Auditivo" },
      { text: "Estás moviéndote o practicando", type: "Kinestésico" }
    ]
  }
];

export default function StepOne({ formData, setFormData, onNext }: StepOneProps) {
  const [quizAnswers, setQuizAnswers] = useState<number[]>(formData.quizResponses || []);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showValidation, setShowValidation] = useState(false);
  const [fieldCompletion, setFieldCompletion] = useState<FieldCompletion>({
    nombre: false,
    edad: false,
    email: false,
    mainGoal: false,
    weeklyTime: false,
    followUp: false,
    quizResponses: false,
  });

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (!name || name.trim().length === 0) {
      return 'El nombre es obligatorio';
    }
    if (name.trim().length < 2) {
      return 'El nombre debe tener al menos 2 caracteres';
    }
    if (name.trim().length > 50) {
      return 'El nombre no puede exceder 50 caracteres';
    }
    return undefined;
  };

  const validateAge = (age: number | null | undefined): string | undefined => {
    if (age === null || age === undefined) {
      return 'La edad es obligatoria';
    }
    if (age < 10) {
      return 'Debes tener al menos 10 años';
    }
    if (age > 120) {
      return 'Por favor ingresa una edad válida';
    }
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email || email.trim().length === 0) {
      return 'El email es obligatorio';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Por favor ingresa un email válido';
    }
    return undefined;
  };

  const validateMainGoal = (goal: string): string | undefined => {
    if (!goal || goal.trim().length === 0) {
      return 'Selecciona tu objetivo principal';
    }
    return undefined;
  };

  const validateWeeklyTime = (time: string): string | undefined => {
    if (!time || time.trim().length === 0) {
      return 'Selecciona el tiempo que puedes dedicar';
    }
    return undefined;
  };

  const validateFollowUp = (followUp: 'ia' | 'teacher' | 'mentor' | null | undefined): string | undefined => {
    if (!followUp) {
      return 'Selecciona el tipo de seguimiento que prefieres';
    }
    return undefined;
  };

  const validateQuizResponses = (responses: number[]): string | undefined => {
    if (responses.length < quizQuestions.length) {
      const unanswered = quizQuestions.length - responses.length;
      return `Faltan ${unanswered} preguntas del cuestionario por responder`;
    }
    return undefined;
  };

  const validateAllFields = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};
    
    const nameError = validateName(formData.nombre || '');
    if (nameError) newErrors.nombre = nameError;

    const ageError = validateAge(formData.edad);
    if (ageError) newErrors.edad = ageError;

    const emailError = validateEmail(formData.email || '');
    if (emailError) newErrors.email = emailError;

    const goalError = validateMainGoal(formData.mainGoal || '');
    if (goalError) newErrors.mainGoal = goalError;

    const timeError = validateWeeklyTime(formData.weeklyTime || '');
    if (timeError) newErrors.weeklyTime = timeError;

    const followUpError = validateFollowUp(formData.followUp);
    if (followUpError) newErrors.followUp = followUpError;

    const quizError = validateQuizResponses(quizAnswers);
    if (quizError) newErrors.quizResponses = quizError;

    return newErrors;
  };

  const updateFieldCompletion = () => {
    setFieldCompletion({
      nombre: !validateName(formData.nombre || ''),
      edad: !validateAge(formData.edad),
      email: !validateEmail(formData.email || ''),
      mainGoal: !validateMainGoal(formData.mainGoal || ''),
      weeklyTime: !validateWeeklyTime(formData.weeklyTime || ''),
      followUp: !validateFollowUp(formData.followUp),
      quizResponses: !validateQuizResponses(quizAnswers),
    });
  };

  const calculateLearningStyle = () => {
    const scores = [0, 0, 0, 0]; // Visual, Auditivo, Kinestésico, Lectura/Escritura
    quizAnswers.forEach((answer) => {
      if (typeof answer === 'number') scores[answer]++;
    });

    const max = Math.max(...scores);
    const styles = ["Visual", "Auditivo", "Kinestésico", "Lectura/Escritura"];
    const maxIndices = scores.reduce((acc, score, index) =>
      score === max ? [...acc, index] : acc, [] as number[]);

    return maxIndices.length > 1 ? "Mixto" : styles[maxIndices[0]];
  };

  // Update field completion whenever form data changes
  useEffect(() => {
    updateFieldCompletion();
  }, [formData, quizAnswers]);

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
    const learningStyle = calculateLearningStyle();
    setFormData({
      ...formData,
      quizResponses: quizAnswers,
      learningStyle: learningStyle as any,
    });
    onNext();
  };

  const getFieldClasses = (fieldName: keyof FieldCompletion, hasError: boolean) => {
    const baseClasses = "w-full p-3 border rounded-lg transition-all duration-200";
    if (hasError && showValidation) {
      return `${baseClasses} border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200`;
    }
    if (fieldCompletion[fieldName]) {
      return `${baseClasses} border-green-500 bg-green-50 focus:border-green-500 focus:ring-2 focus:ring-green-200`;
    }
    return `${baseClasses} border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`;
  };

  const getProgressPercentage = () => {
    const completedFields = Object.values(fieldCompletion).filter(Boolean).length;
    return Math.round((completedFields / Object.keys(fieldCompletion).length) * 100);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Progress Indicator */}
      <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs sm:text-sm font-medium text-gray-700">Progreso del formulario</h3>
          <span className="text-xs sm:text-sm font-semibold text-blue-600">{getProgressPercentage()}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
          <div 
            className="bg-blue-600 h-1.5 sm:h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          {Object.values(fieldCompletion).filter(Boolean).length} de {Object.keys(fieldCompletion).length} campos completados
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

      <div className="space-y-4 sm:space-y-6">
        {/* Name Field */}
        <div data-field="nombre">
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Nombre completo *
            {fieldCompletion.nombre && (
              <span className="ml-2 text-green-600">✓</span>
            )}
          </label>
          <input
            type="text"
            placeholder="Ej. María Pérez"
            value={formData.nombre || ''}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className={getFieldClasses('nombre', !!errors.nombre)}
            required
          />
          {showValidation && errors.nombre && (
            <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
          )}
        </div>

        {/* Age Field */}
        <div data-field="edad">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Edad *
            {fieldCompletion.edad && (
              <span className="ml-2 text-green-600">✓</span>
            )}
          </label>
          <input
            type="number"
            placeholder="Edad"
            min="6"
            max="120"
            value={formData.edad ?? ''}
            onChange={(e) => setFormData({ ...formData, edad: e.target.value ? parseInt(e.target.value) : undefined })}
            className={getFieldClasses('edad', !!errors.edad)}
          />
          {showValidation && errors.edad && (
            <p className="mt-1 text-sm text-red-600">{errors.edad}</p>
          )}
        </div>

        {/* Email Field */}
        <div data-field="email">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
            {fieldCompletion.email && (
              <span className="ml-2 text-green-600">✓</span>
            )}
          </label>
          <input
            type="email"
            placeholder="tu@email.com"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={getFieldClasses('email', !!errors.email)}
          />
          {showValidation && errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="space-y-4" data-field="mainGoal">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ¿Cuál es tu objetivo principal al aprender este idioma? *
          {fieldCompletion.mainGoal && (
            <span className="ml-2 text-green-600">✓</span>
          )}
        </label>
        <select
          value={formData.mainGoal || ''}
          onChange={(e) => setFormData({ ...formData, mainGoal: e.target.value })}
          className={getFieldClasses('mainGoal', !!errors.mainGoal)}
        >
          <option value="">Selecciona un objetivo</option>
          <option value="fluency">Hablar con fluidez en conversaciones cotidianas</option>
          <option value="work">Prepararme para trabajo o estudio</option>
          <option value="travel">Viajar y comunicarme en viajes</option>
          <option value="certification">Obtener una certificación</option>
          <option value="pronunciation">Mejorar pronunciación / comprensión auditiva</option>
          <option value="social">Conocer gente / socializar</option>
        </select>
        {showValidation && errors.mainGoal && (
          <p className="mt-1 text-sm text-red-600">{errors.mainGoal}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div data-field="weeklyTime">
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            ¿Cuánto tiempo puedes dedicar semanalmente? *
            {fieldCompletion.weeklyTime && (
              <span className="ml-2 text-green-600">✓</span>
            )}
          </label>
          <select
            value={formData.weeklyTime || ''}
            onChange={(e) => setFormData({ ...formData, weeklyTime: e.target.value })}
            className={getFieldClasses('weeklyTime', !!errors.weeklyTime)}
          >
            <option value="">Selecciona el tiempo</option>
            <option value="<1">Menos de 1 hora</option>
            <option value="1-3">1–3 horas</option>
            <option value="3-6">3–6 horas</option>
            <option value="6+">6+ horas</option>
          </select>
          {showValidation && errors.weeklyTime && (
            <p className="mt-1 text-sm text-red-600">{errors.weeklyTime}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha límite (opcional)
          </label>
          <input
            type="date"
            value={formData.deadline || ''}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value || null })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <p className="mt-1 text-xs text-gray-500">Si tienes una fecha específica para alcanzar tu objetivo</p>
        </div>
      </div>

      <div data-field="followUp">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ¿Quieres seguimiento humano? *
          {fieldCompletion.followUp && (
            <span className="ml-2 text-green-600">✓</span>
          )}
        </label>
        <div className={`space-y-3 p-4 rounded-lg border ${
          showValidation && errors.followUp 
            ? 'border-red-500 bg-red-50' 
            : 'border-gray-200 bg-gray-50'
        }`}>
          <label className="flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded transition-colors">
            <input 
              type="radio" 
              name="followUp" 
              value="ia" 
              checked={formData.followUp === 'ia'} 
              onChange={() => setFormData({ ...formData, followUp: 'ia' })}
              className="w-4 h-4 text-blue-600"
            />
            <div className="flex-1">
              <span className="font-medium">Sólo IA</span>
              <p className="text-sm text-gray-600">Aprendizaje completamente automatizado</p>
            </div>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded transition-colors">
            <input 
              type="radio" 
              name="followUp" 
              value="teacher" 
              checked={formData.followUp === 'teacher'} 
              onChange={() => setFormData({ ...formData, followUp: 'teacher' })}
              className="w-4 h-4 text-blue-600"
            />
            <div className="flex-1">
              <span className="font-medium">Profesor</span>
              <p className="text-sm text-gray-600">Clases y seguimiento con profesor certificado</p>
            </div>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded transition-colors">
            <input 
              type="radio" 
              name="followUp" 
              value="mentor" 
              checked={formData.followUp === 'mentor'} 
              onChange={() => setFormData({ ...formData, followUp: 'mentor' })}
              className="w-4 h-4 text-blue-600"
            />
            <div className="flex-1">
              <span className="font-medium">Mentor</span>
              <p className="text-sm text-gray-600">Acompañamiento y apoyo personalizado</p>
            </div>
          </label>
        </div>
        {showValidation && errors.followUp && (
          <p className="mt-1 text-sm text-red-600">{errors.followUp}</p>
        )}
      </div>

      <div className="space-y-4 sm:space-y-6" data-field="quizResponses">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            Cuestionario de estilo de aprendizaje *
            {fieldCompletion.quizResponses && (
              <span className="ml-2 text-green-600">✓</span>
            )}
          </h3>
          <span className="text-xs sm:text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded-full">
            {quizAnswers.length}/{quizQuestions.length} completadas
          </span>
        </div>
        <p className="text-gray-600 text-sm">Marca la opción que más se acerque a cómo prefieres aprender</p>
        
        <div className={`space-y-4 sm:space-y-6 p-3 sm:p-4 rounded-lg border ${
          showValidation && errors.quizResponses 
            ? 'border-red-500 bg-red-50' 
            : 'border-gray-200 bg-gray-50'
        }`}>
          {quizQuestions.map((q, qIndex) => (
            <div key={qIndex} className="space-y-3">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium">
                  {qIndex + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-sm sm:text-base leading-tight">{q.question}</p>
                  {quizAnswers[qIndex] !== undefined && (
                    <span className="inline-flex items-center text-green-600 text-xs sm:text-sm mt-1">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Respondida
                    </span>
                  )}
                </div>
              </div>
              <div className="ml-6 sm:ml-8 space-y-2">
                {q.options.map((opt, oIndex) => (
                  <label key={oIndex} className="flex items-start space-x-2 sm:space-x-3 cursor-pointer hover:bg-white p-2 rounded transition-colors min-w-0">
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      checked={quizAnswers[qIndex] === oIndex}
                      onChange={() => {
                        const newAnswers = [...quizAnswers];
                        newAnswers[qIndex] = oIndex;
                        setQuizAnswers(newAnswers);
                      }}
                      className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 text-xs sm:text-sm leading-tight">{opt.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {showValidation && errors.quizResponses && (
          <p className="mt-1 text-sm text-red-600">{errors.quizResponses}</p>
        )}
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Summary of missing fields */}
        {getProgressPercentage() < 100 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <h4 className="text-xs sm:text-sm font-medium text-blue-800 mb-2">Para continuar, completa estos campos:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm">
              {!fieldCompletion.nombre && <span className="text-blue-700">• Nombre completo</span>}
              {!fieldCompletion.edad && <span className="text-blue-700">• Edad</span>}
              {!fieldCompletion.email && <span className="text-blue-700">• Email</span>}
              {!fieldCompletion.mainGoal && <span className="text-blue-700">• Objetivo principal</span>}
              {!fieldCompletion.weeklyTime && <span className="text-blue-700">• Tiempo semanal</span>}
              {!fieldCompletion.followUp && <span className="text-blue-700">• Tipo de seguimiento</span>}
              {!fieldCompletion.quizResponses && <span className="text-blue-700">• Cuestionario de aprendizaje</span>}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleNext}
          className={`w-full p-3 sm:p-4 rounded-lg font-medium text-white transition-all duration-200 text-sm sm:text-base ${
            getProgressPercentage() === 100
              ? 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {getProgressPercentage() === 100 ? (
            <span className="flex items-center justify-center space-x-2">
              <span>Continuar al siguiente paso</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          ) : (
            `Completar formulario (${getProgressPercentage()}%)`
          )}
        </button>
        
        <p className="text-xs text-gray-500 text-center">
          * Campos obligatorios
        </p>
      </div>
    </div>
  );
}
