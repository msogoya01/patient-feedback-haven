
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowRight } from 'lucide-react';

const translations = {
  welcome: {
    en: "Welcome dear patient",
    fr: "Bienvenue cher patient",
    es: "Bienvenido querido paciente",
  },
  clickButton: {
    en: "Click the button below to provide your feedback",
    fr: "Cliquez sur le bouton ci-dessous pour donner votre avis",
    es: "Haga clic en el botón de abajo para dar su opinión",
  },
  continue: {
    en: "CONTINUE",
    fr: "CONTINUER",
    es: "CONTINUAR",
  },
};

export default function HomePage() {
  const { user } = useAuth();
  const { language } = useTheme();
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/departments');
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl p-6 shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {translations.welcome[language as keyof typeof translations.welcome]}
        </h1>
        
        <p className="text-gray-600 text-center mb-6">
          {translations.clickButton[language as keyof typeof translations.clickButton]}
        </p>
        
        <button
          className="w-full bg-purple-500 text-white py-4 px-6 rounded-lg flex items-center justify-center font-semibold"
          onClick={handleContinue}
        >
          <span>{translations.continue[language as keyof typeof translations.continue]}</span>
          <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
}
