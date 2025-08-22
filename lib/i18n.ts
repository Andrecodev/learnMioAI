"use client"

export const defaultLocale = "es" as const
export const locales = ["es", "en"] as const

export type Locale = (typeof locales)[number]

// Translation keys structure
export interface Translations {
  // Navigation
  nav: {
    dashboard: string
    learning: string
    aiTutor: string
    interactiveLessons: string
    vocabularyBuilder: string
    liveTutoring: string
    analytics: string
    schedule: string
    community: string
    profile: string
    settings: string
    logout: string
  }

  // Dashboard
  dashboard: {
    welcomeBack: string
    continueJourney: string
    yourProgress: string
    currentLevel: string
    overallProgress: string
    lessonsCompleted: string
    aiConversations: string
    tutorSessions: string
    achievements: string
    continueLearning: string
    pickUpWhereLeft: string
    practiceConversation: string
    grammarVocabulary: string
    live1on1Session: string
    recentAchievements: string
    upcomingLessons: string
    viewFullSchedule: string
    thisWeeksGoals: string
    complete5Lessons: string
    practiceSpeaking3Times: string
    learn20NewWords: string
    learningStreak: string
    daysInRow: string
    keepItUp: string
    grammarMaster: string
    conversationStarter: string
    streakChampion: string
    grammarMasterDesc: string
    conversationStarterDesc: string
    streakChampionDesc: string
    advancedGrammar: string
    businessEnglishConv: string
    ieltsWritingPractice: string
    newBadge: string
    days: string
    lessons: string
  }

  // Login
  login: {
    learnMioAI: string
    masterEnglishAI: string
    joinThousands: string
    welcomeBack: string
    signInToContinue: string
    aiTutoring: string
    liveInstructors: string
    cefrCertified: string
    a1ToC2Levels: string
    activeLearners: string
    successRate: string
    aiSupport: string
    continueWithGoogle: string
    signingIn: string
    bySigningIn: string
    termsOfService: string
    privacyPolicy: string
    failedToSignIn: string
    quickFix: string
  }

  // AI Tutor
  aiTutor: {
    aiTutorSession: string
    newTopic: string
    emmaAITutor: string
    specializedConversational: string
    online: string
    generalConversation: string
    businessEnglish: string
    travelTourism: string
    academicDiscussion: string
    jobInterviewPractice: string
    dailyLifeSituations: string
    typeMessage: string
    aiWillProvide: string
    topics: string
    sessionGoals: string
    practicePastTense: string
    improvePronunciation: string
    use5NewVocab: string
    quickActions: string
    grammarCheck: string
    pronunciationPractice: string
    vocabularyBuilder: string
    takeQuiz: string
    helloAITutor: string
    greatQuestion: string
    feedbackSuggestions: string
    grammar: string
    suggestions: string
    considerUsing: string
    thSoundClearer: string
    tryExample: string
  }

  // Tutoring
  tutoring: {
    liveTutoring: string
    connectCertified: string
    hdVideoSessions: string
    bookSession: string
    findPerfectTutor: string
    searchTutors: string
    specialty: string
    availability: string
    priceRange: string
    availableNow: string
    today: string
    thisWeek: string
    businessEnglish: string
    conversation: string
    ieltsPrep: string
    toefPrep: string
    academicWriting: string
    teachingExperience: string
    perHour: string
    nextAvailable: string
    message: string
    viewProfile: string
    upcomingSessions: string
    viewAllSessions: string
    yourTutoringStats: string
    totalSessions: string
    learningTime: string
    favoriteTutors: string
    needHelp: string
    technicalSupport: string
    chatWithSupport: string
    tutoringGuidelines: string
    joinSession: string
    videoCall: string
  }

