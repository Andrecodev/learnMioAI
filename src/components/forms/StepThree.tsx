'use client';

import { ProfileFormData } from '@/types/forms';

interface StepThreeProps {
  formData: ProfileFormData;
  setFormData: (data: ProfileFormData) => void;
  onPrev: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
}

export default function StepThree({ formData, setFormData, onPrev, onSubmit, isSubmitting = false }: StepThreeProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block mb-2">
            ¿Cuál es tu objetivo principal al aprender este idioma?
          </label>
          <select
            value={formData.mainGoal}
            onChange={(e) => setFormData({ ...formData, mainGoal: e.target.value })}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Selecciona un objetivo</option>
            <option value="fluency">Hablar con fluidez en conversaciones cotidianas</option>
            <option value="work">Prepararme para trabajo o estudio</option>
            <option value="travel">Viajar y comunicarme en viajes</option>
            <option value="certification">Obtener una certificación</option>
            <option value="pronunciation">Mejorar pronunciación / comprensión auditiva</option>
            <option value="social">Conocer gente / socializar</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">
            ¿Cuánto tiempo puedes dedicar semanalmente?
          </label>
          <select
            value={formData.weeklyTime}
            onChange={(e) => setFormData({ ...formData, weeklyTime: e.target.value })}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Selecciona el tiempo</option>
            <option value="<1">Menos de 1 hora</option>
            <option value="1-3">1–3 horas</option>
            <option value="3-6">3–6 horas</option>
            <option value="6+">6+ horas</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">
            ¿Prefieres sesiones cortas y diarias o bloques largos semanales?
          </label>
          <div className="space-y-2">
            {['short', 'long', 'mixed'].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sessionPreference"
                  value={type}
                  checked={formData.sessionPreference === type}
                  onChange={(e) => setFormData({ ...formData, sessionPreference: e.target.value as any })}
                  required
                />
                <span>
                  {type === 'short' && 'Cortas y diarias (10–20 min)'}
                  {type === 'long' && 'Bloques más largos (45–90 min)'}
                  {type === 'mixed' && 'Mezcla'}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2">Comentarios adicionales (opcional)</label>
          <textarea
            placeholder="Ej. Necesito vocabulario para mi trabajo en ventas"
            value={formData.additionalComments || ''}
            onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          Anterior
        </button>
        <button
          type="submit"
          onClick={onSubmit}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Finalizar'}
        </button>
      </div>
    </div>
  );
}
