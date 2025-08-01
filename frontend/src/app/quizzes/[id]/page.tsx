"use client";

import { quizService } from "@/services/api";
import { Quiz } from "@/shared/types/quiz";
import { AxiosError } from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Page() {
  const { id }: { id: string } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const data = await quizService.getQuiz(id);
      setQuiz(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
      setError("Unknown error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading quiz...</div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          {error || "Quiz not found"}
          <Link href="/quizzes" className={styles.backButton}>
            Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/quizzes" className={styles.backButton}>
          ← Back to Quizzes
        </Link>
        <h1 className={styles.title}>{quiz.title}</h1>
        <p className={styles.meta}>
          {quiz.questions.length} question
          {quiz.questions.length !== 1 ? "s" : ""} • Created:{" "}
          {new Date(quiz.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className={styles.questions}>
        {quiz.questions.map((question, index) => (
          <div key={question.id} className={styles.question}>
            <h3 className={styles.questionTitle}>
              Question {index + 1}: {question.text}
            </h3>

            {question.type === "BOOLEAN" && (
              <div className={styles.options}>
                <h4 className={styles.optionsTitle}>Options:</h4>

                <div className={styles.option}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    className={styles.radio}
                  />
                  <span className={styles.optionText}>True</span>
                </div>
                 <div className={styles.option}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    className={styles.radio}
                  />
                  <span className={styles.optionText}>False</span>
                </div>
              </div>
            )}

            {question.type === "INPUT" && (
              <div className={styles.inputQuestion}>
                <h4 className={styles.optionsTitle}>Answer:</h4>
                <input
                  type="text"
                  placeholder="Enter your answer here..."
                  className={styles.textInput}
                />
                <p className={styles.inputHint}>Text input required</p>
              </div>
            )}

            {question.type === "CHECKBOX" && (
              <div className={styles.options}>
                <h4 className={styles.optionsTitle}>Options:</h4>
                {question.options.map((option) => (
                  <div key={option.id} className={styles.option}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span className={styles.optionText}>{option.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
