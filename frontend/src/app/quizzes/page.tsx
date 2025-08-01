"use client";

import { quizService } from "@/services/api";
import { QuizSummary } from "@/shared/types/quiz";
import { AxiosError } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Page() {
  const [quizzes, setQuizzes] = useState<QuizSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const data = await quizService.getQuizzes();
      setQuizzes(data);
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
  const handleDeleteQuiz = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quiz?")) {
      return;
    }

    try {
      await quizService.deleteQuiz(id);
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
    } catch (err) {
      alert("Failed to delete quiz");
      console.error("Error deleting quiz:", err);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading quizzes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>All Quizzes</h1>
        <Link href="/create" className={styles.createButton}>
          Create New Quiz
        </Link>
      </div>

      {quizzes.length === 0 ? (
        <div className={styles.empty}>
          <p>No quizzes found. Create your first quiz!</p>
          <Link href="/create" className={styles.createButton}>
            Create Quiz
          </Link>
        </div>
      ) : (
        <div className={styles.quizGrid}>
          {quizzes.map((quiz) => (
            <div key={quiz.id} className={styles.quizCard}>
              <Link className={styles.quizInfo} href={`/quizzes/${quiz.id}`}>
                <h3 className={styles.quizTitle}>{quiz.title}</h3>
                <p className={styles.quizMeta}>
                  {quiz._count.questions} question
                  {quiz._count.questions !== 1 ? "s" : ""}
                </p>
                <p className={styles.quizDate}>
                  Created: {new Date(quiz.createdAt).toLocaleDateString()}
                </p>
              </Link>
              <div className={styles.quizActions}>
                <button
                  onClick={() => handleDeleteQuiz(quiz.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
