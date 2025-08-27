import ProfileForm from '@/components/forms/ProfileForm';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-foreground">
            Perfil de Aprendizaje
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Antes de comenzar, necesitamos conocer un poco más sobre ti para personalizar tu experiencia de aprendizaje.
            Este proceso consta de 3 pasos simples que nos ayudarán a adaptar el contenido a tus necesidades.
          </p>
        </div>
        
        <div className="bg-card border-l-4 border-yellow-500 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-card-foreground">
                Por favor, completa tu perfil antes de acceder al dashboard. Esto nos ayudará a ofrecerte una experiencia personalizada.
              </p>
            </div>
          </div>
        </div>

        <ProfileForm />
      </div>
    </div>
  );
}
