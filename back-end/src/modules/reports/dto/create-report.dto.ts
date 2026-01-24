import { IsString, IsUUID, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty()
  @IsUUID()
  qcmId: string;

  @ApiProperty({ enum: ['error', 'inappropriate', 'outdated', 'duplicate', 'other'] })
  @IsEnum(['error', 'inappropriate', 'outdated', 'duplicate', 'other'])
  reportType: 'error' | 'inappropriate' | 'outdated' | 'duplicate' | 'other';

  @ApiProperty()
  @IsString()
  description: string;
}