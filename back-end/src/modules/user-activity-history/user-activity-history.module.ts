import { Module } from '@nestjs/common';
import { UserActivityHistoryController } from './user-activity-history.controller';
import { UserActivityHistoryService } from './user-activity-history.service';

@Module({
  controllers: [UserActivityHistoryController],
  providers: [UserActivityHistoryService]
})
export class UserActivityHistoryModule {}
