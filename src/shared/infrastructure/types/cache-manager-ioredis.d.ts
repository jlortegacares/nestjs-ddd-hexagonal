declare module 'cache-manager-ioredis' {
  import { Store, Config } from 'cache-manager';
  import { RedisOptions } from 'ioredis';

  export interface RedisStoreOptions extends RedisOptions {
    ttl?: number;
  }

  export function redisStore(options?: RedisStoreOptions): Promise<Store>;
} 