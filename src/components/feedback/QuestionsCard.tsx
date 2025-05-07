
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiArrowRight } from "react-icons/fi";
import { QuestionGroup } from "./QuestionGroup";
import { useTheme } from "@/contexts/ThemeContext";

interface QuestionsCardProps {
  title: string;
  questions: Array<{
    id: string;
    text: string;
    departmentId: string;
    type: "rating" | "text" | "multiple-choice";
    options?: string[];
  }>;
  answers: Record<string, string | number>;
  onAnswerChange: (questionId: string, value: string | number) => void;
  onPrevious: () => void;
  onNext: () => void;
  isLastGroup: boolean;
  translations: Record<string, Record<string, string>>;
}

export function QuestionsCard({
  title,
  questions,
  answers,
  onAnswerChange,
  onPrevious,
  onNext,
  isLastGroup,
  translations
}: QuestionsCardProps) {
  const { language } = useTheme();

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-xl text-center text-gray-900 dark:text-white">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {questions.map((q) => (
            <QuestionGroup
              key={q.id}
              question={q}
              answer={answers[q.id] || ""}
              onAnswerChange={onAnswerChange}
            />
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onPrevious} disabled={onPrevious === null}>
            {translations.prevButton[language as keyof typeof translations.prevButton]}
          </Button>
          <Button className="bg-medfeedback-blue hover:bg-medfeedback-blue/90 text-white" onClick={onNext}>
            {translations.nextButton[language as keyof typeof translations.nextButton]} <FiArrowRight className="ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
