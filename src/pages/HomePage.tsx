
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { FiArrowRight } from "react-icons/fi";

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
    navigate("/departments");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="w-full max-w-md mx-auto bg-card dark:bg-card shadow-md">
        <CardContent className="pt-6 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-primary dark:text-primary mb-8">
            {translations.welcome[language as keyof typeof translations.welcome]}
          </h1>
          
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            {translations.clickButton[language as keyof typeof translations.clickButton]}
          </p>
          
          <Button
            onClick={handleContinue}
            className="bg-medfeedback-blue hover:bg-medfeedback-blue/90 dark:bg-medfeedback-blue dark:hover:bg-medfeedback-blue/90 text-white px-6 py-2 rounded-md font-medium transition-colors group"
          >
            {translations.continue[language as keyof typeof translations.continue]}
            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
