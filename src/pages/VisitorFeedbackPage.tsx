
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { useFeedback } from "@/contexts/FeedbackContext";
import { useTheme } from "@/contexts/ThemeContext";
import { FiArrowRight, FiCheck } from "react-icons/fi";

const translations = {
  title: {
    en: "Visitor Feedback",
    es: "Comentarios del Visitante"
  },
  submitButton: {
    en: "Submit",
    es: "Enviar"
  },
  thankYou: {
    en: "Thank you for your feedback!",
    es: "¡Gracias por tus comentarios!"
  },
  helpImprove: {
    en: "Your input helps us improve.",
    es: "Tu opinión nos ayuda a mejorar."
  },
  returnHome: {
    en: "Return Home",
    es: "Volver al inicio"
  },
  staffQuestion: {
    en: "How would you rate our staff helpfulness and courtesy?",
    es: "¿Cómo calificaría la amabilidad y cortesía de nuestro personal?"
  },
  cleanlinessQuestion: {
    en: "How would you rate the cleanliness of our facilities?",
    es: "¿Cómo calificaría la limpieza de nuestras instalaciones?"
  },
  timeQuestion: {
    en: "How satisfied were you with the waiting time during your visit?",
    es: "¿Qué tan satisfecho estuvo con el tiempo de espera durante su visita?"
  },
  experienceQuestion: {
    en: "How would you rate your overall experience?",
    es: "¿Cómo calificaría su experiencia general?"
  },
  commentsLabel: {
    en: "Additional Comments",
    es: "Comentarios Adicionales"
  },
  commentsPlaceholder: {
    en: "Please share any additional feedback about your visit...",
    es: "Por favor comparta cualquier comentario adicional sobre su visita..."
  }
};

export default function VisitorFeedbackPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addResponse } = useFeedback();
  const { language } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [ratings, setRatings] = useState({
    staff: 2.5,
    cleanliness: 2.5,
    time: 2.5,
    experience: 2.5
  });
  const [comments, setComments] = useState("");

  const handleRatingChange = (aspect: keyof typeof ratings, value: number[]) => {
    setRatings(prev => ({
      ...prev,
      [aspect]: value[0]
    }));
  };

  const handleSubmit = () => {
    // Submit visitor feedback
    Object.entries(ratings).forEach(([key, value]) => {
      addResponse({
        questionId: `visitor-${key}`,
        departmentId: "visitor",
        answer: value
      });
    });

    if (comments.trim()) {
      addResponse({
        questionId: "visitor-comments",
        departmentId: "visitor",
        answer: comments
      });
    }

    toast({
      title: translations.thankYou[language as keyof typeof translations.thankYou],
      description: translations.helpImprove[language as keyof typeof translations.helpImprove],
    });
    
    setSubmitted(true);
  };

  if (submitted) {
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

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-xl text-center text-gray-900 dark:text-white">
            {translations.title[language as keyof typeof translations.title]}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Staff Rating */}
          <div className="space-y-2">
            <Label className="text-lg font-medium">
              {translations.staffQuestion[language as keyof typeof translations.staffQuestion]}
            </Label>
            <Slider
              value={[ratings.staff]}
              max={5}
              min={0}
              step={1}
              onValueChange={(value) => handleRatingChange("staff", value)}
            />
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              {[...Array(6).keys()].map((num) => (
                <span key={num}>{num}</span>
              ))}
            </div>
          </div>

          {/* Cleanliness Rating */}
          <div className="space-y-2">
            <Label className="text-lg font-medium">
              {translations.cleanlinessQuestion[language as keyof typeof translations.cleanlinessQuestion]}
            </Label>
            <Slider
              value={[ratings.cleanliness]}
              max={5}
              min={0}
              step={1}
              onValueChange={(value) => handleRatingChange("cleanliness", value)}
            />
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              {[...Array(6).keys()].map((num) => (
                <span key={num}>{num}</span>
              ))}
            </div>
          </div>

          {/* Waiting Time Rating */}
          <div className="space-y-2">
            <Label className="text-lg font-medium">
              {translations.timeQuestion[language as keyof typeof translations.timeQuestion]}
            </Label>
            <Slider
              value={[ratings.time]}
              max={5}
              min={0}
              step={1}
              onValueChange={(value) => handleRatingChange("time", value)}
            />
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              {[...Array(6).keys()].map((num) => (
                <span key={num}>{num}</span>
              ))}
            </div>
          </div>

          {/* Overall Experience Rating */}
          <div className="space-y-2">
            <Label className="text-lg font-medium">
              {translations.experienceQuestion[language as keyof typeof translations.experienceQuestion]}
            </Label>
            <Slider
              value={[ratings.experience]}
              max={5}
              min={0}
              step={1}
              onValueChange={(value) => handleRatingChange("experience", value)}
            />
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              {[...Array(6).keys()].map((num) => (
                <span key={num}>{num}</span>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <Label className="text-lg font-medium">
              {translations.commentsLabel[language as keyof typeof translations.commentsLabel]}
            </Label>
            <Textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder={translations.commentsPlaceholder[language as keyof typeof translations.commentsPlaceholder]}
              className="min-h-[150px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            className="bg-medfeedback-blue hover:bg-medfeedback-blue/90 text-white" 
            onClick={handleSubmit}
          >
            {translations.submitButton[language as keyof typeof translations.submitButton]}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
