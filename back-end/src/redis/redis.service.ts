import { Inject, Injectable } from '@nestjs/common';
import type { Redis } from 'ioredis';

@Injectable()
export class RedisService {
   constructor(@Inject("REDIS") private  redis: Redis) {}
     async test() {
    await this.redis.set('name', 'mounir');
    return await this.redis.get('name'); // mounir
  }
}
