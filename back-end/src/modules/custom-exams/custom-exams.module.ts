import { Module } from '@nestjs/common';
import { CustomExamsController } from './custom-exams.controller';
import { CustomExamsService } from './custom-exams.service';

@Module({
  controllers: [CustomExamsController],
  providers: [CustomExamsService]
})
export class CustomExamsModule {}
