import { IsString, IsEnum, IsOptional, IsDateString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateActivationCodeDto {
  @ApiProperty({ example: 'MED-2025-X7K9P' })
  @IsString()
  code: string;

  @ApiProperty({ enum: ['1_month', '6_months', '1_year', 'pro'] })
  @IsEnum(['1_month', '6_months', '1_year', 'pro'])
  planType: '1_month' | '6_months' | '1_year' | 'pro';

  @ApiPropertyOptional({ example: '2025-12-31T23:59:59Z' })
  @IsOptional()
  @IsDateString()
  expiresAt?: Date;

  @ApiProperty({ example: 'uuid-of-admin' })
  @IsUUID()
  createdBy: string;
}