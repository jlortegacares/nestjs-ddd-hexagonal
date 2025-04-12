import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

export interface ICacheEntry<T> {
  key: string;
  value: T;
  ttl?: number;
}

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.cache.set(key, value, ttl);
  }

  async get<T>(key: string): Promise<T | undefined> {
    const value = await this.cache.get<T>(key);

    return value === null ? undefined : value;
  }

  async del(key: string): Promise<void> {
    await this.cache.del(key);
  }

  async clear(): Promise<void> {
    await this.cache.del('*');
  }

  async setMultiple<T>(entries: ICacheEntry<T>[]): Promise<void> {
    await Promise.all(entries.map(entry => this.set(entry.key, entry.value, entry.ttl)));
  }

  async getOrSet<T>(key: string, getValue: () => Promise<T>, ttl?: number): Promise<T> {
    const value = await this.get<T>(key);

    if (value !== undefined) {
      return value;
    }

    const newValue = await getValue();

    await this.set(key, newValue, ttl);

    return newValue;
  }
}
