/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Transform, Type } from 'class-transformer';
import { QuestionType } from '@prisma/client';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @Transform(({ value }) => Boolean(value))
  isCorrect?: boolean;
}

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  type: QuestionType;

  @ValidateIf((o: CreateQuestionDto) => o.type === QuestionType.CHECKBOX)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => CreateOptionDto)
  options?: CreateOptionDto[];
}

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
