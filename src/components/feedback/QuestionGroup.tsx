
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

interface QuestionProps {
  question: {
    id: string;
    text: string;
    type: "rating" | "text" | "multiple-choice";
    options?: string[];
  };
  answer: string | number;
  onAnswerChange: (questionId: string, value: string | number) => void;
}

export function QuestionGroup({ question, answer, onAnswerChange }: QuestionProps) {
  const renderQuestionInput = () => {
    switch (question.type) {
      case "rating":
        return (
          <div className="space-y-2">
            <Slider
              value={[typeof answer === "number" ? answer : 0]}
              max={10}
              min={0}
              step={1}
              onValueChange={(value) => onAnswerChange(question.id, value[0])}
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
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
            placeholder="Enter your feedback here..."
          />
        );
      case "multiple-choice":
        return (
          <RadioGroup
            value={answer as string || ""}
            onValueChange={(val) => onAnswerChange(question.id, val)}
            className="space-y-3"
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${question.id}-${index}`} />
                <Label htmlFor={`option-${question.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {question.text}
      </h3>
      {renderQuestionInput()}
    </div>
  );
}
