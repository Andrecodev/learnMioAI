'use client';

import { useState } from 'react';
import { ProfileFormData } from '../../types/forms';

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
      { text: "Escucharlo en voz alta o grabarme", type: "Auditivo" },
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
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);

  const calculateLearningStyle = () => {
    const scores = [0, 0, 0, 0]; // Visual, Auditivo, Kinestésico, Lectura/Escritura
    quizAnswers.forEach((answer, index) => {
      scores[answer]++;
    });
    
    const max = Math.max(...scores);
    const styles = ["Visual", "Auditivo", "Kinestésico", "Lectura/Escritura"];
    const maxIndices = scores.reduce((acc, score, index) => 
      score === max ? [...acc, index] : acc, [] as number[]);
    
    return maxIndices.length > 1 
      ? "Mixto" 
      : styles[maxIndices[0]];
  };

  const handleNext = () => {
    const learningStyle = calculateLearningStyle();
    setFormData({
      ...formData,
      quizResponses: quizAnswers,
      learningStyle: learningStyle as any
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Ej. María Pérez"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Edad"
          value={formData.edad || ''}
          onChange={(e) => setFormData({ ...formData, edad: parseInt(e.target.value) })}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email || ''}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold">
          Marca la opción que más se acerque a cómo prefieres aprender
        </h3>
        
        {quizQuestions.map((q, qIndex) => (
          <div key={qIndex} className="space-y-2">
            <p>{q.question}</p>
            {q.options.map((opt, oIndex) => (
              <label key={oIndex} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  checked={quizAnswers[qIndex] === oIndex}
                  onChange={() => {
                    const newAnswers = [...quizAnswers];
                    newAnswers[qIndex] = oIndex;
                    setQuizAnswers(newAnswers);
                  }}
                />
                <span>{opt.text}</span>
              </label>
            ))}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleNext}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        disabled={quizAnswers.length < 4 || !formData.nombre}
      >
        Siguiente
      </button>
    </div>
  );
}
