import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class EmailProducer {
  constructor(@InjectQueue('email') private emailQueue: Queue) {}

  async sendEmail(to: string, subject: string, template: string, data: any) {
    await this.emailQueue.add('send-email', {
      to,
      subject,
      template,
      data,
    });
  }
}