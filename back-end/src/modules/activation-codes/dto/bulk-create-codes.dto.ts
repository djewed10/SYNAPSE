import { IsInt, Min, Max, IsEnum, IsOptional, IsDateString, IsUUID, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BulkCreateCodesDto {
  @ApiProperty({ example: 50, minimum: 1, maximum: 1000 })
  @IsInt()
  @Min(1)
  @Max(1000)
  count: number;

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

  @ApiPropertyOptional({ example: 'MED' })
  @IsOptional()
  @IsString()
  prefix?: string;
}