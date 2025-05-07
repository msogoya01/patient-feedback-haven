
export type Department = {
  id: string;
  name: string;
};

export type Question = {
  id: string;
  text: string;
  departmentId: string;
  type: "rating" | "text" | "multiple-choice";
  options?: string[];
};

export type FeedbackResponse = {
  id: string;
  questionId: string;
  answer: string | number;
  departmentId: string;
  timestamp: Date;
};

export type FeedbackContextType = {
  departments: Department[];
  questions: Question[];
  responses: FeedbackResponse[];
  selectedDepartments: Department[];
  setSelectedDepartments: (departments: Department[]) => void;
  addResponse: (response: Omit<FeedbackResponse, "id" | "timestamp">) => void;
  getQuestionsByDepartments: (departmentIds: string[]) => Question[];
};
