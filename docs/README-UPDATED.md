# LearnMioAI - AI-Powered English Learning Platform

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/andrecodevs-projects/v0-comprehensive-english-platform)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

Una plataforma moderna de aprendizaje de inglés potenciada por IA con tutores virtuales, instructores en vivo y tecnología de aprendizaje adaptativo.

## 🚀 Características Principales

### 🤖 IA Tutoring
- **Conversaciones con IA**: Práctica de conversación en tiempo real con GPT-4
- **Adaptación de nivel**: El sistema se adapta automáticamente al nivel del estudiante
- **Corrección inteligente**: Feedback instantáneo y sugerencias de mejora

### 👨‍🏫 Tutoring en Vivo
- **Sesiones con instructores reales**: Clases personalizadas con tutores certificados
- **Programación flexible**: Sistema de reservas integrado
- **Feedback profesional**: Evaluación y seguimiento del progreso

### 📊 Analytics Avanzados
- **Seguimiento del progreso**: Métricas detalladas de aprendizaje
- **Estadísticas personalizadas**: Análisis de fortalezas y áreas de mejora
- **Gamificación**: Sistema de logros y recompensas

### 🌐 Internacionalización
- **Multiidioma**: Soporte para inglés y español
- **Localización completa**: Interfaz adaptada por región

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15.3.0**: Framework React con App Router
- **React 19**: Biblioteca de interfaz de usuario
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de estilos utilitarios
- **shadcn/ui**: Componentes de UI modernos

### Backend & APIs
- **Next.js API Routes**: Endpoints serverless
- **OpenAI GPT-4**: Modelos de IA para conversación
- **Firebase**: Base de datos y autenticación
- **Vercel AI SDK**: Integración con modelos de IA

### Estado & Datos
- **TanStack Query**: Gestión de estado del servidor
- **Zustand**: Gestión de estado global del cliente
- **React Hook Form**: Manejo de formularios

### UI/UX
- **Radix UI**: Componentes accesibles
- **Framer Motion**: Animaciones fluidas
- **Lucide React**: Iconografía moderna
- **Next Themes**: Soporte para tema oscuro/claro

### Internacionalización
- **next-intl**: Sistema completo de i18n
- **Cookies**: Persistencia de preferencias de idioma

## 📁 Estructura del Proyecto

```
learnMioAI/
├── app/                          # App Router de Next.js
│   ├── api/                      # API Routes
│   │   ├── ai/                   # Endpoints de IA
│   │   │   ├── conversation/     # Chat con IA
│   │   │   └── feedback/         # Feedback de IA
│   │   ├── lessons/              # Gestión de lecciones
│   │   └── profile/              # Gestión de perfil
│   ├── dashboard/                # Panel principal
│   ├── login/                    # Autenticación
│   ├── profile/                  # Configuración de perfil
│   ├── lessons/                  # Módulos de aprendizaje
│   ├── tutoring/                 # Sesiones con tutores
│   └── analytics/                # Estadísticas
├── components/                   # Componentes reutilizables
│   ├── ui/                       # Componentes base UI
│   ├── forms/                    # Formularios específicos
│   └── auth-guard.tsx            # Protección de rutas
├── contexts/                     # Contextos React
│   └── auth-context.tsx          # Manejo de autenticación
├── hooks/                        # Custom hooks
│   ├── use-api.ts                # Hooks de API
│   └── use-mobile.ts             # Detección móvil
├── lib/                          # Utilidades
│   ├── firebase.ts               # Configuración Firebase
│   ├── api.ts                    # Cliente API
│   └── utils.ts                  # Funciones auxiliares
├── stores/                       # Estado global
│   └── ui-store.ts               # Store Zustand
├── messages/                     # Internacionalización
│   ├── en.json                   # Inglés
│   └── es.json                   # Español
└── src/types/                    # Definiciones TypeScript
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Cuenta de Firebase
- API Key de OpenAI

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Andrecodev/learnMioAI.git
cd learnMioAI
```

2. **Instalar dependencias**
```bash
npm install --legacy-peer-deps
```

3. **Configurar variables de entorno**
```bash
cp .env.local.example .env.local
```

Edita `.env.local` con tus credenciales:
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id

# OpenAI
OPENAI_API_KEY=tu_openai_api_key

# API Externa (opcional)
NEXT_PUBLIC_API_URL=tu_api_url
NEXT_PUBLIC_API_TOKEN=tu_api_token
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

5. **Construir para producción**
```bash
npm run build
npm start
```

## 🔧 Scripts Disponibles

- `npm run dev`: Servidor de desarrollo
- `npm run build`: Construir para producción
- `npm run start`: Ejecutar build de producción
- `npm run lint`: Verificar código con ESLint

## 🌐 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio GitHub a Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. Despliega automáticamente en cada push

### Variables de Entorno en Producción
Asegúrate de configurar todas las variables de entorno en tu plataforma de despliegue.

## 🏗️ Arquitectura

### Patrón de Autenticación
- **Firebase Auth**: Autenticación con Google
- **Context API**: Estado global de autenticación
- **Middleware**: Protección de rutas
- **Cookies**: Persistencia de estado

### Flujo de Datos
1. **Cliente**: Componentes React con hooks
2. **Estado**: Zustand para UI, TanStack Query para servidor
3. **API**: Next.js API routes
4. **Externa**: Firebase, OpenAI APIs

### Gestión de Estado
- **Servidor**: TanStack Query (cache, sync, mutations)
- **Cliente**: Zustand (UI state, forms)
- **Formularios**: React Hook Form + Zod validation

## 🔒 Seguridad

- **Autenticación**: Firebase Auth con Google OAuth
- **Autorización**: Middleware de Next.js
- **Validación**: Zod schemas en cliente y servidor
- **CORS**: Configuración segura para APIs

## 🌍 Internacionalización

- **next-intl**: Framework completo de i18n
- **Idiomas soportados**: Inglés (en), Español (es)
- **Detección automática**: Basada en browser/cookies
- **Cambio dinámico**: Sin recargar la página

## 🎯 Roadmap

### Próximas Características
- [ ] Sistema de pagos integrado
- [ ] Chat de voz con IA
- [ ] Modo offline
- [ ] App móvil nativa
- [ ] Integración con más LLMs
- [ ] Sistema de certificaciones

### Mejoras Técnicas
- [ ] Tests automatizados
- [ ] CI/CD completo
- [ ] Monitoring y analytics
- [ ] Performance optimizations
- [ ] Accessibility improvements

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Equipo

- **Desarrollo**: [Andrecodev]
- **Diseño**: [Diseñador]
- **Product Owner**: [Product Owner]

## 📞 Contacto

- **Sitio Web**: [https://learnmioai.vercel.app](https://learnmioai.vercel.app)
- **Email**: contacto@learnmioai.com
- **GitHub**: [https://github.com/Andrecodev/learnMioAI](https://github.com/Andrecodev/learnMioAI)

---

⭐ **¿Te gusta el proyecto? ¡Dale una estrella en GitHub!**