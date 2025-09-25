'use client';

import { ProfileFormData } from '../../forms';

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

export default function StepTwo({ formData, setFormData, onNext, onPrev }: StepTwoProps) {
  const handleHobbyChange = (hobby: string) => {
    const newHobbies = formData.hobbies.includes(hobby)
      ? formData.hobbies.filter((h: string) => h !== hobby)
      : [...formData.hobbies, hobby];
    setFormData({ ...formData, hobbies: newHobbies });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">
        Marca tus hobbies o actividades favoritas
      </h3>

      <div className="space-y-3">
        {hobbies.map((hobby) => (
          <label key={hobby} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.hobbies.includes(hobby)}
              onChange={() => handleHobbyChange(hobby)}
              className="form-checkbox"
            />
            <span>{hobby}</span>
          </label>
        ))}

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.hobbies.includes('other')}
            onChange={() => handleHobbyChange('other')}
            className="form-checkbox"
          />
          <input
            type="text"
            placeholder="Otro..."
            value={formData.otherHobby || ''}
            onChange={(e) => setFormData({ ...formData, otherHobby: e.target.value })}
            className="border rounded p-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block">Frecuencia</label>
        <select
          value={formData.frequency}
          onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
          className="w-full p-2 border rounded"
        >
          <option value="daily">Diario / varias veces por semana</option>
          <option value="weekly">Semanal</option>
          <option value="occasional">Ocasional / fin de semana</option>
        </select>
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
          type="button"
          onClick={onNext}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={formData.hobbies.length === 0}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
