import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateCodeDto {
  @ApiProperty({ example: 'MED-2025-X7K9P' })
  @IsString()
  code: string;
}


