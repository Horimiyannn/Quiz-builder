export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  type: "BOOLEAN" | "INPUT" | "CHECKBOX";
  options: Option[];
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface QuizSummary {
  id: string;
  title: string;
  _count: { questions: number };
  createdAt: string;
}

export interface CreateQuizData {
  title: string;
  questions: {
    text: string;
    type: "BOOLEAN" | "INPUT" | "CHECKBOX";
    options: {
      text: string;
      isCorrect?: boolean;
    }[];
  }[];
}
