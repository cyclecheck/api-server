import { Cache, caching } from 'cache-manager'

export interface MemoryCacheConfig {
  ttl: number
  max: number
}

const DEFAULT_OPTIONS: MemoryCacheConfig = {
  ttl: hours(1),
  max: 1000,
}

// TODO Convert to provider
export class MemoryCache {
  private options: MemoryCacheConfig
  private cache: Cache

  constructor(options: MemoryCacheConfig) {
    this.options = { ...DEFAULT_OPTIONS, ...options }
    this.cache = caching({ ...this.options, store: 'memory' })
  }

  get<T>(key: string) {
    return this.cache.get<T>(key) as Promise<T>
  }

  set<T>(key: string, value: T, options?: MemoryCacheConfig) {
    if (typeof value === 'undefined' || value === null) return

    if (options) {
      return this.cache.set(key, value, { ...this.options, ...options })
    }

    return (this.cache.set as any)(key, value)
  }

  async getOrSet<T>(
    key: string,
    block: (options: Partial<MemoryCacheConfig>) => Promise<T>,
  ) {
    const cached = await this.get<T>(key)
    if (cached) return cached

    const localOptions = { ...this.options }
    const result = await block(localOptions)
    this.set<T>(key, result, localOptions)

    return result
  }
}

export function seconds(n: number) {
  return 1 * n
}

export function minutes(n: number) {
  return seconds(60) * n
}

export function hours(n: number) {
  return minutes(60) * n
}

export function days(n: number) {
  return hours(24) * n
}
