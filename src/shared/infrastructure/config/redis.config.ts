import { CacheModuleOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis';

export const getRedisConfig = async (): Promise<CacheModuleOptions> => {
  return {
    store: await redisStore({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      password: process.env.REDIS_PASSWORD,
      username: process.env.REDIS_USERNAME,
      // Default TTL: 24 hours
      ttl: parseInt(process.env.REDIS_TTL || '86400', 10),
      // Retry strategy
      retryStrategy: (times: number) => {
        // Maximum retry delay is 3000ms
        return Math.min(times * 50, 3000);
      },
      // Enable keep-alive
      keepAlive: 5000,
      // Connection name for debugging
      connectionName: 'nest_redis',
      // Enable read-only mode if needed
      readOnly: process.env.REDIS_READ_ONLY === 'true',
    }),
    // Global options
    isGlobal: true,
  };
};
