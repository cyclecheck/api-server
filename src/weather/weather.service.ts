import { Injectable } from '@nestjs/common'

import { MemoryCache, minutes } from '../util/cache'
import { WeatherClient } from './weather.client'

@Injectable()
export class WeatherService {
  private readonly cache = new MemoryCache({ ttl: minutes(30), max: 1000 })

  constructor(private readonly weatherClient: WeatherClient) {}

  getWeatherForecast(placeId: string, lat: number, lng: number) {
    return this.cache.getOrSet(placeId, () =>
      this.weatherClient.getForecast(lat, lng),
    )
  }
}
