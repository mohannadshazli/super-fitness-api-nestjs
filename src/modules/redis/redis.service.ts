import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    constructor(
        @Inject('REDIS_CLIENT') private readonly redis: Redis,
    ) { }

    async get<T>(key: string): Promise<T | null> {
        const data = await this.redis.get(key);
        return data ? (JSON.parse(data) as T) : null;
    }

    async set(key: string, value: any, ttl?: number) {
        const data = JSON.stringify(value);

        if (ttl) {
            await this.redis.set(key, data, 'EX', ttl);
        } else {
            await this.redis.set(key, data);
        }
    }

    async del(key: string) {
        await this.redis.del(key);
    }
}