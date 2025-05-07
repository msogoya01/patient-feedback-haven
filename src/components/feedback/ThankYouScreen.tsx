
import React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";

interface ThankYouScreenProps {
  translations: Record<string, Record<string, string>>;
}

export function ThankYouScreen({ translations }: ThankYouScreenProps) {
  const { language } = useTheme();
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
        <FiCheck className="w-8 h-8 text-green-600 dark:text-green-300" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {translations.thankYou[language as keyof typeof translations.thankYou]}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {translations.helpImprove[language as keyof typeof translations.helpImprove]}
      </p>
      <Button className="bg-medfeedback-blue hover:bg-medfeedback-blue/90 text-white" onClick={() => navigate("/home")}>
        {translations.returnHome[language as keyof typeof translations.returnHome]}
      </Button>
    </div>
  );
}
