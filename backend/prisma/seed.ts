import { PrismaClient, QuestionType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.quiz.create({
    data: {
      title: 'Web Basics',
      questions: {
        create: [
          {
            text: 'Is HTML a programming language?',
            type: QuestionType.BOOLEAN,
            options: {
              create: [
                { text: 'Yes', isCorrect: false },
                { text: 'No', isCorrect: true },
              ],
            },
          },
          {
            text: 'What does CSS stand for?',
            type: QuestionType.INPUT,
            options: {
              create: [{ text: 'Cascading Style Sheets', isCorrect: true }],
            },
          },
          {
            text: 'Which of these are frontend libraries?',
            type: QuestionType.CHECKBOX,
            options: {
              create: [
                { text: 'React', isCorrect: true },
                { text: 'Vue', isCorrect: true },
                { text: 'Node.js', isCorrect: false },
                { text: 'Angular', isCorrect: true },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: 'JavaScript Fundamentals',
      questions: {
        create: [
          {
            text: 'Is JavaScript statically typed?',
            type: QuestionType.BOOLEAN,
            options: {
              create: [
                { text: 'Yes', isCorrect: false },
                { text: 'No', isCorrect: true },
              ],
            },
          },
          {
            text: 'Name a JavaScript framework',
            type: QuestionType.INPUT,
            options: {
              create: [{ text: 'React', isCorrect: true }],
            },
          },
          {
            text: 'Which are JS runtime environments?',
            type: QuestionType.CHECKBOX,
            options: {
              create: [
                { text: 'Node.js', isCorrect: true },
                { text: 'Deno', isCorrect: true },
                { text: 'Webpack', isCorrect: false },
                { text: 'Bun', isCorrect: true },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: 'Programming Logic',
      questions: {
        create: [
          {
            text: 'Does every program need a main function?',
            type: QuestionType.BOOLEAN,
            options: {
              create: [
                { text: 'Yes', isCorrect: false },
                { text: 'No', isCorrect: true },
              ],
            },
          },
          {
            text: 'What is a loop that never ends called?',
            type: QuestionType.INPUT,
            options: {
              create: [{ text: 'Infinite loop', isCorrect: true }],
            },
          },
          {
            text: 'Select all types of loops:',
            type: QuestionType.CHECKBOX,
            options: {
              create: [
                { text: 'for', isCorrect: true },
                { text: 'while', isCorrect: true },
                { text: 'switch', isCorrect: false },
                { text: 'do-while', isCorrect: true },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Seeded 3 quizzes successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
