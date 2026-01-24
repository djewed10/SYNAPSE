import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ResolveReportDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  resolutionNote?: string;
}