import { IsString, IsUUID, IsArray, IsOptional, IsInt, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQcmDto {
  @ApiProperty()
  @IsUUID()
  lessonId: string;

  @ApiProperty()
  @IsString()
  questionText: string;

  @ApiProperty({ 
    example: [
      { id: 'a', text: 'Option A' },
      { id: 'b', text: 'Option B' }
    ] 
  })
  @IsArray()
  propositions: { id: string; text: string }[];

  @ApiProperty({ example: ['a', 'c'] })
  @IsArray()
  @IsString({ each: true })
  correctAnswers: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  explanation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  source?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  difficulty?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  order?: number;
}