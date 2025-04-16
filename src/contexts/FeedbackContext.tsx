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
  selectedDepartments: Department[];
  setSelectedDepartments: (departments: Department[]) => void;
  addResponse: (response: Omit<FeedbackResponse, "id" | "timestamp">) => void;
  getQuestionsByDepartments: (departmentIds: string[]) => Question[];
};

// Sample departments and questions
const initialDepartments: Department[] = [
  { id: "1", name: "Emergency" },
  { id: "2", name: "Outpatient Clinic" },
  { id: "3", name: "Inpatient Clinic" },
  { id: "4", name: "Radiology" },
  { id: "5", name: "Laboratory" },
  { id: "6", name: "Pharmacy" },
  { id: "7", name: "Billing" },
  { id: "8", name: "Mortuary" },
  { id: "9", name: "Maternity" },
  { id: "10", name: "Immunization" },
];

const initialQuestions: Question[] = [
  {
    id: "q1",
    text: "How quickly were you attended to upon arrival?",
    departmentId: "1",
    type: "rating",
  },
  {
    id: "q2",
    text: "How would you rate the communication of the medical team during your emergency visit?",
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
    text: "Were the emergency team well-prepared to handle your case?",
    departmentId: "1",
    type: "multiple-choice",
    options: ["Yes, completely", "Somewhat", "No, not at all"],
  },
  {
    id: "q5",
    text: "How would you rate the waiting time before seeing a doctor or nurse?",
    departmentId: "2",
    type: "rating",
  },
  {
    id: "q6",
    text: "Was your appointment time respected?",
    departmentId: "2",
    type: "multiple-choice",
    options: ["Very clearly", "Somewhat clearly", "Not clearly at all"],
  },
  {
    id: "q7",
    text: "How courteous and helpful was the outpatient staff?",
    departmentId: "2",
    type: "rating",
  },
  {
    id: "q8",
    text: "How clean and comfortable was the ward environment?",
    departmentId: "3",
    type: "rating",
  },
  {
    id: "q9",
    text: "How timely was the response when patients needed assistance?",
    departmentId: "3",
    type: "multiple-choice",
    options: ["Very time-friendly", "Somewhat time-friendly", "Not time-friendly"],
  },
  {
    id: "q10",
    text: "How would you rate the attentiveness of the nursing staff?",
    departmentId: "3",
    type: "rating",
  },
  {
    id: "q11",
    text: "How would you rate the waiting time for Xray/MRI/Ultra-sound/CT-scans services?",
    departmentId: "4",
    type: "rating",
  },
  {
    id: "q12",
    text: "Were treatment options explained clearly?",
    departmentId: "4",
    type: "multiple-choice",
    options: ["Very clearly", "Somewhat clearly", "Not clearly at all"],
  },
  {
    id: "q13",
    text: "How quickly did you receive your results and follow-up care?",
    departmentId: "4",
    type: "rating",
  },
  {
    id: "q14",
    text: "How would you rate the efficiency of the sample collection process?",
    departmentId: "5",
    type: "rating",
  },
  {
    id: "q15",
    text: "How timely were the lab test results provided?",
    departmentId: "5",
    type: "multiple-choice",
    options: ["Very timely", "Somewhat timely", "Not timely at all"],
  },
  {
    id: "q16",
    text: "Was the lab clean and well-organized?",
    departmentId: "5",
    type: "multiple-choice",
    options: ["Yes", "Somehow", "No, at all"],
  },
  {
    id: "q17",
    text: "How would you rate the time it took to receive your medications?",
    departmentId: "6",
    type: "rating",
  },
  {
    id: "q18",
    text: "Were all prescribed medications available?",
    departmentId: "6",
    type: "multiple-choice",
    options: ["Yes", "Somehow", "No, at all"],
  },
  {
    id: "q19",
    text: "Were usage instructions provided clearly?",
    departmentId: "6",
    type: "multiple-choice",
    options: ["Yes", "Somehow", "No, at all"],
  },
  {
    id: "q20",
    text: "How clear and understandable was the billing process?",
    departmentId: "7",
    type: "multiple-choice",
    options: ["Very clear", "Somehow clear", "Not clear at all"],
  },
  {
    id: "q21",
    text: "How would you rate the options for payment or financial support?",
    departmentId: "7",
    type: "multiple-choice",
    options: ["Yes", "Somehow", "No, at all"],
  },
  {
    id: "q22",
    text: "Rate how fast and reliable were the payment systems",
    departmentId: "7",
    type: "rating",
  },
  {
    id: "q23",
    text: "How respectful was the staff during interactions?",
    departmentId: "8",
    type: "rating",
  },
  {
    id: "q24",
    text: "Were the process handled with sensitivity to your needs?",
    departmentId: "8",
    type: "multiple-choice",
    options: ["Yes", "Somehow", "No, at all"],
  },
   {
    id: "q25",
    text: "Rate how long did they take to process your needs",
    departmentId: "8",
    type: "rating",
  },
  {
    id: "q26",
    text: "How respectful and caring was the maternity care team?",
    departmentId: "9",
    type: "rating",
  },
  {
    id: "q27",
    text: "Was help provided promptly when needed during your stay?",
    departmentId: "9",
    type: "multiple-choice",
    options: ["Yes", "Somehow", "No, at all"],
  },
  {
    id: "q28",
    text: "How clearly was postnatal care explained?",
    departmentId: "9",
    type: "multiple-choice",
    options: ["Very clear", "Somehow clear", "Not clear at all"],
  },
  {
    id: "q29",
    text: "How organized and smooth was the vaccination process?",
    departmentId: "10",
    type: "multiple-choice",
    options: ["Very organized", "Somehow organized", "Not organized at all"],
  },
  {
    id: "q30",
    text: "Were explanations about vaccines and possible effects provided?",
    departmentId: "10",
    type: "multiple-choice",
    options: ["Yes", "Somehow", "No, at all"],
  },
  {
    id: "q31",
    text: "Were vaccination records properly handled?",
    departmentId: "10",
    type: "multiple-choice",
    options: ["Yes", "Somehow", "No, at all"],
  },
];

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
