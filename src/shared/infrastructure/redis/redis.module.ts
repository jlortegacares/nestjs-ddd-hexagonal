import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { getRedisConfig } from '../config/redis.config';
import { RedisCacheService } from './redis.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: getRedisConfig,
    }),
  ],
  providers: [RedisCacheService],
  exports: [CacheModule, RedisCacheService],
})
export class RedisModule {} 