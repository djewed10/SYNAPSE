import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';
import { DatabaseModule } from '../../database/database.module';
import { QueuesModule } from '../../queues/queues.module';

@Module({
  imports: [DatabaseModule, QueuesModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
  exports: [CommentsService],
})
export class CommentsModule {}