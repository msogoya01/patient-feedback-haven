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

const translations: Record<string, Record<string, string>> = {
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
  title: {
    en: "Feedback",
    es: "Retroalimentación"
  },
  prevButton: {
    en: "Previous",
    es: "Anterior"
  },
  submitButton: {
    en: "Submit",
    es: "Enviar"
  },
  nextButton: {
    en: "Next",
    es: "Siguiente"
  }
};

export default function FeedbackPage() {
  const { selectedDepartments, getQuestionsByDepartments, addResponse } = useFeedback();
  const { language } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!selectedDepartments.length) {
    navigate("/departments");
    return null;
  }

  const allQuestions = getQuestionsByDepartments(selectedDepartments.map(d => d.id));

  const groupedQuestions = Object.values(
    allQuestions.reduce((acc, question) => {
      const key = `${question.departmentId}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(question);
      return acc;
    }, {} as Record<string, typeof allQuestions>)
  );

  const currentGroup = groupedQuestions[currentGroupIndex];

  const handleNext = () => {
    if (currentGroupIndex < groupedQuestions.length - 1) {
      setCurrentGroupIndex(currentGroupIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex(currentGroupIndex - 1);
    }
  };

  const handleAnswerChange = (questionId: string, value: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    const unanswered = allQuestions.filter(q => !answers[q.id] && answers[q.id] !== 0);
    if (unanswered.length > 0) {
      toast({ title: "Please answer all questions", description: "Some questions are unanswered.", variant: "destructive" });
      const firstUnanswered = groupedQuestions.findIndex(group => group.some(q => q.id === unanswered[0].id));
      setCurrentGroupIndex(firstUnanswered);
      return;
    }

    allQuestions.forEach((q) => {
      addResponse({ questionId: q.id, departmentId: q.departmentId, answer: answers[q.id] });
    });

    toast({
      title: translations.thankYou[language],
      description: translations.helpImprove[language],
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
          {translations.thankYou[language]}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {translations.helpImprove[language]}
        </p>
        <Button className="bg-medfeedback-blue hover:bg-medfeedback-blue/90 text-white" onClick={() => navigate("/home")}>
          {translations.returnHome[language]}
        </Button>
      </div>
    );
  }

  const renderQuestionInput = (question: any) => {
    const answer = answers[question.id];
    switch (question.type) {
      case "rating":
        return (
          <div className="space-y-2">
            <Slider
              value={[typeof answer === "number" ? answer : 0]}
              max={10}
              min={0}
              step={1}
              onValueChange={(value) => handleAnswerChange(question.id, value[0])}
            />
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              {[...Array(11).keys()].map((num) => (
                <span key={num}>{num}</span>
              ))}
            </div>
          </div>
        );
      case "text":
        return (
          <Textarea
            value={answer as string || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Enter your feedback here..."
          />
        );
      case "multiple-choice":
        return (
          <RadioGroup
            value={answer as string || ""}
            onValueChange={(val) => handleAnswerChange(question.id, val)}
            className="space-y-3"
          >
            {question.options?.map((option, index) => (
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
            {translations.title[language]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentGroup.map((q, idx) => (
            <div key={q.id} className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {q.text}
              </h3>
              {renderQuestionInput(q)}
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentGroupIndex === 0}>
            {translations.prevButton[language]}
          </Button>
          {currentGroupIndex === groupedQuestions.length - 1 ? (
            <Button className="bg-medfeedback-blue hover:bg-medfeedback-blue/90 text-white" onClick={handleSubmit}>
              {translations.submitButton[language]}
            </Button>
          ) : (
            <Button className="bg-medfeedback-blue hover:bg-medfeedback-blue/90 text-white" onClick={handleNext}>
              {translations.nextButton[language]}
              <FiArrowRight className="ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}