import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitAnswerDto {
  @ApiProperty({ example: ['a', 'c'] })
  @IsArray()
  @IsString({ each: true })
  selectedAnswers: string[];
}