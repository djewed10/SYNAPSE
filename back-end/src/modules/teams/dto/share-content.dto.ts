import { IsString, IsUUID, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ShareContentDto {
  @ApiProperty({ enum: ['qcm', 'playlist', 'note'] })
  @IsEnum(['qcm', 'playlist', 'note'])
  contentType: 'qcm' | 'playlist' | 'note';

  @ApiProperty()
  @IsUUID()
  contentId: string;
}