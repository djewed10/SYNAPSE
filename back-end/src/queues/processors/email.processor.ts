import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable } from '@nestjs/common';

@Processor('email')
@Injectable()
export class EmailProcessor extends WorkerHost {
  async process(job: Job<any>): Promise<any> {
    const { to, subject, template, data } = job.data;

    console.log(`Sending email to ${to}: ${subject}`);
    
    // TODO: Implement email sending with nodemailer or AWS SES
    
    return { success: true, messageId: 'mock-id' };
  }
}