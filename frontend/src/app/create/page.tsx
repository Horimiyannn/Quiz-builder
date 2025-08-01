"use client";

import { Input } from "@/components/Input/input.component";
import { quizService } from "@/services/api";
import { AxiosError } from "axios";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { formatEnum } from "@/shared/utils/format-enum";

export interface QuestionForm {
  text: string;
  type: "BOOLEAN" | "INPUT" | "CHECKBOX";
  options?: {
    text: string;
    isCorrect?: boolean;
  }[];
}

export interface QuizForm {
  title: string;
  questions: QuestionForm[];
}

export default function Page() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QuizForm>({
    defaultValues: { title: "", questions: [] },
    reValidateMode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const questions = watch("questions");

  const onSubmit = async (data: QuizForm) => {
    try {
      setSubmitting(true);
      setError(null);
      await quizService.createQuiz(data);
      router.push("/quizzes");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
      setError("Unknown error");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const addBooleanQuestion = () => {
    append({
      text: "",
      type: "BOOLEAN",
    });
  };
  const addInputQuestion = () => {
    append({
      text: "",
      type: "INPUT",
    });
  };
  const addCheckboxQuestion = () => {
    append({
      text: "",
      type: "CHECKBOX",
      options: [{ text: "" }, { text: "" }, { text: "" }],
    });
  };

  const removeQuestion = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const addOption = (questionIndex: number) => {
    const currentOptions = watch(`questions.${questionIndex}.options`) || [];

    const newOption = {
      text: "",
      isCorrect: false,
    };
    setValue(`questions.${questionIndex}.options`, [
      ...currentOptions,
      newOption,
    ]);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const currentOptions = watch(`questions.${questionIndex}.options`) || [];
    if (currentOptions.length > 1) {
      const updatedOptions = currentOptions.filter(
        (_, index) => index !== optionIndex
      );

      setValue(`questions.${questionIndex}.options`, updatedOptions);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Create new Quiz</h1>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.section}>
          <Input
            {...register("title", { required: "Quiz title is required" })}
            label="Quiz title"
            required
            placeholder="Enter quiz title"
            error={errors.title?.message}
          />
        </div>
        <div className={styles.questionsSection}>
          <div className={styles.questionsHeader}>
            <h2 className={styles.sectionTitle}>Questions</h2>
            <div className={styles.addButtons}>
              <button
                type="button"
                onClick={addBooleanQuestion}
                className={`${styles.addButton} ${styles.booleanButton}`}
              >
                + Boolean Question
              </button>
              <button
                type="button"
                onClick={addInputQuestion}
                className={`${styles.addButton} ${styles.inputButton}`}
              >
                + Input Question
              </button>
              <button
                type="button"
                onClick={addCheckboxQuestion}
                className={`${styles.addButton} ${styles.checkboxButton}`}
              >
                + Checkbox Question
              </button>
            </div>
          </div>
          {fields.map((field, index) => {
            const questionType = watch(`questions.${index}.type`);
            const options = watch(`questions.${index}.options`) || [];
            const showOptions = questionType === "CHECKBOX";

            return (
              <div key={field.id} className={styles.questionCard}>
                <div className={styles.questionHeader}>
                  <h3 className={styles.questionNumber}>
                    Question {index + 1} {formatEnum(questionType)}
                  </h3>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(index)}
                      className={styles.removeButton}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className={styles.questionContent}>
                  <Input
                    {...register(`questions.${index}.text` as const, {
                      required: "Question is required",
                    })}
                    label="Question text"
                    required
                    placeholder="Enter your question"
                    error={errors.questions?.[index]?.text?.message}
                  />
                  {showOptions && (
                    <div className={styles.optionsSection}>
                      <div className={styles.optionsHeader}>
                        <label className={styles.label}>Options</label>
                        <button
                          type="button"
                          onClick={() => addOption(index)}
                          className={styles.addOptionButton}
                        >
                          + Add Option
                        </button>
                      </div>
                      {options.map((option, optionIndex) => (
                        <div key={optionIndex} className={styles.optionRow}>
                          <Input
                            {...register(
                              `questions.${index}.options.${optionIndex}.text` as const,
                              {
                                required: "Option text is required",
                              }
                            )}
                            placeholder={`Option ${optionIndex + 1}`}
                            error={
                              errors.questions?.[index]?.options?.[optionIndex]
                                ?.text?.message
                            }
                          />
                          <div className={styles.correctCheckbox}>
                            <input
                              {...register(
                                `questions.${index}.options.${optionIndex}.isCorrect` as const
                              )}
                              type="checkbox"
                              id={`correct-${index}-${optionIndex}`}
                              className={styles.checkbox}
                            />
                            <label
                              htmlFor={`correct-${index}-${optionIndex}`}
                              className={styles.checkboxLabel}
                            >
                              Correct
                            </label>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeOption(index, optionIndex)}
                            className={styles.removeOptionButton}
                          >
                            x
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.actions}>
          <button
            type="submit"
            disabled={submitting || questions.length === 0}
            className={styles.submitButton}
          >
            {submitting ? "Creating Quiz..." : "Create Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
}
