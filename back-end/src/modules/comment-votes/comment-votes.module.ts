import { Module } from '@nestjs/common';
import { CommentVotesController } from './comment-votes.controller';
import { CommentVotesService } from './comment-votes.service';

@Module({
  controllers: [CommentVotesController],
  providers: [CommentVotesService]
})
export class CommentVotesModule {}
