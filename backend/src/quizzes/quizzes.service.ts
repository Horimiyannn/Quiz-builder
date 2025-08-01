import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizDto } from 'src/shared/dto/quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateQuizDto) {
    const { questions, title } = dto;

    return this.prisma.quiz.create({
      data: {
        title,
        questions: {
          create: questions.map((question) => ({
            text: question.text,
            type: question.type,
            options:
              question.type === 'CHECKBOX' && question.options
                ? {
                    create: question.options.map((option) => ({
                      text: option.text,
                      isCorrect: option.isCorrect,
                    })),
                  }
                : undefined,
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: { select: { text: true } },
          },
        },
      },
    });
  }

  async getAll() {
    return await this.prisma.quiz.findMany({
      include: {
        _count: {
          select: {
            questions: true,
          },
        },
        questions: {
          select: {
            id: true,
            text: true,
            type: true,
          },
        },
      },
    });
  }

  async getById(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
    if (!quiz) {
      throw new NotFoundException();
    }
    return quiz;
  }

  async delete(id: string) {
    await this.getById(id);

    await this.prisma.quiz.delete({
      where: { id },
    });
  }
}