  // Analytics
  analytics: {
    learningAnalytics: string
    trackProgress: string
    realTimeData: string
    totalStudyTime: string
    lessonsCompleted: string
    aiConversations: string
    currentLevel: string
    thisMonth: string
    thisWeek: string
    weeklyLearningActivity: string
    monthlyLearningHours: string
    activityBreakdown: string
    recentAchievements: string
    skillsProgressOverview: string
    skillDevelopmentRecommendations: string
    learningActivityHeatmap: string
    aiLearningPredictions: string
    personalizedLearningPath: string
    speaking: string
    listening: string
    reading: string
    writing: string
    readingComprehension: string
    writingSkills: string
    listeningSkills: string
    weakestSkillFocus: string
    goodProgressFocus: string
    excellentProgressMaintain: string
  }

  // Home
  home: {
    aiPoweredPlatform: string
    masterEnglishPersonalized: string
    experienceAdaptive: string
    startLearningFree: string
    watchDemo: string
    activeLearners: string
    successRate: string
    aiSupport: string
    todaysProgress: string
    levelB2: string
    lessons: string
    streak: string
    completeLearningEcosystem: string
    ourPlatformCombines: string
    aiPoweredTutoring: string
    realTimeConversation: string
    liveHumanTutors: string
    hdVideoSessions: string
    adaptiveLearning: string
    personalizedLearningPaths: string
    gamifiedExperience: string
    achievementsBadges: string
    cefrAlignedContent: string
    structuredCurriculum: string
    globalAccessibility: string
    crossPlatformSupport: string
    readyToTransform: string
    joinThousandsLearners: string
    getStartedFree: string
    viewPricing: string
  }

  // Common
  common: {
    loading: string
    error: string
    save: string
    cancel: string
    delete: string
    edit: string
    view: string
    close: string
    next: string
    previous: string
    search: string
    filter: string
    sort: string
    all: string
    none: string
    yes: string
    no: string
    ok: string
    and: string
  }
}

