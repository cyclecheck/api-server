import { Injectable } from '@nestjs/common'

import { WeatherClient } from './weather.client'

@Injectable()
export class WeatherService {
  constructor(private readonly weatherClient: WeatherClient) {}

  async getWeatherForecast(lat: number, lng: number) {
    // TODO:

    // 1. Check database for the placeid

    // 2. If exsits, check if its older than 30 mins
    // 2. a: if older, get new version, store in database
    // 2. b: if younger, just return

    const result = await this.weatherClient.getForecast(lat, lng)

    return result
  }
}
