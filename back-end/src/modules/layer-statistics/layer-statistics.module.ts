import { Module } from '@nestjs/common';
import { LayerStatisticsController } from './layer-statistics.controller';
import { LayerStatisticsService } from './layer-statistics.service';

@Module({
  controllers: [LayerStatisticsController],
  providers: [LayerStatisticsService]
})
export class LayerStatisticsModule {}
