
import React, { createContext, useState, useContext } from "react";

// Types for our feedback system
type Department = {
  id: string;
  name: string;
};

type Question = {
  id: string;
  text: string;
  departmentId: string;
  type: "rating" | "text" | "multiple-choice";
  options?: string[];
};

type FeedbackResponse = {
  id: string;
  questionId: string;
  answer: string | number;
  departmentId: string;
  timestamp: Date;
};

type FeedbackContextType = {
  departments: Department[];
  questions: Question[];
  responses: FeedbackResponse[];
  selectedDepartment: Department | null;
  setSelectedDepartment: (department: Department | null) => void;
  addResponse: (response: Omit<FeedbackResponse, "id" | "timestamp">) => void;
  getQuestionsByDepartment: (departmentId: string) => Question[];
};

// Sample departments and questions
const initialDepartments: Department[] = [
  { id: "1", name: "Emergency" },
  { id: "2", name: "Cardiology" },
  { id: "3", name: "Pediatrics" },
  { id: "4", name: "Oncology" },
  { id: "5", name: "Neurology" },
  { id: "6", name: "Orthopedics" },
];

const initialQuestions: Question[] = [
  {
    id: "q1",
    text: "How would you rate the waiting time?",
    departmentId: "1",
    type: "rating",
  },
  {
    id: "q2",
    text: "How would you rate the staff's courtesy?",
    departmentId: "1",
    type: "rating",
  },
  {
    id: "q3",
    text: "Were your concerns addressed properly?",
    departmentId: "1",
    type: "multiple-choice",
    options: ["Yes, completely", "Somewhat", "No, not at all"],
  },
  {
    id: "q4",
    text: "How would you rate the cleanliness of the facility?",
    departmentId: "2",
    type: "rating",
  },
  {
    id: "q5",
    text: "Did the doctor explain your condition clearly?",
    departmentId: "2",
    type: "multiple-choice",
    options: ["Very clearly", "Somewhat clearly", "Not clearly at all"],
  },
  {
    id: "q6",
    text: "Any additional comments about your experience?",
    departmentId: "2",
    type: "text",
  },
  {
    id: "q7",
    text: "How satisfied were you with the care provided to your child?",
    departmentId: "3",
    type: "rating",
  },
  {
    id: "q8",
    text: "Was the environment child-friendly?",
    departmentId: "3",
    type: "multiple-choice",
    options: ["Very child-friendly", "Somewhat child-friendly", "Not child-friendly"],
  },
  {
    id: "q9",
    text: "How would you rate the doctor's communication with your child?",
    departmentId: "3",
    type: "rating",
  },
  {
    id: "q10",
    text: "How would you rate the support services provided?",
    departmentId: "4",
    type: "rating",
  },
  {
    id: "q11",
    text: "Were treatment options explained clearly?",
    departmentId: "4",
    type: "multiple-choice",
    options: ["Very clearly", "Somewhat clearly", "Not clearly at all"],
  },
  {
    id: "q12",
    text: "How would you rate the follow-up care?",
    departmentId: "5",
    type: "rating",
  },
  {
    id: "q13",
    text: "How would you rate the rehabilitation services provided?",
    departmentId: "6",
    type: "rating",
  },
];

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [departments] = useState<Department[]>(initialDepartments);
  const [questions] = useState<Question[]>(initialQuestions);
  const [responses, setResponses] = useState<FeedbackResponse[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const getQuestionsByDepartment = (departmentId: string) => {
    return questions.filter(question => question.departmentId === departmentId);
  };

  const addResponse = (response: Omit<FeedbackResponse, "id" | "timestamp">) => {
    const newResponse: FeedbackResponse = {
      ...response,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date(),
    };
    
    setResponses(prev => [...prev, newResponse]);
    
    // In a real app, you would send this to a backend API
    console.log("Feedback submitted:", newResponse);
  };

  return (
    <FeedbackContext.Provider
      value={{
        departments,
        questions,
        responses,
        selectedDepartment,
        setSelectedDepartment,
        addResponse,
        getQuestionsByDepartment,
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
