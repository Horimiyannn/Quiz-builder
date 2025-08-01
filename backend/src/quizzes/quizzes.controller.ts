import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from 'src/shared/dto/quiz.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  create(@Body() dto: CreateQuizDto) {
    return this.quizzesService.create(dto);
  }

  @Get()
  getAll() {
    return this.quizzesService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.quizzesService.getById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.quizzesService.delete(id);
  }
}
