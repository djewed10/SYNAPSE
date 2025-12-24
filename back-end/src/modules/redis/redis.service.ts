import { Inject, Injectable } from '@nestjs/common';
import type { Redis } from 'ioredis';

@Injectable()
export class RedisService {
   @Inject("REDIS")
   private readonly redis: Redis;
   constructor() {}
     async test() {
    await this.redis.set('host', 'nieghbor');
    return await this.redis.get('name'); // mounir
  }
}
