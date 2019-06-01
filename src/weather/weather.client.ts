import { Injectable, Logger } from '@nestjs/common'
import {
  DarkSky,
  DarkSkyOptions,
  Exclude,
  Forecast,
  Units,
} from 'darkskyapi-ts'

import { ConfigService } from '../config/config.service'
import { createWeatherModel, Weather } from './models/weather'

export const WEATHER_UNITS_METRIC = Units.SI

export const WEATHER_UNITS_IMPERIAL = Units.US

@Injectable()
export class WeatherClient {
  private readonly logger = new Logger('WeatherClient')
  private readonly client: DarkSky
  private readonly options: DarkSkyOptions = {
    units: Units.SI,
    exclude: [Exclude.MINUTELY, Exclude.FLAGS],
  }

  constructor({ config: { darkskyApi } }: ConfigService) {
    this.client = new DarkSky(darkskyApi, this.options)
  }

  async getForecast(
    latitude: number,
    longitude: number,
  ): Promise<Weather | null> {
    const result = await this.client.forecast(latitude, longitude)
    this.logger.log(
      `DarkSky API calls: ${result.headers['x-forecast-api-calls']}`,
    )
    this.logger.debug(`response time -> ${result.headers['x-response-time']}`)

    if (!validateForecastResult(result)) return null

    return createWeatherModel(result)
  }
}

function validateForecastResult({ currently, hourly, daily }: Forecast) {
  return currently && hourly && daily
}
