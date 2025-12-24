import { Module } from '@nestjs/common';
import { VoletsController } from './volets.controller';
import { VoletsService } from './volets.service';

@Module({
  controllers: [VoletsController],
  providers: [VoletsService]
})
export class VoletsModule {}
