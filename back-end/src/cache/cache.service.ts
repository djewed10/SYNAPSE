import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private redis: Redis;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.redis = new Redis({
      host: this.configService.get('REDIS_HOST', 'localhost'),
      port: this.configService.get('REDIS_PORT', 6379),
      password: this.configService.get('REDIS_PASSWORD'),
      db: this.configService.get('REDIS_DB', 0),
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      maxRetriesPerRequest: 3,
    });

    this.redis.on('connect', () => {
      console.log('✅ Redis connected');
    });

    this.redis.on('error', (err) => {
      console.error('❌ Redis error:', err);
    });
  }

  onModuleDestroy() {
    this.redis.disconnect();
  }

  // Basic operations
  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  }

  async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    if (ttlSeconds) {
      await this.redis.setex(key, ttlSeconds, stringValue);
    } else {
      await this.redis.set(key, stringValue);
    }
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redis.exists(key);
    return result === 1;
  }

  async ttl(key: string): Promise<number> {
    return this.redis.ttl(key);
  }

  async expire(key: string, seconds: number): Promise<void> {
    await this.redis.expire(key, seconds);
  }

  // Pattern operations
  async keys(pattern: string): Promise<string[]> {
    return this.redis.keys(pattern);
  }

  async delPattern(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }

  // Hash operations (great for objects)
  async hset(key: string, field: string, value: any): Promise<void> {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    await this.redis.hset(key, field, stringValue);
  }

  async hget<T>(key: string, field: string): Promise<T | null> {
    const value = await this.redis.hget(key, field);
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  }

  async hgetall<T>(key: string): Promise<Record<string, T>> {
    const result = await this.redis.hgetall(key);
    const parsed: Record<string, T> = {};
    for (const [field, value] of Object.entries(result)) {
      try {
        parsed[field] = JSON.parse(value) as T;
      } catch {
        parsed[field] = value as T;
      }
    }
    return parsed;
  }

  async hdel(key: string, field: string): Promise<void> {
    await this.redis.hdel(key, field);
  }

  // List operations
  async lpush(key: string, value: any): Promise<void> {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    await this.redis.lpush(key, stringValue);
  }

  async rpush(key: string, value: any): Promise<void> {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    await this.redis.rpush(key, stringValue);
  }

  async lrange<T>(key: string, start: number, stop: number): Promise<T[]> {
    const values = await this.redis.lrange(key, start, stop);
    return values.map(v => {
      try {
        return JSON.parse(v) as T;
      } catch {
        return v as T;
      }
    });
  }

  async llen(key: string): Promise<number> {
    return this.redis.llen(key);
  }

  async ltrim(key: string, start: number, stop: number): Promise<void> {
    await this.redis.ltrim(key, start, stop);
  }

  // Set operations
  async sadd(key: string, ...members: string[]): Promise<void> {
    await this.redis.sadd(key, ...members);
  }

  async srem(key: string, ...members: string[]): Promise<void> {
    await this.redis.srem(key, ...members);
  }

  async smembers(key: string): Promise<string[]> {
    return this.redis.smembers(key);
  }

  async sismember(key: string, member: string): Promise<boolean> {
    const result = await this.redis.sismember(key, member);
    return result === 1;
  }

  // Sorted set operations (perfect for rankings!)
  async zadd(key: string, score: number, member: string): Promise<void> {
    await this.redis.zadd(key, score, member);
  }

  async zincrby(key: string, increment: number, member: string): Promise<void> {
    await this.redis.zincrby(key, increment, member);
  }

  async zrange(key: string, start: number, stop: number, withScores = false): Promise<string[]> {
    if (withScores) {
      return this.redis.zrange(key, start, stop, 'WITHSCORES');
    }
    return this.redis.zrange(key, start, stop);
  }

  async zrevrange(key: string, start: number, stop: number, withScores = false): Promise<string[]> {
    if (withScores) {
      return this.redis.zrevrange(key, start, stop, 'WITHSCORES');
    }
    return this.redis.zrevrange(key, start, stop);
  }

  async zrank(key: string, member: string): Promise<number | null> {
    return this.redis.zrank(key, member);
  }

  async zrevrank(key: string, member: string): Promise<number | null> {
    return this.redis.zrevrank(key, member);
  }

  async zscore(key: string, member: string): Promise<number | null> {
    const score = await this.redis.zscore(key, member);
    return score ? parseFloat(score) : null;
  }

  // Atomic increment/decrement
  async incr(key: string): Promise<number> {
    return this.redis.incr(key);
  }

  async incrby(key: string, increment: number): Promise<number> {
    return this.redis.incrby(key, increment);
  }

  async decr(key: string): Promise<number> {
    return this.redis.decr(key);
  }

  async decrby(key: string, decrement: number): Promise<number> {
    return this.redis.decrby(key, decrement);
  }

  // Cache wrapper with TTL
  async wrap<T>(
    key: string,
    fn: () => Promise<T>,
    ttlSeconds?: number,
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const result = await fn();
    await this.set(key, result, ttlSeconds);
    return result;
  }

  // Pipeline for bulk operations (MUCH FASTER)
  async pipeline(operations: Array<{ command: string; args: any[] }>): Promise<any[]> {
    const pipeline = this.redis.pipeline();
    operations.forEach(({ command, args }) => {
      (pipeline as any)[command](...args);
    });
    const results = await pipeline.exec();
    return results?.map(([err, result]) => {
      if (err) throw err;
      return result;
    }) || [];
  }

  // Transaction (atomic operations)
  async multi(operations: Array<{ command: string; args: any[] }>): Promise<any[]> {
    const multi = this.redis.multi();
    operations.forEach(({ command, args }) => {
      (multi as any)[command](...args);
    });
    const results = await multi.exec();
    return results?.map(([err, result]) => {
      if (err) throw err;
      return result;
    }) || [];
  }

  // Pub/Sub
  createSubscriber(): Redis {
    return new Redis({
      host: this.configService.get('REDIS_HOST', 'localhost'),
      port: this.configService.get('REDIS_PORT', 6379),
      password: this.configService.get('REDIS_PASSWORD'),
    });
  }

  async publish(channel: string, message: any): Promise<void> {
    const stringMessage = typeof message === 'string' ? message : JSON.stringify(message);
    await this.redis.publish(channel, stringMessage);
  }

  // Flush all (use with caution!)
  async flushall(): Promise<void> {
    await this.redis.flushall();
  }

  async flushdb(): Promise<void> {
    await this.redis.flushdb();
  }

  // Get Redis instance for advanced operations
  getClient(): Redis {
    return this.redis;
  }
}