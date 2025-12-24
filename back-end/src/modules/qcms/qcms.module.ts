import { Module } from '@nestjs/common';
import { QcmsController } from './qcms.controller';
import { QcmsService } from './qcms.service';
import { QcmsRepository } from './qcms.repository';
import { DatabaseModule } from '../../database/database.module';
import { LayersModule } from '../layers/layers.module';
import { ProgressModule } from '../progress/progress.module';
import { QueuesModule } from '../../queues/queues.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    DatabaseModule,
    LayersModule,
    ProgressModule,
    QueuesModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [QcmsController],
  providers: [QcmsService, QcmsRepository],
  exports: [QcmsService, QcmsRepository],
})
export class QcmsModule {}