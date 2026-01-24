import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TeamsRepository } from './teams.repository';
import { DatabaseModule } from '../../database/database.module';
import { QueuesModule } from '../../queues/queues.module';

@Module({
  imports: [DatabaseModule, QueuesModule],
  controllers: [TeamsController],
  providers: [TeamsService, TeamsRepository],
  exports: [TeamsService],
})
export class TeamsModule {}