// Spanish translations
export const translations: Record<Locale, Translations> = {
  es: {
    nav: {
      dashboard: "Panel de Control",
      learning: "Aprendizaje",
      aiTutor: "Tutor IA",
      interactiveLessons: "Lecciones Interactivas",
      vocabularyBuilder: "Constructor de Vocabulario",
      liveTutoring: "Tutoría en Vivo",
      analytics: "Analíticas",
      schedule: "Horario",
      community: "Comunidad",
      profile: "Perfil",
      settings: "Configuración",
      logout: "Cerrar Sesión",
    },

    dashboard: {
      welcomeBack: "¡Bienvenido de vuelta, Alex!",
      continueJourney: "Continúa tu viaje de aprendizaje de inglés",
      yourProgress: "Tu Progreso",
      currentLevel: "Nivel actual: Intermedio (B2)",
      overallProgress: "Progreso General",
      lessonsCompleted: "Lecciones Completadas",
      aiConversations: "Conversaciones IA",
      tutorSessions: "Sesiones de Tutoría",
      achievements: "Logros",
      continueLearning: "Continuar Aprendiendo",
      pickUpWhereLeft: "Retoma donde lo dejaste",
      practiceConversation: "Practica conversación",
      grammarVocabulary: "Gramática y Vocabulario",
      live1on1Session: "Sesión en vivo 1 a 1",
      recentAchievements: "Logros Recientes",
      upcomingLessons: "Próximas Lecciones",
      viewFullSchedule: "Ver Horario Completo",
      thisWeeksGoals: "Metas de Esta Semana",
      complete5Lessons: "Completar 5 lecciones",
      practiceSpeaking3Times: "Practicar hablar 3 veces",
      learn20NewWords: "Aprender 20 palabras nuevas",
      learningStreak: "Racha de Aprendizaje",
      daysInRow: "Días seguidos",
      keepItUp: "¡Sigue así!",
      grammarMaster: "Maestro de Gramática",
      conversationStarter: "Iniciador de Conversación",
      streakChampion: "Campeón de Racha",
      grammarMasterDesc: "Completó 50 ejercicios de gramática",
      conversationStarterDesc: "Tuvo 10 conversaciones con IA",
      streakChampionDesc: "Racha de aprendizaje de 30 días",
      advancedGrammar: "Gramática Avanzada: Oraciones Condicionales",
      businessEnglishConv: "Conversación de Inglés de Negocios",
      ieltsWritingPractice: "Práctica de Escritura IELTS",
      newBadge: "Nuevo",
      days: "días",
      lessons: "lecciones",
    },

    login: {
      learnMioAI: "LearnMioAI",
      masterEnglishAI: "Domina el Inglés con Aprendizaje Potenciado por IA",
      joinThousands:
        "Únete a miles de estudiantes que usan tutores de IA personalizados, instructores en vivo y tecnología de aprendizaje adaptativo.",
      welcomeBack: "Bienvenido de Vuelta",
      signInToContinue: "Inicia sesión para continuar tu viaje de aprendizaje de inglés",
      aiTutoring: "Tutoría IA",
      liveInstructors: "Instructores en Vivo",
      cefrCertified: "Certificado CEFR",
      a1ToC2Levels: "Niveles A1 a C2",
      activeLearners: "Estudiantes Activos",
      successRate: "Tasa de Éxito",
      aiSupport: "Soporte IA",
      continueWithGoogle: "Continuar con Google",
      signingIn: "Iniciando sesión...",
      bySigningIn: "Al iniciar sesión, aceptas nuestros",
      termsOfService: "Términos de Servicio",
      privacyPolicy: "Política de Privacidad",
      failedToSignIn: "Error al iniciar sesión. Por favor, inténtalo de nuevo.",
      quickFix: "Solución Rápida: Ve a tu",
    },

    aiTutor: {
      aiTutorSession: "Sesión de Tutor IA",
      newTopic: "Nuevo Tema",
      emmaAITutor: "Emma - Tutor IA",
      specializedConversational: "Especializada en inglés conversacional",
      online: "En línea",
      generalConversation: "Conversación General",
      businessEnglish: "Inglés de Negocios",
      travelTourism: "Viajes y Turismo",
      academicDiscussion: "Discusión Académica",
      jobInterviewPractice: "Práctica de Entrevista de Trabajo",
      dailyLifeSituations: "Situaciones de la Vida Diaria",
      typeMessage: "Escribe tu mensaje o usa entrada de voz...",
      aiWillProvide: "La IA proporcionará retroalimentación de pronunciación y sugerencias gramaticales",
      topics: "Temas",
      sessionGoals: "Objetivos de la Sesión",
      practicePastTense: "Practicar tiempo pasado",
      improvePronunciation: "Mejorar pronunciación",
      use5NewVocab: "Usar 5 palabras de vocabulario nuevas",
      quickActions: "Acciones Rápidas",
      grammarCheck: "Verificación Gramatical",
      pronunciationPractice: "Práctica de Pronunciación",
      vocabularyBuilder: "Constructor de Vocabulario",
      takeQuiz: "Tomar Examen",
      helloAITutor:
        "¡Hola! Soy tu tutor de inglés con IA. Estoy aquí para ayudarte a practicar conversación, gramática y pronunciación. ¿En qué te gustaría trabajar hoy?",
      greatQuestion:
        "¡Esa es una gran pregunta! Déjame ayudarte con eso. Tu estructura de oración es buena, pero noté un pequeño punto gramatical que podemos mejorar.",
      feedbackSuggestions: "Retroalimentación y Sugerencias",
      grammar: "Gramática:",
      suggestions: "Sugerencias:",
      considerUsing: "Considera usar 'have been' en lugar de 'was' para acciones continuas",
      thSoundClearer: "El sonido 'th' en 'think' podría ser más claro",
      tryExample: "Intenta: 'I have been thinking about this topic lately'",
    },

    tutoring: {
      liveTutoring: "Tutoría en Vivo",
      connectCertified: "Conéctate con instructores de inglés certificados en todo el mundo",
      hdVideoSessions: "Sesiones de Video HD",
      bookSession: "Reservar Sesión",
      findPerfectTutor: "Encuentra tu Tutor Perfecto",
      searchTutors: "Buscar tutores...",
      specialty: "Especialidad",
      availability: "Disponibilidad",
      priceRange: "Rango de Precio",
      availableNow: "Disponible Ahora",
      today: "Hoy",
      thisWeek: "Esta Semana",
      businessEnglish: "Inglés de Negocios",
      conversation: "Conversación",
      ieltsPrep: "Preparación IELTS",
      toefPrep: "Preparación TOEFL",
      academicWriting: "Escritura Académica",
      teachingExperience: "experiencia enseñando",
      perHour: "por hora",
      nextAvailable: "Próximo disponible:",
      message: "Mensaje",
      viewProfile: "Ver Perfil",
      upcomingSessions: "Próximas Sesiones",
      viewAllSessions: "Ver Todas las Sesiones",
      yourTutoringStats: "Tus Estadísticas de Tutoría",
      totalSessions: "Sesiones Totales",
      learningTime: "Tiempo de Aprendizaje",
      favoriteTutors: "Tutores Favoritos",
      needHelp: "¿Necesitas Ayuda?",
      technicalSupport: "Soporte Técnico",
      chatWithSupport: "Chat con Soporte",
      tutoringGuidelines: "Guías de Tutoría",
      joinSession: "Unirse a Sesión",
      videoCall: "Videollamada",
    },

    analytics: {
      learningAnalytics: "Analíticas de Aprendizaje",
      trackProgress: "Rastrea tu progreso y optimiza tu viaje de aprendizaje",
      realTimeData: "Datos en Tiempo Real",
      totalStudyTime: "Tiempo Total de Estudio",
      lessonsCompleted: "Lecciones Completadas",
      aiConversations: "Conversaciones IA",
      currentLevel: "Nivel Actual",
      thisMonth: "+12% este mes",
      thisWeek: "+8 esta semana",
      weeklyLearningActivity: "Actividad de Aprendizaje Semanal",
      monthlyLearningHours: "Horas de Aprendizaje Mensual",
      activityBreakdown: "Desglose de Actividad",
      recentAchievements: "Logros Recientes",
      skillsProgressOverview: "Resumen de Progreso de Habilidades",
      skillDevelopmentRecommendations: "Recomendaciones de Desarrollo de Habilidades",
      learningActivityHeatmap: "Mapa de Calor de Actividad de Aprendizaje",
      aiLearningPredictions: "Predicciones de Aprendizaje IA",
      personalizedLearningPath: "Ruta de Aprendizaje Personalizada",
      speaking: "Hablar",
      listening: "Escuchar",
      reading: "Leer",
      writing: "Escribir",
      readingComprehension: "Comprensión de Lectura",
      writingSkills: "Habilidades de Escritura",
      listeningSkills: "Habilidades de Escucha",
      weakestSkillFocus: "Tu habilidad más débil. Enfócate en mejorar vocabulario y velocidad de lectura.",
      goodProgressFocus: "¡Buen progreso! Enfócate en estructuras gramaticales avanzadas y organización de ensayos.",
      excellentProgressMaintain: "¡Excelente progreso! Mantén tu nivel con contenido diverso.",
    },

    home: {
      aiPoweredPlatform: "🚀 Plataforma de Aprendizaje Potenciada por IA",
      masterEnglishPersonalized: "Domina el Inglés con IA Personalizada",
      experienceAdaptive:
        "Experimenta aprendizaje adaptativo con tutores de IA en tiempo real, ejercicios interactivos e instructores humanos en vivo. Desde niveles de competencia A1 hasta C2.",
      startLearningFree: "Comenzar a Aprender Gratis",
      watchDemo: "Ver Demo",
      activeLearners: "Estudiantes Activos",
      successRate: "Tasa de Éxito",
      aiSupport: "Soporte IA",
      todaysProgress: "Progreso de Hoy",
      levelB2: "Nivel B2",
      lessons: "Lecciones",
      streak: "Racha",
      completeLearningEcosystem: "Ecosistema de Aprendizaje Completo",
      ourPlatformCombines:
        "Nuestra plataforma combina tecnología de IA de vanguardia con métodos educativos probados para ofrecer experiencias de aprendizaje personalizadas.",
      aiPoweredTutoring: "Tutoría Potenciada por IA",
      realTimeConversation:
        "Práctica de conversación en tiempo real con tutores de IA conscientes del contexto que se adaptan a tu estilo de aprendizaje",
      liveHumanTutors: "Tutores Humanos en Vivo",
      hdVideoSessions:
        "Sesiones de video HD con instructores certificados, emparejamiento automatizado y planificación de lecciones integrada",
      adaptiveLearning: "Aprendizaje Adaptativo",
      personalizedLearningPaths:
        "Rutas de aprendizaje personalizadas que se ajustan según tu progreso y patrones de rendimiento",
      gamifiedExperience: "Experiencia Gamificada",
      achievementsBadges: "Logros, insignias y hitos de progreso que te mantienen motivado y comprometido",
      cefrAlignedContent: "Contenido Alineado con CEFR",
      structuredCurriculum:
        "Currículo estructurado desde niveles A1 hasta C2 con materiales interactivos de múltiples formatos",
      globalAccessibility: "Accesibilidad Global",
      crossPlatformSupport:
        "Soporte multiplataforma con capacidades sin conexión y características de accesibilidad para todos los estudiantes",
      readyToTransform: "¿Listo para Transformar tu Aprendizaje de Inglés?",
      joinThousandsLearners:
        "Únete a miles de estudiantes que han logrado fluidez con nuestra plataforma potenciada por IA. Comienza tu viaje de aprendizaje personalizado hoy.",
      getStartedFree: "Comenzar Gratis",
      viewPricing: "Ver Precios",
    },

    common: {
      loading: "Cargando...",
      error: "Error",
      save: "Guardar",
      cancel: "Cancelar",
      delete: "Eliminar",
      edit: "Editar",
      view: "Ver",
      close: "Cerrar",
      next: "Siguiente",
      previous: "Anterior",
      search: "Buscar",
      filter: "Filtrar",
      sort: "Ordenar",
      all: "Todos",
      none: "Ninguno",
      yes: "Sí",
      no: "No",
      ok: "OK",
      and: "y",
    },
  },

  en: {
    nav: {
      dashboard: "Dashboard",
      learning: "Learning",
      aiTutor: "AI Tutor",
      interactiveLessons: "Interactive Lessons",
      vocabularyBuilder: "Vocabulary Builder",
      liveTutoring: "Live Tutoring",
      analytics: "Analytics",
      schedule: "Schedule",
      community: "Community",
      profile: "Profile",
      settings: "Settings",
      logout: "Log out",
    },

    dashboard: {
      welcomeBack: "Welcome back, Alex!",
      continueJourney: "Continue your English learning journey",
      yourProgress: "Your Progress",
      currentLevel: "Current level: Intermediate (B2)",
      overallProgress: "Overall Progress",
      lessonsCompleted: "Lessons Completed",
      aiConversations: "AI Conversations",
      tutorSessions: "Tutor Sessions",
      achievements: "Achievements",
      continueLearning: "Continue Learning",
      pickUpWhereLeft: "Pick up where you left off",
      practiceConversation: "Practice conversation",
      grammarVocabulary: "Grammar & Vocabulary",
      live1on1Session: "Live 1-on-1 session",
      recentAchievements: "Recent Achievements",
      upcomingLessons: "Upcoming Lessons",
      viewFullSchedule: "View Full Schedule",
      thisWeeksGoals: "This Week's Goals",
      complete5Lessons: "Complete 5 lessons",
      practiceSpeaking3Times: "Practice speaking 3 times",
      learn20NewWords: "Learn 20 new words",
      learningStreak: "Learning Streak",
      daysInRow: "Days in a row",
      keepItUp: "Keep it up!",
      grammarMaster: "Grammar Master",
      conversationStarter: "Conversation Starter",
      streakChampion: "Streak Champion",
      grammarMasterDesc: "Completed 50 grammar exercises",
      conversationStarterDesc: "Had 10 AI conversations",
      streakChampionDesc: "30-day learning streak",
      advancedGrammar: "Advanced Grammar: Conditional Sentences",
      businessEnglishConv: "Business English Conversation",
      ieltsWritingPractice: "IELTS Writing Practice",
      newBadge: "New",
      days: "days",
      lessons: "lessons",
    },

    login: {
      learnMioAI: "LearnMioAI",
      masterEnglishAI: "Master English with AI-Powered Learning",
      joinThousands:
        "Join thousands of learners using personalized AI tutors, live instructors, and adaptive learning technology.",
      welcomeBack: "Welcome Back",
      signInToContinue: "Sign in to continue your English learning journey",
      aiTutoring: "AI Tutoring",
      liveInstructors: "Live Instructors",
      cefrCertified: "CEFR Certified",
      a1ToC2Levels: "A1 to C2 Levels",
      activeLearners: "Active Learners",
      successRate: "Success Rate",
      aiSupport: "AI Support",
      continueWithGoogle: "Continue with Google",
      signingIn: "Signing in...",
      bySigningIn: "By signing in, you agree to our",
      termsOfService: "Terms of Service",
      privacyPolicy: "Privacy Policy",
      failedToSignIn: "Failed to sign in. Please try again.",
      quickFix: "Quick Fix: Go to your",
    },

    aiTutor: {
      aiTutorSession: "AI Tutor Session",
      newTopic: "New Topic",
      emmaAITutor: "Emma - AI Tutor",
      specializedConversational: "Specialized in conversational English",
      online: "Online",
      generalConversation: "General Conversation",
      businessEnglish: "Business English",
      travelTourism: "Travel & Tourism",
      academicDiscussion: "Academic Discussion",
      jobInterviewPractice: "Job Interview Practice",
      dailyLifeSituations: "Daily Life Situations",
      typeMessage: "Type your message or use voice input...",
      aiWillProvide: "AI will provide pronunciation feedback and grammar suggestions",
      topics: "Topics",
      sessionGoals: "Session Goals",
      practicePastTense: "Practice past tense",
      improvePronunciation: "Improve pronunciation",
      use5NewVocab: "Use 5 new vocabulary words",
      quickActions: "Quick Actions",
      grammarCheck: "Grammar Check",
      pronunciationPractice: "Pronunciation Practice",
      vocabularyBuilder: "Vocabulary Builder",
      takeQuiz: "Take Quiz",
      helloAITutor:
        "Hello! I'm your AI English tutor. I'm here to help you practice conversation, grammar, and pronunciation. What would you like to work on today?",
      greatQuestion:
        "That's a great question! Let me help you with that. Your sentence structure is good, but I noticed a small grammar point we can improve.",
      feedbackSuggestions: "Feedback & Suggestions",
      grammar: "Grammar:",
      suggestions: "Suggestions:",
      considerUsing: "Consider using 'have been' instead of 'was' for ongoing actions",
      thSoundClearer: "The 'th' sound in 'think' could be clearer",
      tryExample: "Try: 'I have been thinking about this topic lately'",
    },

    tutoring: {
      liveTutoring: "Live Tutoring",
      connectCertified: "Connect with certified English instructors worldwide",
      hdVideoSessions: "HD Video Sessions",
      bookSession: "Book Session",
      findPerfectTutor: "Find Your Perfect Tutor",
      searchTutors: "Search tutors...",
      specialty: "Specialty",
      availability: "Availability",
      priceRange: "Price Range",
      availableNow: "Available Now",
      today: "Today",
      thisWeek: "This Week",
      businessEnglish: "Business English",
      conversation: "Conversation",
      ieltsPrep: "IELTS Prep",
      toefPrep: "TOEFL Prep",
      academicWriting: "Academic Writing",
      teachingExperience: "teaching experience",
      perHour: "per hour",
      nextAvailable: "Next available:",
      message: "Message",
      viewProfile: "View Profile",
      upcomingSessions: "Upcoming Sessions",
      viewAllSessions: "View All Sessions",
      yourTutoringStats: "Your Tutoring Stats",
      totalSessions: "Total Sessions",
      learningTime: "Learning Time",
      favoriteTutors: "Favorite Tutors",
      needHelp: "Need Help?",
      technicalSupport: "Technical Support",
      chatWithSupport: "Chat with Support",
      tutoringGuidelines: "Tutoring Guidelines",
      joinSession: "Join Session",
      videoCall: "Video Call",
    },

    analytics: {
      learningAnalytics: "Learning Analytics",
      trackProgress: "Track your progress and optimize your learning journey",
      realTimeData: "Real-time Data",
      totalStudyTime: "Total Study Time",
      lessonsCompleted: "Lessons Completed",
      aiConversations: "AI Conversations",
      currentLevel: "Current Level",
      thisMonth: "+12% this month",
      thisWeek: "+8 this week",
      weeklyLearningActivity: "Weekly Learning Activity",
      monthlyLearningHours: "Monthly Learning Hours",
      activityBreakdown: "Activity Breakdown",
      recentAchievements: "Recent Achievements",
      skillsProgressOverview: "Skills Progress Overview",
      skillDevelopmentRecommendations: "Skill Development Recommendations",
      learningActivityHeatmap: "Learning Activity Heatmap",
      aiLearningPredictions: "AI Learning Predictions",
      personalizedLearningPath: "Personalized Learning Path",
      speaking: "Speaking",
      listening: "Listening",
      reading: "Reading",
      writing: "Writing",
      readingComprehension: "Reading Comprehension",
      writingSkills: "Writing Skills",
      listeningSkills: "Listening Skills",
      weakestSkillFocus: "Your weakest skill. Focus on improving vocabulary and reading speed.",
      goodProgressFocus: "Good progress! Focus on advanced grammar structures and essay organization.",
      excellentProgressMaintain: "Excellent progress! Maintain your level with diverse content.",
    },

    home: {
      aiPoweredPlatform: "🚀 AI-Powered Learning Platform",
      masterEnglishPersonalized: "Master English with Personalized AI",
      experienceAdaptive:
        "Experience adaptive learning with real-time AI tutors, interactive exercises, and live human instructors. From A1 to C2 proficiency levels.",
      startLearningFree: "Start Learning Free",
      watchDemo: "Watch Demo",
      activeLearners: "Active Learners",
      successRate: "Success Rate",
      aiSupport: "AI Support",
      todaysProgress: "Today's Progress",
      levelB2: "Level B2",
      lessons: "Lessons",
      streak: "Streak",
      completeLearningEcosystem: "Complete Learning Ecosystem",
      ourPlatformCombines:
        "Our platform combines cutting-edge AI technology with proven educational methods to deliver personalized learning experiences.",
      aiPoweredTutoring: "AI-Powered Tutoring",
      realTimeConversation:
        "Real-time conversation practice with context-aware AI tutors that adapt to your learning style",
      liveHumanTutors: "Live Human Tutors",
      hdVideoSessions:
        "HD video sessions with certified instructors, automated matching, and integrated lesson planning",
      adaptiveLearning: "Adaptive Learning",
      personalizedLearningPaths:
        "Personalized learning paths that adjust based on your progress and performance patterns",
      gamifiedExperience: "Gamified Experience",
      achievementsBadges: "Achievements, badges, and progress milestones that keep you motivated and engaged",
      cefrAlignedContent: "CEFR Aligned Content",
      structuredCurriculum: "Structured curriculum from A1 to C2 levels with multi-format interactive materials",
      globalAccessibility: "Global Accessibility",
      crossPlatformSupport:
        "Cross-platform support with offline capabilities and accessibility features for all learners",
      readyToTransform: "Ready to Transform Your English Learning?",
      joinThousandsLearners:
        "Join thousands of learners who have achieved fluency with our AI-powered platform. Start your personalized learning journey today.",
      getStartedFree: "Get Started Free",
      viewPricing: "View Pricing",
    },

    common: {
      loading: "Loading...",
      error: "Error",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      close: "Close",
      next: "Next",
      previous: "Previous",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      all: "All",
      none: "None",
      yes: "Yes",
      no: "No",
      ok: "OK",
      and: "and",
    },
  },
}

// Translation utility function
export function t(key: string, locale: Locale = defaultLocale): string {
  const keys = key.split(".")
  let value: any = translations[locale]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}

// Hook for using translations in components
export function useTranslations(locale: Locale = defaultLocale) {
  return {
    t: (key: string) => t(key, locale),
    locale,
    translations: translations[locale],
  }
}
