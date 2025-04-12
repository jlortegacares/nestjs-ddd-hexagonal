import { CacheStore } from '@nestjs/cache-manager';
import { Redis, RedisOptions } from 'ioredis';

// Interface name with 'I' prefix as per naming convention
export interface IRedisStoreOptions extends RedisOptions {
  url?: string;
  host?: string;
  port?: number;
  password?: string;
  db?: number;
  keyPrefix?: string;
  ttl?: number;
}

export interface IRedisStore extends CacheStore {
  client: Redis;
  getClient(): Redis;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  del(key: string): Promise<void>;
  reset(): Promise<void>;
}

export declare function redisStore(options: IRedisStoreOptions): () => IRedisStore;
