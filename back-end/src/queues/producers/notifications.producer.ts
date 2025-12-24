import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationsProducer {
  constructor(@InjectQueue('notifications') private notificationsQueue: Queue) {}

  async sendNotification(userId: string, type: string, data: any) {
    await this.notificationsQueue.add('send-notification', {
      userId,
      type,
      data,
    });
  }
}