import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class StatisticsProducer {
  constructor(@InjectQueue('statistics') private statisticsQueue: Queue) {}

  async updateLayerStats(userId: string, layerId: string, lessonId?: string) {
    await this.statisticsQueue.add('update-layer-stats', {
      type: 'UPDATE_LAYER_STATS',
      data: { userId, layerId, lessonId },
    });
  }

  async updateUserPoints(userId: string, points: number, date: Date) {
    await this.statisticsQueue.add('update-user-points', {
      type: 'UPDATE_USER_POINTS',
      data: { userId, points, date },
    });
  }

  async recalculateRankings(period: 'daily' | 'weekly') {
    await this.statisticsQueue.add('recalculate-rankings', {
      type: 'RECALCULATE_RANKINGS',
      data: { period },
    });
  }
}