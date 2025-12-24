import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class RankingProducer {
  constructor(@InjectQueue('ranking') private rankingQueue: Queue) {}

  async updateRankings(period: 'daily' | 'weekly') {
    await this.rankingQueue.add('update-rankings', {
      type: 'UPDATE_RANKINGS',
      period,
    });
  }
}