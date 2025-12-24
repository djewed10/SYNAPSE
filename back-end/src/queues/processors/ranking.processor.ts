import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable } from '@nestjs/common';

@Processor('ranking')
@Injectable()
export class RankingProcessor extends WorkerHost {
  async process(job: Job<any>): Promise<any> {
    const { type, period } = job.data;

    console.log(`Updating ${period} rankings`);
    
    // TODO: Calculate and cache rankings
    
    return { success: true };
  }
}