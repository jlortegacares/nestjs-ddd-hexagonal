import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async get<T>(key: string): Promise<T | undefined> {
    const value = await this.cache.get<T>(key);
    return value === null ? undefined : value;
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.cache.set(key, value, ttl);
  }

  async del(key: string): Promise<void> {
    await this.cache.del(key);
  }

  async clear(): Promise<void> {
    // Note: This is implementation specific and might not be available in all cache stores
    if (typeof (this.cache as any).clear === 'function') {
      await (this.cache as any).clear();
    } else {
      throw new Error('Clear operation not supported by the cache store');
    }
  }

  /**
   * Get multiple keys at once
   */
  async mget<T>(keys: string[]): Promise<(T | undefined)[]> {
    return await Promise.all(keys.map(key => this.get<T>(key)));
  }

  /**
   * Set multiple key-value pairs at once
   */
  async mset(entries: { key: string; value: any; ttl?: number }[]): Promise<void> {
    await Promise.all(
      entries.map(entry => this.set(entry.key, entry.value, entry.ttl))
    );
  }

  /**
   * Get or set a value if it doesn't exist
   */
  async getOrSet<T>(
    key: string,
    getValue: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    const value = await this.get<T>(key);
    if (value !== undefined) {
      return value;
    }

    const newValue = await getValue();
    await this.set(key, newValue, ttl);
    return newValue;
  }
} 