import ProfileForm from '@/components/forms/ProfileForm';
import { SlideInFromBottom, FadeIn } from '@/components/ui/motion';
import { useTranslations } from 'next-intl';

export default function ProfilePage() {
  const t = useTranslations('profile');
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-4 sm:py-8 md:py-16">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 space-y-6 sm:space-y-8">
        {/* Hero Section */}
        <FadeIn>
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full mb-4">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent px-2">
                Perfil de Aprendizaje
              </h1>
              <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed px-4">
                Personaliza tu experiencia de aprendizaje en solo 3 pasos. Esto nos ayudará a crear el plan de estudio perfecto para ti.
              </p>
            </div>
            
            {/* Key benefits */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mt-8 px-4">
              <div className="flex items-center justify-center space-x-2 bg-white px-4 py-3 rounded-full shadow-sm border min-w-0">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Plan personalizado</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-white px-4 py-3 rounded-full shadow-sm border min-w-0">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Solo 3 minutos</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-white px-4 py-3 rounded-full shadow-sm border min-w-0">
                <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">100% seguro</span>
              </div>
            </div>
          </div>
        </FadeIn>
        
        {/* Main Form Section */}
        <SlideInFromBottom delay="100">
          <div className="relative px-2 sm:px-0">
            {/* Background decoration - hidden on mobile for better performance */}
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-2xl transform rotate-1"></div>
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-l from-purple-100/20 to-blue-100/20 rounded-2xl transform -rotate-1"></div>
            
            {/* Form container */}
            <div className="relative bg-white/90 sm:bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-white/50 overflow-hidden">
              {/* Subtle top gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600"></div>
              
              <div className="p-4 sm:p-6 lg:p-8">
                <ProfileForm />
              </div>
            </div>
          </div>
        </SlideInFromBottom>

        {/* Bottom section with additional info */}
        <SlideInFromBottom delay="200">
          <div className="text-center space-y-3 sm:space-y-4 px-4">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-8 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center space-x-2 min-w-0">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5 9.293 10.793a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                <span className="whitespace-nowrap">Datos encriptados</span>
              </div>
              <div className="flex items-center space-x-2 min-w-0">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                <span className="whitespace-nowrap">Política de privacidad</span>
              </div>
              <div className="flex items-center space-x-2 min-w-0">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <span className="whitespace-nowrap">¿Necesitas ayuda?</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed px-2">
              Al completar este formulario, aceptas nuestros términos de servicio y política de privacidad. 
              Tu información será utilizada únicamente para personalizar tu experiencia de aprendizaje.
            </p>
          </div>
        </SlideInFromBottom>
      </div>
    </div>
  );
}
