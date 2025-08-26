import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();
  
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to LearnMio AI
        </h1>
        <p className="text-xl">
          Your personalized language learning journey starts here.
        </p>
      </div>
    </main>
  );
}
