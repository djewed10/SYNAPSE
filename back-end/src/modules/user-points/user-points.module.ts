import { Module } from '@nestjs/common';
import { UserPointsController } from './user-points.controller';
import { UserPointsService } from './user-points.service';

@Module({
  controllers: [UserPointsController],
  providers: [UserPointsService]
})
export class UserPointsModule {}
