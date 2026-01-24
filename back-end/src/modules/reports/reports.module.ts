import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ReportsRepository } from './reports.repository';
import { DatabaseModule } from '../../database/database.module';
import { QueuesModule } from '../../queues/queues.module';

@Module({
  imports: [DatabaseModule, QueuesModule],
  controllers: [ReportsController],
  providers: [ReportsService, ReportsRepository],
  exports: [ReportsService],
})
export class ReportsModule {}