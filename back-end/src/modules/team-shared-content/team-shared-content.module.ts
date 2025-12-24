import { Module } from '@nestjs/common';
import { TeamSharedContentController } from './team-shared-content.controller';
import { TeamSharedContentService } from './team-shared-content.service';

@Module({
  controllers: [TeamSharedContentController],
  providers: [TeamSharedContentService]
})
export class TeamSharedContentModule {}
