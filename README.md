# LearnAI - Plataforma Integral de Aprendizaje de Inglés

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/andrecodevs-projects/v0-comprehensive-english-platform)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

Una plataforma integral de aprendizaje de inglés impulsada por IA, diseñada para proporcionar una experiencia de aprendizaje personalizada y efectiva.

## 🌟 Características

- **Tutoría IA Personalizada**: Lecciones adaptativas con inteligencia artificial
- **Dashboard Interactivo**: Seguimiento del progreso y estadísticas detalladas
- **Sistema de Conversación**: Práctica de conversación en inglés con IA
- **Análisis de Rendimiento**: Métricas y feedback detallado del aprendizaje
- **Interfaz Multilingüe**: Soporte para múltiples idiomas con next-intl
- **Diseño Responsivo**: Optimizado para desktop y móvil
- **Tema Oscuro/Claro**: Soporte para modos de visualización personalizados

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 15.2.4** - Framework React con App Router
- **React 19** - Biblioteca para interfaces de usuario
- **TypeScript** - JavaScript con tipado estático
- **Tailwind CSS** - Framework de estilos utilitarios
- **Radix UI** - Componentes primitivos accesibles
- **Lucide React** - Iconos modernos

### IA y Backend
- **AI SDK** - Integración con modelos de IA (OpenAI)
- **Next-intl** - Internacionalización
- **Firebase** - Base de datos y autenticación
- **Zustand** - Gestión de estado
- **TanStack Query** - Gestión de datos del servidor

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **Autoprefixer** - Prefijos CSS automáticos

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Pasos de Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/Andrecodev/learnMioAI.git
   cd learnMioAI
   ```

2. **Instala las dependencias**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configura las variables de entorno**
   Crea un archivo `.env.local` en la raíz del proyecto:
   ```env
   OPENAI_API_KEY=tu_clave_openai
   FIREBASE_API_KEY=tu_clave_firebase
   # Agrega otras variables necesarias
   ```

4. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador**
   Ve a [http://localhost:3000](http://localhost:3000)

## 📖 Uso

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

### Estructura del Proyecto

```
learnAI/
├── src/                    # Código fuente principal
│   ├── app/               # Páginas y layouts (App Router)
│   │   ├── analytics/    # Página de análisis
│   │   ├── api/          # APIs del backend
│   │   │   ├── ai/      # Endpoints de IA
│   │   │   ├── lessons/ # Endpoints de lecciones
│   │   │   └── profile/ # Endpoints de perfil
│   │   ├── dashboard/    # Dashboard principal
│   │   ├── lessons/      # Páginas de lecciones
│   │   ├── login/        # Página de inicio de sesión
│   │   ├── profile/      # Página de perfil
│   │   └── tutoring/     # Página de tutoría
│   ├── components/       # Componentes reutilizables
│   │   ├── forms/       # Formularios
│   │   ├── ui/          # Componentes de UI
│   │   └── ...          # Otros componentes
│   ├── contexts/         # Contextos de React
│   ├── hooks/            # Hooks personalizados
│   ├── i18n/             # Configuración de internacionalización
│   ├── lib/              # Utilidades y configuraciones
│   ├── messages/         # Archivos de traducción
│   ├── stores/           # Estado global (Zustand)
│   ├── styles/           # Estilos globales
│   └── types/            # Definiciones de tipos
├── docs/                  # Documentación
├── env/                   # Archivos de entorno
├── public/                # Archivos estáticos
│   ├── android/          # Recursos para Android
│   ├── ios/              # Recursos para iOS
│   └── web/              # Recursos para la web
├── scripts/               # Scripts de base de datos
└── tests/                 # Pruebas automatizadas
```

## 🌐 Internacionalización

El proyecto soporta múltiples idiomas usando next-intl. Los archivos de traducción se encuentran en la carpeta `messages/`.

## 📊 Base de Datos

Los scripts de base de datos están disponibles en `scripts/`:
- `database-schema.sql` - Esquema de la base de datos
- `seed-data.sql` - Datos de ejemplo

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [v0.app](https://v0.app) - Por la generación inicial del proyecto
- [shadcn/ui](https://ui.shadcn.com) - Por los componentes de UI
- [Vercel](https://vercel.com) - Por el hosting y deployment

## 📞 Contacto

- **CoAutor**: Andrecodev
- **GitHub**: [https://github.com/Andrecodev](https://github.com/Andrecodev)

- **CoAutor**: Juan Naveros
- **GitHub**: [https://github.com/jnaveros40](https://github.com/jnaveros40)

---

*Desarrollado con ❤️ para el aprendizaje efectivo del inglés*