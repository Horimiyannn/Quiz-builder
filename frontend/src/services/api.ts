import { QuizForm } from "@/app/create/page";
import { CreateQuizData, Quiz, QuizSummary } from "@/shared/types/quiz";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

const baseAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export class QuizService {
  private readonly module = "/quizzes";
  async getQuizzes(): Promise<QuizSummary[]> {
    const response = await baseAxios.get<QuizSummary[]>(`${this.module}`);
    return response.data;
  }

  async getQuiz(id: string): Promise<Quiz> {
    const response = await baseAxios.get<Quiz>(`${this.module}/${id}`);
    return response.data;
  }

  async createQuiz(data: QuizForm): Promise<Quiz> {
    const response = await baseAxios.post<Quiz>(`${this.module}`, data);
    return response.data;
  }

  async deleteQuiz(id: string) {
    const response = await baseAxios.delete(`${this.module}/${id}`);
    return response.data;
  }
}

export const quizService = new QuizService();
