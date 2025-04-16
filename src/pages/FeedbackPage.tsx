
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
    en: "Feedback Form",
    fr: "Formulaire de Retour",
    es: "Formulario de Comentarios",
  },
  department: {
    en: "Department",
    fr: "Service",
    es: "Departamento",
  },
  rating: {
    en: "Rating",
    fr: "Évaluation",
    es: "Calificación",
  },
  submitButton: {
    en: "Submit Feedback",
    fr: "Soumettre",
    es: "Enviar",
  },
  nextButton: {
    en: "Next",
    fr: "Suivant",
    es: "Siguiente",
  },
  prevButton: {
    en: "Previous",
    fr: "Précédent",
    es: "Anterior",
  },
  thankYou: {
    en: "Thank you for your feedback!",
    fr: "Merci pour votre retour!",
    es: "¡Gracias por sus comentarios!",
  },
  helpImprove: {
    en: "Your feedback helps us improve our services.",
    fr: "Vos commentaires nous aident à améliorer nos services.",
    es: "Sus comentarios nos ayudan a mejorar nuestros servicios.",
  },
  returnHome: {
    en: "Return to Home",
    fr: "Retour à l'Accueil",
    es: "Volver al Inicio",
  },
  departmentNames: {
    en: {
      "1": "Emergency",
      "2": "Cardiology",
      "3": "Pediatrics",
      "4": "Oncology",
      "5": "Neurology",
      "6": "Orthopedics",
    },
    fr: {
      "1": "Urgences",
      "2": "Cardiologie",
      "3": "Pédiatrie",
      "4": "Oncologie",
      "5": "Neurologie",
      "6": "Orthopédie",
    },
    es: {
      "1": "Emergencias",
      "2": "Cardiología",
      "3": "Pediatría",
      "4": "Oncología",
      "5": "Neurología",
      "6": "Ortopedia",
    },
  },
};

export default function FeedbackPage() {
  const { selectedDepartment, getQuestionsByDepartment, addResponse } = useFeedback();
  const { language } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!selectedDepartment) {
    navigate("/departments");
    return null;
  }

  const questions = getQuestionsByDepartment(selectedDepartment.id);

  if (questions.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="text-gray-600 dark:text-gray-300">
          No questions available for this department yet.
        </p>
        <Button 
          className="mt-4 bg-medfeedback-blue hover:bg-medfeedback-blue/90 text-white"
          onClick={() => navigate("/departments")}
        >
          Go Back
        </Button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (value: string | number) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };

  const handleSubmit = () => {
    // Check if all questions have been answered
    const unansweredQuestions = questions.filter(
      (q) => !answers[q.id] && answers[q.id] !== 0
    );

    if (unansweredQuestions.length > 0) {
      toast({
        title: "Please answer all questions",
        description: "Some questions have not been answered yet.",
        variant: "destructive",
      });
      
      // Navigate to the first unanswered question
      const firstUnansweredIndex = questions.findIndex(
        (q) => q.id === unansweredQuestions[0].id
      );
      setCurrentQuestionIndex(firstUnansweredIndex);
      return;
    }

    // Submit all answers
    questions.forEach((question) => {
      addResponse({
        questionId: question.id,
        departmentId: selectedDepartment.id,
        answer: answers[question.id],
      });
    });

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
        <Button
          className="bg-medfeedback-blue hover:bg-medfeedback-blue/90 text-white"
          onClick={() => navigate("/home")}
        >
          {translations.returnHome[language as keyof typeof translations.returnHome]}
        </Button>
      </div>
    );
  }

  const renderQuestionInput = () => {
    switch (currentQuestion.type) {
      case "rating":
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 px-2">
              <span>Not Satisfied</span>
              <span>Very Satisfied</span>
            </div>
            <Slider
              defaultValue={[answers[currentQuestion.id] as number || 5]}
              max={10}
              min={1}
              step={1}
              onValueChange={(value) => handleAnswerChange(value[0])}
            />
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <div key={value} className="text-xs text-center">
                  {value}
                </div>
              ))}
            </div>
          </div>
        );
      case "text":
        return (
          <Textarea
            value={answers[currentQuestion.id] as string || ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Enter your feedback here..."
            className="min-h-[100px]"
          />
        );
      case "multiple-choice":
        return (
          <RadioGroup
            value={answers[currentQuestion.id] as string || ""}
            onValueChange={handleAnswerChange}
            className="space-y-3"
          >
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-xl text-center text-gray-900 dark:text-white">
            {translations.title[language as keyof typeof translations.title]}
          </CardTitle>
          <div className="text-center text-gray-600 dark:text-gray-300">
            {translations.department[language as keyof typeof translations.department]}:{" "}
            <span className="font-medium text-medfeedback-blue">
              {
                translations.departmentNames[
                  language as keyof typeof translations.departmentNames
                ][selectedDepartment.id as keyof typeof translations.departmentNames.en]
              }
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-6">
            <div
              className="bg-medfeedback-blue h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {currentQuestion.text}
            </h3>
            {renderQuestionInput()}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            {translations.prevButton[language as keyof typeof translations.prevButton]}
          </Button>

          {currentQuestionIndex === questions.length - 1 ? (
            <Button
              className="bg-medfeedback-blue hover:bg-medfeedback-blue/90 text-white"
              onClick={handleSubmit}
            >
              {translations.submitButton[language as keyof typeof translations.submitButton]}
            </Button>
          ) : (
            <Button
              className="bg-medfeedback-blue hover:bg-medfeedback-blue/90 text-white"
              onClick={handleNext}
            >
              {translations.nextButton[language as keyof typeof translations.nextButton]}
              <FiArrowRight className="ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
