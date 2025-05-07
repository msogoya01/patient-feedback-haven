
import React, { createContext, useState, useContext } from "react";
import { 
  Department, 
  Question, 
  FeedbackResponse, 
  FeedbackContextType 
} from "../types/feedback";
import { initialDepartments } from "../data/departments";
import { initialQuestions } from "../data/questions";

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [departments] = useState<Department[]>(initialDepartments);
  const [questions] = useState<Question[]>(initialQuestions);
  const [responses, setResponses] = useState<FeedbackResponse[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<Department[]>([]);

  const getQuestionsByDepartments = (departmentIds: string[]) => {
    return questions.filter(question => departmentIds.includes(question.departmentId));
  };

  const addResponse = (response: Omit<FeedbackResponse, "id" | "timestamp">) => {
    const newResponse: FeedbackResponse = {
      ...response,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date(),
    };
    
    setResponses(prev => [...prev, newResponse]);
    console.log("Feedback submitted:", newResponse);
  };

  return (
    <FeedbackContext.Provider
      value={{
        departments,
        questions,
        responses,
        selectedDepartments,
        setSelectedDepartments,
        addResponse,
        getQuestionsByDepartments,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error("useFeedback must be used within a FeedbackProvider");
  }
  return context;
}
