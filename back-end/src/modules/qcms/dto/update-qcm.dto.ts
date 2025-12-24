import { PartialType } from '@nestjs/swagger';
import { CreateQcmDto } from './create-qcm.dto';

export class UpdateQcmDto extends PartialType(CreateQcmDto) {}