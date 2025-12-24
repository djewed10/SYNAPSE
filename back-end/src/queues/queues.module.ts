import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StatisticsProcessor } from './processors/statistics.processor';
import { NotificationsProcessor } from './processors/notifications.processor';
import { EmailProcessor } from './processors/email.processor';
import { RankingProcessor } from './processors/ranking.processor';
import { StatisticsProducer } from './producers/statistics.producer';
import { NotificationsProducer } from './producers/notifications.producer';
import { EmailProducer } from './producers/email.producer';
import { RankingProducer } from './producers/ranking.producer';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST', 'localhost'),
          port: configService.get('REDIS_PORT', 6379),
          password: configService.get('REDIS_PASSWORD'),
        },
      }),
    }),
    BullModule.registerQueue(
      { name: 'statistics' },
      { name: 'notifications' },
      { name: 'email' },
      { name: 'ranking' },
    ),
  ],
  providers: [
    StatisticsProcessor,
    NotificationsProcessor,
    EmailProcessor,
    RankingProcessor,
    StatisticsProducer,
    NotificationsProducer,
    EmailProducer,
    RankingProducer,
  ],
  exports: [
    StatisticsProducer,
    NotificationsProducer,
    EmailProducer,
    RankingProducer,
  ],
})
export class QueuesModule {}