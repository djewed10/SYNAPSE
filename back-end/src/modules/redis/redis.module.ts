import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { Redis } from 'ioredis';

@Module({
  providers: [
    RedisService,
    {
      provide: "REDIS",
      useFactory: () => {
        return new Redis({ host: "localhost", port: 6379 });
      },
    },
  ],
  exports: [RedisService],   // 👈 ضروري جدًا
})
export class RedisModule {}
